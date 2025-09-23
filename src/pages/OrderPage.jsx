import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const OrderPage = () => {
  const { orders, updateOrderStatus } = useContext(DataContext);

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(v || 0);

  const statuses = ["Belum Diproses", "Diproses", "Diantar", "Diterima"];

  // helper buat amanin tanggal
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";

    // kalau formatnya DD/MM/YYYY
    if (dateStr.includes("/")) {
      const [day, month, year] = dateStr.split("/");
      return new Date(`${year}-${month}-${day}`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    // default: coba parse ISO atau format lain
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr; // fallback biar gak "Invalid Date"
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Daftar Order</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada order</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-center w-12">No</th>
              <th className="border px-2 py-1 text-center">Tanggal</th>
              <th className="border px-2 py-1 text-center">Waktu</th>
              <th className="border px-2 py-1 text-center">Nama Barang</th>
              <th className="border px-2 py-1 text-center">Qty</th>
              <th className="border px-2 py-1 text-center">Satuan</th>
              <th className="border px-2 py-1 text-center">Harga</th>
              <th className="border px-2 py-1 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1 text-center">{i + 1}</td>
                <td className="border px-2 py-1 text-center">
                  {formatDate(o.date)}
                </td>
                <td className="border px-2 py-1 text-center">{o.time}</td>
                <td className="border px-2 py-1 text-center">{o.name}</td>
                <td className="border px-2 py-1 text-center">{o.quantity}</td>
                <td className="border px-2 py-1 text-center">{o.satuan}</td>
                <td className="border px-2 py-1 text-right">{rupiah(o.price)}</td>
                <td className="border px-2 py-1 text-center">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="input-form"
                  >
                    {statuses.map((st, idx) => (
                      <option key={idx} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderPage;
