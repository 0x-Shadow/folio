const initials = (name) =>
  (name ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?';

const SIZES = {
  sm: 'h-7 w-7 text-[11px]',
  md: 'h-9 w-9 text-xs',
  lg: 'h-11 w-11 text-sm',
  xl: 'h-14 w-14 text-base',
  '2xl': 'h-20 w-20 text-2xl',
};

const Avatar = ({ src, alt, size = 'md', className = '' }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`border border-rule object-cover ${SIZES[size]} ${className}`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={alt}
      className={`inline-flex items-center justify-center border border-rule bg-ink-block font-display font-medium text-on-ink ${SIZES[size]} ${className}`}
    >
      {initials(alt)}
    </span>
  );
};

export default Avatar;
