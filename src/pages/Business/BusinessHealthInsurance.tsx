import React from 'react';
import { motion } from 'framer-motion';
import {
  FaHeartbeat,
  FaStethoscope,
  FaShieldAlt,
  FaLightbulb,
  FaCheckCircle,
  FaUserFriends,
  FaChevronRight,
} from 'react-icons/fa';
import Reveal from '../../components/motion/Reveal';

const Divider = () => <div className="my-12 h-px bg-black/5" aria-hidden="true" />;

const card =
  'rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm';

const tipCard =
  'rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] shadow-sm';

const HealthInsurance: React.FC = () => {
  return (
    <section
      aria-labelledby="health-insurance-heading"
      className="text-[#1f2937]"
    >
      {/* SECTION 1: Editorial intro + “Key advantages” */}
      <Reveal variant="up" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaHeartbeat className="text-2xl" />
            </span>

            <h2
              id="health-insurance-heading"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]"
            >
              Health Insurance
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            Health insurance helps protect you from unexpected medical costs — and for business owners, it can also be a
            tax-smart strategy depending on structure.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            The strongest plans prioritize meaningful lifetime limits, practical day-to-day coverage, and enrollment
            while you’re still healthy — before exclusions become a problem.
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-[#102019]">Key advantages</h3>
            </div>

            <ul className="mt-5 space-y-3 text-[#1f2937]/75">
              {[
                'Comprehensive lifetime coverage limits (often $1M+ or unlimited, depending on plan design)',
                'Premiums may be tax-deductible for self-employed Canadians (structure-dependent)',
                'Helps reduce financial stress from future illness or injury',
                'Coverage options for families, including full-time students under age 25 (plan-dependent)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 text-[#0f5028]/60" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right rail: best practices + image placeholder */}
        <div className="lg:col-span-5">
          <Reveal variant="scale" className={`${card} p-6`}>
            <div className="flex items-center gap-2">
              <FaStethoscope className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#102019]/75">
                Best practices for enrollment
              </h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#1f2937]/70">
              The most effective strategy is to apply proactively — before diagnoses create exclusions or limitations.
              Even if exclusions apply, coverage can still be valuable for future, unrelated events.
            </p>

            <div className="mt-5 grid gap-2">
              {[
                'Apply while healthy to reduce exclusions and surcharges.',
                'Explore group or association options — sometimes with as few as two people.',
                'Ask about cost-plus reimbursement structures where appropriate.',
              ].map((t, i) => (
                <div key={t} className="flex items-start gap-2 text-sm text-[#1f2937]/70">
                  <FaChevronRight className="mt-1 text-[#0f5028]/55" aria-hidden="true" />
                  <span className="leading-relaxed">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <figure className="mt-6">
            <Reveal variant="fade">
              <div className={`${card} overflow-hidden`}>
                <div className="aspect-[16/10] grid place-items-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                    Image Placeholder • Healthcare planning / family
                  </p>
                </div>
              </div>
            </Reveal>
            <figcaption className="mt-2 text-xs text-[#1f2937]/55">
              Optional: warm, human photography (no green cast).
            </figcaption>
          </figure>
        </div>
      </Reveal>

      <Divider />

      {/* SECTION 2: Eligibility + “Pro tips” as editorial callouts */}
      <Reveal variant="left" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-semibold text-[#102019]">Eligibility overview</h3>

          <p className="mt-4 text-sm sm:text-base text-[#1f2937]/70 leading-relaxed">
            Eligibility typically requires Canadian residency and enrollment in a provincial or territorial government
            health plan. Dependent children may qualify under age limits and student status rules (plan-dependent).
          </p>

          <div className="mt-6 rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] p-5">
            <div className="flex items-center gap-2">
              <FaUserFriends className="text-[#0f5028]/65" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]/70">Eligibility reminder</p>
            </div>
            <p className="mt-3 text-sm sm:text-base text-[#1f2937]/70 leading-relaxed">
              Dependent children are often eligible if they’re under 21, or up to 25 if full-time students and
              financially dependent (plan-dependent).
            </p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal variant="scale" className={`${tipCard} p-6`}>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Pro tips</p>
            </div>

            <ul className="mt-4 space-y-2 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              {[
                'Prioritize strong lifetime maximums and practical day-to-day coverage.',
                'Ask how exclusions work — and what’s covered immediately vs. later.',
                'If you’re a business owner, confirm tax treatment with your accountant based on structure.',
              ].map((x) => (
                <li key={x} className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 text-[#0f5028]/60" aria-hidden="true" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Reveal>

      <Divider />

      {/* SECTION 3: How it comes together */}
      <Reveal variant="softUp">
        <h3 className="text-2xl font-semibold text-[#102019]">How health coverage is typically structured</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Plan type', b: 'Individual, group, association, or cost-plus style arrangements.' },
            { t: 'Core coverage', b: 'Prescription drugs, paramedical services, vision/dental options (plan-dependent).' },
            { t: 'Limits & maximums', b: 'Annual and lifetime limits — the “ceiling” matters long-term.' },
            { t: 'Exclusions', b: 'Pre-existing conditions may be excluded or limited, especially if applying late.' },
            { t: 'Employer strategy', b: 'Cost control + retention: structure coverage to support people and budgets.' },
            { t: 'Review cadence', b: 'Plans should evolve as your team changes and claims experience shifts.' },
          ].map((x, i) => (
            <motion.div
              key={x.t}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.04 }}
              className={`${card} p-5`}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]/70">{x.t}</p>
              <p className="mt-3 text-sm text-[#1f2937]/70 leading-relaxed">{x.b}</p>
            </motion.div>
          ))}
        </div>
      </Reveal>
    </section>
  );
};

export default HealthInsurance;