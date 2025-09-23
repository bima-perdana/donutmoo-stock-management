import { createContext, useState } from "react";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stockCounter, setStockCounter] = useState(1);
  const [orderCounter, setOrderCounter] = useState(1);

  // tambah stock
  const addStock = (item) => {
    const now = new Date();
    const newItem = {
      id: stockCounter,
      date: now.toLocaleDateString("id-ID"),
      time: now.toLocaleTimeString("id-ID"),
      ...item,
    };
    setStocks((prev) => [...prev, newItem]);
    setStockCounter((n) => n + 1);
  };

  // tambah order (tanpa harga dulu)
  const addOrder = (item) => {
    const now = new Date();
    const newOrder = {
      id: orderCounter,
      date: now.toLocaleDateString("id-ID"),
      time: now.toLocaleTimeString("id-ID"),
      status: "Belum Diproses",
      price: 0, // harga sementara
      ...item,
    };
    setOrders((prev) => [...prev, newOrder]);
    setOrderCounter((n) => n + 1);
  };

  // update status order
  const updateOrderStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status } : o
      )
    );

    // kalau status = Diproses → kurangi stock + isi harga
    if (status === "Diproses") {
      const orderItem = orders.find((o) => o.id === id);
      if (!orderItem) return;

      // cari stock barang
      setStocks((prev) =>
        prev.map((s) =>
          s.name === orderItem.name
            ? { ...s, quantity: s.quantity - orderItem.quantity }
            : s
        )
      );

      // update harga order dari stock
      const stockItem = stocks.find((s) => s.name === orderItem.name);
      if (stockItem) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === id ? { ...o, price: stockItem.price } : o
          )
        );
      }
    }
  };

  return (
    <DataContext.Provider
      value={{ stocks, addStock, orders, addOrder, updateOrderStatus }}
    >
      {children}
    </DataContext.Provider>
  );
};
