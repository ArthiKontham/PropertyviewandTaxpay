import "../styles/taxpay.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaxPay() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [propertyNo, setPropertyNo] = useState("");
  const [mobile, setMobile] = useState("");
  const [duration, setDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [payMethod, setPayMethod] = useState("");

  const [txnId, setTxnId] = useState("");
  const [date, setDate] = useState("");

  /* ---------------- TAX LOGIC ---------------- */
  const getAutoAmount = (pno) => {
    const n = parseInt(pno.replace("p", ""));
    if (n >= 101 && n <= 110) return 30000 + (n - 101) * 2500;
    if (n >= 201 && n <= 210) return 4000000 + (n - 201) * 150000;
    if (n >= 301 && n <= 310) return 120000 + (n - 301) * 5000;
    if (n >= 401 && n <= 410) return 800000 + (n - 401) * 20000;
    return 5000;
  };

  /* ---------------- SAVE RECEIPT ---------------- */
  const saveReceipt = () => {
    const receipt = {
      propertyNo,
      mobile,
      duration,
      amount,
      payMethod,
      txnId,
      date,
      status: "Paid Successfully"
    };
    localStorage.setItem(
      `receipt-${propertyNo}-${mobile}`,
      JSON.stringify(receipt)
    );
  };

  /* ---------------- PRINT ---------------- */
  const handlePrint = () => {
    const printContent = document.getElementById("print-area").innerHTML;
    const win = window.open("", "", "width=800,height=600");

    win.document.write(`
      <html>
        <head>
          <title>Payment Receipt</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align:center; }
            .row { display:flex; justify-content:space-between; margin:8px 0; }
          </style>
        </head>
        <body>
          <h2>Property Tax Payment Receipt</h2>
          ${printContent}
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  /* ---------------- AFTER PAYMENT ---------------- */
  const completePayment = (method) => {
    setPayMethod(method);
    setTxnId("TXN" + Date.now());
    setDate(new Date().toLocaleString());
    setTimeout(() => {
      saveReceipt();
      setStep(5);
    }, 1200);
  };

  return (
    <div
      className="tax-container"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/home-bg.png)` }}
    >
      <div className="tax-overlay"></div>
      <div className="marquee-box">
        <marquee>
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6 or 12 months
          months. Check property details under the 'View Property' field.
          Pay your tax by clicking the 'Tax Pay' field, preferably for 3 or 6 or 12 months
          months. Check property details under the 'View Property' field.
        </marquee>
      </div>
      <div className="header">
        <button className="nav-btn" onClick={() => navigate("/home")}>🏠 Home</button>
        <button className="nav-btn" onClick={() => navigate("/view-property")}>👁 View Property</button>
        <button className="nav-btn active">💰 Tax Pay</button>
      </div>
     <button className="logout-btn" onClick={() => navigate("/")}>
    Logout
  </button>

      <div className="tax-title">Property Tax Payment</div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="tax-card">
          <input
            placeholder="Property Number"
            value={propertyNo}
            onChange={(e) => setPropertyNo(e.target.value)}
          />
          <input
            placeholder="Registered Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <div className="btn-row">
            <button
              className="ok-btn"
              onClick={() => {
                if (!propertyNo || !mobile) return alert("Fill all fields");
                setAmount(getAutoAmount(propertyNo));
                setStep(2);
              }}
            >
              Submit
            </button>

            <button
              className="ok-btn"
              onClick={() => {
                setPropertyNo("");
                setMobile("");
              }}
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="tax-card">
          <h3>Select Duration</h3>

          <select value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="">Select</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="Yearly">Yearly</option>
          </select>

          <input
            type="number"
            placeholder="Enter Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button className="ok-btn" onClick={() => setStep(3)}>
            OK
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="tax-card">
          <h3>Select Payment Method</h3>

          <div className="btn-row">
            <button className="ok-btn" onClick={() => setStep(4)}>
              Credit / Debit Card
            </button>
            <button className="ok-btn" onClick={() => setStep(6)}>
              UPI
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Amount: ₹{amount}
          </p>
        </div>
      )}

      {/* STEP 4 — CARD */}
      {step === 4 && (
        <div className="tax-card">
          <input placeholder="Card Number" />
          <input placeholder="Name on Card" />
          <input placeholder="MM/YY" />
          <input placeholder="CVV" />

          <button className="ok-btn" onClick={() => completePayment("Card")}>
            Pay ₹{amount}
          </button>
        </div>
      )}

      {/* STEP 6 — UPI */}
      {step === 6 && (
        <div className="tax-card">
          <h3>Select UPI App</h3>

          <div className="upi-row">
            <img src="/upi/gpay.png" alt="gpay"
              onClick={() => {
                window.open("https://pay.google.com", "_blank");
                completePayment("Google Pay");
              }} />

            <img src="/upi/Phonepe.png" alt="phonepe"
              onClick={() => {
                window.open("https://www.phonepe.com", "_blank");
                completePayment("PhonePe");
              }} />

            <img src="/upi/paytm.png" alt="paytm"
              onClick={() => {
                window.open("https://paytm.com", "_blank");
                completePayment("Paytm");
              }} />
          </div>
        </div>
      )}

      {/* STEP 5 — RECEIPT */}
      {step === 5 && (
        <div className="tax-card" id="print-area">
          <h3>Payment Receipt</h3>

          <p><b>Property No:</b> {propertyNo}</p>
          <p><b>Mobile:</b> {mobile}</p>
          <p><b>Duration:</b> {duration}</p>
          <p><b>Amount:</b> ₹{amount}</p>
          <p><b>Payment Method:</b> {payMethod}</p>
          <p><b>Transaction ID:</b> {txnId}</p>
          <p><b>Date:</b> {date}</p>
          <p><b>Status:</b> Paid Successfully</p>
          <button className="ok-btn" onClick={handlePrint}>
            🖨 Print Receipt
          </button>
        </div>
      )}
    </div>
  );
}
