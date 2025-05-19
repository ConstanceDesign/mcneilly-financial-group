import React, { useRef } from 'react';
import FinancialCalculator from '../components/FinancialCalculator';
import PrintButton from '../components/PrintButton';
import {
  FaPiggyBank,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaHeartbeat,
  FaWheelchair,
  FaGraduationCap,
  FaStethoscope,
} from 'react-icons/fa';
import heroImage from '../images/home-hero.jpg';

const Home: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Parallax */}
      <section className="relative w-full h-[55rem] bg-gradient-to-br from-primary to-[#1f7a45] overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-35 z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 flex flex-col justify-center h-full text-white px-6 max-w-6xl mx-auto md:flex-row md:items-center md:space-x-12">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Welcome to McNeilly Financial Group
            </h1>
            <p className="text-lg md:text-xl mb-1 max-w-2xl">
            Comprehensive solutions for individuals and businesses.
            </p>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Secure your future with expert financial guidance.
            </p>
          </div>
          <div className="md:w-1/3 text-center md:text-left">
            <button
              onClick={handleContactClick}
              className="btn btn-success text-white py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md hover:scale-105"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Services + Calculator Layout */}
      <section className="py-16 px-4">
        <div className="max-w-10xl mx-auto grid md:grid-cols-2 gap-15 items-start">
          {/* Services */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-[#333] text-lg pb-5">
              At McNeilly Financial Group, we specialize in helping you make informed decisions about your financial future. These are some of the many services we have available:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: "Retirement Planning", icon: <FaPiggyBank />, desc: "Smart strategies to ensure a comfortable future." },
                { title: "Education Savings", icon: <FaGraduationCap />, desc: "Plan for your child’s future education." },
                { title: "Estate Planning", icon: <FaFileAlt />, desc: "Safeguard your legacy with a clear plan." },
                { title: "Tax Planning", icon: <FaFileInvoiceDollar />, desc: "Minimize burdens and maximize returns." },
                { title: "Investments", icon: <FaChartLine />, desc: "Diversify your portfolio and grow wealth." },
                { title: "Life Insurance", icon: <FaHeartbeat />, desc: "Protect your family’s financial future." },
                { title: "Health Insurance", icon: <FaStethoscope />, desc: "Peace of mind for unexpected health challenges." },
                { title: "Disability Insurance", icon: <FaWheelchair />, desc: "Peace of mind for unexpected health challenges." },
              ].map((service, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xs p-6 hover:shadow-lg transition group"
                >
 <div className="flex items-center gap-2 text-2xl">
                {service.icon} 
                </div>
                <h2 className="text-2xl font-semibold">{service.title}</h2>
                <p className="text-gray-700">{service.desc}</p>
              </div>
                  ))}
                  </div>
                </div>


          {/* Calculator */}
            <div ref={printRef}>
              <FinancialCalculator />
            </div>
            <div className="mt-6 text-center md:text-left">
            {/* </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;