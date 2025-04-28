import React from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintButton: React.FC<{ targetRef: React.RefObject<any> }> = ({ targetRef }) => {
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: 'Financial Report',
  });

  return <button onClick={handlePrint} className="bg-gray-600 text-white py-2 px-4 rounded mt-4">Print Report</button>;
};

export default PrintButton;