import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Navbar from "./components/navbar";
import DashboardPage from "./pages/DashboardPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import InputOrderPage from "./pages/InputOrderPage";
import AddStockPage from "./pages/AddStockPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import FormStockOpname from "./pages/FormStockOpname";
import ScanPage from "./pages/ScanPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navbar />}

      <div className="p-4">
        <Routes>
          {!user ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order/:id" element={<OrderDetailPage />} />
              <Route path="/inputorder" element={<InputOrderPage />} />
              <Route path="/add" element={<AddStockPage />} />
              <Route path="/history/:name" element={<StockHistoryPage />} />
              <Route path="/opname" element={<FormStockOpname />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
