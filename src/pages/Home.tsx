import React, { useRef } from 'react';
import FinancialCalculator from '../components/FinancialCalculator';
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

  const services = [
    { title: "Retirement Planning", icon: <FaPiggyBank />, desc: "Smart strategies to ensure a comfortable future." },
    { title: "Education Savings", icon: <FaGraduationCap />, desc: "Plan for your child’s future education." },
    { title: "Estate Planning", icon: <FaFileAlt />, desc: "Safeguard your legacy with a clear plan." },
    { title: "Tax Planning", icon: <FaFileInvoiceDollar />, desc: "Minimize burdens and maximize returns." },
    { title: "Investments", icon: <FaChartLine />, desc: "Diversify your portfolio and grow wealth." },
    { title: "Life Insurance", icon: <FaHeartbeat />, desc: "Protect your family’s financial future." },
    { title: "Health Insurance", icon: <FaHeartbeat />, desc: "Peace of mind for unexpected health challenges." },
    { title: "Disability Insurance", icon: <FaWheelchair />, desc: "Support and protection in case of injury or illness." },
  ];

  return (
    <div className="min-h-screen flex flex-col text-[#333] font-sans">
      {/* Hero Section */}
      <section
        aria-label="Parallax hero"
        className="relative w-full h-[45rem] bg-gradient-to-br from-primary to-[#1f7a45] overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-35 z-0"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative z-10 flex flex-col justify-center h-full text-white px-6 max-w-6xl mx-auto text-center md:text-left md:items-start">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight max-w-4xl">
            Welcome to McNeilly Financial Group
          </h1>
          <p className="text-lg md:text-xl mb-2 max-w-2xl">
            Comprehensive solutions for individuals and businesses.
          </p>
          <p className="text-lg md:text-xl max-w-2xl">
            Secure your future with expert financial guidance.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        aria-label="Call to action"
        className="bg-[#c2e1a1] text-[#333] text-center py-10 shadow-inner"
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-3">
          Start Planning Your Financial Future Today
        </h2>
        <button
          onClick={handleContactClick}
          aria-label="Schedule a free consultation"
          className="bg-[#4b9328] text-white py-3 px-6 rounded-lg text-lg font-semibold transition hover:bg-[#3a7422]"
        >
          Get Started with a Free Consultation
        </button>
      </section>

      {/* Services + Calculator Section */}
      <section className="py-20 px-4 bg-[#f8f9f7]" aria-label="Our services and financial tools">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Services List */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-lg pb-5">
              At McNeilly Financial Group, we specialize in helping you make informed decisions about your financial future.
            </p>
            <div className="grid sm:grid-cols-2 gap-6" role="list">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white shadow-sm rounded-md p-5 flex flex-col hover:shadow-lg transition"
                  role="listitem"
                >
                  <div className="flex items-center text-[#1f7a45] text-xl font-semibold mb-2">
                    <span className="mr-2 text-2xl" aria-hidden="true">
                      {service.icon}
                    </span>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div ref={printRef}>
            <FinancialCalculator />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;