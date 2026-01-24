import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaBalanceScale, FaCheckCircle, FaFileSignature, FaLightbulb } from 'react-icons/fa';
import Reveal from '../../components/motion/Reveal';

const Divider = () => <div className="my-12 h-px bg-black/5" aria-hidden="true" />;

const card = 'rounded-xl border border-black/10 bg-white/45 backdrop-blur-[2px] shadow-sm';
const tipCard = 'rounded-xl border border-[#0f5028]/20 bg-[#f7fbf3] shadow-sm';

const BuySell: React.FC = () => {
  return (
    <section aria-labelledby="buy-sell-heading" className="text-[#1f2937]">
      <Reveal variant="up" className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-3">
            <span className="text-[#0f5028]/70" aria-hidden="true">
              <FaHandshake className="text-2xl" />
            </span>
            <h2 id="buy-sell-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#102019]">
              Funding Buy–Sell Agreements
            </h2>
          </div>

          <p className="mt-5 text-base sm:text-[1.05rem] leading-relaxed text-[#1f2937]/75">
            A buy–sell agreement funded with life insurance helps ensure business continuity if a partner dies or can no
            longer participate in the business.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#1f2937]/70">
            In practice, it works like a “business will” — outlining how ownership transfers and how the transaction is
            funded, so partners and families aren’t forced into difficult decisions under pressure.
          </p>

          <div className="mt-8">
            <div className="flex items-center gap-2">
              <FaBalanceScale className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-[#102019]">Why it matters</h3>
            </div>

            <ul className="mt-5 space-y-3 text-[#1f2937]/75">
              {[
                'Creates a clear, pre-arranged ownership transition',
                'Provides liquidity so surviving owners can purchase shares immediately',
                "Protects the deceased partner’s heirs from uncertainty and forced negotiations",
                'Reduces the risk of disputes, delays, or legal challenges',
                'Helps preserve operational and financial stability',
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
              <FaFileSignature className="text-[#0f5028]/70" aria-hidden="true" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-[#102019]/75">How we help</h3>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-[#1f2937]/70">
              We coordinate with your legal and accounting advisors to align the insurance funding with your ownership
              structure — so the agreement can function exactly as intended when it’s needed most.
            </p>
          </Reveal>

          <Reveal variant="scale" className={`${tipCard} p-6 mt-6`}>
            <div className="flex items-center gap-2">
              <FaLightbulb className="text-[#0f5028]/70" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0f5028]">Planning tip</p>
            </div>

            <p className="mt-3 text-sm sm:text-base text-[#102019]/80 font-medium leading-relaxed">
              Funding depends on eligibility. Waiting can increase premiums — or reduce the ability to secure coverage.
              Plan while options are widest.
            </p>
          </Reveal>

          <figure className="mt-6">
            <div className={`${card} overflow-hidden`}>
              <div className="aspect-[16/10] grid place-items-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#1f2937]/45">
                  Image Placeholder • Partner agreement / handshake
                </p>
              </div>
            </div>
          </figure>
        </div>
      </Reveal>

      <Divider />

      <Reveal variant="softUp">
        <h3 className="text-2xl font-semibold text-[#102019]">How a buy–sell plan typically comes together</h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: 'Define terms', b: 'Owners define triggers, valuation method, and purchase terms with legal counsel.' },
            { t: 'Select funding', b: 'Insurance amount aligns to valuation approach and ownership structure.' },
            { t: 'Implement & review', b: 'Policies are placed, beneficiaries aligned, and reviewed as the business grows.' },
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

export default BuySell;