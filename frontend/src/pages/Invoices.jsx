import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  

  useEffect(() => {
    fetch("http://localhost:3000/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));

      fetch("http://localhost:3000/customers")
  .then((res) => res.json())
  .then((data) => setCustomers(data));

fetch("http://localhost:3000/products")
  .then((res) => res.json())
  .then((data) => setProducts(data));
  }, []);

  const createInvoice = async () => {
  const response = await fetch(
    "http://localhost:3000/invoices",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId: Number(customerId),
        productId: Number(productId),
        quantity: Number(quantity),
      }),
    }
  );

  const invoice = await response.json();

  setInvoices([...invoices, invoice]);

  setCustomerId("");
  setProductId("");
  setQuantity("");
};

const downloadPDF = (invoice) => {
  const doc = new jsPDF();

  doc.text("Invoice", 20, 20);
  doc.text(`Invoice ID: ${invoice.id}`, 20, 40);
  doc.text(`Customer: ${invoice.customer?.name}`, 20, 50);
  doc.text(`Product: ${invoice.product?.name}`, 20, 60);
  doc.text(`Quantity: ${invoice.quantity}`, 20, 70);
  doc.text(`Total: Rs.${invoice.total}`, 20, 80);

  doc.save(`invoice-${invoice.id}.pdf`);
};


  return (
    <div>
      <h2>Create Invoice</h2>

<select
  className="form-control"
  value={customerId}
  onChange={(e) => setCustomerId(e.target.value)}
>
  <option value="">Select Customer</option>

  {customers.map((customer) => (
    <option
      key={customer.id}
      value={customer.id}
    >
      {customer.name}
    </option>
  ))}
</select>

<select
  className="form-control"
  value={productId}
  onChange={(e) => setProductId(e.target.value)}
>
  <option value="">Select Product</option>

  {products.map((product) => (
    <option
      key={product.id}
      value={product.id}
    >
      {product.name}
    </option>
  ))}
</select>

<input
  className="form-control"
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
/>

<button 
className="btn btn-success"
onClick={createInvoice}>
  Create Invoice
</button>

<hr />

      <h2>Invoices</h2>

      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>PDF</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.customer?.name}</td>
              <td>{invoice.product?.name}</td>
              <td>{invoice.quantity}</td>
              <td>₹{invoice.total}</td>

              <td>
              <button
              className="btn btn-primary btn-sm"
              onClick={() => downloadPDF(invoice)}
              >
            Download PDF
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Invoices;