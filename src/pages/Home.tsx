import React from 'react';
import FinancialCalculator from '../components/FinancialCalculator';
import heroImage from '../images/home-hero.jpg';

const Home: React.FC = () => {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[32rem] bg-cover bg-cente bg-gradient-to-br from-primary to-[#1f7a45]">
      <img
          src={heroImage}
          alt="Investing for the future"
          className="h-full w-full object-cover opacity-35 absolute inset-0 z-0"
        />
        {/* <div className="absolute inset-0 bg-black/60" /> */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Welcome to McNeilly Financial Group
          </h1>
          <span className="text-lg md:text-xl mb-6 max-w-2xl">
            Secure your future with expert financial guidance.
            <span className="text-lg md:text-xl mb-6 max-w-2xl"> We offer comprehensive solutions for individuals and businesses.</span>
          </span>
          <button
            onClick={handleContactClick}
            className="btn btn-success text-white py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          <span className="text-xl text-center mb-12 text-gray-700 max-w-3xl mx-auto">
            At Patrick McNeilly Financial Planning, we specialize in helping you make informed decisions about your financial future.
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Retirement Planning", desc: "Smart strategies to ensure a comfortable future." },
              { title: "Estate Planning", desc: "Safeguard your legacy with a clear plan." },
              { title: "Tax Planning", desc: "Minimize burdens and maximize returns." },
              { title: "Investments", desc: "Diversify your portfolio and grow wealth." },
              { title: "Life Insurance", desc: "Protect your family’s financial future." },
              { title: "Disability Insurance", desc: "Peace of mind for unexpected health challenges." },
              { title: "Education Savings", desc: "Plan for your child’s future education." },
            ].map((service, index) => (
              <div key={index} className="card bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <span className="text-gray-700">{service.desc}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={handleContactClick}
              className="btn btn-success text-white py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md"
            >
              Speak With an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Try Our Financial Calculator</h2>
          <span className="text-lg text-gray-700 mb-8">
            Estimate your retirement savings or life insurance needs — take control of your financial planning.
          </span>
          <FinancialCalculator />
          <span className="text-lg mt-6 text-gray-700">Contact our office to get personalized advice today.</span>
          <div className="mt-6">
            <button
              onClick={handleContactClick}
              className="btn btn-success text-white py-3 px-6 rounded-lg text-lg transition duration-300 shadow-md"
            >
              Contact Us Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;