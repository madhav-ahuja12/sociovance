import React from 'react';
import logoImg from '../assets/image.png';

/**
 * Sociovance LLP Logo
 * Uses the actual brand logo image (image.png) with the SV monogram + signal arcs.
 *
 * Props:
 *  size      — 'xs' | 'sm' | 'md' | 'lg' | 'xl'
 *  variant   — 'dark' (normal) | 'light' (white-tinted for dark backgrounds, uses CSS filter)
 *  showLLP   — whether to show "LLP" tag below wordmark (default: true)
 *  className — extra wrapper classes
 */
const Logo = ({
  size = 'md',
  variant = 'dark',
  showLLP = true,
  className = '',
}) => {
  const sizes = {
    xs:  { img: 28,  llp: 'text-[6px]',  llpTrack: 'tracking-[0.3em]' },
    sm:  { img: 36,  llp: 'text-[7px]',  llpTrack: 'tracking-[0.3em]' },
    md:  { img: 44,  llp: 'text-[8px]',  llpTrack: 'tracking-[0.35em]' },
    lg:  { img: 56,  llp: 'text-[10px]', llpTrack: 'tracking-[0.4em]' },
    xl:  { img: 72,  llp: 'text-[13px]', llpTrack: 'tracking-[0.4em]' },
  };
  const s = sizes[size] || sizes.md;

  // On dark backgrounds invert the black logo to white without solid white box
  const imgStyle = variant === 'light'
    ? { filter: 'invert(1)', mixBlendMode: 'screen' }
    : { mixBlendMode: 'multiply' };

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Logo image — contains the SV mark + "SOCIOVANCE" wordmark */}
      <img
        src={logoImg}
        alt="Sociovance LLP"
        width={s.img * 2.8}   /* wider because the image includes the wordmark */
        height={s.img}
        style={{ objectFit: 'contain', ...imgStyle }}
        draggable={false}
      />
      {/* Optional LLP tag — positioned as a small badge next to the wordmark */}
      {showLLP && (
        <span
          className={`font-sans font-semibold uppercase ${s.llp} ${s.llpTrack} ${
            variant === 'light' ? 'text-white/50' : 'text-gray-400'
          } self-end mb-0.5`}
        >
          LLP
        </span>
      )}
    </div>
  );
};

export default Logo;
