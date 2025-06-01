import React from 'react';

const PersonalHealthInsurance: React.FC = () => (
  <div className="lg:w-full">
    <h1 className="text-3xl font-bold mb-6">Private Health Insurance</h1>
    <p className="mb-4">
      While Canada’s public health care system covers many services, it does not include dental, vision, or most prescription drugs. Private health insurance helps fill those gaps, offering peace of mind for everyday and unexpected medical expenses.
    </p>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Who Needs It?</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>Self-employed individuals or contractors without group benefits</li>
      <li>Families seeking coverage for prescriptions, dental, and vision</li>
      <li>Retirees or part-time workers looking for additional protection</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Common Coverage Options</h2>
    <ul className="list-disc list-inside space-y-2 mb-4">
      <li>Prescription medications</li>
      <li>Dental cleanings and major procedures</li>
      <li>Vision care including glasses and exams</li>
      <li>Paramedical services (e.g., physiotherapy, massage)</li>
      <li>Catastrophic or critical illness coverage</li>
    </ul>

    <h2 className="text-2xl font-semibold mt-8 mb-4">Eligibility & Enrollment Tips</h2>
    <p className="mb-4">
      Most insurers require that you’re a Canadian resident covered under your provincial plan. Enrolling while you're healthy helps avoid exclusions for pre-existing conditions. If you're part of a couple or family, look for bundled options to save on premiums.
    </p>

    <p className="text-sm text-gray-600 italic mt-4">
      Discuss your health needs and budget with a licensed advisor to choose the right plan. Customizable health insurance can complement your government coverage and reduce out-of-pocket costs.
    </p>
  </div>
);

export default PersonalHealthInsurance;