import { createContext, useState } from "react";

export const DataContext = createContext();

const genCode = () =>
  // kode pendek tapi unik untuk dipakai sebagai barcode
  (Date.now().toString(36) + Math.random().toString(36).slice(2, 8)).toUpperCase();

export const DataProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [stockHistory, setStockHistory] = useState([]);
  const [orders, setOrders] = useState([]);

  // ---------------------------
  // STOCK
  // ---------------------------
  const addStock = ({ name, quantity, satuan, price }) => {
    const now = new Date();

    const historyItem = {
      id: stockHistory.length + 1,
      name,
      quantity,
      satuan,
      price,
      timestamp: now,
    };
    setStockHistory((prev) => [...prev, historyItem]);

    setStocks((prev) => {
      const existing = prev.find((s) => s.name === name);
      if (existing) {
        return prev.map((s) =>
          s.name === name
            ? {
                ...s,
                quantity: s.quantity + quantity,
                price: s.price + price, // diasumsikan 'price' = total kumulatif
              }
            : s
        );
      }
      return [...prev, { id: prev.length + 1, name, quantity, satuan, price }];
    });
  };

  // ---------------------------
  // ORDER
  // ---------------------------
  const addOrder = ({ name, quantity, satuan }) => {
    setOrders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        quantity,
        satuan,
        price: 0, // kalau mau, bisa isi dari harga satuan * qty
        status: "Belum Diproses",
        date: "",
        time: "",
        driverCode: null, // barcode untuk driver
        outletCode: null, // barcode untuk outlet (dibuat setelah driver scan)
      },
    ]);
  };

  // konfirmasi pertama dari daftar order:
  // - set status "Menunggu Driver"
  // - kurangi stok
  // - generate driverCode
  const confirmOrder = (orderId) => {
    // set tanggal & jam + status + driverCode
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "Menunggu Driver",
              date: new Date().toLocaleDateString("id-ID"),
              time: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              driverCode: genCode(),
              outletCode: null,
            }
          : o
      )
    );

    // kurangi stok sesuai order
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    setStocks((prevStocks) =>
      prevStocks.map((s) =>
        s.name === order.name
          ? {
              ...s,
              quantity: s.quantity - order.quantity,
              // asumsi 'price' adalah total nilai stok; kurangi proporsional
              price:
                s.price -
                order.quantity * (s.price / (s.quantity || 1)),
            }
          : s
      )
    );
  };

  // driver scan barcode → status "Sedang Diantar" + generate outletCode
  const scanDriverCode = (orderId, code) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.driverCode === code
          ? { ...o, status: "Sedang Diantar", outletCode: genCode() }
          : o
      )
    );
  };

  // outlet scan barcode → status "Barang Diterima"
  const scanOutletCode = (orderId, code) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.outletCode === code
          ? { ...o, status: "Barang Diterima" }
          : o
      )
    );
  };

  // kalau mau pakai flow lama (ubah status manual), masih bisa tambahin di sini:
  const updateDeliveryStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  return (
    <DataContext.Provider
      value={{
        // state
        stocks,
        stockHistory,
        orders,
        // stock
        addStock,
        // order
        addOrder,
        confirmOrder,
        scanDriverCode,
        scanOutletCode,
        updateDeliveryStatus, // optional, masih disediakan
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
