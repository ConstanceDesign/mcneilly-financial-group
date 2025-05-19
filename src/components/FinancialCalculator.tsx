import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import PrintButton from './PrintButton';
import { FaCalculator } from 'react-icons/fa';

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
    <div className="bg-white p-6 max-w-xs mx-auto rounded-xs shadow">
      <div ref={printRef}>
        {/* <img src="/advisor-logo.png" alt="Advisor Logo" className="w-36 mb-6" /> */}

        <h2 className="text-2xl font-bold text-center mb-4">Canadian Investment Planning Calculator</h2>
        <p className="text-md mt-6 text-center md:text-left">
                Estimate retirement / life insurance
              </p>

        <label className="block mb-2">
          Account Type:
          <select 
            value={accountType} 
            onChange={e => setAccountType(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="RRSP">RRSP</option>
            <option value="TFSA">TFSA</option>
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


{/* Calculate Button */}
<button
  onClick={calculate}
  aria-label="Calculate"
  className="relative flex-1 xl:w-full group overflow-hidden px-6 py-5 rounded-xs text-lg text-[#333] font-bold tracking-wide flex justify-between items-center transition-all duration-300 hover:bg-[#62a342] hover:text-white shadow"
>
  <span className="absolute inset-0 w-full h-full bg-[#c2e1a1] transition-transform duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></span>
  <span className="relative z-10 flex items-center justify-between w-full">
    <span>Calculate</span>
    <FaCalculator className="text-xl ml-3" />
  </span>
</button>

        {result && <p className="mt-4 text-center">{result}</p>}

        {chartData && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-center">Projected Growth Over Time</h3>
            <Line data={chartData} />
          </div>
        )}
      </div>

      {/* <PrintButton targetRef={printRef as React.RefObject<HTMLDivElement>} /> */}
    </div>
  );
};

export default FinancialCalculator;