import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
  });

  const fetchStats = async () => {
    try {
      // 🔴 TEMP: replace with real user later
      const seller_id = "your-seller-uuid";

      // 1️⃣ Total Sales
      const { data: salesData } = await supabase
        .from("orders")
        .select("total_amount")
        .eq("seller_id", seller_id);

      const totalSales = salesData?.reduce(
        (sum, o) => sum + o.total_amount,
        0
      );

      // 2️⃣ Total Orders
      const { count: totalOrders } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("seller_id", seller_id);

      // 3️⃣ Total Products
      const { count: totalProducts } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("seller_id", seller_id);

      setStats({
        totalSales,
        totalOrders,
        totalProducts,
      });

    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Analytics</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={cardStyle}>
          <h3>💰 Total Sales</h3>
          <p>₹{stats.totalSales}</p>
        </div>

        <div style={cardStyle}>
          <h3>📦 Total Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>🛍️ Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

      </div>
    </div>
  );
};

const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
};

export default Analytics;