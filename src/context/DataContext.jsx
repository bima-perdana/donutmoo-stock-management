import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [orders, setOrders] = useState([]);

  // tambah stock
  const addStock = ({ name, quantity, satuan, price }) => {
    const now = new Date();

    // simpan ke history (pakai timestamp utuh)
    const historyItem = {
      id: stockHistory.length + 1,
      name,
      quantity,
      satuan,
      price,
      timestamp: now, // ⬅️ simpan Date object
    };
    setStockHistory((prev) => [...prev, historyItem]);

    // update akumulasi stok
    setStocks((prev) => {
      const existing = prev.find((s) => s.name === name);
      if (existing) {
        return prev.map((s) =>
          s.name === name
            ? {
                ...s,
                quantity: s.quantity + quantity,
                price: s.price + price,
              }
            : s
        );
      } else {
        return [
          ...prev,
          { id: prev.length + 1, name, quantity, satuan, price },
        ];
      }
    });
  };

  // tambah order
  const addOrder = ({ name, quantity, satuan }) => {
    const now = new Date();
    setOrders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        quantity,
        satuan,
        timestamp: now, // simpan Date object juga
        price: 0,
        status: "Belum Diproses",
      },
    ]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <DataContext.Provider
      value={{ stocks, stockHistory, addStock, orders, addOrder, updateOrderStatus }}
    >
      {children}
    </DataContext.Provider>
  );
};
