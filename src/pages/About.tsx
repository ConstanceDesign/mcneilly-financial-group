import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../images/about-hero.jpg';
import LeadParagraph from 'components/LeadParagraph';
import {
  FaEnvelope, 
  FaComments,
} from 'react-icons/fa';

const handleContactClick = () => {
  window.location.href = '/contact';
};

const About: React.FC = () => {
  return (
    <div className="text-[#333] font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-[#1f7a45] text-white">
        <img
          src={heroImage}
          alt="Explore trusted links to financial resources."
          loading="lazy"
          className="h-full w-full object-cover opacity-25 absolute inset-0 z-0"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-96 px-4">
          <h1 className="text-[2.4rem] font-serif leading-tight md:text-6xl md:leading-[1.1] font-bold drop-shadow-sm text-white px-4 py-2">
            About Our Financial Philosophy
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <main className="px-10 py-12 md:px-20 lg:py-16 max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 md:gap-5 sm:gap-5 xs:gap-5">
          <article className="text-lg space-y-6 leading-relaxed">
          <LeadParagraph>
  At McNeilly Financial Group, our philosophy is rooted in conservatism—prioritizing safety and security. By working within each client’s carefully defined risk profile, we build portfolios that meet their financial goals without exposing them to unnecessary risk.
</LeadParagraph>

 {/* Investment Approach */}
 <section aria-labelledby="investment-approach" className="mb-12">
        <h3 id="investment-approach" className="text-2xl font-serif font-semibold pt-10">
          Investment Approach
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Capital preservation first. Sustainable growth always.</strong>{" "}
          We align each portfolio to the client’s goals and risk tolerance to
          minimise volatility and protect wealth through market cycles.
        </p>
      </section>

      {/* Holistic Planning */}
      <section aria-labelledby="holistic-planning" className="mb-12">
        <h3 id="holistic-planning" className="text-2xl font-serif font-semibold pt-10">
          Holistic Financial Planning
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Integrated strategies for real life.</strong> Every plan
          brings together:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li className="pl-4 leading-7 before:mr-2 before:content-['•']">
            Investment management &amp; retirement planning
          </li>
          <li className="pl-4 leading-7 before:mr-2 before:content-['•']">
            Insurance &amp; risk protection
          </li>
          <li className="pl-4 leading-7 before:mr-2 before:content-['•']">
            Estate &amp; intergenerational wealth planning
          </li>
          <li className="pl-4 leading-7 before:mr-2 before:content-['•']">
            Tax-efficient structures for individuals &amp; businesses
          </li>
        </ul>
      </section>

      {/* Advanced Tax & Structuring */}
      <section aria-labelledby="tax-structuring" className="mb-12">
        <h3 id="tax-structuring" className="text-2xl font-serif font-semibold pt-10">
          Advanced Tax &amp; Structuring
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Keep more of what you earn.</strong> When appropriate, we
          employ income splitting, trusts, corporate planning, and other tax
          optimisation strategies to enhance after-tax outcomes and preserve
          wealth across generations.
        </p>
      </section>

{/* <p className="pt-3">
  Our investment philosophy emphasizes capital preservation. By aligning each portfolio with the client’s tolerance for risk, we minimize volatility while pursuing sustainable, long-term growth.
</p>

<p>
  Each plan integrates investment management, insurance, estate, and tax strategies tailored to the client’s lifestyle, priorities, and aspirations. We believe that true financial planning is proactive, personal, and designed for lasting security.
</p>

<p>
  McNeilly Financial Group’s holistic approach encompasses all aspects of financial well-being delivering customized solutions that reflect each client’s unique values and long-term objectives.
</p>

<p>
  With a commitment to continuous monitoring and regular annual reviews, every plan remains agile and responsive to life’s changes, economic shifts, and emerging opportunities.
</p>

<p>
  As a trusted financial partner, Patrick McNeilly, B.A., B. Comm. acts as the client’s chief financial advisor—collaborating seamlessly with accountants, lawyers, and other professionals. When needed, he leverages a carefully built network to provide comprehensive solutions.
</p> */}
          </article>

          {/* Duplicate text for even two-column display */}
          <article className="md:pt-0 text-lg space-y-5 leading-relaxed">

                  {/* Oversight */}
      <section aria-labelledby="oversight" className="mb-12">
        <h3 id="oversight" className="text-2xl font-serif font-semibold pt-10">
          Ongoing Oversight
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Plans that adapt as life changes.</strong> We monitor progress
          throughout the year and conduct structured annual reviews so
          strategies remain responsive to evolving goals, markets, and
          opportunities.
        </p>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership" className="mb-12">
        <h3 id="leadership" className="text-2xl font-serif font-semibold pt-10">
          Leadership &amp; Collaboration
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Your chief financial advisor.</strong> Led by{" "}
          <span className="font-medium">Patrick McNeilly, B.A., B. Comm.</span>,
          we coordinate seamlessly with accountants, lawyers, and specialist
          partners to deliver comprehensive, execution-ready solutions.
        </p>
      </section>

      {/* Client Experience */}
      <section aria-labelledby="client-experience" className="mb-12">
        <h3 id="client-experience" className="text-2xl font-serif font-semibold pt-10">
          Client Experience
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>Human, transparent, accountable.</strong> Advice reflects your
          values, priorities, and lifestyle. Clear communication and personal
          accountability guide every recommendation.
        </p>
      </section>

      {/* Accessibility Promise */}
      <section aria-labelledby="accessibility" className="mb-12">
        <h3 id="accessibility" className="text-2xl font-serif font-semibold pt-10">
          Accessibility Promise
        </h3>
        <p className="mt-3 text-gray-700">
          <strong>You’re never left waiting.</strong> Patrick returns phone
          calls the <span className="font-medium">same business day</span> and
          responds to or acknowledges emails within{" "}
          <span className="font-medium">24 hours</span>—so you always feel
          supported and informed.
        </p>
      </section>
            {/* <p>
              Our philosophy emphasizes the human element in financial planning. Every client’s journey is different, and we adapt our strategies to fit each individual’s values and goals.
            </p>
            <p>
              Transparency, trust, and personal accountability guide our decision-making. By focusing on what truly matters to our clients, we help them make informed decisions with lasting peace of mind.
            </p>
            <p>
              Whether planning for retirement, a business transition, or intergenerational wealth transfer, McNeilly Financial Group provides thoughtful, seasoned guidance every step of the way.
            </p>
            <p>
  We also employ advanced tax optimization techniques including income splitting, trust structures, and strategic leveraging to enhance after-tax outcomes and preserve wealth across generations.
</p>

<p>
  Above all, accessibility is key to our client-first commitment. We ensure timely responses via phone, email, or in-person meetings. Patrick personally guarantees that all phone calls are returned the same business day. Email inquiries are answered or acknowledged within 24 hours. We make sure our clients feel heard, supported, and valued.
</p> */}
            {/* Signature */}
            {/* <div>
            <p
                className="text-[45px] mt-6"
                style={{ fontFamily: 'Allura, cursive' }}
              >
                Patrick McNeilly
              </p>
              <p className="text-[18px]/1 font-light">
                Patrick McNeilly B.A., B. Comm.
              </p>
            </div> */}

                        {/* CTA Button */}
            
                        <div className="mt-8 flex flex-wrap gap-4">
                          <button
                            onClick={handleContactClick}
                            className="flex items-center justify-center gap-2 bg-[#4b9328] hover:bg-[#8cbe3f] text-white hover:text-white tracking-wide px-3 py-2 rounded-xs font-bold text-base shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 duration-300 hover:scale-105"
                            aria-label="Contact us for a free consultation"
                          ><FaComments size={20} />
                           <span className="tracking-wide text-[1.10rem] uppercase">Free Consultation</span>
                          </button>
                          </div>

                           {/* CTA Button */}
                           {/* <div className="mt-15 pb-8"> */}
                        {/* <Link
                        to="/contact"
                        aria-label="Schedule a consultation"
                          className="relative flex-1 xl:w-2/3 group overflow-hidden px-6 py-5 rounded-xs text-lg text-[#333] font-bold tracking-wide flex justify-between items-center transition-all duration-300 hover:bg-[#62a342] hover:text-white shadow"
                        >
                          <span className="absolute inset-0 w-full h-full bg-[#c2e1a1] transition-transform duration-300 transform group-hover:translate-x-full group-hover:opacity-0"></span>
                          <span className="relative z-10 flex items-center justify-between w-full">
                            <span>Schedule a Consultation</span>
                            <FaEnvelope className="text-xl ml-3" />
                          </span>
                          </Link>
                        </div> */}
                  
            
          </article>
        </section>
      </main>
    </div>
  );
};

export default About;