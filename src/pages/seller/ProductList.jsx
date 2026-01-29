import "./ProductList.css";

function ProductList() {
  const products = [
    {
      id: 1,
      name: "Notebook",
      price: 100,
      stock: 20,
      image:
        "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Pen",
      price: 20,
      stock: 0,
      image:
        "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Calculator",
      price: 500,
      stock: 5,
      image:
        "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="product-page">
      <h1 className="page-title">Your Products</h1>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p className={p.stock === 0 ? "out" : ""}>
              Stock: {p.stock}
            </p>

            <div className="actions">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
