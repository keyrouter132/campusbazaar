import { completeOrder } from "../../services/orderService";

function Orders() {
  const orders = [
    { id: "ORDER123", status: "Pending" },
    { id: "ORDER124", status: "Completed" },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Seller Orders</h1>

      {orders.map((o) => (
        <div key={o.id} style={{ marginBottom: "10px" }}>
          <span>{o.id} - {o.status}</span>

          {o.status === "Pending" && (
            <button onClick={() => completeOrder(o.id)}>
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Orders;
