import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProductCard from "../../components/ProductCard";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setProducts(data);
    }
  }

  return (
    <div className="product-page">

      <div className="product-header">
        <h2>All Products</h2>
        <p>Browse campus products from student sellers</p>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </div>
  );
}

export default ProductList;
