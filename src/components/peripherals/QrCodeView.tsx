import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

interface QrCodeViewProps {
  value: string;
  size?: number;
  label?: string;
}

export const QrCodeView: React.FC<QrCodeViewProps> = ({
  value,
  size = 200,
  label,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (value) {
      QRCode.toDataURL(value, {
        width: size,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [value, size]);

  if (!dataUrl) return null;

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
      <img src={dataUrl} alt={`QR for ${value}`} className="rounded-xl" />
      {label && (
        <span className="mt-2 text-xs font-mono font-bold text-slate-800 tracking-wider">
          {label}
        </span>
      )}
    </div>
  );
};
