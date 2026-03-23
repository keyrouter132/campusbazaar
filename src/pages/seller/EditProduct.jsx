import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabaseClient";
import { updateProduct } from "../../services/productService";

const EditProduct = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  });

  const [loading, setLoading] = useState(true);

  // 📦 Fetch product details
  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setForm({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
      });

    } catch (error) {
      console.error(error);
      alert("Error loading product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  // ✏️ Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 💾 Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
      });

      alert("Product updated!");

      navigate("/seller/products");

    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate} style={{ maxWidth: "400px" }}>
        
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />

        <br /><br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <br /><br />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />

        <br /><br />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />

        <br /><br />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;