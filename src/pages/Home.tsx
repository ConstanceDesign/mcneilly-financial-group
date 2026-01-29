import React, { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  FaCheckCircle,
} from 'react-icons/fa';
import heroImage from '../images/home-hero.jpg';

import Reveal from '../components/motion/Reveal';

const FinancialCalculator = React.lazy(() => import('../components/FinancialCalculator'));

const Home: React.FC = () => {
  const navigate = useNavigate();

  // NOTE: This ref is intentionally kept here because many export implementations
  // use a stable "report" ref for Print/PDF capture.
  const printRef = useRef<HTMLDivElement>(null);

  const [heroOffset, setHeroOffset] = useState(0);

  const handleContactClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (prefersReducedMotion || !isDesktop) return;

    const onScroll = () => setHeroOffset(window.scrollY * 0.12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const services = useMemo(
    () => [
      {
        title: 'Retirement Planning',
        icon: <FaPiggyBank />,
        desc: 'Disciplined strategies built around your goals and timeline.',
      },
      {
        title: 'Education Savings',
        icon: <FaGraduationCap />,
        desc: 'Practical RESP planning to support your child’s future.',
      },
      {
        title: 'Estate Planning',
        icon: <FaFileAlt />,
        desc: 'Clear, coordinated planning to protect your legacy.',
      },
      {
        title: 'Tax Planning',
        icon: <FaFileInvoiceDollar />,
        desc: 'Smarter structure to reduce drag and keep more of what you earn.',
      },
      {
        title: 'Investments',
        icon: <FaChartLine />,
        desc: 'Diversification and guidance aligned to risk and purpose.',
      },
      {
        title: 'Life Insurance',
        icon: <FaHeartbeat />,
        desc: 'Coverage designed to protect family, lifestyle, and obligations.',
      },
      {
        title: 'Health Insurance',
        icon: <FaHeartbeat />,
        desc: 'Support for unexpected health costs and real-world disruptions.',
      },
      {
        title: 'Disability Insurance',
        icon: <FaWheelchair />,
        desc: 'Income protection if injury or illness interrupts work.',
      },
    ],
    []
  );

  return (
    <div className="min-h-screen flex flex-col text-[#333] font-sans">

{/* HERO */}
<section
  aria-label="McNeilly Financial Group homepage hero"
  className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
>
  {/* Image + overlays */}
  <div
    className="
      relative
      min-h-[100svh]
      sm:min-h-0
      sm:h-[calc(100vh-92px)]
      sm:max-h-[860px]
      sm:min-h-[620px]
    "
  >
    <img
      src={heroImage}
      alt="Sailboat at sunrise on calm water"
      className="
        absolute inset-0 h-full w-full object-cover
        [object-position:68%_56%]
        sm:[object-position:63%_54%]
        lg:[object-position:58%_52%]
        xl:[object-position:55%_52%]
      "
      style={{
        transform: `translateY(${heroOffset}px) scale(1.06)`,
      }}
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />

    {/* Editorial wash */}
    <div
      aria-hidden="true"
      className="
        absolute inset-0
        bg-[linear-gradient(90deg,rgba(244,242,236,0.94),rgba(244,242,236,0.82),rgba(15,80,40,0.14))]
      "
    />

    {/* Right-edge stabilizer */}
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(0,0,0,0.10),transparent_55%)]"
    />

    {/* Content */}
    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
      <div className="h-full flex items-center">
        <div className="w-full max-w-2xl">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#0f5028]">
            <span className="block sm:inline">Financial Planning</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">Wealth Strategies</span>
            <span className="hidden sm:inline"> • </span>
            <span className="block sm:inline">Protection</span>
          </p>

          <h1 className="mt-3 font-sans text-[2.05rem] sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#102019]">
            Plan with clarity.
            <br />
            Protect what matters.
            <br />
            Grow with confidence.
          </h1>

          <p className="mt-4 text-[16px] sm:text-[16px] text-[#1f2937]/80 leading-relaxed">
            Trusted guidance for individuals, families, and business owners across Canada—built on clear strategy, practical protection,
            and long-term discipline.
          </p>

          <div className="mt-10 sm:mt-6 grid grid-cols-1 sm:flex sm:flex-wrap gap-3">
            <button
              type="button"
              onClick={handleContactClick}
              className="
                inline-flex items-center justify-center gap-2
                px-5 py-3.5 rounded-xs
                bg-[#2f7a2e] hover:bg-[#3a8b34]
                text-white font-bold uppercase tracking-wide
                shadow-sm hover:shadow-md
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30
              "
              aria-label="Schedule a free consultation"
            >
              <FaComments aria-hidden="true" />
              Free Consultation
            </button>

            <a
              href="#calculator"
              className="
                inline-flex items-center justify-center gap-2
                px-5 py-3.5 rounded-xs
                bg-white/40 hover:bg-white/50
                backdrop-blur-sm
                border border-white/70
                text-[#102019] font-extrabold uppercase tracking-wide
                whitespace-nowrap sm:whitespace-normal
                shadow-sm hover:shadow-md
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30
              "
              aria-label="Jump to the investment calculator"
            >
              <FaCalculator aria-hidden="true" />
              Investment Calculator
            </a>
          </div>

          <ul
            className="
              mt-6
              flex flex-col gap-2
              text-[15px] sm:text-sm font-semibold text-[#102019]/80
              sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2
              lg:flex-nowrap lg:gap-x-8 lg:whitespace-nowrap
            "
            aria-label="Service highlights"
          >
            <li className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#2f7a2e]" aria-hidden="true" />
              Clear, documented planning
            </li>
            <li className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#2f7a2e]" aria-hidden="true" />
              Canada-wide support
            </li>
            <li className="inline-flex items-center gap-2">
              <FaCheckCircle className="text-[#2f7a2e]" aria-hidden="true" />
              Regulated, transparent guidance
            </li>
          </ul>

          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:inline-flex focus:mt-4 focus:bg-white/80 focus:px-3 focus:py-2 focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0f5028]/30"
          >
            Skip to main content
          </a>
        </div>
      </div>
    </div>

    {/* Soft fade into page background (nice “landing screen” finish) */}
    {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-[linear-gradient(to_bottom,rgba(244,242,236,0),rgba(244,242,236,1))]" /> */}
  </div>
</section>

      {/* SERVICES + CALCULATOR */}
      <main id="main-content">
        <section className="py-16 px-4 bg-[#f4f2ec]" aria-label="Our services and financial tools">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            {/* Services */}
            <div className="relative" aria-label="Financial planning services">

              <Reveal>
                <div className="flex items-end justify-between gap-4 relative">
                  <div>
                    <h2 className="text-3xl font-bold mb-2 font-serif text-[#0f5028]">Our Services</h2>
                    <p className="text-lg max-w-prose text-[#333]">
                      Practical, well-structured guidance—built around your goals, your family, and your timeline.
                    </p>
                  </div>

    
                </div>
              </Reveal>

              <div className="grid sm:grid-cols-2 gap-6 pt-8" role="list" aria-label="Service list">
                {services.map((service) => {
                  const base = service.title.replace(/\s+/g, '-').toLowerCase();
                  const titleId = `${base}-title`;
                  const descId = `${base}-desc`;

                  return (
                    <Reveal key={service.title} delay={0.05}>
                      <article
                        className="
                          group relative overflow-hidden
                          rounded-xs border border-[#cfe0b9]
                          bg-[linear-gradient(180deg,#e9f5d9_0%,#dceec3_100%)]
                          p-5 shadow-sm
                          transition
                          hover:shadow-lg hover:-translate-y-0.5
                          focus-within:ring-2 focus-within:ring-[#8cbe3f]
                        "
                        role="listitem"
                        aria-labelledby={titleId}
                        aria-describedby={descId}
                      >
                        <div
                          className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/32 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />

                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="
                              inline-flex items-center justify-center
                              h-10 w-10 rounded-lg bg-white/60
                              text-[#1f7a45] text-xl shadow-sm
                            "
                            aria-hidden="true"
                          >
                            {service.icon}
                          </span>
                          <h3 id={titleId} className="text-lg font-semibold text-[#0f5028]">
                            {service.title}
                          </h3>
                        </div>

                        <p id={descId} className="text-[#0f5028] font-normal leading-relaxed">
                          {service.desc}
                        </p>

                        <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0f5028]/90">
                          <span className="opacity-80 group-hover:opacity-100 transition-opacity">Learn more</span>
                          <FaArrowRight className="opacity-70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Calculator */}
            <Reveal>
              <div id="calculator" aria-label="Investment calculator" ref={printRef}>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5">
                  <Suspense
                    fallback={
                      <div className="p-6" aria-live="polite" aria-busy="true" aria-label="Loading calculator">
                        <p className="animate-pulse text-gray-600">Loading calculator…</p>
                      </div>
                    }
                  >
                    <FinancialCalculator />
                  </Suspense>
                </div>

                <p className="mt-4 text-sm text-[#333]/80 leading-relaxed">
                  Estimates are for illustration only and may not reflect actual results. For a personalized plan,
                  request a free consultation.
                </p>

                <div className="mt-4">
                  <Link
                    to="/disclaimer"
                    className="text-sm font-semibold text-[#0f5028] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40 rounded-xs px-1 py-1 inline-block"
                    aria-label="Read the disclaimer"
                  >
                    Read the disclaimer
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
