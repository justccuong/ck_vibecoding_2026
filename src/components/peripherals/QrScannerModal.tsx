import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
  sampleCodes?: string[];
}

export const QrScannerModal: React.FC<QrScannerModalProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  sampleCodes = ['TB-01', 'TB-02', 'YC-101', 'SP-01'],
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    setCameraError(null);
    setIsScanning(true);
    try {
      const html5QrCode = new Html5Qrcode('starter-kit-qr-reader');
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          handleSuccess(decodedText);
          stopScanner();
        },
        () => {}
      );
    } catch (err: any) {
      setCameraError(
        'Không thể mở webcam hoặc camera di động. Hãy sử dụng các nút mô phỏng ngoại vi bên dưới để demo cho giám khảo!'
      );
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (e) {
        console.error(e);
      }
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleSuccess = (code: string) => {
    confetti({ particleCount: 35, spread: 50 });
    onScanSuccess(code);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl relative">
        <button
          onClick={() => {
            stopScanner();
            onClose();
          }}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-bold text-slate-900">Thiết Bị Ngoại Vi: Quét QR</h3>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
              +4đ thưởng
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sử dụng camera hoặc mô phỏng đầu đọc mã vạch / QR
          </p>
        </div>

        <div className="space-y-3">
          {!isScanning ? (
            <button
              onClick={startScanner}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <Camera className="w-4 h-4" />
              <span>Bật Camera Quét Mã Thật</span>
            </button>
          ) : (
            <button
              onClick={stopScanner}
              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
            >
              Dừng Camera
            </button>
          )}

          <div
            id="starter-kit-qr-reader"
            className={`w-full aspect-square bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 ${
              isScanning ? 'block' : 'hidden'
            }`}
          />

          {cameraError && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{cameraError}</span>
            </div>
          )}

          {/* Quick Fallback Simulator Buttons */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
            <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Mô phỏng máy đọc ngoại vi (1-Click Test):</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {sampleCodes.map((code) => (
                <button
                  key={code}
                  onClick={() => handleSuccess(code)}
                  className="p-1.5 text-center bg-white hover:bg-indigo-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-indigo-700 truncate transition-colors"
                >
                  Quét "{code}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
