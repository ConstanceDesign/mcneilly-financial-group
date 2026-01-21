import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  FaCheckCircle,
  FaRedo,
} from 'react-icons/fa';
import { exportCSV, exportPDF } from '../utils/exportHelpers';
import { useReactToPrint } from 'react-to-print';
import ExportStatus from './ExportStatus';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

type AccountType = 'RRSP' | 'TFSA' | 'FHSA';

const DEFAULT_INFLATION = 0.02;

const toNumber = (val: string) =>
  Number(String(val).replace(/[^0-9.\-]/g, '')) || 0;

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
  });

  /* ---------- PDF BASE64 (for email) ---------- */
  const getPDFBase64 = async (): Promise<string> => {
    if (!printRef.current) throw new Error('Nothing to export');

    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 40, pageWidth, pdfHeight);
    return pdf.output('datauristring');
  };

  /* ---------- CALCULATE ---------- */
  const contributionLimit = useMemo(() => {
    if (accountType === 'RRSP') return Math.min(toNumber(income) * 0.18, 32490);
    if (accountType === 'FHSA') return 8000;
    return 7000;
  }, [accountType, income]);

  const calculate = () => {
    const P = toNumber(principal);
    const m = toNumber(monthly);
    const r = toNumber(rate) / 100;
    const t = toNumber(years);
    const n = 12;

    if (!t || !r) return;

    let total =
      P * Math.pow(1 + r / n, n * t) +
      m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));

    if (adjustForInflation) {
      total /= Math.pow(1 + DEFAULT_INFLATION, t);
    }

    const annual = P + m * 12;
    setWarning(
      annual > contributionLimit
        ? `Estimated first-year contributions exceed ${accountType} limit.`
        : null
    );

    setResult(`Projected Future Value: ${formatCAD(total)}`);
    setHasCalculated(true);

    const labels = [];
    const values = [];

    for (let i = 1; i <= t; i++) {
      const v =
        P * Math.pow(1 + r / n, n * i) +
        m * ((Math.pow(1 + r / n, n * i) - 1) / (r / n));
      labels.push(`Year ${i}`);
      values.push(v);
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
  };

  /* ---------- EMAIL ---------- */
  const handleEmailReport = async () => {
    if (!hasCalculated || !clientName || !printRef.current) return;

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

      if (!res.ok) throw new Error(await res.text());
      setEmailSent(true);
      setTimeout(() => setEmailSent(false), 3000);
    } catch (err) {
      alert('Email failed. See console.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  /* ---------- RESET ---------- */
  const resetAll = () => {
    setIncome('');
    setPrincipal('');
    setMonthly('');
    setRate('');
    setYears('');
    setClientName('');
    setResult(null);
    setWarning(null);
    setChartData(null);
    setHasCalculated(false);
  };

  /* ---------- RENDER ---------- */
  return (
    <div ref={printRef} className="bg-white p-6 max-w-xl mx-auto rounded shadow print-area">
      <h3 className="text-xl font-semibold text-[#0f5028] flex items-center gap-2 mb-3">
        <FaCalculator /> Registered Investment Calculator
      </h3>

      <form
        className="space-y-4 print:hidden"
        onSubmit={(e) => {
          e.preventDefault();
          calculate();
        }}
      >
        {/* Inputs unchanged for brevity */}
        {/* Keep your existing inputs here */}

        <div className="flex flex-wrap gap-3 pt-3">
          <button type="submit" className="btn bg-[#4b9328] text-white px-4 py-2">
            Calculate
          </button>

          <button type="button" onClick={handlePrint} disabled={!hasCalculated} className="btn">
            <FaPrint /> Print
          </button>

          <button
            type="button"
            onClick={async () => {
              if (!printRef.current) return;
              await exportPDF(printRef.current, clientName || 'Client');
              setPdfExported(true);
              setTimeout(() => setPdfExported(false), 2500);
            }}
            disabled={!hasCalculated}
            className="btn"
          >
            <FaFilePdf /> PDF
          </button>

          <button
            type="button"
            onClick={() => {
              exportCSV(chartData);
              setCsvExported(true);
              setTimeout(() => setCsvExported(false), 2500);
            }}
            disabled={!chartData}
            className="btn"
          >
            <FaFileCsv /> CSV
          </button>

          <button
            type="button"
            onClick={handleEmailReport}
            disabled={!hasCalculated || isSending}
            className="btn"
          >
            <FaEnvelope /> {isSending ? 'Sending…' : 'Email'}
          </button>

          <button type="button" onClick={resetAll} className="btn">
            <FaRedo /> Reset
          </button>
        </div>

        <ExportStatus
          emailSent={emailSent}
          pdfExported={pdfExported}
          csvExported={csvExported}
          printTriggered={printTriggered}
        />
      </form>

      {chartData && (
        <div className="mt-4 h-[260px]">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default FinancialCalculator;