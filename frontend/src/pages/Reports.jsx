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
  <div className="container mt-4">
    <h2 className="mb-4">Sales Report</h2>

    <div
      className="card shadow"
      style={{ width: "350px" }}
    >
      <div className="card-body">
        <h3>Total Invoices</h3>
        <h2>{report.totalInvoices}</h2>

        <hr />

        <h3>Total Sales</h3>
        <h2>₹{report.totalSales}</h2>
      </div>
    </div>
  </div>
);
}

export default Reports;