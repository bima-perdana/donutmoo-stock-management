import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import DashboardPage from "./pages/DashboardPage";
import AddPage from "./pages/AddPage";
import OrderPage from "./pages/OrderPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import FormStockOpname from "./pages/FormStockOpname";
import { DataProvider } from "./context/DataContext"; // ⬅️ tambahin ini

function App() {
  return (
    <DataProvider> {/* ⬅️ bungkus semua di sini */}
      <Router>
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/history/:name" element={<StockHistoryPage />} />
            <Route path="/opname" element={<FormStockOpname />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
