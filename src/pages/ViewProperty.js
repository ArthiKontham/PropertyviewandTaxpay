import "../styles/viewproperty.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewProperty() {

  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [mandals, setMandals] = useState([]);

  const [stateId, setStateId] = useState("");
  const [stateName, setStateName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [mandal, setMandal] = useState("");
  const [village, setVillage] = useState("");
  const [propertyNo, setPropertyNo] = useState("");
  const [name, setName] = useState("");
  const [father, setFather] = useState("");
  const [area, setArea] = useState("");

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/states")
      .then(res => res.json())
      .then(data => setStates(data));
  }, []);

  useEffect(() => {
    if(!stateId) return;
    fetch(`http://127.0.0.1:5000/districts/${stateId}`)
      .then(res => res.json())
      .then(data => setDistricts(data));
  }, [stateId]);

  useEffect(() => {
    if(!stateId) return;
    fetch(`http://127.0.0.1:5000/mandals/${stateId}`)
      .then(res => res.json())
      .then(data => setMandals(data));
  }, [stateId]);

  
  const getPropertyType = () => {
    const n = parseInt(propertyNo.replace("p",""));
    if(n>=101 && n<=110) return "Agriculture";
    if(n>=201 && n<=210) return "Commercial";
    if(n>=301 && n<=310) return "Residential";
    if(n>=401 && n<=410) return "Industrial";
    return "Unknown";
  };

  
  return (
    <div
  className="vp-container"
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/home-bg.png)`
  }}
>
      <div className="vp-overlay"></div>
              <div className="marquee-box">
        <marquee>
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6
          months. Check property details under the 'View Property' field.
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6
          months. Check property details under the 'View Property' field.
        </marquee>
      </div>

      <div className="header">
        <button className="nav-btn" onClick={()=>navigate("/home")}>🏠 Home</button>
        <button className="nav-btn active">👁 View Property</button>
        <button className="nav-btn" onClick={() => navigate("/taxpay")}>💰 Tax Pay</button>
      </div>
      <button className="logout-btn" onClick={() => navigate("/")}>
    Logout
  </button>
      
      {!showDetails && (
      <>
      
      <div className="land-title">Land Details</div>
      <div className="form-grid">
        <div className="field"><label>State</label>
          <input list="states" value={stateName} onChange={e=>{
            const s = states.find(x=>x.name===e.target.value);
            setStateName(e.target.value);
            setStateId(s?.id||"");
          }}/>
          <datalist id="states">{states.map(s=><option key={s.id} value={s.name}/>)}</datalist>
        </div>

        <div className="field"><label>District</label>
          <input list="districts" value={districtName} onChange={e=>setDistrictName(e.target.value)}/>
          <datalist id="districts">{districts.map(d=><option key={d.id} value={d.name}/>)}</datalist>
        </div>

        <div className="field"><label>Mandal</label>
          <input list="mandals" value={mandal} onChange={e=>setMandal(e.target.value)}/>
          <datalist id="mandals">{mandals.map(m=><option key={m.id} value={m.name}/>)}</datalist>
        </div>

        <div className="field"><label>Town / Village</label><input value={village} onChange={e=>setVillage(e.target.value)}/></div>
        <div className="field"><label>Property no</label><input value={propertyNo} onChange={e=>setPropertyNo(e.target.value)}/></div>
        <div className="field"><label>Name</label><input value={name} onChange={e=>setName(e.target.value)}/></div>
        <div className="field"><label>Father/Husband name</label><input value={father} onChange={e=>setFather(e.target.value)}/></div>
        <div className="field"><label>Area of land</label><input value={area} onChange={e=>setArea(e.target.value)}/></div>
      </div>

      <button className="ok-btn" onClick={()=>setShowDetails(true)}>OK</button>
      </>
      )}

      {showDetails && (
      <>
      <button className="back-btn" onClick={()=>setShowDetails(false)}>◀ Go Back</button>

      <div className="land-title">Land Details</div>

      <div className="photo-layout">

        <div className="left-col">
          <div className="row"><label>State:</label><input value={stateName} readOnly/></div>
          <div className="row"><label>District:</label><input value={districtName} readOnly/></div>
          <div className="row"><label>Mandal:</label><input value={mandal} readOnly/></div>
          <div className="row"><label>Town/Village:</label><input value={village} readOnly/></div>
        </div>

        <div className="mid-col">
          <div className="row"><label>Property no:</label><input value={propertyNo} readOnly/></div>
          <div className="row"><label>Name:</label><input value={name} readOnly/></div>
          <div className="row"><label>Father/Husband name:</label><input value={father} readOnly/></div>
          <div className="row"><label>Area of land:</label><input value={area + " acres"} readOnly/></div>
        </div>

        <div className="right-col">
          <div className="row"><label>Property type:</label><input value={getPropertyType()} readOnly/></div>
<div
  className="map-card"
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/map.png)`
  }}
>
  <span>Click here to see your Property on Map</span>
</div>

          <div
  className="map-card"
  style={{
    backgroundImage: `url(${process.env.PUBLIC_URL}/map-thumb.png)`
  }}
  onClick={() =>
    navigate("/property-map", {
      state: { propertyNo }
    })
  }
>
  <span>Click here to see your Property on Map.</span>
</div>


        </div>

      </div>
      </>
      )}
    </div>
  );
}
