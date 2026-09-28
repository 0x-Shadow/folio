const initials = (name) =>
  (name ?? '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?';

const Avatar = ({ src, alt, size = 'md', className = '' }) => {
    const sizes = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-3xl'
    };

    if (!src) {
      return (
        <div
          role="img"
          aria-label={alt}
          className={`rounded-full bg-navy-800 text-amber-400 font-serif font-bold flex items-center justify-center border-2 border-cream-200 ${sizes[size]} ${className}`}
        >
          {initials(alt)}
        </div>
      );
    }

    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover border-2 border-cream-200 ${sizes[size]} ${className}`}
      />
    );
  };

  export default Avatar;
