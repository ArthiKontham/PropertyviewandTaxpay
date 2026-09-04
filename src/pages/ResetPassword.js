import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent to your email");
    } catch (error) {
      alert("Failed to send reset link");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/logo.png" alt="logo" className="logo" />

        <h2 className="title">Property view and tax pay</h2>
        <h3 className="subtitle">Reset Your Password</h3>

        <p className="reset-text">
          Enter your email associated with your account and we'll send you a
          password reset link to your mail.
        </p>

        <div className="input-box">
          <input
            type="email"
            placeholder="examplemail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="primary-btn" onClick={handleReset}>
          Send Reset Link
        </button>

        <button className="secondary-btn" onClick={() => navigate("/login")}>
          Return to Login
        </button>
      </div>
    </div>
  );
}
