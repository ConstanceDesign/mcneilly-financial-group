import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import heroDesktop from '../images/contact-hero-desktop.jpg';
import heroTablet from '../images/contact-hero-tablet.jpg';
import heroMobile from '../images/contact-hero-mobile.jpg';
import LeadParagraph from 'components/LeadParagraph';
import { FaComments } from 'react-icons/fa';

const handleContactClick = () => {
  window.location.href = '/contact';
};

const About: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const cardIn = reduceMotion
    ? undefined
    : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: 'easeOut' },
      };

  // 2026 surface system (aligned with Contact)
  const pageBg = 'bg-[#f4f2ec]';

  const softCard =
    'rounded-xl border border-black/10 bg-white/60 backdrop-blur-sm shadow-sm ' +
    'p-5 sm:p-6';

  const ctaBtn =
    'btn inline-flex items-center justify-center gap-2 ' +
    'px-5 py-3 rounded-xs ' +
    'bg-[#2f7a2e] hover:bg-[#3a8b34] ' +
    'text-white font-bold uppercase tracking-wide ' +
    'shadow-sm hover:shadow-md ' +
    'transition ' +
    'hover:shadow-[0_10px_22px_rgba(15,80,40,0.18)] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25';

  return (
    <div className={`min-h-screen ${pageBg} text-[#1f2937] font-inter`}>
      {/* HERO — Desktop locked; Tablet/Mobile art direction + premium rhythm */}
      <section aria-label="Contact page hero" className="relative">
        <div className="relative overflow-hidden">
          <picture>
            <source media="(max-width: 640px)" srcSet={heroMobile} />
            <source media="(max-width: 1024px)" srcSet={heroTablet} />
            <img
              src={heroDesktop}
              alt="A warm conversation across generations"
              className="
                w-full
                h-[clamp(250px,62vw,360px)]
                sm:h-[clamp(280px,36vw,420px)]
                lg:h-[clamp(280px,28vw,420px)]
                object-cover
                object-[72%_30%]
                sm:object-[70%_34%]
                lg:object-[74%_36%]
                xl:object-[78%_34%]
                saturate-[0.98]
                contrast-[1.02]
              "
              loading="eager"
              decoding="async"
            />
          </picture>

          {/* Premium wash: strong left readability + softer right falloff */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,242,236,0.96),rgba(244,242,236,0.84),rgba(15,80,40,0.08))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(0,0,0,0.12),transparent_56%)]"
          />

          {/* Subtle top vignette so hero “tucks under” the nav nicely */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.14),transparent)]"
          />

          {/* Content */}
          <div className="absolute inset-0">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
              <div className="h-full flex items-center">
                {/* Mobile gets a soft “glass” pad so text never fights the image */}
                <div className="relative -translate-y-3 sm:-translate-y-6 lg:-translate-y-4">
                  <div className="rounded-2xl bg-white/35 backdrop-blur-sm border border-black/5 px-4 py-4 sm:p-0 sm:bg-transparent sm:backdrop-blur-0 sm:border-0">
                    <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-[#0f5028]">
                      Philosophy • Planning • Stewardship
                    </p>

                    <h1 className="mt-2.5 sm:mt-3 font-sans font-medium tracking-tight text-[#102019] leading-[1.05] text-[2.05rem] sm:text-5xl lg:text-6xl">
                      Our Financial
                      <br />
                      <span className="whitespace-nowrap">Philosophy</span>
                    </h1>

                    <p className="mt-3 text-[16px] sm:text-[16px] text-[#1f2937]/80 leading-relaxed max-w-[44ch]">
                     Disciplined planning that protects capital, and supports your lifestyle
                     at every stage of your financial journey.
                    </p>

                    <a
                      href="#main-content"
                      className="sr-only focus:not-sr-only focus:inline-flex focus:mt-4 focus:bg-white/85 focus:px-3 focus:py-2 focus:rounded-xs focus:outline-none focus:ring-2 focus:ring-[#0f5028]/30"
                    >
                      Skip to main content
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soft fade into the panel area */}
        <div className="h-10 sm:h-12 bg-[linear-gradient(to_bottom,rgba(244,242,236,0.0),rgba(244,242,236,1))]" />
      </section>

      {/* MAIN — overlap panel (matches Contact/Links) */}
      <main id="main" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-11 md:pb-13">
        <div
          className="
            -mt-14 sm:-mt-16 lg:-mt-20
            rounded-2xl
            border border-black/10
            bg-white/75
            backdrop-blur-md
            shadow-[0_22px_70px_rgba(0,0,0,0.10)]
            p-5 sm:p-7 lg:p-8
          "
        >
          <motion.section {...(cardIn || {})} className="grid gap-7 xl:gap-9 xl:grid-cols-12 items-start">
            {/* LEFT */}
            <section className={`${softCard} xl:col-span-7`}>
              <article className="text-[16px] md:text-[17px] leading-relaxed text-[#1f2937]/80 space-y-6">
                <LeadParagraph>
                  At McNeilly Financial Group, our philosophy is grounded in conservative, disciplined
                  financial planning. We focus on protecting capital first, then growing wealth in a
                  way that aligns with your goals, time horizon, and comfort with risk.
                </LeadParagraph>

                <div className="h-px w-full bg-black/10" />

                <section aria-labelledby="investment-approach">
                  <h2
                    id="investment-approach"
                    className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]"
                  >
                    Investment Approach
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">
                      Capital preservation first — sustainable growth always.
                    </span>{' '}
                    We align each portfolio to your objectives and risk tolerance to help minimize
                    volatility while pursuing long-term returns through changing markets.
                  </p>
                </section>

                <section aria-labelledby="holistic-planning">
                  <h2
                    id="holistic-planning"
                    className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]"
                  >
                    Holistic Financial Planning
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">Strategies that reflect real life.</span>{' '}
                    Your financial world doesn’t exist in silos. We integrate:
                  </p>
                  <ul className="mt-3 list-disc pl-6 space-y-2">
                    <li>Investment &amp; retirement planning</li>
                    <li>Insurance and risk management</li>
                    <li>Estate and intergenerational wealth planning</li>
                    <li>Tax-efficient structures for individuals and businesses</li>
                  </ul>
                </section>

                <section aria-labelledby="tax-structuring">
                  <h2
                    id="tax-structuring"
                    className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]"
                  >
                    Advanced Tax &amp; Structuring
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">Helping you keep more of what you earn.</span>{' '}
                    When appropriate, we work with your professional team to incorporate income splitting,
                    trusts, corporate planning, and other tax-optimization strategies to enhance after-tax
                    results and preserve wealth across generations.
                  </p>
                </section>
              </article>
            </section>

            {/* RIGHT */}
            <section className={`${softCard} xl:col-span-5`}>
              <article className="text-[16px] md:text-[17px] leading-relaxed text-[#1f2937]/80 space-y-6">
                <section aria-labelledby="oversight">
                  <h2 id="oversight" className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]">
                    Ongoing Oversight
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">Plans that evolve with you.</span>{' '}
                    We monitor portfolios throughout the year and conduct structured annual reviews to keep
                    your strategy aligned with life events, markets, and legislation.
                  </p>
                </section>

                <div className="h-px w-full bg-black/10" />

                <section aria-labelledby="leadership">
                  <h2 id="leadership" className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]">
                    Leadership &amp; Collaboration
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">Your chief financial advisor.</span>{' '}
                    Led by <span className="font-medium text-[#102019]">Patrick McNeilly, B.A., B. Comm.</span>,
                    we coordinate the moving parts of your financial life and collaborate with accountants,
                    lawyers, and other specialists to deliver integrated, execution-ready plans.
                  </p>
                </section>

                <section aria-labelledby="client-experience">
                  <h2 id="client-experience" className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]">
                    Client Experience
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">Human, transparent, and accountable.</span>{' '}
                    Advice should feel clear and actionable—not overwhelming. Recommendations are grounded in your
                    values and priorities, with plain-language explanations at every step.
                  </p>
                </section>

                <section aria-labelledby="accessibility">
                  <h2 id="accessibility" className="text-2xl font-sans font-semibold tracking-tight text-[#0f5028]">
                    Accessibility Promise
                  </h2>
                  <p className="mt-3">
                    <span className="font-semibold text-[#102019]">You’re never left waiting.</span>{' '}
                    Patrick returns client phone calls the <span className="font-medium text-[#102019]">same business day</span>{' '}
                    and responds to or acknowledges emails within <span className="font-medium text-[#102019]">24 hours</span>.
                  </p>
                </section>

                <div className="pt-2">
                  <button onClick={handleContactClick} className={ctaBtn} aria-label="Contact us for a free consultation">
                    <FaComments aria-hidden="true" />
                    FREE CONSULTATION
                  </button>
                </div>
              </article>
            </section>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default About;