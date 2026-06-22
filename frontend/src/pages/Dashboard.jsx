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
  <div className="container mt-4">
    <h2 className="mb-4">Dashboard</h2>

    <div className="row">
      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h5>📦 Products</h5>
            <h2>{stats.totalProducts}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h5>👥 Customers</h5>
            <h2>{stats.totalCustomers}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h5>🧾 Invoices</h5>
            <h2>{stats.totalInvoices}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card text-center shadow">
          <div className="card-body">
            <h5>💰 Sales</h5>
            <h2>Rs. {stats.totalSales}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}

export default Dashboard;