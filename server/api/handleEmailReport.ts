const [isSending, setIsSending] = useState(false);

const handleEmailReport = async () => {
  if (!clientName || !printRef.current) {
    alert('Please enter client name and calculate first.');
    return;
  }

  // Build a safe summary if you don’t already have one
  const safeSummary = summary?.trim();
  if (!safeSummary) {
    alert('Please calculate first so a summary is available.');
    return;
  }

  try {
    setIsSending(true);

    const pdfBase64 = await getPDFBase64(printRef.current);

    const res = await fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientName, summary: safeSummary, chartData, pdfBase64 }),
    });

    let payload: any = null;
    try {
      payload = await res.json();
    } catch {
      payload = { message: await res.text() };
    }

    if (res.ok) {
      alert(payload.message || 'Email sent successfully!');
    } else {
      alert(payload.error || payload.message || 'Email failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Network or server error occurred.');
  } finally {
    setIsSending(false);
  }
};