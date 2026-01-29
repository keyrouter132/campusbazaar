import "./AddProduct.css";

function AddProduct() {
  return (
    <div className="add-product-page">
      <h1>Add Product</h1>

      <form className="add-product-form">
        <input type="text" placeholder="Product Name" />
        <input type="number" placeholder="Price" />
        <input type="number" placeholder="Stock" />
        <input type="text" placeholder="Image URL" />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
