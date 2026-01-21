import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

/* -------------------------------- TYPES -------------------------------- */

export type ProjectionMeta = {
  reportTitle?: string;          // e.g., "Investment Projection Report"
  firmLine?: string;             // e.g., "McNeilly Financial Group"
  logoUrl?: string;              // e.g., "/sterling-logo.png" (from /public)
  preparedFor?: string;          // client name
  accountType?: string;          // RRSP/TFSA/FHSA
  income?: string;
  startingAmount?: string;
  monthlyContribution?: string;
  annualReturnRate?: string;
  yearsToGrow?: string;
  inflationAdjusted?: boolean;
  generatedOnISO?: string;       // optional: new Date().toISOString()
};

export type ChartDataLike = {
  labels?: string[];
  datasets?: Array<{ data: Array<number | string> }>;
};

/* ------------------------------ CSV EXPORT ------------------------------ */
/**
 * CSV output format:
 * - A short metadata header section (as normal rows)
 * - A blank line
 * - A Year-by-year table: Year, Value (CAD)
 *
 * This keeps it readable in Excel while preserving context.
 */
export const exportCSV = (
  data: ChartDataLike,
  meta: ProjectionMeta,
  fileName = 'mcneilly_investment_projection.csv'
) => {
  try {
    if (!data?.labels?.length || !data?.datasets?.length) {
      alert('No projection data available to export.');
      return;
    }

    const labels = data.labels;
    const values = data.datasets[0]?.data || [];

    const generatedOn =
      meta.generatedOnISO ||
      new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, ' UTC');

    // Metadata block as rows (Excel-friendly)
    const metaRows: Array<Record<string, string>> = [
      { Field: 'Report', Value: meta.reportTitle || 'Investment Projection Report' },
      { Field: 'Firm', Value: meta.firmLine || 'McNeilly Financial Group' },
      { Field: 'Logo', Value: meta.logoUrl ? `Included in PDF/Print (${meta.logoUrl})` : 'N/A' },
      { Field: 'Generated On', Value: generatedOn },
      { Field: 'Prepared For', Value: meta.preparedFor || '' },
      { Field: 'Account Type', Value: meta.accountType || '' },
      { Field: 'Annual Income', Value: meta.income || '' },
      { Field: 'Starting Amount', Value: meta.startingAmount || '' },
      { Field: 'Monthly Contribution', Value: meta.monthlyContribution || '' },
      { Field: 'Annual Return Rate', Value: meta.annualReturnRate || '' },
      { Field: 'Years To Grow', Value: meta.yearsToGrow || '' },
      { Field: 'Inflation Adjusted', Value: meta.inflationAdjusted ? 'Yes (2%/yr)' : 'No' },
    ];

    const projectionRows = labels.map((label: string, i: number) => ({
      Year: label,
      'Value (CAD)': values[i] ?? '',
    }));

    // Build CSV in two parts with a blank line in between
    const metaCsv = Papa.unparse(metaRows, { quotes: false });
    const projectionCsv = Papa.unparse(projectionRows, { quotes: false });

    const csv = `${metaCsv}\n\n${projectionCsv}\n`;

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  } catch (err) {
    console.error('CSV export failed:', err);
    alert('CSV export failed. See console for details.');
  }
};

/* --------------------------- PDF / PRINT HELPERS ------------------------ */

const waitForImages = async (root: HTMLElement) => {
  const imgs = Array.from(root.querySelectorAll('img'));
  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if ((img as HTMLImageElement).complete) return resolve();
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => resolve(), { once: true });
        })
    )
  );
};

/**
 * Chart.js canvas often goes blank when cloning DOM for html2canvas.
 * This copies the live canvas pixels onto the cloned canvas nodes.
 */
const copyCanvasToClone = (source: HTMLElement, cloned: Document) => {
  const srcCanvases = Array.from(source.querySelectorAll('canvas'));
  const cloneCanvases = Array.from(cloned.querySelectorAll('canvas'));

  srcCanvases.forEach((srcCanvas, i) => {
    const cloneCanvas = cloneCanvases[i] as HTMLCanvasElement | undefined;
    if (!cloneCanvas) return;

    const w = (srcCanvas as HTMLCanvasElement).width;
    const h = (srcCanvas as HTMLCanvasElement).height;
    cloneCanvas.width = w;
    cloneCanvas.height = h;

    const ctx = cloneCanvas.getContext('2d');
    if (!ctx) return;

    try {
      ctx.drawImage(srcCanvas as HTMLCanvasElement, 0, 0);
    } catch {
      // ignore
    }
  });
};

/* -------------------------------- PDF ---------------------------------- */
/**
 * Exports ONLY the provided report element (not the whole page).
 * Adds a branded header (logo + firm name) and ensures charts render.
 */
export const exportPDF = async (
  reportElement: HTMLElement,
  meta: ProjectionMeta,
  fileName = 'mcneilly_investment_report.pdf'
) => {
  try {
    if (!reportElement) throw new Error('Missing report element for PDF export.');

    // Render report to canvas (with chart fix using onclone)
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        // hide anything marked export-ignore (buttons, etc.)
        clonedDoc.querySelectorAll('[data-export-ignore="true"]').forEach((n) => n.remove());

        // copy Chart.js canvas pixels
        copyCanvasToClone(reportElement, clonedDoc);

        // If you include the logo <img> inside the report already, it will render.
        // No further action required here.
      },
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Basic header text (keeps it clean and readable)
    const title = meta.reportTitle || 'Investment Projection Report';
    const firm = meta.firmLine || 'McNeilly Financial Group';
    const preparedFor = meta.preparedFor ? `Prepared for: ${meta.preparedFor}` : '';

    let y = 44;

    pdf.setFontSize(16);
    pdf.setTextColor(15, 80, 40);
    pdf.text(firm, 40, y);

    pdf.setFontSize(14);
    pdf.setTextColor(0, 0, 0);
    pdf.text(title, 40, y + 18);

    if (preparedFor) {
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      pdf.text(preparedFor, 40, y + 36);
      y += 18;
    }

    y += 54;

    // Image fits width; paginate vertically if needed
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 80; // side margins
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    let remaining = imgHeight;
    let offset = 0;

    while (remaining > 0) {
      pdf.addImage(imgData, 'PNG', 40, y - offset, imgWidth, imgHeight);
      remaining -= pageHeight - y;
      offset += pageHeight - y;
      if (remaining > 0) pdf.addPage();
    }

    pdf.save(fileName);
  } catch (err) {
    console.error('PDF export failed:', err);
    alert('PDF export failed. See console for details.');
  }
};

/* ------------------------------ PRINT WRAP ------------------------------ */

export const handlePrintWrapper = ({
  reportRef,
  handlePrint,
  setPrintTriggered,
}: {
  reportRef: React.RefObject<HTMLElement | null>;
  handlePrint: () => void;
  setPrintTriggered: (val: boolean) => void;
}) => {
  if (!reportRef.current) {
    alert('Nothing to print.');
    return;
  }
  setPrintTriggered(true);
  handlePrint();
  setTimeout(() => setPrintTriggered(false), 2000);
};