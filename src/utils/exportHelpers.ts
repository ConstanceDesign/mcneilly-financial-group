import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export const exportCSV = (data: any, fileName = 'investment_projection.csv') => {
  try {
    if (!data?.labels || !data?.datasets?.length) {
      alert('No data available to export.');
      return;
    }

    const labels = data.labels;
    const values = data.datasets[0].data;

    const csv = Papa.unparse(
      labels.map((label: string, i: number) => ({
        Year: label,
        'Value (CAD)': values[i],
      }))
    );

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, fileName);
  } catch (error) {
    console.error('CSV export failed:', error);
    alert('There was an error generating your CSV file.');
  }
};

export const exportPDF = async (
  targetElement: HTMLElement,
  preparedFor = '',
  fileName = 'investment_report.pdf'
) => {
  try {
    if (!targetElement) {
      throw new Error('No target element provided for PDF export.');
    }

    const canvas = await html2canvas(targetElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 40;

    pdf.setFontSize(18);
    pdf.setTextColor(40);
    pdf.text('Investment Projection Report', 40, y);

    if (preparedFor) {
      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(`Prepared for: ${preparedFor}`, 40, y + 20);
    }

    y += 40;

    const props = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (props.height * pdfWidth) / props.width;

    pdf.addImage(imgData, 'PNG', 0, y, pdfWidth, pdfHeight);
    pdf.save(fileName);
  } catch (error) {
    console.error('PDF export failed:', error);
    alert('PDF generation failed. See console for details.');
  }
};