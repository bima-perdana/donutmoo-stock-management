import { useEffect, useRef, useState, useContext } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { DataContext } from "../context/DataContext";

const ScanPage = () => {
  const videoRef = useRef(null);
  const [result, setResult] = useState("");
  const { orders, scanDriverCode, scanOutletCode } = useContext(DataContext);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let isMounted = true;

    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(null, videoRef.current, (res) => {
        if (res && isMounted) {
          const code = res.getText();
          setResult(code);

          const order = orders.find(
            (o) => o.driverCode === code || o.outletCode === code
          );

          if (order) {
            if (order.driverCode === code) {
              scanDriverCode(order.id, code);
            } else if (order.outletCode === code) {
              scanOutletCode(order.id, code);
            }
          }
        }
      });
    }

    return () => {
      isMounted = false;
      codeReader.reset();
    };
  }, [orders, scanDriverCode, scanOutletCode]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
      <video ref={videoRef} className="w-full max-w-md border rounded" />
      {result && (
        <p className="mt-4 text-green-600 font-semibold">
          QR Terdeteksi: {result}
        </p>
      )}
    </div>
  );
};

export default ScanPage;
