import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaShieldAlt, FaCheckCircle, FaChartLine, FaLightbulb, FaHeartbeat } from 'react-icons/fa';

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    className={className}
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const GroupInsurance: React.FC = () => {
  return (
    <section aria-labelledby="group-insurance-heading" className="text-[#1f2937]">
      {/* SECTION 1: Editorial intro (clean + confident) */}
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaUsers className="text-2xl" />
            </span>

            {/* IMPORTANT: No H1 inside tab content */}
            <h2
              id="group-insurance-heading"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]"
            >
              Group Insurance Plans
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            A strong group plan is one of the most effective ways to attract and retain top talent. Offering health,
            life, and disability coverage signals stability, care, and long-term commitment to your team.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            We work with a wide range of carriers to help businesses implement plans that are cost-effective, flexible,
            and sustainable — designed to evolve as your company grows.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] p-5 sm:p-6">
            <div className="flex items-center gap-2">
              <FaChartLine className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#102019]/75">Why work with us</h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#1f2937]/70">
              Whether you have two employees or two hundred, we help you compare options, understand tradeoffs, and
              implement coverage that supports retention and day-to-day confidence.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-black/10 bg-white/55 p-4">
                <div className="flex items-center gap-2">
                  <FaHeartbeat className="text-[#0f5028]/60" aria-hidden="true" />
                  <p className="text-sm font-semibold text-[#102019]">Support your people</p>
                </div>
                <p className="mt-2 text-sm text-[#1f2937]/65 leading-relaxed">
                  Benefits help employees feel supported — and reduce turnover risk.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-white/55 p-4">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-[#0f5028]/60" aria-hidden="true" />
                  <p className="text-sm font-semibold text-[#102019]">Protect your business</p>
                </div>
                <p className="mt-2 text-sm text-[#1f2937]/65 leading-relaxed">
                  A plan that balances cost control and real coverage strengthens resilience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Divider */}
      <div className="my-12 h-px bg-black/5" aria-hidden="true" />

      {/* SECTION 2: Benefits (whitespace + clean list) */}
      <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <FaShieldAlt className="text-[#0f5028]/70" aria-hidden="true" />
            <h3 className="text-2xl font-semibold text-[#102019]">Benefits of Group Coverage</h3>
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#1f2937]/70 leading-relaxed">
            A well-designed plan can strengthen retention, reduce stress for employees, and help employers present a
            more complete total-compensation package.
          </p>

          <ul className="mt-6 space-y-3 text-[#1f2937]/75">
            {[
              'Boosts employee satisfaction, engagement, and retention',
              'Can include health, dental, vision, life, and disability coverage',
              'Premiums may be tax-deductible for employers (depending on structure)',
              'Cost-sharing and customization options for small businesses',
              'Coverage can extend to dependents and family members',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle className="mt-1 text-[#0f5028]/65" aria-hidden="true" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          {/* Expert Tip (kept — but more editorial, less “boxed UI”) */}
          <div className="rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Expert tip</p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              Employers offering even a thoughtfully designed basic benefits package gain a competitive hiring edge.
              It’s a clear signal of stability, care, and long-term vision.
            </p>
          </div>

          {/* Optional “image placeholder” (swap later with Adobe Stock) */}
          <figure className="mt-6">
            <div className="aspect-[16/10] rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm overflow-hidden">
              <div className="h-full w-full grid place-items-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                  Image Placeholder • Team benefits meeting
                </p>
              </div>
            </div>
            <figcaption className="mt-2 text-xs text-[#1f2937]/55">
              Optional: add a warm, natural photo (avoid heavy green filters).
            </figcaption>
          </figure>
        </div>
      </Reveal>

      {/* Divider */}
      <div className="my-12 h-px bg-black/5" aria-hidden="true" />

      {/* SECTION 3: How it works (simple, classy steps) */}
      <Reveal>
        <h3 className="text-2xl font-semibold text-[#102019]">How Group Plans Typically Come Together</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Discovery',
              body: 'We review your team size, goals, budget range, and the types of coverage that matter most.',
            },
            {
              title: 'Compare options',
              body: 'We shortlist carrier options and structures that align with your priorities and workforce.',
            },
            {
              title: 'Implement & evolve',
              body: 'We coordinate setup and help ensure the plan evolves as your company grows.',
            },
          ].map((step) => (
            <div key={step.title} className="rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]/70">{step.title}</p>
              <p className="mt-3 text-sm text-[#1f2937]/70 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default GroupInsurance;