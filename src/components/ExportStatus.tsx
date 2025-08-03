import React from 'react';

interface ExportStatusProps {
  emailSent: boolean;
  pdfExported: boolean;
  csvExported: boolean;
  printTriggered: boolean;
}

const ExportStatus: React.FC<ExportStatusProps> = ({
  emailSent,
  pdfExported,
  csvExported,
  printTriggered
}) => {
  return (
    <div className="mt-2 text-center h-6 space-x-2">
      {emailSent && (
        <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full shadow-sm">
          ✅ Email Sent
        </span>
      )}
      {pdfExported && (
        <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full shadow-sm">
          📄 PDF Exported
        </span>
      )}
      {csvExported && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full shadow-sm">
          📊 CSV Downloaded
        </span>
      )}
      {printTriggered && (
        <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full shadow-sm">
          🖨️ Print Dialog Opened
        </span>
      )}
    </div>
  );
};

export default ExportStatus;