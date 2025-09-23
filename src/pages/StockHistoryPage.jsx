import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const StockHistoryPage = () => {
  const { name: rawName } = useParams();
  const name = decodeURIComponent(rawName || "");
  const { stockHistory } = useContext(DataContext);
  const navigate = useNavigate();

  const history = stockHistory.filter(
    (h) => String(h.name).toLowerCase() === name.toLowerCase()
  );

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  const totalQty = history.reduce((sum, h) => sum + h.quantity, 0);
  const totalPrice = history.reduce((sum, h) => sum + h.price, 0);

  return (
    <div className="p-4 sm:p-6 border rounded bg-white shadow-md">
      <div className="flex">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Kembali
        </button>
      </div>

      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Riwayat Stok: {name}
      </h2>

      {history.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada riwayat</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1 text-center">Tanggal</th>
                  <th className="border px-2 py-1 text-center">Jam</th>
                  <th className="border px-2 py-1 text-center">Nama Barang</th>
                  <th className="border px-2 py-1 text-center">Qty</th>
                  <th className="border px-2 py-1 text-center">Satuan</th>
                  <th className="border px-2 py-1 text-right">Harga</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => {
                  const d = new Date(h.timestamp);
                  const date = d.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  const time = d
                    .toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(":", ".");

                  return (
                    <tr key={h.id} className="hover:bg-gray-50">
                      <td className="border px-2 py-1 text-center">{date}</td>
                      <td className="border px-2 py-1 text-center">{time}</td>
                      <td className="border px-2 py-1 text-center">{h.name}</td>
                      <td className="border px-2 py-1 text-center">
                        {h.quantity}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {h.satuan}
                      </td>
                      <td className="border px-2 py-1 text-right">
                        {rupiah(h.price)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 border-t text-right text-sm font-semibold text-gray-700">
            <div>Total Quantity: {totalQty}</div>
            <div>Total Harga: {rupiah(totalPrice)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockHistoryPage;
