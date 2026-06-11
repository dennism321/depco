import React from 'react';

interface DepcoLogoProps {
  className?: string; // Tailwind class applied to the logo container
  lightMode?: boolean; // Changes the text color from dark slate/black to white
}

export default function DepcoLogo({ className = 'h-[64px] md:h-[80px]', lightMode = false }: DepcoLogoProps) {
  // Use exact hex colors from your official DEPCO logo image:
  // - Vibrant brand blue: #005FA9
  // - Vibrant brand red: #E30613
  // - Text: Dark slate/black (#111111) or white (#FFFFFF) in dark backgrounds
  const textFillColor = lightMode ? '#FFFFFF' : '#111111';

  return (
    <div 
      className={`inline-block select-none ${className}`} 
      id="depco-brand-logo-root"
    >
      <svg
        viewBox="0 0 500 215"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
        id="depco-official-logo-svg"
      >
        {/* Dynamic Left Swoosh: Vibrant brand blue crescent */}
        <path
          d="M 102,96 C 35,110 30,165 210,172 C 75,170 50,132 102,96 Z"
          fill="#005FA9"
          id="logo-blue-swoosh"
        />

        {/* Dynamic Right Swoosh: Vibrant brand red crescent */}
        <path
          d="M 398,118 C 455,108 460,53 290,44 C 418,46 445,84 398,118 Z"
          fill="#E30613"
          id="logo-red-swoosh"
        />

        {/* "Comfort" Text (Top-Left Accent, italicized) */}
        <text
          x="126"
          y="56"
          fontFamily="system-ui, -apple-system, 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="32"
          fill={textFillColor}
          id="logo-text-comfort"
          textLength="115"
          lengthAdjust="spacingAndGlyphs"
        >
          Comfort
        </text>

        {/* "DEPCO" Central Wordmark (Bold, Heavy, Condensed, Italicized) */}
        <text
          x="250"
          y="132"
          fontFamily="system-ui, -apple-system, 'Impact', 'Inter', 'Arial Black', sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="95"
          fill={textFillColor}
          textAnchor="middle"
          id="logo-text-depco"
          textLength="295"
          lengthAdjust="spacingAndGlyphs"
        >
          DEPCO
        </text>

        {/* "Solutions" Text (Bottom-Right Accent, italicized) */}
        <text
          x="233"
          y="188"
          fontFamily="system-ui, -apple-system, 'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="31"
          fill={textFillColor}
          id="logo-text-solutions"
          textLength="142"
          lengthAdjust="spacingAndGlyphs"
        >
          Solutions
        </text>
      </svg>
    </div>
  );
}
