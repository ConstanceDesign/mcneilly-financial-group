import React, { useState, useRef, RefObject } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { FaCalculator, FaPrint, FaFilePdf, FaFileCsv, FaEnvelope } from 'react-icons/fa';
import { exportCSV, exportPDF, usePrintHandler } from '../utils/exportHelpers';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FinancialCalculator: React.FC = () => {
  const [accountType, setAccountType] = useState('TFSA');
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

  const chartRef: RefObject<HTMLElement> = useRef(null);
  const handlePrint = usePrintHandler(chartRef);

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

    const lumpSum = P * Math.pow((1 + r / n), n * t);
    const contrib = m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
    let total = lumpSum + contrib;

    if (adjustForInflation) {
      const inflationRate = 0.02;
      total = total / Math.pow(1 + inflationRate, t);
    }

    let contributionLimit = 7000;
    if (accountType === 'RRSP') {
      const incomeNum = parseFloat(income) || 0;
      contributionLimit = Math.min(incomeNum * 0.18, 32490);
    }

    const warning = (P + m * t * 12 > contributionLimit)
      ? `Note: Your total contribution exceeds the 2025 ${accountType} limit of $${contributionLimit.toLocaleString()} CAD.`
      : '';

    const fullResult = `Future Value: $${total.toFixed(2)} CAD. ${warning}`;
    setResult(fullResult);
    setSummary(fullResult);

    const labels = [];
    const dataPoints = [];
    for (let year = 1; year <= t; year++) {
      const futureValue = (P * Math.pow(1 + r / n, n * year)) +
        (m * ((Math.pow(1 + r / n, n * year) - 1) / (r / n)));
      const adjusted = adjustForInflation
        ? futureValue / Math.pow(1 + 0.02, year)
        : futureValue;
      labels.push(`Year ${year}`);
      dataPoints.push(adjusted.toFixed(2));
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

  const handleEmailReport = async () => {
    await fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientName, summary })
    });
  };

  return (
    <div className="bg-white p-6 max-w-xl mx-auto rounded-xs shadow" ref={chartRef}>
      <h2 className="text-2xl font-bold text-center mb-4">Canadian Investment Planning Calculator</h2>

      <label className="block mb-2">Prepared For:
        <input
          type="text"
          value={clientName}
          onChange={e => setClientName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </label>

      <label className="block mb-2">Account Type:
        <select value={accountType} onChange={e => setAccountType(e.target.value)} className="w-full p-2 border rounded">
          <option value="RRSP">RRSP</option>
          <option value="TFSA">TFSA</option>
        </select>
      </label>

      {accountType === 'RRSP' && (
        <label className="block mb-2">Annual Income (CAD):
          <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="w-full p-2 border rounded" />
        </label>
      )}

      <label className="block mb-2">Initial Investment (CAD):
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">Monthly Contribution (CAD):
        <input type="number" value={monthly} onChange={e => setMonthly(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">Annual Interest Rate (%):
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">Years to Grow:
        <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">Your Current Age:
        <input type="number" value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-2">Planned Retirement Age:
        <input type="number" value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className="w-full p-2 border rounded" />
      </label>

      <label className="block mb-4">
        <input type="checkbox" checked={adjustForInflation} onChange={e => setAdjustForInflation(e.target.checked)} className="mr-2" />
        Adjust for Inflation
      </label>

      <button onClick={calculate} className="btn">Calculate <FaCalculator /></button>

      {result && <p className="mt-4 text-center">{result}</p>}

      {chartData && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center">Projected Growth Over Time</h3>
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: context => {
                    const value = typeof context.raw === 'number' ? context.raw : parseFloat(String(context.raw));
                    return `$${value.toLocaleString()}`;
                  }
                }
              }
            }
          }} />
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <button onClick={() => exportCSV(chartData)}><FaFileCsv /> CSV</button>
        <button onClick={() => exportPDF(chartRef, clientName)}><FaFilePdf /> PDF</button>
        <button onClick={handlePrint}><FaPrint /> Print</button>
        <button onClick={handleEmailReport}><FaEnvelope /> Email</button>
      </div>
    </div>
  );
};

export default FinancialCalculator;
