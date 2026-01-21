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
import { exportCSV, exportPDF } from '../utils/exportHelpers';
import { useReactToPrint } from 'react-to-print';
import ExportStatus from './ExportStatus';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type AccountType = 'RRSP' | 'TFSA' | 'FHSA';

const DEFAULT_INFLATION = 0.02;

const toNumber = (val: string) => {
  const n = Number(String(val).replace(/[^0-9.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const formatCAD = (n: number) =>
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n);

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
  const [emailSent, setEmailSent] = useState(false);
  const [pdfExported, setPdfExported] = useState(false);
  const [csvExported, setCsvExported] = useState(false);
  const [printTriggered, setPrintTriggered] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  /* ---------- PRINT ---------- */
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${clientName || 'Investment Projection'} - ${accountType}`,
    removeAfterPrint: true,
  });

  /* ---------- PDF BASE64 (for email) ---------- */
  const getPDFBase64 = async (): Promise<string> => {
    if (!printRef.current) throw new Error('Nothing to export');

    const canvas = await html2canvas(printRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    // header padding
    pdf.addImage(imgData, 'PNG', 0, 40, pageWidth, pdfHeight);
    return pdf.output('datauristring');
  };

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

    // FV (monthly compounding)
    const lumpSum = P * Math.pow(1 + r / n, n * t);
    const contrib = m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    let total = lumpSum + contrib;

    if (adjustForInflation) {
      total /= Math.pow(1 + DEFAULT_INFLATION, t);
    }

    // warning (simple “first year” estimate)
    const annualEstimate = P + m * 12;
    const warn =
      annualEstimate > contributionLimit
        ? `Note: Your estimated first-year contributions (${formatCAD(
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

    // build chart
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
    if (!hasCalculated || !clientName || !printRef.current || !result) {
      alert('Please enter a client name and click Calculate first.');
      return;
    }

    try {
      setIsSending(true);

      const pdfBase64 = await getPDFBase64();

      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          summary: [result, warning].filter(Boolean).join(' '),
          pdfBase64,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }

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
  };

  /* ---------- UI helpers ---------- */
  const btnBase =
    'inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-bold shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40 disabled:opacity-50 disabled:cursor-not-allowed';

  return (
    <div
      ref={printRef}
      className="bg-white p-6 max-w-xl mx-auto rounded shadow print-area"
      aria-label="Investment projection calculator"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <FaCalculator className="text-[#4b9328]" aria-hidden="true" />
        <h3 className="text-xl font-semibold text-[#0f5028]">Registered Investment Calculator</h3>
      </div>

      {/* Assumptions strip */}
      <div className="mb-5 rounded-lg border border-[#d4d4d4] bg-[#f8f9f7] px-3 py-2 text-sm text-[#0f5028]">
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="inline-flex items-center gap-2">
            <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
            Compounding: monthly
          </span>
          <span className="inline-flex items-center gap-2">
            <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
            Inflation: {adjustForInflation ? '2% applied' : 'optional'}
          </span>
          <span className="inline-flex items-center gap-2">
            <FaCheckCircle className="text-[#4b9328] text-sm" aria-hidden="true" />
            Currency: CAD
          </span>
        </div>
      </div>

      {/* FORM */}
      <form
        className="space-y-4 print:hidden"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-semibold text-[#0f5028]">Client name</span>
            <input
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g., Alex Martin"
              autoComplete="name"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-[#0f5028]">Account type</span>
            <select
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8cbe3f]"
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
          <span className="text-sm text-[#0f5028] font-semibold">Adjust for inflation (2%/year)</span>
        </label>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className={`${btnBase} bg-[#4b9328] hover:bg-[#8cbe3f] text-white`}
            aria-label="Calculate projection"
          >
            <FaCalculator aria-hidden="true" />
            Calculate
          </button>

          <button
            type="button"
            onClick={() => {
              setPrintTriggered(false);
              handlePrint();
              setPrintTriggered(true);
              setTimeout(() => setPrintTriggered(false), 2500);
            }}
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
              if (!printRef.current) return;
              setPdfExported(false);
              await exportPDF(printRef.current, clientName || 'Client');
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
              exportCSV(chartData, 'investment_projection.csv');
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

          <button
            type="button"
            onClick={resetAll}
            className={`${btnBase} bg-white border border-gray-300 hover:bg-gray-50 text-[#0f5028]`}
            aria-label="Reset calculator"
          >
            <FaRedo aria-hidden="true" />
            Reset
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
      </form>

      {/* Results */}
      {(result || warning) && (
        <div className="mt-4 space-y-2">
          {result && (
            <div className="rounded-lg border border-[#d4d4d4] bg-[#f8f9f7] p-4">
              <p className="text-[#0f5028] font-semibold leading-relaxed">{result}</p>
              {warning && <p className="text-sm text-[#0f5028] mt-2 leading-relaxed">{warning}</p>}
            </div>
          )}
        </div>
      )}

      {/* Chart */}
      {chartData && (
        <div className="mt-4 h-[260px] rounded-lg border border-gray-200 bg-white p-3">
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
    </div>
  );
};

export default FinancialCalculator;