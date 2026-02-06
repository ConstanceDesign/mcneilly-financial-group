import React, { useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {
  FaCalculator,
  FaPrint,
  FaFilePdf,
  FaFileCsv,
  FaEnvelope,
  FaRedo,
  FaCheckCircle,
} from 'react-icons/fa';
import {
  exportCSV,
  exportPDF,
  handlePrintWrapper,
  ProjectionMeta,
  getPDFBase64,
} from '../utils/exportHelpers';
import { useReactToPrint } from 'react-to-print';
import ExportStatus from './ExportStatus';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type AccountType = 'RRSP' | 'TFSA' | 'FHSA';

const DEFAULT_INFLATION = 0.02;

const toNumber = (val: string) => {
  const n = Number(String(val).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const formatCAD = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

// ✅ Ensure this file exists in /public/images/...
const LOGO_URL = '/images/mcneillyfinancialgroup-logo.png';

const FinancialCalculator: React.FC = () => {
  const [accountType, setAccountType] = useState<AccountType>('RRSP');
  const [income, setIncome] = useState('');
  const [principal, setPrincipal] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [clientName, setClientName] = useState('');

  const [result, setResult] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  const [isSending, setIsSending] = useState(false);
  const [sendToEmail, setSendToEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [pdfExported, setPdfExported] = useState(false);
  const [csvExported, setCsvExported] = useState(false);
  const [printTriggered, setPrintTriggered] = useState(false);

  // ✅ Print/PDF target: report only
  const reportRef = useRef<HTMLDivElement>(null);

  const printOnlyReportCSS = `
    @page { margin: 12mm; }
    @media print {
      body * { visibility: hidden !important; }
      .print-area, .print-area * { visibility: visible !important; }
      .print-area {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        box-shadow: none !important;
        border: none !important;
      }
    }
  `;

/* ---------- PRINT (react-to-print) ---------- */
const reactToPrint = useReactToPrint({
  content: () => reportRef.current,
  documentTitle: `${clientName || 'Investment Projection'} - ${accountType}`,
  removeAfterPrint: true,
  pageStyle: printOnlyReportCSS,
} as any);

  /* ---------- CONTRIBUTION LIMIT (simple estimate) ---------- */
  const contributionLimit = useMemo(() => {
    if (accountType === 'RRSP') return Math.min(toNumber(income) * 0.18, 32490);
    if (accountType === 'FHSA') return 8000;
    return 7000;
  }, [accountType, income]);

  /* ---------- CALCULATE ---------- */
  const calculate = () => {
    const P = toNumber(principal);
    const m = toNumber(monthly);
    const r = toNumber(rate) / 100;
    const t = toNumber(years);
    const n = 12;

    if (!t || t <= 0 || !r || r <= 0) {
      setResult('Please enter a valid annual return rate and number of years.');
      setWarning(null);
      setChartData(null);
      setHasCalculated(false);
      return;
    }

    const lumpSum = P * Math.pow(1 + r / n, n * t);
    const contrib = m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    let total = lumpSum + contrib;

    if (adjustForInflation) {
      total /= Math.pow(1 + DEFAULT_INFLATION, t);
    }

    const annualEstimate = P + m * 12;
    const warn =
      annualEstimate > contributionLimit
        ? `Note: Estimated first-year contributions (${formatCAD(
            annualEstimate
          )}) exceed an annual ${accountType} limit estimate of ${formatCAD(
            contributionLimit
          )}. (Limits/room vary by person and year.)`
        : null;

    setWarning(warn);

    setResult(
      `Projected Future Value: ${formatCAD(total)}${
        adjustForInflation ? ' (inflation-adjusted)' : ''
      }.`
    );

    const labels: string[] = [];
    const values: number[] = [];

    for (let i = 1; i <= t; i++) {
      const fv =
        P * Math.pow(1 + r / n, n * i) +
        m * ((Math.pow(1 + r / n, n * i) - 1) / (r / n));

      const adjusted = adjustForInflation ? fv / Math.pow(1 + DEFAULT_INFLATION, i) : fv;

      labels.push(`Year ${i}`);
      values.push(Number(adjusted.toFixed(2)));
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Projected Value (CAD)',
          data: values,
          borderColor: '#4b9328',
          backgroundColor: '#4b9328',
          tension: 0.25,
          pointRadius: 2,
        },
      ],
    });

    setHasCalculated(true);
  };

  /* ---------- EMAIL ---------- */
  const handleEmailReport = async () => {
    if (!hasCalculated || !clientName || !reportRef.current || !result) {
      alert('Please enter a client name and click Calculate first.');
      return;
    }

    try {
      setIsSending(true);

      // ✅ Uses the same export-safe logic (style-tag stripping + canvas copy)
      const pdfBase64 = await getPDFBase64(reportRef.current);

const res = await fetch('/api/send-report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    clientName,
    summary: [result, warning].filter(Boolean).join('\n'),
    pdfBase64,
    email: sendToEmail, // ✅ add this
  }),
});

const data = await res.json();

if (!res.ok || !data?.success) {
  setEmailError(data?.message || 'Email failed.');
  return;
}

setEmailError(null);
setEmailSent(true);
setTimeout(() => setEmailSent(false), 2500);
    } catch (err) {
      console.error(err);
      alert('Email failed. Check console + Network tab.');
    } finally {
      setIsSending(false);
    }
  };

  /* ---------- RESET ---------- */
  const resetAll = () => {
    setAccountType('RRSP');
    setIncome('');
    setPrincipal('');
    setMonthly('');
    setRate('');
    setYears('');
    setAdjustForInflation(false);
    setClientName('');

    setResult(null);
    setWarning(null);
    setChartData(null);
    setHasCalculated(false);

    setEmailSent(false);
    setPdfExported(false);
    setCsvExported(false);
    setPrintTriggered(false);
  };

  const meta: ProjectionMeta = {
    reportTitle: 'Investment Projection Report',
    firmLine: 'McNeilly Financial Group',
    logoUrl: LOGO_URL,
    preparedFor: clientName || '',
    accountType,
    income: income || '',
    startingAmount: principal || '',
    monthlyContribution: monthly || '',
    annualReturnRate: rate || '',
    yearsToGrow: years || '',
    inflationAdjusted: adjustForInflation,
  };

  const btnBase =
    'inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div className="max-w-xl mx-auto space-y-6" aria-label="Investment projection calculator">
    
      {/* ---------------- FORM CARD ---------------- */}
      <div className="bg-white p-6 rounded shadow border border-[#d4d4d4]">
        <div className="flex items-center gap-2 mb-3">
          <FaCalculator className="text-[#4b9328]" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-[#0f5028]">Registered Investment Calculator</h3>
        </div>

        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            calculate();
          }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">Client name</span>
              <input
                className="mt-1 w-full rounded-xs border border-black/25 px-3 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]/40"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g., Alex Martin"
                autoComplete="name"
              />
            </label>

            <label className="block">
  <span className="text-sm font-semibold text-[#0f5028]">Send report to email</span>
  <input
    className="mt-1 w-full rounded border border-black/25 px-3 py-2.5"
    value={sendToEmail}
    onChange={(e) => setSendToEmail(e.target.value)}
    placeholder="e.g., client@email.com"
    inputMode="email"
    autoComplete="email"
  />
