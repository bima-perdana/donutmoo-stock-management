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
          const prevRows = prev[currentDate] || [];
          return {
            ...prev,
            [newDate]: prevRows.map((row) => ({
              ...row,
              saldoAwal: row.saldoAkhir || "",
              barangMasuk: "",
              saldoAkhir: "",
            })),
          };
        } else {
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
  };

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-bold mb-4">Form Stock Opname</h2>

      {/* navigasi tanggal */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => changeDate("prev")}
            className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            ← Prev
          </button>
          <button
            onClick={() => changeDate("next")}
            className="w-full sm:w-auto px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next →
          </button>
        </div>
        <div className="font-semibold">{currentDate}</div>
      </div>

      {/* table responsive via overflow */}
      <div className="overflow-x-auto">
        <div className="min-w-[640px]">
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
        </div>
      </div>

      {/* tombol aksi */}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          onClick={addRow}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Tambah Barang
        </button>
        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </div>
  );
};

export default FormStockOpname;
