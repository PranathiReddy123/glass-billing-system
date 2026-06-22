import { Link, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">
          Glass & Plywood Billing System
        </span>

        <div className="navbar-nav">
          <Link className="nav-link text-white" to="/">
            Dashboard
          </Link>

          <Link className="nav-link text-white" to="/products">
            Products
          </Link>

          <Link className="nav-link text-white" to="/customers">
            Customers
          </Link>

          <Link className="nav-link text-white" to="/invoices">
            Invoices
          </Link>

          <Link className="nav-link text-white" to="/reports">
            Reports
          </Link>
        </div>
      </div>
    </nav>

    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  </div>
);

}

export default App;