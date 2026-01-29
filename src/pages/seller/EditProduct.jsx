import { useParams } from "react-router-dom";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();

  // Dummy product (simulate fetched data)
  const product = {
    name: "Notebook",
    price: 100,
    stock: 20,
    image: "https://via.placeholder.com/150",
  };

  return (
    <div className="edit-product-page">
      <h1>Edit Product</h1>
      <p className="product-id">Product ID: {id}</p>

      <form className="edit-product-form">
        <input type="text" defaultValue={product.name} />
        <input type="number" defaultValue={product.price} />
        <input type="number" defaultValue={product.stock} />
        <input type="text" defaultValue={product.image} />

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default EditProduct;
