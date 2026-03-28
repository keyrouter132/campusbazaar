import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../../supabaseClient';

function Signup() {
  const [email, setEmail] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    //  Empty check
    if (!email || !collegeId || !role || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    //  Email domain check
    if (!email.toLowerCase().endsWith("@xaviers.edu.in")) {
      alert("Use your official college email");
      return;
    }

    //  Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 🔹 Step 1: Validate against college_users table
    const { data: collegeUser } = await supabase
      .from("college_users")
      .select("*")
      .eq("college_id", collegeId)
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (!collegeUser) {
      alert("Invalid college credentials (ID or email does not match)");
      return;
    }

    // 🔹 Step 2: Signup (Supabase handles OTP/email verification)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    // 🔹 Step 3: Insert into users table
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: user.id,
          email,
          college_id: collegeId,
          role,
          seller_status: "pending",
        },
      ]);

    if (insertError) {
      alert(insertError.message);
      return;
    }

    alert("Signup successful! Please check your email to verify your account.");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your college email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Role Dropdown */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="auth-select"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="staff">Staff</option>
        </select>

        {/* College ID */}
        <input
          type="text"
          placeholder="Enter your College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Confirm Password */}
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