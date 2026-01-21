import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const isHTMLElement = (node: unknown): node is HTMLElement =>
  typeof window !== 'undefined' && node instanceof HTMLElement;

const ignoreExportElements = (node: Element) => {
  if (!isHTMLElement(node)) return false;

  if (node.dataset.exportIgnore === 'true') return true;

  const tag = node.tagName;
  if (
    tag === 'BUTTON' ||
    tag === 'FORM' ||
    tag === 'INPUT' ||
    tag === 'TEXTAREA' ||
    tag === 'SELECT'
  ) {
    return true;
  }

  if (node.classList.contains('btn')) return true;

  return false;
};

/**
 * Creates a base64 PDF (data URI string) from a DOM node.
 * Safe against DaisyUI OKLCH by ignoring interactive UI elements.
 */
export const getPDFBase64 = async (targetElement: HTMLElement): Promise<string> => {
  if (!targetElement) throw new Error('No target element provided');

  const canvas = await html2canvas(targetElement, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    ignoreElements: ignoreExportElements,
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Full-width image
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pageWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  // Minimal top padding
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

  // datauristring -> "data:application/pdf;...base64,..."
  return pdf.output('datauristring');
};