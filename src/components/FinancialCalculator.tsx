import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import PrintButton from './PrintButton';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FinancialCalculator: React.FC = () => {
  const [accountType, setAccountType] = useState<string>('TFSA');
  const [income, setIncome] = useState<string>('');
  const [principal, setPrincipal] = useState<string>('');
  const [monthly, setMonthly] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('');
  const [currentAge, setCurrentAge] = useState<string>('');
  const [adjustForInflation, setAdjustForInflation] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any>(null);

  // Corrected useRef with HTMLDivElement and initial value set to null
  const printRef = useRef<HTMLDivElement | null>(null);

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

    let contributionLimit = 7000; // TFSA default
    if (accountType === 'RRSP') {
      const incomeNum = parseFloat(income) || 0;
      contributionLimit = Math.min(incomeNum * 0.18, 32490);
    }

    const warning = (P + m * t * 12 > contributionLimit)
      ? `Note: Your total contribution exceeds the 2025 ${accountType} limit of $${contributionLimit.toLocaleString()} CAD.`
      : '';

    setResult(`Future Value: $${total.toFixed(2)} CAD. ${warning}`);

    // Create chart data over time
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
        backgroundColor: '#b47171',
        borderColor: '#b47171'
      }]
    });
  };

  return (
    <div className="bg-white p-6 max-w-lg mx-auto rounded-lg shadow-lg">
      <div ref={printRef}>
        <img src="/advisor-logo.png" alt="Advisor Logo" className="w-36 mb-6" />

        <h2 className="text-2xl font-bold text-center mb-4">Canadian Investment Calculator</h2>

        <label className="block mb-2">
          Account Type:
          <select 
            value={accountType} 
            onChange={e => setAccountType(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="TFSA">TFSA</option>
            <option value="RRSP">RRSP</option>
          </select>
        </label>

        {accountType === 'RRSP' && (
          <label className="block mb-2">
            Annual Income (CAD):
            <input 
              type="number" 
              value={income} 
              onChange={e => setIncome(e.target.value)} 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </label>
        )}

        <label className="block mb-2">
          Initial Investment (CAD):
          <input 
            type="number" 
            value={principal} 
            onChange={e => setPrincipal(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Monthly Contribution (CAD):
          <input 
            type="number" 
            value={monthly} 
            onChange={e => setMonthly(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Annual Interest Rate (%):
          <input 
            type="number" 
            value={rate} 
            onChange={e => setRate(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Years to Grow:
          <input 
            type="number" 
            value={years} 
            onChange={e => setYears(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Your Current Age:
          <input 
            type="number" 
            value={currentAge} 
            onChange={e => setCurrentAge(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-2">
          Planned Retirement Age:
          <input 
            type="number" 
            value={retirementAge} 
            onChange={e => setRetirementAge(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>

        <label className="block mb-4">
          Adjust for Inflation:
          <input 
            type="checkbox" 
            checked={adjustForInflation} 
            onChange={e => setAdjustForInflation(e.target.checked)} 
            className="mr-2"
          />
        </label>

        <button 
          onClick={calculate} 
          className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-800 transition duration-300"
        >
          Calculate
        </button>

        {result && <p className="mt-4 text-center">{result}</p>}

        {chartData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center">Projected Growth Over Time</h3>
            <Line data={chartData} />
          </div>
        )}
      </div>

      <PrintButton targetRef={printRef} />
    </div>
  );
};

export default FinancialCalculator;