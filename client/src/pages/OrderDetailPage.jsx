import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import QRCode from "react-qr-code"; // ganti dari qrcode.react

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { orders } = useContext(DataContext);

  const order = orders.find((o) => o.id === Number(id));

  if (!order) {
    return (
      <div className="p-4 sm:p-6">
        <p className="text-red-500">Order tidak ditemukan</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 border rounded bg-white shadow-md">
      <h2 className="text-xl font-bold mb-4">Detail Order</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <p><strong>Nama Barang:</strong> {order.name}</p>
        <p><strong>Quantity:</strong> {order.quantity} {order.satuan}</p>
        <p><strong>Tanggal:</strong> {order.date || "-"}</p>
        <p><strong>Waktu:</strong> {order.time || "-"}</p>
        <p className="sm:col-span-2"><strong>Status:</strong> {order.status}</p>
      </div>

      {order.status === "Menunggu Driver" && order.driverCode && (
        <div className="mt-6 flex flex-col items-center text-center">
          <h3 className="font-semibold mb-2">QR Code untuk Driver</h3>
          <QRCode value={order.driverCode} size={180} />
          <div className="text-sm text-gray-600 mt-2">
            Kode: <span className="font-mono">{order.driverCode}</span>
          </div>
        </div>
      )}

      {order.status === "Sedang Diantar" && order.outletCode && (
        <div className="mt-6 flex flex-col items-center text-center">
          <h3 className="font-semibold mb-2">QR Code untuk Outlet</h3>
          <QRCode value={order.outletCode} size={180} />
          <div className="text-sm text-gray-600 mt-2">
            Kode: <span className="font-mono">{order.outletCode}</span>
          </div>
        </div>
      )}

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white rounded"
        >
          Kembali
        </button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
