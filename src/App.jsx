
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


import BuyerDashboard from './pages/buyer/BuyerDashboard';
import ProductList from './pages/buyer/ProductList';
import ProductDetails from './pages/buyer/ProductDetails';
import Chat from './pages/buyer/Chat';

import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import SellerProductList from "./pages/seller/ProductList";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";


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
      <Route path="/buyer/products" element={<ProductList />} />
      <Route path="/buyer/products/:id" element={<ProductDetails />} />
      <Route path="/buyer/chat/:sellerId" element={<Chat />} />

      {/* Seller */}
      <Route path="/seller" element={<SellerDashboard />} />
      <Route path="/seller/products" element={<SellerProductList />} />
      <Route path="/seller/products/add" element={<AddProduct />} />
      <Route path="/seller/products/edit/:id" element={<EditProduct />} />


      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
