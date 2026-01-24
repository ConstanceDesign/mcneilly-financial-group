import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaShieldAlt, FaUsersCog, FaCheckCircle, FaLightbulb } from 'react-icons/fa';
import Reveal from '../../components/motion/Reveal';

const Divider = () => <div className="my-12 h-px bg-black/5" aria-hidden="true" />;

const card = 'rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm';
const tipCard = 'rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] shadow-sm';

const KeyPerson: React.FC = () => {
  return (
    <section aria-labelledby="key-person-heading" className="text-[#1f2937]">
      <Reveal variant="up" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaUserTie className="text-2xl" />
            </span>

            <h2 id="key-person-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]">
              Key Person Insurance
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            Key Person Insurance helps protect a business from the financial shock of losing a vital contributor due to
            death or disability.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            Whether the person is a founder, executive, top producer, or technical specialist, the loss can disrupt
            revenue, operations, and growth. Coverage provides time and resources to stabilize and rebuild.
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-[#102019]">Why it matters</h3>
            </div>

            <ul className="mt-5 space-y-3 text-[#1f2937]/75">
              {[
                'Helps maintain revenue continuity during a transition',
                'Supports recruiting, onboarding, and training a replacement',
                'Can reduce lender or investor concern during change',
                'Signals long-term planning and strengthens retention strategy',
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
              <FaUsersCog className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#102019]/75">
                Protecting people and performance
              </h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#1f2937]/70">
              Key person coverage is often underestimated until it’s needed. Proactive planning helps preserve
              operations and confidence while leadership navigates change.
            </p>

            <p className="mt-4 text-sm leading-relaxed text-[#1f2937]/70">
              Some plans can be structured to support the business while also providing benefits to the insured person
              or their family, depending on ownership and design.
            </p>
          </Reveal>

          <Reveal variant="scale" className={`${tipCard} p-6 mt-6`}>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Advisor insight</p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              Map coverage to the roles that would be hardest to replace — and quantify the cost of disruption (lost
              sales, delays, recruiting time, and transition expenses).
            </p>
          </Reveal>

          <figure className="mt-6">
            <div className={`${card} overflow-hidden`}>
              <div className="aspect-[16/10] grid place-items-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                  Image Placeholder • Leadership / key contributor
                </p>
              </div>
            </div>
          </figure>
        </div>
      </Reveal>

      <Divider />

      <Reveal variant="softUp">
        <h3 className="text-2xl font-semibold text-[#102019]">How key person coverage is usually planned</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Identify key roles', b: 'Determine which roles create the biggest operational or revenue risk.' },
            { t: 'Quantify impact', b: 'Estimate disruption costs and time-to-replace — then align benefit amount.' },
            { t: 'Choose structure', b: 'Confirm ownership/beneficiary structure and align with advisors.' },
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
      </Reveal>
    </section>
  );
};

export default KeyPerson;