import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/logo.png" alt="logo" className="logo" />

        <h2 className="title">Property view and tax pay</h2>
        <h3 className="subtitle">Login</h3>

        <div className="input-box">
          <span>✉️</span>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <span>🔒</span>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="show-btn" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <div className="forgot">
          <span onClick={() => navigate("/reset")}>Forgot Password?</span>
        </div>

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="or-text">or</p>

        <p className="switch-text">
          Need an account?{" "}
          <span onClick={() => navigate("/")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
