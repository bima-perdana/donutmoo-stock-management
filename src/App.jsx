import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import OrderPage from "./pages/OrderPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import InputOrderPage from "./pages/InputOrderPage";
import AddStockPage from "./pages/AddStockPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import FormStockOpname from "./pages/FormStockOpname";
import ScanPage from "./pages/ScanPage";
import Navbar from "./components/Navbar"; // ⬅️ pastiin Navbar dipanggil

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* ⬅️ taro di atas biar muncul di semua halaman */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/order/:id" element={<OrderDetailPage />} />
          <Route path="/inputorder" element={<InputOrderPage />} />
          <Route path="/add" element={<AddStockPage />} />
          <Route path="/history/:name" element={<StockHistoryPage />} />
          <Route path="/opname" element={<FormStockOpname />} />
          <Route path="/scan" element={<ScanPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
