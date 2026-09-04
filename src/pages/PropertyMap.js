import "../styles/viewproperty.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function PropertyMap() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const propertyNo = state?.propertyNo || "";

  const getDetails = () => {
    const n = parseInt(propertyNo.replace("p",""));

    if (n >= 101 && n <= 110) return { type: "Agriculture", folder: "agriculture", index: n - 100 };
    if (n >= 201 && n <= 210) return { type: "Commercial", folder: "commercial", index: n - 200 };
    if (n >= 301 && n <= 310) return { type: "Residential", folder: "residential", index: n - 300 };
    if (n >= 401 && n <= 410) return { type: "Industrial", folder: "industrial", index: n - 400 };

    return { type: "Unknown", folder: "", index: 1 };
  };

  const { type, folder, index } = getDetails();

  const imagePath = folder
    ? `/maps/${folder}/${folder}${index}.png`
    : `/map.png`;

  return (
    <div className="vp-container" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL}/home-bg.png)`
    }}>
      <div className="vp-overlay"></div>

      <div className="header">
        <button className="nav-btn" onClick={() => navigate("/home")}>Home</button>
        <button className="nav-btn active">View Property</button>
        <button className="nav-btn">Tax Pay</button>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>◀ Go Back</button>

      <div className="land-title">{type} Property Location</div>

      <div style={{
        position: "relative",
        zIndex: 2,
        width: "420px",
        margin: "40px auto",
        background: "white",
        padding: "12px",
        borderRadius: "14px",
        boxShadow: "0 6px 18px rgba(0,0,0,.35)"
      }}>
        <img
          src={imagePath}
          alt={type}
          style={{ width: "100%", borderRadius: "10px" }}
          onError={(e)=>{ e.target.src="/map.png"; }}
        />
      </div>
    </div>
  );
}
