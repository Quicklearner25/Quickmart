import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'light' | 'compact';
  showTagline?: boolean;
  showSpeedBadge?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'default',
  showTagline = true,
  showSpeedBadge = true,
  className = '',
}) => {
  const isLight = variant === 'light';

  // Dimension scaling
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-12 sm:h-12',
    xl: 'w-14 h-14',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
    xl: 'text-xs px-2.5 py-1',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Iconic Speed-Grocery Emblem */}
      <div
        className={`relative shrink-0 ${iconSizes[size]} rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-rose-600 p-[1.5px] shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300`}
      >
        <div className="w-full h-full rounded-[10px] sm:rounded-[14px] bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center relative overflow-hidden shadow-inner">
          {/* Subtle gloss highlight */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30 pointer-events-none" />

          {/* SVG Vector: Shopping Bag + Velocity Lightning Bolt */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/4 h-3/4 text-white drop-shadow-xs relative z-10"
          >
            {/* Bag handle */}
            <path
              d="M11 11V8C11 5.23858 13.2386 3 16 3C18.7614 3 21 5.23858 21 8V11"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Bag outline */}
            <path
              d="M6 10H26L24.2 26.2C24.0886 27.2023 23.242 28 22.2338 28H9.76618C8.75801 28 7.91139 27.2023 7.8 26.2L6 10Z"
              fill="currentColor"
              fillOpacity="0.18"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* High-speed lightning bolt in contrasting amber/gold */}
            <path
              d="M17.5 11L11.5 19H16L14.5 25L21.5 16.5H16.5L17.5 11Z"
              fill="#FDE047"
              stroke="#EA580C"
              strokeWidth="0.8"
              strokeLinejoin="round"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${textSizes[size]} transition-colors`}
          >
            <span className="text-orange-600">Quick</span>
            <span className={isLight ? 'text-white' : 'text-slate-900'}>
              mart
            </span>
          </span>

          {showSpeedBadge && (
            <span
              className={`bg-gradient-to-r from-orange-600 to-amber-500 text-white font-extrabold ${badgeSizes[size]} rounded-md uppercase tracking-wider shadow-2xs flex items-center gap-0.5`}
            >
              <svg
                viewBox="0 0 12 12"
                fill="currentColor"
                className="w-2.5 h-2.5 fill-amber-200"
              >
                <path d="M6.5 1L2 7H6L5.5 11L10 5H6L6.5 1Z" />
              </svg>
              <span>10m</span>
            </span>
          )}
        </div>

        {showTagline && variant !== 'compact' && (
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`text-[9px] sm:text-[10.5px] font-bold tracking-tight uppercase ${
                isLight ? 'text-orange-200' : 'text-slate-500'
              }`}
            >
              Instant 10-Min Supermarket
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