</label>

            <label className="block">
              <span className="text-[16px] text-[#1f2937]">Account type</span>
              <select
                className="mt-1 w-full rounded border border-black/25 px-3 py-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]/40"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as AccountType)}
                aria-label="Select account type"
              >
                <option value="RRSP">RRSP</option>
                <option value="TFSA">TFSA</option>
                <option value="FHSA">FHSA</option>
              </select>
            </label>
          </div>

          {accountType === 'RRSP' && (
            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">
                Annual income (for RRSP room estimate)
              </span>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="e.g., 83000"
                inputMode="decimal"
              />
            </label>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">Starting amount (CAD)</span>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="e.g., 10000"
                inputMode="decimal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">Monthly contribution (CAD)</span>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                placeholder="e.g., 250"
                inputMode="decimal"
              />
            </label>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">Annual return rate (%)</span>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g., 6"
                inputMode="decimal"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-[#0f5028]">Years to grow</span>
              <input
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g., 20"
                inputMode="numeric"
              />
            </label>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={adjustForInflation}
              onChange={(e) => setAdjustForInflation(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#4b9328] focus:ring-[#8cbe3f]"
            />
            <span className="text-sm text-[#0f5028] font-semibold">
              Adjust for inflation (2%/year)
            </span>
          </label>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className={`${btnBase} bg-[#4b9328] hover:bg-[#8cbe3f] text-white justify-center`}
              aria-label="Calculate projection"
            >
              <FaCalculator aria-hidden="true" />
              Calculate
            </button>

            <button
              type="button"
              onClick={resetAll}
              className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028] justify-center`}
              aria-label="Reset calculator"
            >
              <FaRedo aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* ---------------- REPORT CARD (PRINT/PDF TARGET) ---------------- */}
      <div ref={reportRef} className="print-area bg-white p-6 rounded shadow border border-[#d4d4d4]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="McNeilly Financial Group logo"
              className="h-10 w-auto object-contain"
              loading="eager"
            />
            <div>
              <h3 className="text-xl font-semibold text-[#0f5028] leading-tight">
                Registered Investment Report
              </h3>
            </div>
          </div>

          <div className="text-xs text-slate-600 text-right">
            <div className="font-semibold text-[#0f5028]">{clientName || '—'}</div>
            <div>{accountType}</div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#d4d4d4] bg-[#f8f9f7] p-4">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#0f5028]">
            <span className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
              Starting: <strong>{principal ? formatCAD(toNumber(principal)) : '—'}</strong>
            </span>

            <span className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
              Monthly: <strong>{monthly ? formatCAD(toNumber(monthly)) : '—'}</strong>
            </span>

            <span className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
              Return: <strong>{rate ? `${rate}%` : '—'}</strong>
            </span>

            <span className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
              Years: <strong>{years || '—'}</strong>
            </span>

            {accountType === 'RRSP' && (
              <span className="inline-flex items-center gap-2">
                <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
                Income: <strong>{income ? formatCAD(toNumber(income)) : '—'}</strong>
              </span>
            )}

            <span className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
              Inflation: <strong>{adjustForInflation ? 'Yes (2%/yr)' : 'No'}</strong>
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {(result || warning) ? (
            <div className="rounded-lg border border-[#d4d4d4] bg-[#f8f9f7] p-4">
              {result && <p className="text-[#0f5028] font-semibold leading-relaxed">{result}</p>}
              {warning && <p className="text-sm text-[#0f5028] mt-2 leading-relaxed">{warning}</p>}
            </div>
          ) : (
            <div className="rounded-lg border border-[#d4d4d4] bg-[#f8f9f7] p-4 text-sm text-slate-700">
              Run a calculation above to generate results and the chart.
            </div>
          )}
        </div>

        {chartData && (
          <div className="mt-4 h-[280px] rounded-lg border border-gray-200 bg-white p-3">
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => {
                        const n = Number(value);
                        return Number.isFinite(n) ? formatCAD(n) : String(value);
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}

        {/* ✅ Export buttons */}
        <div data-export-ignore="true" className="mt-5">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                handlePrintWrapper({
                  reportRef,
                  handlePrint: reactToPrint,
                  setPrintTriggered,
                })
              }
              disabled={!hasCalculated}
              className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028]`}
              aria-label="Print report"
            >
              <FaPrint aria-hidden="true" />
              Print
            </button>

            <button
              type="button"
              onClick={async () => {
                if (!reportRef.current) return;
                setPdfExported(false);
                await exportPDF(reportRef.current, meta, 'mcneilly_investment_report.pdf');
                setPdfExported(true);
                setTimeout(() => setPdfExported(false), 2500);
              }}
              disabled={!hasCalculated}
              className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028]`}
              aria-label="Export PDF"
            >
              <FaFilePdf aria-hidden="true" />
              PDF
            </button>

            <button
              type="button"
              onClick={() => {
                setCsvExported(false);
                exportCSV(chartData, meta, 'mcneilly_investment_projection.csv');
                setCsvExported(true);
                setTimeout(() => setCsvExported(false), 2500);
              }}
              disabled={!chartData}
              className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028]`}
              aria-label="Export CSV"
            >
              <FaFileCsv aria-hidden="true" />
              CSV
            </button>

            <button
              type="button"
              onClick={handleEmailReport}
              disabled={!hasCalculated || isSending}
              className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028]`}
              aria-label="Email report"
            >
              <FaEnvelope aria-hidden="true" />
              {isSending ? 'Sending…' : 'Email'}
            </button>
          </div>

          <div className="pt-2">
            <ExportStatus
              emailSent={emailSent}
              pdfExported={pdfExported}
              csvExported={csvExported}
              printTriggered={printTriggered}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;