import { useState } from "react";
import { addProduct } from "../../services/productService";
import { supabase } from "../../services/supabaseClient";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // ✅ Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User not logged in");
        return;
      }

      // ✅ Create product object
      const newProduct = {
        seller_id: user.id,
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      // ✅ Call service
      await addProduct(newProduct);

      alert("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        description: "",
        price: "",
        stock: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;