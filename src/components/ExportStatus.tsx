import React, { useEffect } from 'react';

interface ExportStatusProps {
  emailSent: boolean;
  emailError?: string | null; 
  pdfExported: boolean;
  csvExported: boolean;
  printTriggered: boolean;
}

const ExportStatus: React.FC<ExportStatusProps> = ({
  emailSent,
  pdfExported,
  csvExported,
  printTriggered,
}) => {
  // Auto-hide messages after a short time
  useEffect(() => {
    if (emailSent || pdfExported || csvExported || printTriggered) {
      const t = setTimeout(() => {
        // This component is display-only; parent controls state reset
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [emailSent, pdfExported, csvExported, printTriggered]);

  return (
    <div
      className="mt-3 min-h-[1.75rem] text-center space-x-2"
      role="status"
      aria-live="polite"
    >
      {emailSent && (
        <span className="inline-block bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full shadow-sm">
          ✅ Email sent
        </span>
      )}

      {pdfExported && (
        <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full shadow-sm">
          📄 PDF exported
        </span>
      )}

      {csvExported && (
        <span className="inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full shadow-sm">
          📊 CSV downloaded
        </span>
      )}

      {printTriggered && (
        <span className="inline-block bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full shadow-sm">
          🖨️ Sending to printer…
        </span>
      )}
    </div>
  );
};

export default ExportStatus;