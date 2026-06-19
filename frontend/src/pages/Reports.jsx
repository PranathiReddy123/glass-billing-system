import { useEffect, useState } from "react";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/reports/sales")
      .then((res) => res.json())
      .then((data) => setReport(data));
  }, []);

  if (!report) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h2>Sales Report</h2>

      <div
        style={{
          border: "1px solid gray",
          padding: "20px",
          width: "300px",
          marginTop: "20px",
        }}
      >
        <h3>Total Invoices</h3>
        <p>{report.totalInvoices}</p>

        <h3>Total Sales</h3>
        <p>₹{report.totalSales}</p>
      </div>
    </div>
  );
}

export default Reports;