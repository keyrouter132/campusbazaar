import { useEffect, useState } from "react";
import { getProductsBySeller, deleteProduct } from "../../services/productService";
import { supabase } from "../../services/supabaseClient";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // 🔴 TEMP (since auth not working fully)
      const seller_id = "your-seller-uuid";

      const data = await getProductsBySeller(seller_id);
      setProducts(data);

    } catch (error) {
      console.error(error);
      alert("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🗑 Delete product
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted!");
      fetchProducts(); // refresh
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <div key={product.id} style={cardStyle}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>💰 ₹{product.price}</p>
            <p>📦 Stock: {product.stock}</p>

            <button onClick={() => handleDelete(product.id)}>
              Delete
            </button>
            <button onClick={() => window.location.href = `/seller/edit-product/${product.id}`}>
                Edit
                </button>
          </div>
        ))
      )}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ccc",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
};

export default ProductList;