import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const OrderPage = () => {
  const { orders, updateOrderStatus } = useContext(DataContext);

  const rupiah = (v) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v || 0);

  const statuses = ["Belum Diproses", "Diproses", "Diantar", "Diterima"];

  return (
    <div className="p-6 border rounded">
      <h2 className="text-xl font-bold mb-4">Daftar Order</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">Belum ada order</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">No</th>
              <th className="border px-2 py-1">Tanggal</th>
              <th className="border px-2 py-1">Jam</th>
              <th className="border px-2 py-1">Nama Barang</th>
              <th className="border px-2 py-1">Qty</th>
              <th className="border px-2 py-1">Satuan</th>
              <th className="border px-2 py-1">Harga</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="border px-2 py-1">{o.id}</td>
                <td className="border px-2 py-1">{o.date}</td>
                <td className="border px-2 py-1">{o.time}</td>
                <td className="border px-2 py-1">{o.name}</td>
                <td className="border px-2 py-1">{o.quantity}</td>
                <td className="border px-2 py-1">{o.satuan}</td>
                <td className="border px-2 py-1">{rupiah(o.price)}</td>
                <td className="border px-2 py-1">
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="input-form"
                  >
                    {statuses.map((st, i) => (
                      <option key={i} value={st}>
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
