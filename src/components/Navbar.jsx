import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <div className="nav-left">
        <h2>CampusBazaar</h2>
      </div>

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products, shops, or categories..."
        />
      </div>

      <div className='nav-actions'>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/buyer/cart">🛒 Cart</Link>
        <Link to="/buyer/become-seller">
          <button>Become a Seller</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;