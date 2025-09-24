import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [orders, setOrders] = useState([]);

  const API_URL = "http://localhost:5000/api";

  // ambil semua data awal dari backend
  useEffect(() => {
    fetchStocks();
    fetchOrders();
  }, []);

  // ================== STOCK ==================
  const fetchStocks = async () => {
    try {
      const res = await fetch(`${API_URL}/stocks`);
      const data = await res.json();
      setStocks(data);
    } catch (err) {
      console.error("Error fetch stocks:", err);
    }
  };

  const addStock = async ({ name, quantity, satuan, price }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/stocks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // hanya role tertentu
        },
        body: JSON.stringify({ name, quantity, satuan, price }),
      });
      const data = await res.json();

      // update state lokal
      setStocks((prev) => [...prev, data]);
      setStockHistory((prev) => [...prev, { ...data, timestamp: new Date() }]);
    } catch (err) {
      console.error("Error add stock:", err);
    }
  };

  // ================== ORDERS ==================
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetch orders:", err);
    }
  };

  const addOrder = async ({ name, quantity, satuan }) => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, quantity, satuan, price: 0 }),
      });
      const data = await res.json();

      setOrders((prev) => [...prev, data]);
    } catch (err) {
      console.error("Error add order:", err);
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Menunggu Driver" }),
      });
      const updated = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );

      // kurangi stok lokal
      setStocks((prev) =>
        prev.map((s) =>
          s.name === updated.name
            ? { ...s, quantity: s.quantity - updated.quantity }
            : s
        )
      );
    } catch (err) {
      console.error("Error confirm order:", err);
    }
  };

  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updated = await res.json();

      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o))
      );
    } catch (err) {
      console.error("Error update delivery status:", err);
    }
  };

  return (
    <DataContext.Provider
      value={{
        stocks,
        stockHistory,
        orders,
        addStock,
        addOrder,
        confirmOrder,
        updateDeliveryStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
