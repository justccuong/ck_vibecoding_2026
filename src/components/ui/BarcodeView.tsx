import React from 'react';

interface BarcodeViewProps {
  value: string;
  height?: number;
  showText?: boolean;
  className?: string;
}

/**
 * Pure SVG Barcode Renderer
 * Renders an authentic, crisp barcode pattern without external dependencies (100% offline).
 */
export const BarcodeView: React.FC<BarcodeViewProps> = ({
  value,
  height = 48,
  showText = true,
  className = '',
}) => {
  // Deterministic bar pattern generation based on the string hash/chars
  const generateBars = (str: string) => {
    const bars: { width: number; isSpace: boolean }[] = [];
    
    // Start guard bars
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });

    // Generate patterns for each character
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      const b1 = ((charCode * 3) % 4) + 1;
      const s1 = ((charCode * 2) % 3) + 1;
      const b2 = ((charCode * 5) % 4) + 1;
      const s2 = ((charCode * 7) % 3) + 1;

      bars.push({ width: b1, isSpace: false });
      bars.push({ width: s1, isSpace: true });
      bars.push({ width: b2, isSpace: false });
      bars.push({ width: s2, isSpace: true });
    }

    // Stop guard bars
    bars.push({ width: 2, isSpace: false });
    bars.push({ width: 1, isSpace: true });
    bars.push({ width: 3, isSpace: false });

    return bars;
  };

  const bars = generateBars(value.toUpperCase());
  const totalWidth = bars.reduce((sum, b) => sum + b.width * 2, 0);

  let currentX = 0;

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox={`0 0 ${totalWidth} ${height}`}
        className="w-full max-w-[280px] h-12"
        preserveAspectRatio="none"
      >
        {bars.map((bar, index) => {
          const barWidth = bar.width * 2;
          const x = currentX;
          currentX += barWidth;

          if (bar.isSpace) return null;

          return (
            <rect
              key={index}
              x={x}
              y={0}
              width={barWidth}
              height={height}
              fill="#1E3932"
            />
          );
        })}
      </svg>
      {showText && (
        <span className="font-mono text-[11px] font-black tracking-[0.25em] text-[#1E3932] mt-1 uppercase">
          {value}
        </span>
      )}
    </div>
  );
};
