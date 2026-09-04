import "../styles/auth.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Signup() {

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);

  /* -------- USERNAME VALIDATION -------- */

  const handleUsernameChange = async (e) => {
    let value = e.target.value
      .toLowerCase()
      .replace(/\s/g, "");   // remove spaces

    setUsername(value);

    if (value.length < 4) {
      setUsernameError("Username must be at least 4 characters");
      return;
    }

    // Check if username exists
    const userRef = doc(db, "usernames", value);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      setUsernameError("Username already taken");
    } else {
      setUsernameError("");
    }
  };

  /* -------- SIGNUP -------- */

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    if (usernameError) {
      alert(usernameError);
      return;
    }

    try {
      setLoading(true);

      // Check again before creating user (extra safety)
      const userRef = doc(db, "usernames", username);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        alert("Username already taken");
        setLoading(false);
        return;
      }

      // Create auth account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Save username mapping
      await setDoc(doc(db, "usernames", username), {
        uid: userCredential.user.uid,
        email: email.trim()
      });

      // SUCCESS → Redirect
      navigate("/home");

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already registered. Please login.");
      } else {
        alert(error.message);
      }
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/logo.png" alt="logo" className="logo" />

        <h2 className="title">Property view and tax pay</h2>
        <h3 className="subtitle">Sign up</h3>

        {/* USERNAME */}
        <div className="input-box">
          <span>👤</span>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        {username && !usernameError && username.length >= 4 && (
          <p style={{ color: "green", fontSize: "13px" }}>
            ✓ Username available
          </p>
        )}

        {usernameError && (
          <p style={{ color: "red", fontSize: "13px" }}>
            {usernameError}
          </p>
        )}

        {/* EMAIL */}
        <div className="input-box">
          <span>✉️</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>

        {/* PASSWORD */}
        <div className="input-box">
          <span>🔒</span>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="show-btn"
            onClick={() => setShow(!show)}
            type="button"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <button
          className="primary-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign up"}
        </button>

        <p className="or-text">or</p>

        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}