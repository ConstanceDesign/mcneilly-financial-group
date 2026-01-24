import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaFileInvoiceDollar, FaCheckCircle, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Reveal from '../../components/motion/Reveal';

const Divider = () => <div className="my-12 h-px bg-black/5" aria-hidden="true" />;

const card = 'rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm';
const tipCard = 'rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] shadow-sm';

const BusinessOverhead: React.FC = () => {
  return (
    <section aria-labelledby="business-overhead-heading" className="text-[#1f2937]">
      <Reveal variant="up" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaBuilding className="text-2xl" />
            </span>
            <h2
              id="business-overhead-heading"
              className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]"
            >
              Business Overhead Expense Insurance
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            Business Overhead Expense (BOE) insurance helps keep a business running if the owner becomes unable to work
            due to illness or injury.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            It’s designed to reimburse eligible operating costs — like rent, utilities, admin costs, and certain wages —
            during a recovery period after an elimination period (often 30/60/90 days).
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <FaFileInvoiceDollar className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-[#102019]">Key coverage highlights</h3>
            </div>

            <ul className="mt-5 space-y-3 text-[#1f2937]/75">
              {[
                'Premiums may be tax-deductible (confirm with your accountant)',
                'Options for partial disability and recurring conditions (policy-dependent)',
                'Waiver of premium after an extended disability period (policy-dependent)',
                'Some contracts include a death benefit payable to your estate (policy-dependent)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <FaCheckCircle className="mt-1 text-[#0f5028]/60" aria-hidden="true" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal variant="scale" className={`${card} p-6`}>
            <div className="flex items-center gap-2">
              <FaChartLine className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#102019]/75">
                How it works
              </h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#1f2937]/70">
              BOE is most valuable for incorporated professionals, clinic owners, partners, and small business operators.
              Eligible expenses often include commercial rent, utilities, certain wages, property taxes, insurance
              premiums, and contracted services (policy-dependent).
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#1f2937]/70">
              BOE does not replace personal income and typically excludes inventory, start-up expenses, and cost of goods
              sold.
            </p>
          </Reveal>

          <figure className="mt-6">
            <div className={`${card} overflow-hidden`}>
              <div className="aspect-[16/10] grid place-items-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                  Image Placeholder • Business continuity / office
                </p>
              </div>
            </div>
          </figure>
        </div>
      </Reveal>

      <Divider />

      <Reveal variant="left" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <h3 className="text-2xl font-semibold text-[#102019]">Additional protections to look for</h3>

          <div className="mt-6 grid gap-4">
            {[
              {
                t: 'Recurrence of disability',
                b: 'If you return to work and relapse within a set window, benefits may continue without a new waiting period (policy-dependent).',
              },
              {
                t: 'Waiver of premium',
                b: 'After an extended disability period, premiums may be waived for the duration of the claim (policy-dependent).',
              },
              {
                t: 'Death benefit',
                b: 'Some contracts pay a lump sum (often 1–3 months of overhead) to the estate (policy-dependent).',
              },
            ].map((x, i) => (
              <motion.div
                key={x.t}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.05 }}
                className={`${card} p-5`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]/70">{x.t}</p>
                <p className="mt-3 text-sm text-[#1f2937]/70 leading-relaxed">{x.b}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal variant="scale" className={`${tipCard} p-6`}>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Advisor tip</p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              A strong BOE plan is built around real overhead numbers. Review your fixed costs and confirm which expense
              categories are considered eligible before setting coverage.
            </p>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
};

export default BusinessOverhead;