import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signUpUser } from '../../services/authService';

function Signup() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // ✅ Basic validation
      if (!uid || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // ✅ Call signup service
      await signUpUser(uid, password);

      alert("Signup successful!");

      // Redirect to login
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter your UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleSignup}>Signup</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;