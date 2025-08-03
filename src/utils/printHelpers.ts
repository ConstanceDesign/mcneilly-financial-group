export const handlePrintWrapper = ({
  printRef,
  handlePrint,
  setPrintTriggered,
}: {
  printRef: React.RefObject<HTMLElement | null>;
  handlePrint: () => void;
  setPrintTriggered: (val: boolean) => void;
}) => {
  if (!printRef.current) {
    alert('Nothing to print.');
    return;
  }
  setPrintTriggered(true);
  handlePrint();
};