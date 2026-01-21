import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
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
  FaArrowRight,
} from 'react-icons/fa';
import heroImage from '../images/home-hero.jpg';

// ✅ Lazy-load to avoid “calculator missing” at build or hydration time
const FinancialCalculator = React.lazy(() => import('../components/FinancialCalculator'));

const Home: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  // ✅ Desktop-only parallax offset (respects reduced motion)
  const [heroOffset, setHeroOffset] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;

    if (prefersReducedMotion || !isDesktop) return;

    const onScroll = () => setHeroOffset(window.scrollY * 0.12);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleContactClick = () => {
    window.location.href = '/contact';
  };

  const services = useMemo(
    () => [
      { title: 'Retirement Planning', icon: <FaPiggyBank />, desc: 'Smart strategies to ensure a comfortable future.' },
      { title: 'Education Savings', icon: <FaGraduationCap />, desc: 'Plan for your child’s future education.' },
      { title: 'Estate Planning', icon: <FaFileAlt />, desc: 'Safeguard your legacy with a clear plan.' },
      { title: 'Tax Planning', icon: <FaFileInvoiceDollar />, desc: 'Minimize burdens and maximize returns.' },
      { title: 'Investments', icon: <FaChartLine />, desc: 'Diversify your portfolio and grow wealth.' },
      { title: 'Life Insurance', icon: <FaHeartbeat />, desc: 'Protect your family’s financial future.' },
      { title: 'Health Insurance', icon: <FaHeartbeat />, desc: 'Peace of mind for unexpected health challenges.' },
      { title: 'Disability Insurance', icon: <FaWheelchair />, desc: 'Support and protection in case of injury or illness.' },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col text-[#333] font-sans">
      {/* HERO */}
      <section
        aria-label="Parallax hero"
        className="relative w-full h-[55rem] overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Background base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f5028] to-[#1f7a45]" aria-hidden="true" />

        {/* ✅ Image w/ desktop parallax (mobile-safe positioning so sailboat doesn't disappear) */}
        <img
          src={heroImage}
          alt="Sailboat at sunrise on calm water"
          className="
            absolute inset-0 w-full h-full object-cover
            object-right
            md:object-[60%_center]
            opacity-80
            will-change-transform
          "
          style={{
            transform: `translateY(${heroOffset}px) scale(1.06)`,
          }}
          loading="eager"
          fetchPriority="high"
        />

        {/* ✅ Legibility gradient (lighter than before, not gloomy) */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/5"
          aria-hidden="true"
        />

        {/* ✅ Warm wash + subtle “sun” lift */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-amber-200/20 via-transparent to-emerald-900/10 mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Subtle highlight halo behind copy */}
        <div
          className="absolute left-0 top-0 h-full w-[65%] bg-gradient-to-r from-white/10 via-white/0 to-transparent"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="text-white md:max-w-3xl">
            {/* ✅ Headline: sans-serif + stronger hierarchy */}
            <h1 className="font-sans text-[2.5rem] leading-[1.05] md:text-6xl md:leading-[1.05] font-extrabold drop-shadow-sm">
              <span className="block tracking-wide">Plan smarter.</span>
              <span className="block mt-2">Secure your future.</span>
              <span className="block mt-2">Grow with confidence.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl/relaxed max-w-2xl tracking-wide text-white/95">
              McNeilly Financial Group delivers trusted financial advice and comprehensive wealth strategies for
              individuals, families, and business owners across Canada. With disciplined planning and personalized
              guidance, we help you build, protect, and grow your wealth.
            </p>

            {/* Mini proof points (premium / not boring) */}
            <div className="mt-5 flex flex-wrap gap-2">
              {['Regulated advice', 'Personalized planning', 'Canada-wide support'].map((pill) => (
                <span
                  key={pill}
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white/95 backdrop-blur"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleContactClick}
                className="
                  group flex items-center justify-center gap-2
                  bg-[#4b9328] hover:bg-[#8cbe3f]
                  text-white tracking-wide px-4 py-3
                  rounded-xs font-bold text-base shadow-sm
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                  duration-300 hover:scale-[1.03]
                "
                aria-label="Schedule a free consultation"
              >
                <FaComments size={20} aria-hidden="true" />
                <span className="tracking-wide text-[1.05rem] uppercase">Free Consultation</span>
                <FaArrowRight
                  className="ml-1 opacity-80 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </button>

              <a
                href="#calculator"
                className="
                  group flex items-center justify-center gap-2
                  bg-white/10 hover:bg-white/20
                  text-white backdrop-blur px-4 py-3 rounded-xs
                  tracking-wide font-bold text-base border border-white/25
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                  duration-300 hover:scale-[1.03]
                "
                aria-label="Try our registered investment calculator"
              >
                <FaCalculator size={16} aria-hidden="true" />
                <span className="tracking-wide text-[1.05rem] uppercase">Investment Calculator</span>
                <FaArrowRight
                  className="ml-1 opacity-80 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES + CALCULATOR */}
      <section className="py-16 px-4 bg-[#f8f9f7]" aria-label="Our services and financial tools">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          {/* Services */}
          <div>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold mb-2 font-serif text-[#0f5028]">Our Services</h2>
                <p className="text-lg max-w-prose text-[#333]">
                  Tailored planning and transparent advice to help you build, protect, and grow with confidence.
                </p>
              </div>

              {/* Optional small CTA (no layout shift on mobile) */}
              <a
                href="/contact"
                className="hidden sm:inline-flex items-center gap-2 text-[#0f5028] font-semibold hover:underline"
                aria-label="Contact us about services"
              >
                Talk to an advisor <FaArrowRight aria-hidden="true" />
              </a>
            </div>

            {/* ✅ Premium cards: gradient, border, focus ring, subtle hover lift */}
            <div className="grid sm:grid-cols-2 gap-6 pt-8" role="list" aria-label="Financial planning services">
              {services.map((service) => (
                <div
                  key={service.title}
                  className="
                    group relative overflow-hidden
                    rounded-xs border border-[#cfe0b9]
                    bg-gradient-to-b from-[#e6f3d3] to-[#dceec3]
                    p-5 shadow-sm
                    transition
                    hover:shadow-lg hover:-translate-y-0.5
                    focus-within:ring-2 focus-within:ring-[#8cbe3f]
                  "
                  role="listitem"
                >
                  {/* Decorative corner highlight */}
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/35 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="
                        inline-flex items-center justify-center
                        h-10 w-10 rounded-lg bg-white/55
                        text-[#1f7a45] text-xl shadow-sm
                      "
                      aria-hidden="true"
                    >
                      {service.icon}
                    </span>
                    <h3 className="text-lg font-semibold text-[#0f5028]">{service.title}</h3>
                  </div>

                  <p className="text-[#0f5028] font-normal leading-relaxed">{service.desc}</p>

                  {/* Subtle “learn more” affordance (no actual link change) */}
                  <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0f5028]/90">
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity">Learn more</span>
                    <FaArrowRight
                      className="opacity-70 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <div id="calculator" ref={printRef} aria-label="Financial calculator">
            <h2 className="text-3xl font-bold mb-2 font-serif text-[#0f5028]">Financial Calculator</h2>
            <p className="text-lg pb-8 max-w-prose text-[#333]">
              Project your savings and investments over time. Adjust contributions, rates, and inflation to compare outcomes.
            </p>

            {/* ✅ Frame the calculator so it feels like a “tool card” */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5">
              <Suspense
                fallback={
                  <div className="p-6">
                    <p className="animate-pulse text-gray-600">Loading calculator…</p>
                  </div>
                }
              >
                <FinancialCalculator />
              </Suspense>
            </div>

            {/* Helpful microcopy (SEO + trust, still light) */}
            <p className="mt-4 text-sm text-[#333]/80 leading-relaxed">
              Estimates are for illustration only and may not reflect actual results. For a personalized plan, request a free consultation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;