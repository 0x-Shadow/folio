const initials = (name) =>
  (name ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?';

// Square, like the rest of the interface. With no image it falls back to
// the reader's initials on an ink block.
const Avatar = ({ src, alt }) => {
  if (src) {
    return <img src={src} alt={alt} className="h-9 w-9 border border-rule object-cover" />;
  }

  return (
    <span
      role="img"
      aria-label={alt}
      className="inline-flex h-9 w-9 items-center justify-center border border-rule bg-ink-block font-display font-medium text-on-ink"
    >
      {initials(alt)}
    </span>
  );
};

export default Avatar;
