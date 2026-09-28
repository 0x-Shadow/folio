import { useState } from 'react';

// Covers lead with the catalogue's own artwork, and fall back to a composed
// jacket (colour field, motif, spine, imprint, type) if an image can't load —
// so a shelf never shows a broken frame.
const COVERS = [
  { bg: '#002FA7', fg: '#FFFFFF', motif: 'orbit' },
  { bg: '#0E3A5C', fg: '#F2F4F7', motif: 'arch' },
  { bg: '#14453A', fg: '#F2F4F7', motif: 'peak' },
  { bg: '#3A2E5C', fg: '#F2F4F7', motif: 'grid' },
  { bg: '#7A2E2A', fg: '#F5EFE6', motif: 'horizon' },
  { bg: '#57626F', fg: '#FFFFFF', motif: 'stripes' },
  { bg: '#C9BFA8', fg: '#0A1730', motif: 'waves' },
  { bg: '#0B1B33', fg: '#C9BFA8', motif: 'frame' },
];

const paletteFor = (book) => COVERS[(book.id * 5 + book.title.length) % COVERS.length];

const Motif = ({ motif, fg }) => {
  switch (motif) {
    case 'orbit':
      return (
        <>
          <circle cx="100" cy="104" r="56" fill={fg} fillOpacity="0.16" />
          <circle cx="100" cy="104" r="38" fill={fg} fillOpacity="0.34" />
          <circle cx="100" cy="104" r="19" fill={fg} fillOpacity="0.95" />
          <rect x="36" y="164" width="128" height="2" fill={fg} fillOpacity="0.5" />
        </>
      );
    case 'arch':
      return (
        <>
          <path d="M46 178V112a54 54 0 0 1 108 0v66z" fill={fg} fillOpacity="0.9" />
          <circle cx="100" cy="122" r="17" fill="#000" fillOpacity="0.22" />
        </>
      );
    case 'peak':
      return (
        <>
          <path d="M100 44 154 186H46z" fill={fg} fillOpacity="0.88" />
          <circle cx="100" cy="72" r="11" fill="#000" fillOpacity="0.25" />
          <rect x="36" y="196" width="128" height="2" fill={fg} fillOpacity="0.4" />
        </>
      );
    case 'grid':
      return (
        <>
          {[0, 1, 2].map((col) =>
            [0, 1].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={36 + col * 44}
                y={54 + row * 62}
                width="34"
                height="52"
                fill={fg}
                fillOpacity={0.22 + (col + row) * 0.2}
              />
            ))
          )}
        </>
      );
    case 'horizon':
      return (
        <>
          <circle cx="100" cy="112" r="42" fill={fg} fillOpacity="0.92" />
          <rect x="30" y="158" width="140" height="3" fill={fg} fillOpacity="0.85" />
          <rect x="30" y="168" width="140" height="40" fill={fg} fillOpacity="0.16" />
        </>
      );
    case 'stripes':
      return (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x={38 + i * 26}
              y={40}
              width={[7, 16, 7, 24, 7][i]}
              height="118"
              fill={fg}
              fillOpacity={0.3 + i * 0.16}
            />
          ))}
        </>
      );
    case 'waves':
      return (
        <>
          {[0, 1, 2].map((i) => (
            <path
              key={i}
              d={`M28 ${150 + i * 20}a72 34 0 0 1 144 0z`}
              fill={fg}
              fillOpacity={0.28 + i * 0.26}
            />
          ))}
        </>
      );
    default:
      return (
        <>
          <rect x="28" y="38" width="144" height="128" fill="none" stroke={fg} strokeOpacity="0.5" strokeWidth="1.5" />
          <rect x="46" y="56" width="108" height="92" fill="none" stroke={fg} strokeOpacity="0.75" strokeWidth="1.5" />
          <rect x="76" y="86" width="48" height="32" fill={fg} fillOpacity="0.92" />
        </>
      );
  }
};

const BookCover = ({ book, className = 'aspect-[2/3]', priority = false }) => {
  const { bg, fg, motif } = paletteFor(book);
  const [failed, setFailed] = useState(false);
  const src = book.cover?.replace(/w=\d+/, 'w=600');
  const showImage = Boolean(src) && !failed;

  return (
    <figure
      className={`cover ${className}`}
      style={{ background: bg, color: fg }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="cover-art absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <span
            className="absolute inset-y-0 left-0 w-[7px]"
            style={{ background: 'rgba(0,0,0,0.3)' }}
            aria-hidden="true"
          />
          <svg
            viewBox="0 0 200 300"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <Motif motif={motif} fg={fg} />
          </svg>
          <span
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: `linear-gradient(to top, ${bg} 34%, transparent)` }}
            aria-hidden="true"
          />
          <span className="absolute left-7 top-5 inline-flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.3em] opacity-45">
            <span className="block h-[3px] w-[3px] bg-current" />
            Folio
          </span>
          <div className="relative flex h-full flex-col justify-end p-5 pl-7">
            <h3 className="font-display text-[clamp(1.05rem,1.5vw,1.4rem)] leading-[1.1] tracking-[-0.01em] line-clamp-3">
              {book.title}
            </h3>
            <span className="mt-3 block h-px w-9 bg-current opacity-45" aria-hidden="true" />
            <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] opacity-70 line-clamp-1">
              {book.author}
            </span>
          </div>
        </>
      )}
    </figure>
  );
};

export default BookCover;
