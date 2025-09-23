import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const DashboardPage = () => {
  const { stocks } = useContext(DataContext);

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

  return (
    <div className="p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Daftar Stock</h2>
      {stocks.length === 0 ? (
        <p className="text-gray-500">Stock Kosong</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Nama Barang</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Satuan</th>
              <th className="border px-2 py-1">Harga</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => (
              <tr key={s.id}>
                <td className="border px-2 py-1">{s.id}</td>
                <td className="border px-2 py-1">{s.name}</td>
                <td className="border px-2 py-1">{s.quantity}</td>
                <td className="border px-2 py-1">{s.satuan}</td>
                <td className="border px-2 py-1">{rupiah(s.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardPage;
