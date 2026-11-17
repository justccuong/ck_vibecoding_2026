import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
  watermark?: boolean;
}

/**
 * Custom Original Vector Brand Emblem for Vibe Rewards
 * 100% vector SVG, copyright-free, luxury coffee membership aesthetic.
 */
export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 40,
  watermark = false,
}) => {
  if (watermark) {
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" />
        {/* Crown Star */}
        <path
          d="M50 18L52.5 24.5L59 25L54 29.5L55.5 36L50 32.5L44.5 36L46 29.5L41 25L47.5 24.5L50 18Z"
          fill="currentColor"
        />
        {/* Stylized Coffee Cup & Steam */}
        <path
          d="M36 46C36 57 43 64 50 64C57 64 64 57 64 46H36Z"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Cup Handle */}
        <path
          d="M64 48C68 48 70 51 70 54C70 57 67 59 64 59"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Saucer */}
        <path d="M30 68C38 72 62 72 70 68" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        {/* Steam Curves */}
        <path d="M45 42C44 38 46 36 45 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M50 42C49 37 51 35 50 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M55 42C54 38 56 36 55 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Laurel Branches */}
        <path d="M22 50C22 65 32 78 48 81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M78 50C78 65 68 78 52 81" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="vibeGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F3E5AB" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA820A" />
        </linearGradient>
        <linearGradient id="vibeGreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00754A" />
          <stop offset="100%" stopColor="#004A31" />
        </linearGradient>
        <filter id="vibeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Outer Solid Ring */}
      <circle cx="50" cy="50" r="48" fill="url(#vibeGreenGrad)" stroke="url(#vibeGoldGrad)" strokeWidth="3" />

      {/* Decorative Beaded Ring */}
      <circle
        cx="50"
        cy="50"
        r="43"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="2.5 2"
        opacity="0.85"
      />

      {/* Inner Deep Forest Circle */}
      <circle cx="50" cy="50" r="38" fill="#1E3932" />

      {/* Top Radiant Five-Point Star */}
      <path
        d="M50 17L52.8 24.2L60 24.8L54.6 29.8L56.2 37L50 33.2L43.8 37L45.4 29.8L40 24.8L47.2 24.2L50 17Z"
        fill="url(#vibeGoldGrad)"
        filter="url(#vibeShadow)"
      />

      {/* Two Small Companion Stars */}
      <path
        d="M32 29L33.5 32.5L37 32.8L34.3 35.3L35.1 39L32 37L28.9 39L29.7 35.3L27 32.8L30.5 32.5L32 29Z"
        fill="#D4AF37"
        opacity="0.9"
      />
      <path
        d="M68 29L69.5 32.5L73 32.8L70.3 35.3L71.1 39L68 37L64.9 39L65.7 35.3L63 32.8L66.5 32.5L68 29Z"
        fill="#D4AF37"
        opacity="0.9"
      />

      {/* Stylized Coffee Cup Body */}
      <path
        d="M34 46C34 58 42 66 50 66C58 66 66 58 66 46H34Z"
        fill="url(#vibeGoldGrad)"
        filter="url(#vibeShadow)"
      />
      <path
        d="M37 47C37 56 43 63 50 63C57 63 63 56 63 47H37Z"
        fill="#1E3932"
      />

      {/* Golden Coffee Bean Inside Cup */}
      <ellipse cx="50" cy="54" rx="5" ry="6.5" fill="url(#vibeGoldGrad)" />
      <path
        d="M50 48C48 51 52 57 50 60"
        stroke="#1E3932"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cup Handle */}
      <path
        d="M65 48C70 48 73 51 73 55C73 59 69 61 65 61"
        stroke="url(#vibeGoldGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Saucer / Plate */}
      <path
        d="M28 69C36 73 64 73 72 69"
        stroke="url(#vibeGoldGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Elegant Aroma Steam Waves */}
      <path
        d="M44 43C43 39 45 37 44 33"
        stroke="url(#vibeGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 43C49 38 51 36 50 31"
        stroke="url(#vibeGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 43C55 39 57 37 56 33"
        stroke="url(#vibeGoldGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Laurel Wreath Coffee Leaves Bottom Frame */}
      <path
        d="M23 54C23 68 33 80 50 82C67 80 77 68 77 54"
        stroke="#7EC518"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
};
