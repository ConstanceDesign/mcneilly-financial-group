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
  FaCheckCircle,
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
        aria-label="McNeilly Financial Group homepage hero"
        className="relative w-full overflow-hidden h-[640px] sm:h-[660px] md:h-220"
      >
        {/* Background base */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0f5028] to-[#1f7a45]" aria-hidden="true" />

        {/* ✅ Image w/ desktop parallax + responsive focal point so the sailboat stays visible */}
        <img
          src={heroImage}
          alt="Sailboat at sunrise on calm water"
          className="
            absolute inset-0 w-full h-full object-cover
            object-[72%_center]
            sm:object-[70%_center]
            md:object-[62%_center]
            lg:object-[58%_center]
            opacity-95
            brightness-[1.08] contrast-[1.05] saturate-[1.08]
            will-change-transform
          "
          style={{ transform: `translateY(${heroOffset}px) scale(1.06)` }}
          loading="eager"
          fetchPriority="high"
        />

        {/* ✅ Less gloomy: lighter left readability mask */}
        <div className="absolute inset-0 bg-linear-to-r from-black/40 via-black/14 to-black/0" aria-hidden="true" />

        {/* Subtle vignette for depth (still light) */}
        <div className="absolute inset-0 bg-linear-to-t from-black/12 via-transparent to-transparent" aria-hidden="true" />

        {/* Warm wash */}
        <div
          className="absolute inset-0 bg-linear-to-b from-amber-200/14 via-transparent to-emerald-900/8 mix-blend-overlay"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          {/* ✅ Mobile-responsive “glass” panel:
              - on mobile: full-width, padded, soft background
              - on md+: frosted glass + border + shadow
          */}
          <div
            className="
              w-full max-w-[44rem]
              rounded-xl
              bg-black/25
              backdrop-blur-[2px]
              px-5 py-6
              sm:px-6 sm:py-7
              text-white
              shadow-md
              md:bg-white/12 md:backdrop-blur-md
              md:border md:border-white/20
              md:shadow-lg
              md:px-8 md:py-9
            "
          >
            {/* SEO: one clear H1 */}
            <h1 className="font-sans text-[2.15rem] leading-[1.08] sm:text-[2.45rem] md:text-6xl md:leading-[1.05] font-extrabold drop-shadow-sm">
              <span className="block tracking-wide">Plan smarter.</span>
              <span className="block mt-2">Secure your future.</span>
              <span className="block mt-2">Grow with confidence.</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-[1rem] sm:text-[1.08rem] md:text-xl leading-relaxed max-w-[42rem] text-white/95">
              McNeilly Financial Group delivers trusted financial advice and comprehensive wealth strategies for
              individuals, families, and business owners across Canada. With disciplined planning and personalized
              guidance, we help you build, protect, and grow your wealth.
            </p>

            {/* CTAs: stack on mobile, row on sm+ */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleContactClick}
                className="
                  group inline-flex w-full sm:w-auto
                  items-center justify-center gap-2
                  bg-[#4b9328] hover:bg-[#8cbe3f]
                  text-white px-5 py-3
                  rounded-xs font-bold text-base
                  shadow-sm hover:shadow-md
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                  transition duration-300 hover:-translate-y-[1px] hover:scale-[1.02]
                "
                aria-label="Schedule a free consultation"
              >
                <FaComments size={20} aria-hidden="true" />
                <span className="text-[1.02rem] uppercase tracking-wide">Free Consultation</span>
                <FaArrowRight
                  className="ml-1 opacity-90 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </button>

              <a
                href="#calculator"
                className="
                  group inline-flex w-full sm:w-auto
                  items-center justify-center gap-2
                  bg-white/12 hover:bg-white/18
                  text-white backdrop-blur
                  px-5 py-3 rounded-xs
                  font-bold text-base
                  border border-white/35 hover:border-white/55
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80
                  transition duration-300 hover:-translate-y-[1px] hover:scale-[1.02]
                "
                aria-label="Jump to the investment calculator"
              >
                <FaCalculator size={16} aria-hidden="true" />
                <span className="text-[1.02rem] uppercase tracking-wide">Investment Calculator</span>
                <FaArrowRight
                  className="ml-1 opacity-90 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </a>
            </div>

            {/* Proof points: wrap nicely on mobile */}
            <div
              className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-x-6 sm:gap-y-2 font-semibold text-sm sm:text-base text-white/90"
              aria-label="Service highlights"
            >
              <span className="inline-flex items-center gap-2">
                <FaCheckCircle className="text-[#8cbe3f]" aria-hidden="true" />
                Personalized planning
              </span>
              <span className="inline-flex items-center gap-2">
                <FaCheckCircle className="text-[#8cbe3f]" aria-hidden="true" />
                Canada-wide support
              </span>
              <span className="inline-flex items-center gap-2">
                <FaCheckCircle className="text-[#8cbe3f]" aria-hidden="true" />
                Regulated, transparent guidance
              </span>
            </div>

            {/* Accessibility: allow keyboard users to jump to content */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:inline-flex focus:mt-4 focus:bg-white/20 focus:px-3 focus:py-2 focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              Skip to main content
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES + CALCULATOR */}
      <main id="main-content">
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

                <a
                  href="/contact"
                  className="hidden sm:inline-flex items-center gap-2 text-[#0f5028] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/40 rounded-xs px-2 py-1"
                  aria-label="Contact us to discuss your financial plan"
                >
                  Talk to an advisor <FaArrowRight aria-hidden="true" />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-8" role="list" aria-label="Financial planning services">
                {services.map((service) => (
                  <article
                    key={service.title}
                    className="
                      group relative overflow-hidden
                      rounded-xs border border-[#cfe0b9]
                      bg-linear-to-b from-[#e6f3d3] to-[#dceec3]
                      p-5 shadow-sm
                      transition
                      hover:shadow-lg hover:-translate-y-0.5
                      focus-within:ring-2 focus-within:ring-[#8cbe3f]
                    "
                    role="listitem"
                    aria-label={service.title}
                  >
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

                    <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0f5028]/90">
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity">Learn more</span>
                      <FaArrowRight
                        className="opacity-70 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Calculator */}
            <div id="calculator" ref={printRef} aria-label="Investment calculator">
              <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5">
                <Suspense
                  fallback={
                    <div className="p-6" aria-live="polite" aria-busy="true">
                      <p className="animate-pulse text-gray-600">Loading calculator…</p>
                    </div>
                  }
                >
                  <FinancialCalculator />
                </Suspense>
              </div>

              <p className="mt-4 text-sm text-[#333]/80 leading-relaxed">
                Estimates are for illustration only and may not reflect actual results. For a personalized plan, request
                a free consultation.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;