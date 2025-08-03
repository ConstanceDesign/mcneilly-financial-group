declare module 'react-to-print' {
  import { RefObject } from 'react';

  export interface UseReactToPrintParams {
    content: () => RefObject<HTMLElement> | null;
    documentTitle?: string;
    removeAfterPrint?: boolean;
    onAfterPrint?: () => void;
    onBeforeGetContent?: () => void;
    onBeforePrint?: () => void;
    suppressErrors?: boolean;
  }

  export function useReactToPrint(params: UseReactToPrintParams): () => void;
}