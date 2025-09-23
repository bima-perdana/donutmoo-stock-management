import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { orders, confirmOrder } = useContext(DataContext);
  const navigate = useNavigate();

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  return (
    <div className="card p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Daftar Order</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada order</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-center w-12">No</th>
                <th className="border px-2 py-1 text-center">Tanggal</th>
                <th className="border px-2 py-1 text-center">Waktu</th>
                <th className="border px-2 py-1 text-center">Nama Barang</th>
                <th className="border px-2 py-1 text-center">Qty</th>
                <th className="border px-2 py-1 text-center">Satuan</th>
                <th className="border px-2 py-1 text-center">Harga</th>
                <th className="border px-2 py-1 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">{i + 1}</td>
                  <td className="border px-2 py-1 text-center">{o.date || "-"}</td>
                  <td className="border px-2 py-1 text-center">{o.time || "-"}</td>
                  <td
                    className="border px-2 py-1 text-blue-600 cursor-pointer hover:underline text-center"
                    onClick={() => navigate(`/order/${o.id}`)}
                  >
                    {o.name}
                  </td>
                  <td className="border px-2 py-1 text-center">{o.quantity}</td>
                  <td className="border px-2 py-1 text-center">{o.satuan}</td>
                  <td className="border px-2 py-1 text-right">{rupiah(o.price)}</td>
                  <td className="border px-2 py-1 text-center">
                    {o.status === "Belum Diproses" ? (
                      <button
                        onClick={() => confirmOrder(o.id)}
                        className="w-full sm:w-auto px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Konfirmasi
                      </button>
                    ) : (
                      <span className="text-green-600 font-semibold">
                        {o.status}
                      </span>
                    )}
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

export default OrderPage;
