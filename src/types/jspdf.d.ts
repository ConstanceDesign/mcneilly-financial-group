declare module 'jspdf' {
    export default class jsPDF {
      constructor(orientation?: string, unit?: string, format?: string);
      addImage(
        imageData: string,
        format: string,
        x: number,
        y: number,
        width: number,
        height: number
      ): void;
      getImageProperties(imageData: string): { width: number; height: number };
      setFontSize(size: number): void;
      setTextColor(color: string | number): void;
      text(text: string, x: number, y: number): void;
      output(type: 'datauristring'): string;
      save(filename: string): void;
      internal: {
        pageSize: {
          getWidth: () => number;
          getHeight: () => number;
        };
      };
    }
  }