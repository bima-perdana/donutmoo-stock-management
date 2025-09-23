import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const AddStockPage = () => {
  const { addStock } = useContext(DataContext);
  const [form, setForm] = useState({ name: "", quantity: "", satuan: "", price: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { name, quantity, satuan, price } = form;
    if (!name || !quantity || !satuan || !price) {
      alert("Lengkapi semua input!");
      return;
    }

    addStock({ name, quantity: Number(quantity), satuan, price: Number(price) });
    setForm({ name: "", quantity: "", satuan: "", price: "" });
    navigate("/");
  };

  return (
    <div className="card max-w-lg mx-auto space-y-4 p-4 sm:p-6">
      <h2 className="text-xl font-bold text-gray-800 text-center">Tambah Stock</h2>

      <div className="flex flex-col gap-3">
        <input name="name" placeholder="Nama Barang" className="input-form" value={form.name} onChange={handleChange} />
        <input type="number" name="quantity" placeholder="Quantity" className="input-form" value={form.quantity} onChange={handleChange} />
        <select name="satuan" className="input-form" value={form.satuan} onChange={handleChange}>
          <option value="">-- Pilih Satuan --</option>
          <option>Kilogram</option><option>Gram</option><option>Liter</option>
          <option>ML</option><option>Pcs</option><option>Pack</option><option>Pouch</option>
        </select>
        <input type="number" name="price" placeholder="Harga" className="input-form" value={form.price} onChange={handleChange} />
      </div>

      <div className="flex justify-center">
        <button onClick={handleSubmit} className="btn-primary w-40 sm:w-48">
          Tambah
        </button>
      </div>
    </div>
  );
};

export default AddStockPage;
