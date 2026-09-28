// Typographic covers. Every book gets a designed jacket instead of a stock
// photo: a colour field, a spine, the title set in the display serif, and a
// printed grain. Deterministic per book, so covers never shuffle.

const COVERS = [
  { bg: '#002FA7', fg: '#FFFFFF' }, // International Klein Blue
  { bg: '#0E3A5C', fg: '#F2F4F7' }, // Prussian
  { bg: '#14453A', fg: '#F2F4F7' }, // Pine
  { bg: '#3A2E5C', fg: '#F2F4F7' }, // Ink violet
  { bg: '#7A2E2A', fg: '#F5EFE6' }, // Oxblood
  { bg: '#57626F', fg: '#FFFFFF' }, // Slate
  { bg: '#C9BFA8', fg: '#0A1730' }, // Bone
  { bg: '#0B1B33', fg: '#C9BFA8' }, // Midnight
];

const paletteFor = (book) => COVERS[(book.id * 5 + book.title.length) % COVERS.length];

const BookCover = ({ book, className = 'aspect-[2/3]' }) => {
  const { bg, fg } = paletteFor(book);

  return (
    <figure
      className={`cover ${className}`}
      style={{ background: bg, color: fg }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      <span
        className="absolute inset-y-0 left-0 w-[7px]"
        style={{ background: 'rgba(0,0,0,0.28)' }}
        aria-hidden="true"
      />
      <div className="relative flex h-full flex-col justify-end p-5 pl-7">
        <h3 className="font-display text-[clamp(1.05rem,1.6vw,1.45rem)] leading-[1.1] tracking-[-0.01em] line-clamp-4">
          {book.title}
        </h3>
        <span className="mt-3 block h-px w-9 bg-current opacity-45" aria-hidden="true" />
        <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] opacity-70 line-clamp-1">
          {book.author}
        </span>
      </div>
    </figure>
  );
};

export default BookCover;
