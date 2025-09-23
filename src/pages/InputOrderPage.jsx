import { useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

const InputOrderPage = () => {
  const { addOrder, stocks } = useContext(DataContext);
  const [form, setForm] = useState({ name: "", quantity: "", satuan: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const { name, quantity, satuan } = form;
    if (!name || !quantity || !satuan) {
      alert("Lengkapi semua input!");
      return;
    }

    addOrder({
      name,
      quantity: Number(quantity),
      satuan,
    });

    setForm({ name: "", quantity: "", satuan: "" });
  };

  return (
   <div className="card max-w-md mx-auto space-y-4">
  <h2 className="text-xl font-bold text-gray-800">Input Order</h2>

  <select
    name="name"
    className="input-form"
    value={form.name}
    onChange={(e) => {
      const selectedName = e.target.value;
      setForm({ ...form, name: selectedName });

      const stockItem = stocks.find((s) => s.name === selectedName);
      if (stockItem) {
        setForm((prev) => ({ ...prev, satuan: stockItem.satuan }));
      }
    }}
  >
    <option value="">-- Pilih Barang --</option>
    {stocks.map((s) => (
      <option key={s.id} value={s.name}>
        {s.name}
      </option>
    ))}
  </select>

  <input type="number" name="quantity" placeholder="Quantity" className="input-form" value={form.quantity} onChange={handleChange} />
  <input type="text" name="satuan" placeholder="Satuan" className="input-form" value={form.satuan} readOnly />

  <button className="btn-primary" onClick={handleSubmit}>Tambah Order</button>
</div>


  );
};

export default InputOrderPage;
