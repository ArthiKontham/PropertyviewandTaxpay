import "../styles/home.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/home-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="home-overlay"></div>
      <div className="marquee-box">
        <marquee>
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6 or 12 months
          months. Check property details under the 'View Property' field.
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6 or 12 months
          months. Check property details under the 'View Property' field.
        </marquee>
      </div>

<div className="header">
  <div className="navbar">

    <button className="nav-btn active">🏠 Home</button>
    <button className="nav-btn"onClick={() => navigate("/view-property")}>👁 View Property</button>
    <button className="nav-btn" onClick={() => navigate("/taxpay")}>💰 Tax Pay</button>
  </div>
      <button className="logout-btn" onClick={() => navigate("/")}>
    Logout
  </button>

</div>
      <div className="home-content">
  <p>
    ➤ Click on <b>“View Property”</b> to view your property by entering the
    required details.
  </p>

  <p>
    ➤ Click on <b>“Tax Pay”</b> to pay your tax for <b>3 months, 6 months, or yearly</b>
    for Vacant, Agricultural, Residential, or Commercial property.
  </p>

  <p>
    ➤ Users can check the <b>Home page</b> for the latest <b>government updates</b>,
    tax announcements, due dates, and payment-related notifications.
  </p>

  <p>
    ➤ Users can <b>download or reprint tax payment receipts</b> anytime using their
    registered property number and mobile number.
  </p>

  <p>
    ➤ The portal provides <b>secure and easy payment options</b> such as Card and UPI
    for hassle-free tax payment.
  </p>
</div>
    </div>
  );
}