import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { stocks } = useContext(DataContext);
  const navigate = useNavigate();

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  return (
    <div className="p-4 sm:p-6 border rounded bg-white shadow-md">
      {/* Header + tombol tambah stock */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <h2 className="text-xl font-bold">Daftar Stock</h2>
        <button
          onClick={() => navigate("/add")}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Tambah Stock
        </button>
      </div>

      {/* isi tabel stock */}
      {stocks.length === 0 ? (
        <p className="text-gray-500 italic">Stock kosong</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-2 py-1 text-center w-12">No</th>
                <th className="border px-2 py-1 text-center">Nama Barang</th>
                <th className="border px-2 py-1 text-center">Qty</th>
                <th className="border px-2 py-1 text-center">Satuan</th>
                <th className="border px-2 py-1 text-right">Total Harga</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s, i) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">{i + 1}</td>
                  <td
                    className="border px-2 py-1 text-blue-600 cursor-pointer hover:underline text-center"
                    onClick={() => navigate(`/history/${s.name}`)}
                  >
                    {s.name}
                  </td>
                  <td className="border px-2 py-1 text-center">{s.quantity}</td>
                  <td className="border px-2 py-1 text-center">{s.satuan}</td>
                  <td className="border px-2 py-1 text-right">
                    {rupiah(s.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
