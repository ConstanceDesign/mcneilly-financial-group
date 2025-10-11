import React, { useRef, Suspense } from 'react';
import {
  FaPiggyBank,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaChartLine,
  FaHeartbeat,
  FaWheelchair,
  FaGraduationCap,
  FaComments,
  FaCalculator,
} from 'react-icons/fa';
import heroImage from '../images/home-hero.jpg';

// ✅ Lazy-load to avoid “calculator missing” at build or hydration time
const FinancialCalculator = React.lazy(() => import('../components/FinancialCalculator'));

const Home: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const services = [
    { title: 'Retirement Planning', icon: <FaPiggyBank />, desc: 'Smart strategies to ensure a comfortable future.' },
    { title: 'Education Savings', icon: <FaGraduationCap />, desc: 'Plan for your child’s future education.' },
    { title: 'Estate Planning', icon: <FaFileAlt />, desc: 'Safeguard your legacy with a clear plan.' },
    { title: 'Tax Planning', icon: <FaFileInvoiceDollar />, desc: 'Minimize burdens and maximize returns.' },
    { title: 'Investments', icon: <FaChartLine />, desc: 'Diversify your portfolio and grow wealth.' },
    { title: 'Life Insurance', icon: <FaHeartbeat />, desc: 'Protect your family’s financial future.' },
    { title: 'Health Insurance', icon: <FaHeartbeat />, desc: 'Peace of mind for unexpected health challenges.' },
    { title: 'Disability Insurance', icon: <FaWheelchair />, desc: 'Support and protection in case of injury or illness.' },
  ];

  return (
    <div className="min-h-screen flex flex-col text-[#333] font-sans">
      {/* HERO */}
      <section
        aria-label="Parallax hero"
        className="relative w-full h-[55rem] bg-gradient-to-br from-primary to-[#1f7a45] overflow-hidden"
      >
        {/* Image */}
        <img
          src={heroImage}
          alt="Sailboat at sunrise on calm water"
          className="absolute inset-0 w-full h-full object-cover object-left md:object-[20%_center] opacity-50"
          loading="eager"
          fetchPriority="high"
        />
        {/* Vignette & left-to-right gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="text-white md:max-w-3xl">
            <h1 className="font-serif text-[2.4rem] leading-tight md:text-6xl md:leading-[1.1] font-bold drop-shadow-sm">
              <span className="block tracking-wide">Plan smarter. </span>
              
              <span className="block mt-1">Secure your future.</span>
              <span className="block mt-1">Grow with confidence.</span>
            </h1>

            <p className="mt-5 text-lg md:text-xl/relaxed max-w-2xl tracking-wide">
            McNeilly Financial Group delivers trusted financial advice and comprehensive wealth strategies for individuals, families, and business owners across Canada. With disciplined planning and personalized guidance, we help you build, protect, and grow your wealth. Our regulated advisors provide investment, retirement, insurance, and business succession solutions backed by experience and results.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleContactClick}
                className="flex items-center justify-center gap-2 bg-[#4b9328] hover:bg-[#8cbe3f] text-white hover:text-white tracking-wide px-3 py-2 rounded-xs font-bold text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-300 hover:scale-105"
                aria-label="Schedule a free consultation"
              ><FaComments size={20} />
               <span className="tracking-wide text-[1.10rem] uppercase">Free Consultation</span>
              </button>

              <a
                href="#calculator"
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur px-3 py-2 rounded-xs tracking-wide font-bold text-base border border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-300 hover:scale-105"
              aria-label="Try our registered investment calculator"
              ><FaCalculator size={16} />
               <span className="tracking-wide text-[1.10rem] uppercase">Registered Investment Calculator</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES + CALCULATOR */}
      <section
        className="py-15 px-4 bg-[#f8f9f7]"
        aria-label="Our services and financial tools"
      >
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Services */}
          <div>
            <h2 className="text-3xl font-bold mb-4 font-serif">Our Services</h2>
            <p className="text-lg pb-10 max-w-prose">
              At McNeilly Financial Group, we help you make informed decisions about your financial future with tailored planning and transparent advice.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pb-5" role="list">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-[#dceec3] shadow-sm rounded-xs p-5 flex flex-col hover:shadow-lg transition"
                  role="listitem"
                >
                  <div className="flex items-center text-[#1f7a45] text-xl font-semibold mb-2">
                    <span className="mr-2 text-2xl" aria-hidden="true">
                      {service.icon}
                    </span>
                    <h3 className="text-lg font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-[#0f5028] font-normal">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div id="calculator" ref={printRef} aria-label="Financial calculator">
            <h2 className="text-3xl font-bold mb-4 font-serif">Financial Calculator</h2>
            <p className="text-lg pb-10 max-w-prose">
              Project your savings and investments over time. Adjust contributions, rates, and inflation to compare outcomes.
            </p>

            <Suspense
              fallback={
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <p className="animate-pulse text-gray-600">
                    Loading calculator…
                  </p>
                </div>
              }
            >
              <FinancialCalculator />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;