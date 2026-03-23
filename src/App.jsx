
/*function App() {
  return <h1>CampusBazaar</h1>;
}

export default App;
*/
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';

import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import BecomeSeller from './pages/buyer/BecomeSeller';
import EditProduct from "./pages/seller/EditProduct";

import BuyerDashboard from './pages/buyer/BuyerDashboard';
// Buyer side
import BuyerProductList from './pages/buyer/ProductList';
import ProductDetails from './pages/buyer/ProductDetails';
import Chat from './pages/buyer/Chat';
import CreateShop from './pages/seller/CreateShop';
import AddProduct from "./pages/seller/AddProducts.jsx";
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import Orders from "./pages/seller/Orders";
import Analytics from "./pages/seller/Analytics";
// Seller side
import SellerProductList from './pages/seller/ProductList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/buyer/become-seller" element={<BecomeSeller />} />


      {/* Buyer */}
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path="/buyer/products" element={<BuyerProductList />} />
      <Route path="/buyer/products/:id" element={<ProductDetails />} />
      <Route path="/buyer/chat/:sellerId" element={<Chat />} />

      {/* Seller */}
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/seller/create-shop" element={<CreateShop />} />  
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/seller/orders" element={<Orders />} />
      <Route path="/seller/analytics" element={<Analytics />} />
      <Route path="/seller/products" element={<SellerProductList />} />
      <Route path="/seller/edit-product/:id" element={<EditProduct />} />

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
