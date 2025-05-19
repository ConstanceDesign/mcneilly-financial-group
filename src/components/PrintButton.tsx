import React from 'react';
import { useReactToPrint } from 'react-to-print';

interface PrintButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
}

const PrintButton: React.FC<PrintButtonProps> = ({ targetRef }) => {
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: 'Financial Report',
    removeAfterPrint: true,
  });

  return (
    <button
      onClick={handlePrint}
      className="bg-white border border-[#4b9328] text-[#4b9328] hover:bg-[#f2f8f0] py-2 px-4 rounded-lg transition duration-300 shadow-sm text-sm sm:text-base"
      aria-label="Print Report"
      type="button"
    >
      Print Report
    </button>
  );
};

export default PrintButton;