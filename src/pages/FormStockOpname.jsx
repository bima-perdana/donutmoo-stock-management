// src/pages/FormStockOpname.jsx
import { useState } from "react";
import { format, addDays, subDays } from "date-fns";

const EditableCell = ({ value, onChange }) => {
  const [editing, setEditing] = useState(!value);
  const [draft, setDraft] = useState(value || "");

  const handleBlur = () => {
    setEditing(false);
    onChange(draft);
  };

  return editing ? (
    <input
      type="text"
      autoFocus
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleBlur}
      className="w-full px-2 py-1 border rounded"
    />
  ) : (
    <div
      className="cursor-pointer px-2 py-1"
      onClick={() => setEditing(true)}
    >
      {value || <span className="text-gray-400 italic">klik isi</span>}
    </div>
  );
};

const FormStockOpname = () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const [currentDate, setCurrentDate] = useState(today);

  // simpan data opname per tanggal
  const [dataByDate, setDataByDate] = useState({
    [today]: [
      { id: 1, name: "Donat", saldoAwal: "", barangMasuk: "", saldoAkhir: "" },
    ],
  });

  const rows = dataByDate[currentDate] || [];

  const handleChange = (id, field, value) => {
    setDataByDate((prev) => ({
      ...prev,
      [currentDate]: prev[currentDate].map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      ),
    }));
  };

  const addRow = () => {
    setDataByDate((prev) => ({
      ...prev,
      [currentDate]: [
        ...(prev[currentDate] || []),
        {
          id: (prev[currentDate]?.length || 0) + 1,
          name: "",
          saldoAwal: "",
          barangMasuk: "",
          saldoAkhir: "",
        },
      ],
    }));
  };

  const deleteRow = (id) => {
    setDataByDate((prev) => ({
      ...prev,
      [currentDate]: prev[currentDate].filter((row) => row.id !== id),
    }));
  };

  const changeDate = (direction) => {
    const newDate = format(
      direction === "next"
        ? addDays(new Date(currentDate), 1)
        : subDays(new Date(currentDate), 1),
      "yyyy-MM-dd"
    );

    setDataByDate((prev) => {
      if (!prev[newDate]) {
        if (direction === "next") {
          // ambil data dari hari sebelumnya (hanya kalau sudah simpan)
          const prevRows = prev[currentDate] || [];
          return {
            ...prev,
            [newDate]: prevRows.map((row) => ({
              ...row,
              saldoAwal: row.saldoAkhir || "", // saldo akhir kemarin jadi saldo awal
              barangMasuk: "",                  // reset
              saldoAkhir: "",                   // reset
            })),
          };
        } else {
          // kalau ke prev tapi belum ada → biarin kosong
          return { ...prev, [newDate]: [] };
        }
      }
      return prev;
    });

    setCurrentDate(newDate);
  };

  const handleSubmit = () => {
    console.log("Data opname tersimpan:", currentDate, rows);
    alert(`Data opname untuk ${currentDate} tersimpan!`);
    // gak perlu logic tambahan di sini, karena dataByDate udah ke-update onChange
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Form Stock Opname</h2>

      {/* navigasi tanggal */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => changeDate("prev")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Prev
        </button>
        <div className="font-semibold">{currentDate}</div>
        <button
          onClick={() => changeDate("next")}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next →
        </button>
      </div>

      {/* header */}
      <div className="grid grid-cols-4 font-semibold text-sm bg-gray-100 rounded px-2 py-2 mb-2">
        <div>Nama Barang</div>
        <div>Saldo Awal</div>
        <div>Barang Masuk</div>
        <div>Saldo Akhir</div>
      </div>

      {/* baris data */}
      <div className="space-y-2">
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center gap-2 border rounded px-2 py-2 hover:bg-gray-50"
          >
            <div className="grid grid-cols-4 flex-1 gap-2">
              <EditableCell
                value={row.name}
                onChange={(val) => handleChange(row.id, "name", val)}
              />
              <EditableCell
                value={row.saldoAwal}
                onChange={(val) => handleChange(row.id, "saldoAwal", val)}
              />
              <EditableCell
                value={row.barangMasuk}
                onChange={(val) => handleChange(row.id, "barangMasuk", val)}
              />
              <EditableCell
                value={row.saldoAkhir}
                onChange={(val) => handleChange(row.id, "saldoAkhir", val)}
              />
            </div>
            <button
              onClick={() => deleteRow(row.id)}
              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* tombol aksi */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={addRow}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Tambah Barang
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormStockOpname;
