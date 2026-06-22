import { useEffect, useState } from "react";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const fetchCustomers = () => {
    fetch("http://localhost:3000/customers")
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addCustomer = async () => {
    const response = await fetch(
      "http://localhost:3000/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          address,
        }),
      }
    );

    const newCustomer = await response.json();

    setCustomers([...customers, newCustomer]);

    setName("");
    setPhone("");
    setAddress("");
  };

  const deleteCustomer = async (id) => {
    await fetch(
      `http://localhost:3000/customers/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchCustomers();
  };

  const updateCustomer = async () => {
    await fetch(
      `http://localhost:3000/customers/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    setEditingId(null);

    setFormData({
      name: "",
      phone: "",
      address: "",
    });

    fetchCustomers();
  };

  return (
    <div>
      <h2>Customers</h2>

      <h3>Add Customer</h3>

      <input
        className="form-control"
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        className="form-control"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button
  className="btn btn-success"
  onClick={addCustomer}
>
  Add Customer
</button>

      <hr />

      {editingId && (
        <div>
          <h3>Edit Customer</h3>

          <input className="form-control"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Name"
          />

          <input
          className="form-control"
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value,
              })
            }
            placeholder="Phone"
          />

          <input
          className="form-control"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
            placeholder="Address"
          />

          <button
  className="btn btn-primary"
  onClick={updateCustomer}
>
  Update Customer
</button>
        </div>
      )}

      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>

              <td>
                <button
  className="btn btn-warning btn-sm"
  onClick={() => {
                    setEditingId(customer.id);

                    setFormData({
                      name: customer.name,
                      phone: customer.phone || "",
                      address: customer.address || "",
                    });
                  }}
                >
                  Edit
                </button>

                {" "}

                <button
  className="btn btn-danger"
  onClick={() =>
    deleteCustomer(customer.id)
  }
>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;