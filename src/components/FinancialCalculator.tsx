import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaCalculator, FaPrint, FaFilePdf, FaFileCsv, FaEnvelope } from 'react-icons/fa';
import { exportCSV, exportPDF } from '../utils/exportHelpers';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { handlePrintWrapper } from '../utils/printHelpers';
import ExportStatus from './ExportStatus';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FinancialCalculator: React.FC = () => {
  const [accountType, setAccountType] = useState('RRSP');
  const [income, setIncome] = useState('');
  const [principal, setPrincipal] = useState('');
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [retirementAge, setRetirementAge] = useState('');
  const [currentAge, setCurrentAge] = useState('');
  const [adjustForInflation, setAdjustForInflation] = useState(false);
  const [clientName, setClientName] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [summary, setSummary] = useState('');
  const [chartData, setChartData] = useState<any>(null);
  const [isSending, setIsSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [pdfExported, setPdfExported] = useState(false);
  const [csvExported, setCsvExported] = useState(false);
  const [printTriggered, setPrintTriggered] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `${clientName || 'Investment Projection'}`,
    removeAfterPrint: true,
  });

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const m = parseFloat(monthly) || 0;
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const n = 12;

    if (!r || !t) {
      setResult('Please enter valid rate and duration.');
      return;
    }

    const lumpSum = P * Math.pow(1 + r / n, n * t);
    const contrib = m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    let total = lumpSum + contrib;

    if (adjustForInflation) {
      total /= Math.pow(1 + 0.02, t);
    }

    let contributionLimit = 7000;
    if (accountType === 'RRSP') {
      const incomeNum = parseFloat(income) || 0;
      contributionLimit = Math.min(incomeNum * 0.18, 32490);
    }

    const warning =
      P + m * t * 12 > contributionLimit
        ? `Note: Your total contribution exceeds the 2025 ${accountType} limit of $${contributionLimit.toLocaleString()} CAD.`
        : '';

    const fullResult = `Future Value: $${total.toFixed(2)} CAD. ${warning}`;
    setResult(fullResult);
    setSummary(fullResult);

    const labels: string[] = [];
    const dataPoints: number[] = [];

    for (let year = 1; year <= t; year++) {
      const fv = P * Math.pow(1 + r / n, n * year) +
        m * ((Math.pow(1 + r / n, n * year) - 1) / (r / n));
      const adjusted = adjustForInflation ? fv / Math.pow(1 + 0.02, year) : fv;
      labels.push(`Year ${year}`);
      dataPoints.push(parseFloat(adjusted.toFixed(2)));
    }

    setChartData({
      labels,
      datasets: [{
        label: 'Projected Value (CAD)',
        data: dataPoints,
        fill: false,
        backgroundColor: '#4b9328',
        borderColor: '#4b9328'
      }]
    });
  };

  const getPDFBase64 = async (element: HTMLElement) => {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const props = pdf.getImageProperties(imgData);
    const pdfHeight = (props.height * pageWidth) / props.width;
    pdf.addImage(imgData, 'PNG', 0, 40, pageWidth, pdfHeight);
    return pdf.output('datauristring');
  };

  const handleEmailReport = async () => {
    if (!clientName || !summary || !printRef.current) {
      alert('Please enter client name, calculate, and generate chart first.');
      return;
    }

    try {
      setIsSending(true);
      const pdfBase64 = await getPDFBase64(printRef.current);

      const res = await fetch('/api/send-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientName, summary, chartData, pdfBase64 }),
      });

      if (res.ok) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 3000);
      } else {
        alert('Email failed. Please try again.');
        console.error('Email error:', await res.text());
      }
    } catch (err) {
      alert('Network error sending email.');
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div ref={printRef} className="bg-white p-6 max-w-xl mx-auto rounded shadow print-area">
      {/* UI content unchanged for brevity */}
    </div>
  );
};

export default FinancialCalculator;