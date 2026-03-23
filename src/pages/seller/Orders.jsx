import { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClient";
import { getOrdersBySeller, updateOrderStatus } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User not logged in");
        return;
      }

      const data = await getOrdersBySeller(user.id);
      setOrders(data);
    } catch (error) {
      console.error(error);
      alert("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert("Order updated!");
      fetchOrders(); // refresh
    } catch (error) {
      alert("Failed to update order");
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Seller Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ border: "1px solid #ccc", marginBottom: "15px", padding: "10px" }}>
            
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total:</strong> ₹{order.total_amount}</p>

            <h4>Items:</h4>
            {order.order_items.map((item, index) => (
              <div key={index}>
                <p>
                  {item.product?.name} — {item.quantity} × ₹{item.price_at_purchase}
                </p>
              </div>
            ))}

            <br />

            {/* Status buttons */}
            {order.status === "pending" && (
              <>
                <button onClick={() => handleStatusChange(order.id, "completed")}>
                  Mark Completed
                </button>

                <button onClick={() => handleStatusChange(order.id, "cancelled")}>
                  Cancel
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;