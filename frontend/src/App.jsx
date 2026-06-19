import { Link, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import Customers from "./pages/Customers";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Glass & Plywood Billing System</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Dashboard</Link>{" | "}
        <Link to="/products">Products</Link>{" | "}
        <Link to="/customers">Customers</Link>{" | "}
        <Link to="/invoices">Invoices</Link>{" | "}
        <Link to="/reports">Reports</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;