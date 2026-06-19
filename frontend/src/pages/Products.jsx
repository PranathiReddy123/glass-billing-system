
import { useEffect, useState } from "react";

function Products() {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [rate, setRate] = useState("");
  const [unit, setUnit] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    stock: "",
    rate: "",
    unit: "",
  });

  const fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async () => {
    const response = await fetch(
      "http://localhost:3000/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          stock: Number(stock),
          rate: Number(rate),
          unit,
        }),
      }
    );

    const newProduct = await response.json();

    setProducts([...products, newProduct]);

    setName("");
    setCategory("");
    setStock("");
    setRate("");
    setUnit("");
  };

  const deleteProduct = async (id) => {
    await fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  const updateProduct = async () => {
    await fetch(
      `http://localhost:3000/products/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          stock: Number(formData.stock),
          rate: Number(formData.rate),
        }),
      }
    );

    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      stock: "",
      rate: "",
      unit: "",
    });

    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      <h3>Add Product</h3>

      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <input
        placeholder="Stock"
        type="number"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <input
        placeholder="Rate"
        type="number"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      <input
        placeholder="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      />

      <button onClick={addProduct}>
        Add Product
      </button>

      <hr />

      {editingId && (
        <div>
          <h3>Edit Product</h3>

          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <input
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value,
              })
            }
          />

          <input
            value={formData.stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                stock: e.target.value,
              })
            }
          />

          <input
            value={formData.rate}
            onChange={(e) =>
              setFormData({
                ...formData,
                rate: e.target.value,
              })
            }
          />

          <input
            value={formData.unit}
            onChange={(e) =>
              setFormData({
                ...formData,
                unit: e.target.value,
              })
            }
          />

          <button onClick={updateProduct}>
            Update Product
          </button>

          <hr />
        </div>
      )}

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Rate</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>₹{product.rate}</td>

              <td>
                <button
                  onClick={() => {
                    setEditingId(product.id);

                    setFormData({
                      name: product.name,
                      category: product.category,
                      stock: product.stock,
                      rate: product.rate,
                      unit: product.unit,
                    });
                  }}
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;
