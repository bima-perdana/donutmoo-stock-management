// src/pages/AddPage.jsx
import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

const AddPage = () => {
  const { addStock } = useContext(DataContext);
  const [form, setForm] = useState({ name: "", quantity: "", satuan: "", price: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { name, quantity, satuan, price } = form;
    if (!name || !quantity || !satuan || !price) return alert("Lengkapi semua input!");
    addStock({
      name,
      quantity: Number(quantity),
      satuan,
      price: Number(price),
    });
    setForm({ name: "", quantity: "", satuan: "", price: "" });
  };

  return (
    <div className="p-6 border rounded flex flex-col gap-4">
      <h2 className="text-xl font-bold">Tambah Stock</h2>

      <input name="name" placeholder="Nama Barang" className="input-form" value={form.name} onChange={handleChange} />
      <input type="number" name="quantity" placeholder="Quantity" className="input-form" value={form.quantity} onChange={handleChange} />
      <select name="satuan" className="input-form" value={form.satuan} onChange={handleChange}>
        <option value="">-- Pilih Satuan --</option>
        <option>Kilogram</option><option>Gram</option><option>Liter</option>
        <option>ML</option><option>Pcs</option><option>Pack</option><option>Pouch</option>
      </select>
      <input type="number" name="price" placeholder="Harga" className="input-form" value={form.price} onChange={handleChange} />

      <button className="btn-login" onClick={handleSubmit}>Tambah</button>
    </div>
  );
};

export default AddPage;
