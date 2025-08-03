const [isSending, setIsSending] = useState(false);

const handleEmailReport = async () => {
  if (!clientName || !summary || !printRef.current) {
    alert('Please enter client name, calculate, and generate chart first.');
    return;
  }

  try {
    setIsSending(true);

    const pdfBase64 = await getPDFBase64(printRef.current);

    const res = await fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName,
        summary,
        chartData,
        pdfBase64,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert('Email sent successfully!');
    } else {
      alert(`Failed: ${result.error}`);
    }
  } catch (err) {
    console.error(err);
    alert('Network or server error occurred.');
  } finally {
    setIsSending(false);
  }
};