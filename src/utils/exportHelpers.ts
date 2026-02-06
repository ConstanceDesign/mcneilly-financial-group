import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

/* -------------------------------- FUNCTION -------------------------------- */

const PDF_COLOURS = {
  text: '#0b1f16',
  heading: '#0f5132',
  background: '#ffffff',
  border: '#0f5132',
  accent: '#198754',
};

/**
 * html2canvas currently does NOT support modern CSS color functions like oklch().
 * Tailwind + modern themes often emit oklch() via CSS variables.
 *
 * This function “sanitizes” the cloned DOM before capture:
 * - strips oklch() usage from inline style attributes
 * - forces safe inline fallbacks (brand colors) for common properties
 *
 * IMPORTANT: run this on the CLONED document (clonedDoc.body), not just one element.
 */
function sanitizeForHtml2Canvas(clonedRoot: HTMLElement) {
  // 1) Remove any oklch() from inline style attributes (fast & effective)
  const all = Array.from(clonedRoot.querySelectorAll<HTMLElement>('*'));
  for (const el of all) {
    const styleAttr = el.getAttribute('style');
    if (styleAttr && styleAttr.includes('oklch')) {
      // remove oklch(...) occurrences; if it leaves stray semicolons, browser ignores harmlessly
      el.setAttribute('style', styleAttr.replace(/oklch\([^)]+\)/g, ''));
    }
  }

  // 2) Apply safe brand-colored fallbacks for computed styles that still reference oklch()
  // (This catches inherited color vars / unresolved computed strings.)
  for (const el of all) {
    const computed = clonedRoot.ownerDocument.defaultView?.getComputedStyle(el);
    if (!computed) continue;

    const c = computed.color;
    const bg = computed.backgroundColor;
    const bc = computed.borderColor;

    if (c && c.includes('oklch')) el.style.color = PDF_COLOURS.text;
    if (bg && bg.includes('oklch')) el.style.backgroundColor = PDF_COLOURS.background;
    if (bc && bc.includes('oklch')) el.style.borderColor = PDF_COLOURS.border;
  }

  // 3) Ensure a clean PDF background (prevents transparency/odd dark capture)
  clonedRoot.style.backgroundColor = PDF_COLOURS.background;
}

/* -------------------------------- TYPES -------------------------------- */

export type ProjectionMeta = {
  reportTitle?: string;
  firmLine?: string;
  logoUrl?: string;
  preparedFor?: string;
  accountType?: string;
  income?: string;
  startingAmount?: string;
  monthlyContribution?: string;
  annualReturnRate?: string;
  yearsToGrow?: string;
  inflationAdjusted?: boolean;
  generatedOnISO?: string;
};

export type ChartDataLike = {
  labels?: string[];
  datasets?: Array<{ data: Array<number | string> }>;
};

/* ------------------------------ CSV EXPORT ------------------------------ */

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

    const metaRows: Array<Record<string, string>> = [
      { Field: 'Report', Value: meta.reportTitle || 'Investment Projection Report' },
      { Field: 'Firm', Value: meta.firmLine || 'McNeilly Financial Group' },
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

/* --------------------------- CANVAS/CHART FIX --------------------------- */

const copyCanvasToClone = (sourceEl: HTMLElement, clonedDoc: Document) => {
  const srcCanvases = Array.from(sourceEl.querySelectorAll('canvas'));
  const cloneCanvases = Array.from(clonedDoc.querySelectorAll('canvas'));

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

export const exportPDF = async (
  reportElement: HTMLElement,
  meta: ProjectionMeta,
  fileName = 'mcneilly_investment_report.pdf'
) => {
  try {
    if (!reportElement) throw new Error('Missing report element for PDF export.');

    const canvas = await html2canvas(reportElement, {
      scale: 1.5, // lower than 2 to reduce memory + increase reliability
      useCORS: true,
      backgroundColor: PDF_COLOURS.background,
      onclone: (clonedDoc: Document) => {
        // Fix charts first so they render in the clone
        copyCanvasToClone(reportElement, clonedDoc);

        // IMPORTANT: sanitize the entire cloned body (oklch often comes from :root / inherited vars)
        sanitizeForHtml2Canvas(clonedDoc.body as HTMLElement);


          // 🔽 PDF-only font scaling
  (clonedDoc.body as HTMLElement).style.fontSize = '90%';

        // Optional: add a hook class if you ever want PDF-only CSS rules
        const clonedReport = clonedDoc.getElementById(reportElement.id);
        if (clonedReport) (clonedReport as HTMLElement).classList.add('pdf-export');
      },
    } as any);

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const title = meta.reportTitle || 'Investment Projection Report';
    const firm = meta.firmLine || 'McNeilly Financial Group';
    const preparedFor = meta.preparedFor ? `Prepared for: ${meta.preparedFor}` : '';

// Header
let y = 48;

// Firm
pdf.setFontSize(18);
pdf.setTextColor(PDF_COLOURS.heading);
pdf.text(firm, 40, y);

// Report title
pdf.setFontSize(15);
pdf.setTextColor(PDF_COLOURS.text);
pdf.text(title, 40, y + 22);

// Prepared for
if (preparedFor) {
  pdf.setFontSize(11);
  pdf.setTextColor('#505050');
  pdf.text(preparedFor, 40, y + 42);
  y += 22;
}

y += 60;

    // Image sizing + pagination
    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pageWidth - 80; // margins
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

/* ------------------------ PDF BASE64 (FOR EMAIL) ------------------------ */

export const getPDFBase64 = async (targetElement: HTMLElement): Promise<string> => {
  if (!targetElement) throw new Error('No target element provided');

  const canvas = await html2canvas(targetElement, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: PDF_COLOURS.background,
    onclone: (clonedDoc: Document) => {
      // If charts are inside the target element, copy them into the clone
      copyCanvasToClone(targetElement, clonedDoc);

      // Same oklch sanitization for email PDFs
      sanitizeForHtml2Canvas(clonedDoc.body as HTMLElement);
    },
  } as any);

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  const top = 24;
  const usableHeight = pageHeight - top - 24;

  let remainingHeight = imgHeight;
  let offsetY = 0;

  while (remainingHeight > 0) {
    pdf.addImage(imgData, 'PNG', 0, top - offsetY, imgWidth, imgHeight);
    remainingHeight -= usableHeight;
    offsetY += usableHeight;
    if (remainingHeight > 0) pdf.addPage();
  }

  return pdf.output('datauristring');
};

/* ------------------------------ PRINT WRAP ------------------------------ */

export const handlePrintWrapper = ({
  reportRef,
  handlePrint,
  setPrintTriggered,
}: {
  reportRef: React.RefObject<HTMLElement | null>;
  handlePrint: (() => void) | undefined; // ✅ allow undefined
  setPrintTriggered: (val: boolean) => void;
}) => {
  if (!reportRef.current) {
    alert('Nothing to print.');
    return;
  }
  if (!handlePrint) {
    alert('Print is not ready yet. Please refresh and try again.');
    return;
  }

  setPrintTriggered(true);
  handlePrint();
  setTimeout(() => setPrintTriggered(false), 2000);
};