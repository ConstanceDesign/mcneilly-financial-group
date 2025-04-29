import React from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import 'index.css';
import FinancialCalculator from '../components/FinancialCalculator';

const Home: React.FC = () => {
  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Include Navbar */}
      
      {/* Hero Section */}
      <section className="relative w-full h-96 bg-cover bg-center" style={{ backgroundImage: 'url(/images/hero-image.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text contrast */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Patrick McNeilly Financial Planning</h1>
          <p className="text-xl mb-6">
            Secure your future with expert financial guidance. We offer comprehensive solutions for individuals and businesses.
          </p>
          <button 
            onClick={handleContactClick} 
            className="bg-green-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-800 transition duration-300"
          >
            Get Started Today
          </button>
        </div>
      </section>

      <main className="flex-1 px-4 py-6">
        <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-xl text-center mb-6">
          At Patrick McNeilly Financial Planning, we specialize in helping you make informed decisions about your financial future. Our team of experienced advisors is here to guide you through:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-lg text-gray-800">
          <li>Retirement Planning: Ensure a comfortable future with smart savings and investment strategies.</li>
          <li>Estate Planning: Safeguard your legacy and provide for loved ones with a clear plan for your assets.</li>
          <li>Tax Planning: Minimize tax burdens and maximize your returns with tailored strategies.</li>
          <li>Investments: Diversify your portfolio and build wealth through strategic investments.</li>
          <li>Life Insurance: Protect your family’s financial security in the event of unexpected circumstances.</li>
          <li>Disability Insurance: Gain peace of mind with coverage that supports you in times of health challenges.</li>
          <li>Education Savings Planning: Plan ahead for your children’s education and reduce future financial stress.</li>
        </ul>

        <p className="text-xl text-center mt-6 mb-8">
          Our services are designed to align with your goals, whether you’re planning for retirement, securing your family’s future, or growing your business. Let us help you build a strong financial foundation today!
        </p>

        <div className="flex justify-center mb-12">
          <button 
            onClick={handleContactClick} 
            className="bg-green-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-800 transition duration-300"
          >
            Speak With an Advisor
          </button>
        </div>

        <h2 className="text-3xl font-bold text-center mb-4">Try Our Financial Calculator</h2>
        <p className="text-xl text-center mb-6">
          Take control of your financial planning by exploring our interactive financial calculator. Whether you're estimating your retirement savings or calculating your life insurance needs, this tool will help you make informed decisions with confidence.
        </p>
        <FinancialCalculator /> {/* Include financial calculator */}

        <p className="text-xl text-center mt-6">Contact our offices to learn more and get personalized advice.</p>

        <div className="flex justify-center mt-6">
          <button 
            onClick={handleContactClick} 
            className="bg-green-600 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-800 transition duration-300"
          >
            Contact Us Now
          </button>
        </div>
      </main>

      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default Home;