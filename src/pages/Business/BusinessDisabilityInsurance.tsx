import React from 'react';
import { motion } from 'framer-motion';
import {
  FaWheelchair,
  FaShieldAlt,
  FaChartBar,
  FaInfoCircle,
  FaLightbulb,
  FaCheckCircle,
} from 'react-icons/fa';
import Reveal from '../../components/motion/Reveal';

const Divider = () => <div className="my-12 h-px bg-black/5" aria-hidden="true" />;

const card =
  'rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm';

const softCard =
  'rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] shadow-sm';

const DisabilityInsurance: React.FC = () => {
  const riskRows = [
    { age: 25, male: '40.7%', female: '46.8%' },
    { age: 30, male: '38.9%', female: '44.6%' },
    { age: 35, male: '37.1%', female: '41.9%' },
    { age: 40, male: '35.1%', female: '38.3%' },
  ];

  return (
    <section aria-labelledby="disability-insurance-heading" className="text-[#1f2937]">
      {/* SECTION 1: Editorial intro + “Why it matters” */}
      <Reveal variant="up" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaWheelchair className="text-2xl" />
            </span>

            <h2
              id="disability-insurance-heading"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]"
            >
              Disability Insurance
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            Disability insurance provides income protection if illness or injury prevents you from working. It helps
            keep essential obligations covered while you focus on recovery.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            Policies can differ by definition of disability (own occupation vs. any occupation), elimination period,
            benefit duration, and optional features like residual (partial) disability benefits.
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-[#102019]">Why it matters</h3>
            </div>

            <ul className="mt-5 space-y-3 text-[#1f2937]/75">
              {[
                'Income is often your most valuable asset — protecting it helps preserve stability.',
                'A long-term disability is statistically more likely than premature death before age 65.',
                'Many plans include return-to-work support and options for future benefit increases.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaInfoCircle className="mt-1 text-[#0f5028]/60" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right rail: advisor insight + image placeholder */}
        <div className="lg:col-span-5">
          <Reveal variant="scale" className={`${softCard} p-6`}>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Advisor insight</p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              Many people buy life insurance long before they consider disability coverage — even though the odds of a
              disability are often higher. The goal is protecting the lifestyle you’ve worked hard to build.
            </p>
          </Reveal>

          <figure className="mt-6">
            <Reveal variant="fade">
              <div className={`${card} overflow-hidden`}>
                <div className="aspect-[16/10] grid place-items-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                    Image Placeholder • Professional returning to work
                  </p>
                </div>
              </div>
            </Reveal>
            <figcaption className="mt-2 text-xs text-[#1f2937]/55">
              Optional: choose warm, natural light — avoid heavy green overlays.
            </figcaption>
          </figure>
        </div>
      </Reveal>

      <Divider />

      {/* SECTION 2: Table + explanation */}
      <Reveal variant="left" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2">
            <FaChartBar className="text-[#0f5028]/70" aria-hidden="true" />
            <h3 className="text-2xl font-semibold text-[#102019]">Disability risk by age</h3>
          </div>

          <p className="mt-4 text-sm sm:text-base text-[#1f2937]/70 leading-relaxed">
            The table below shows the percentage of males and females who may experience a disability lasting 90 days
            or more before age 65. It’s a reminder that risk exists across every stage of working life.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className={`${card} bg-white/70`}>
            <div className="overflow-x-auto rounded-xl">
              <table className="min-w-full text-sm text-left">
                <caption className="sr-only">
                  Disability risk by age, showing male and female percentages.
                </caption>
                <thead className="bg-[#0f5028] text-white">
                  <tr>
                    <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                      Age
                    </th>
                    <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                      Male (%)
                    </th>
                    <th scope="col" className="py-2.5 px-4 font-semibold uppercase tracking-wide text-xs">
                      Female (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {riskRows.map((row) => (
                    <tr key={row.age} className="odd:bg-white even:bg-black/[0.02]">
                      <th scope="row" className="py-2.5 px-4 font-semibold text-[#0f5028]">
                        {row.age}
                      </th>
                      <td className="py-2.5 px-4 text-[#1f2937]/80">{row.male}</td>
                      <td className="py-2.5 px-4 text-[#1f2937]/80">{row.female}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="px-4 pb-4 pt-3 text-xs text-[#1f2937]/55 italic flex items-start gap-2">
              <FaInfoCircle className="mt-0.5 text-[#0f5028]/55 flex-shrink-0" aria-hidden="true" />
              <span>
                Source: 1985 Commissioner&apos;s Disability Table A &amp; CIA 86–92 Aggregate Mortality Table.
                Illustration only; may not reflect current experience.
              </span>
            </p>
          </div>
        </div>
      </Reveal>

      <Divider />

      {/* SECTION 3: How it’s structured */}
      <Reveal variant="softUp">
        <h3 className="text-2xl font-semibold text-[#102019]">What to review when comparing policies</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Definition of disability', b: 'Own occupation vs. any occupation — what qualifies for benefits.' },
            { t: 'Elimination period', b: 'How long you wait before benefits begin (30/60/90 days, etc.).' },
            { t: 'Benefit duration', b: 'How long benefits can be paid (2 years, 5 years, to age 65, etc.).' },
            { t: 'Residual benefits', b: 'Support if you return part-time and income is reduced.' },
            { t: 'Future increase options', b: 'Ability to increase coverage as income grows (without new medicals).' },
            { t: 'Recurrence provisions', b: 'If you relapse after returning, benefits may resume without restarting.' },
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

export default DisabilityInsurance;