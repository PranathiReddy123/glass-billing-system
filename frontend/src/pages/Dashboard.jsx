import { useEffect, useState } from "react";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/reports/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  if (!stats) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={{ border: "1px solid gray", padding: "20px", width: "200px" }}>
          <h3>📦 Products</h3>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px" }}>
          <h3>👥 Customers</h3>
          <h1>{stats.totalCustomers}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px" }}>
          <h3>🧾 Invoices</h3>
          <h1>{stats.totalInvoices}</h1>
        </div>

        <div style={{ border: "1px solid gray", padding: "20px", width: "200px" }}>
          <h3>💰 Sales</h3>
          <h1>₹{stats.totalSales}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;