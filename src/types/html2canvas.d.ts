declare module 'html2canvas' {
    export interface Html2CanvasOptions {
      scale?: number;
      useCORS?: boolean;
      backgroundColor?: string | null;
    }
  
    export default function html2canvas(
      element: HTMLElement,
      options?: Html2CanvasOptions
    ): Promise<HTMLCanvasElement>;
  }