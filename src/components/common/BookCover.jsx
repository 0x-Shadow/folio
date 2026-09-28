import { useState } from 'react';
import { FiBook } from 'react-icons/fi';

// Book cover with a graceful fallback: if the remote image fails,
// render a branded tile instead of a broken image icon.
const BookCover = ({ book, className = 'w-full h-72 object-cover' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`bg-navy-800 flex flex-col items-center justify-center gap-3 p-6 text-center ${className}`}
        role="img"
        aria-label={`Cover placeholder for ${book.title}`}
      >
        <FiBook className="text-amber-400 text-4xl" />
        <p className="font-serif font-bold text-white line-clamp-3">{book.title}</p>
        <p className="text-sm text-navy-300">{book.author}</p>
      </div>
    );
  }

  return (
    <img
      src={book.cover}
      alt={`Cover of ${book.title} by ${book.author}`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export default BookCover;
