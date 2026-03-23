import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginUser } from '../../services/authService';

function Login() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser(uid, password);

      alert("Login successful!");

      // Redirect after login
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to CampusBazaar</h2>

        <input
          type="text"
          placeholder="Enter your UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        <p className="auth-link">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;