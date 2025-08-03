import { Dispatch, RefObject, SetStateAction } from 'react';

interface PrintHandlerArgs {
  printRef: RefObject<HTMLElement | null>;
  handlePrint: () => void;
  setPrintTriggered: Dispatch<SetStateAction<boolean>>;
}

export const handlePrintWrapper = ({ printRef, handlePrint, setPrintTriggered }: PrintHandlerArgs) => {
  if (!printRef.current) {
    alert('Print failed: no content to print.');
    return;
  }

  handlePrint();

  setPrintTriggered(true);
  setTimeout(() => setPrintTriggered(false), 3000);
};