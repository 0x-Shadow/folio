import { useState } from 'react';

// ---------------------------------------------------------------------------
// Covers
//
// A cover is either the book's own image, or — if that image can't load — a
// jacket composed here: a colour field, a motif, a spine, an imprint mark and
// the title. So a shelf never shows a broken frame.
//
// The colours mirror the design tokens in index.css (#002FA7 is --accent,
// #0A1730 is --ink, #F2F4F7 is --paper) but are written literally because
// each cover needs its own fixed colour, not the reader's current theme.
// ---------------------------------------------------------------------------

// --- Motifs ---------------------------------------------------------------
// All drawn in a 200 × 300 space and stretched to fill the cover.

const OrbitMotif = ({ fg }) => (
  <>
    <circle cx="100" cy="104" r="56" fill={fg} fillOpacity="0.16" />
    <circle cx="100" cy="104" r="38" fill={fg} fillOpacity="0.34" />
    <circle cx="100" cy="104" r="19" fill={fg} fillOpacity="0.95" />
    <rect x="36" y="164" width="128" height="2" fill={fg} fillOpacity="0.5" />
  </>
);

const ArchMotif = ({ fg }) => (
  <>
    <path d="M46 178V112a54 54 0 0 1 108 0v66z" fill={fg} fillOpacity="0.9" />
    <circle cx="100" cy="122" r="17" fill="#000" fillOpacity="0.22" />
  </>
);

const PeakMotif = ({ fg }) => (
  <>
    <path d="M100 44 154 186H46z" fill={fg} fillOpacity="0.88" />
    <circle cx="100" cy="72" r="11" fill="#000" fillOpacity="0.25" />
    <rect x="36" y="196" width="128" height="2" fill={fg} fillOpacity="0.4" />
  </>
);

const GridMotif = ({ fg }) => (
  <>
    {[0, 1, 2].map((column) =>
      [0, 1].map((row) => (
        <rect
          key={`${column}-${row}`}
          x={36 + column * 44}
          y={54 + row * 62}
          width="34"
          height="52"
          fill={fg}
          fillOpacity={0.22 + (column + row) * 0.2}
        />
      ))
    )}
  </>
);

const HorizonMotif = ({ fg }) => (
  <>
    <circle cx="100" cy="112" r="42" fill={fg} fillOpacity="0.92" />
    <rect x="30" y="158" width="140" height="3" fill={fg} fillOpacity="0.85" />
    <rect x="30" y="168" width="140" height="40" fill={fg} fillOpacity="0.16" />
  </>
);

const STRIPE_WIDTHS = [7, 16, 7, 24, 7];

const StripesMotif = ({ fg }) => (
  <>
    {STRIPE_WIDTHS.map((width, i) => (
      <rect
        key={i}
        x={38 + i * 26}
        y={40}
        width={width}
        height="118"
        fill={fg}
        fillOpacity={0.3 + i * 0.16}
      />
    ))}
  </>
);

const WavesMotif = ({ fg }) => (
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

const FrameMotif = ({ fg }) => (
  <>
    <rect x="28" y="38" width="144" height="128" fill="none" stroke={fg} strokeOpacity="0.5" strokeWidth="1.5" />
    <rect x="46" y="56" width="108" height="92" fill="none" stroke={fg} strokeOpacity="0.75" strokeWidth="1.5" />
    <rect x="76" y="86" width="48" height="32" fill={fg} fillOpacity="0.92" />
  </>
);

const COVERS = [
  { bg: '#002FA7', fg: '#FFFFFF', motif: OrbitMotif }, // International Klein Blue
  { bg: '#0E3A5C', fg: '#F2F4F7', motif: ArchMotif }, // Prussian
  { bg: '#14453A', fg: '#F2F4F7', motif: PeakMotif }, // Pine
  { bg: '#3A2E5C', fg: '#F2F4F7', motif: GridMotif }, // Ink violet
  { bg: '#7A2E2A', fg: '#F5EFE6', motif: HorizonMotif }, // Oxblood
  { bg: '#57626F', fg: '#FFFFFF', motif: StripesMotif }, // Slate
  { bg: '#C9BFA8', fg: '#0A1730', motif: WavesMotif }, // Bone
  { bg: '#0B1B33', fg: '#C9BFA8', motif: FrameMotif }, // Midnight
];

// Every book keeps the same cover, whatever order the catalogue is in:
// the id picks the palette entry, the title length nudges it along.
const paletteFor = (book) => COVERS[(book.id * 5 + book.title.length) % COVERS.length];

// --- The cover ------------------------------------------------------------

const BookCover = ({ book, className = 'aspect-[2/3]' }) => {
  const { bg, fg, motif: Motif } = paletteFor(book);
  const [imageFailed, setImageFailed] = useState(false);

  // The catalogue stores a 400px thumbnail; ask the host for a sharper one.
  const image = book.cover?.replace(/w=\d+/, 'w=600');
  const showImage = Boolean(image) && !imageFailed;

  return (
    <figure
      className={`cover ${className}`}
      style={{ background: bg, color: fg }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      {showImage ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="cover-art absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          {/* The spine, down the left edge. */}
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
            <Motif fg={fg} />
          </svg>

          {/* Darkens the lower half so the title stays readable over any motif. */}
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
