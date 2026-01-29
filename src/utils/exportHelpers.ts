import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

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

    // NOTE: We intentionally cast options to any to avoid overly-strict local .d.ts issues.
    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc: Document) => {
        // remove anything marked export-ignore
        clonedDoc.querySelectorAll('[data-export-ignore="true"]').forEach((n) => n.remove());

        // preserve Chart.js pixels
        copyCanvasToClone(reportElement, clonedDoc);
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
    let y = 44;
    pdf.setFontSize(16);
    pdf.setTextColor('#0f5028');
    pdf.text(firm, 40, y);

    pdf.setFontSize(14);
    pdf.setTextColor('#000000');
    pdf.text(title, 40, y + 18);

    if (preparedFor) {
      pdf.setFontSize(11);
      pdf.setTextColor('#505050');
      pdf.text(preparedFor, 40, y + 36);
      y += 18;
    }

    y += 54;

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
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
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