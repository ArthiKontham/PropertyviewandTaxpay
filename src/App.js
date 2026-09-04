import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import ViewProperty from "./pages/ViewProperty";
import ProtectedRoute from "./components/ProtectedRoute";
import PropertyMap from "./pages/PropertyMap";
import TaxPay from "./pages/TaxPay";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/view-property"
          element={
            <ProtectedRoute>
              <ViewProperty />
            </ProtectedRoute>
          }
        />
        <Route path="/property-map" element={<PropertyMap/>}/>
        <Route path="/taxpay" element={<TaxPay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
