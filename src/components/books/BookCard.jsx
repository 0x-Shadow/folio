import { Link } from 'react-router-dom';
import BookCover from '../common/BookCover';
import Rating from '../common/Rating';

// Titles are held to two lines so the meta rows line up across a shelf.
const BookCard = ({ book }) => (
  <Link to={`/book/${book.id}`} className="group block">
    <BookCover book={book} />
    <div className="mt-4">
      <h3 className="min-h-[2.9em] font-display text-[15.5px] font-medium leading-snug text-ink line-clamp-2">
        {book.title}
      </h3>
      <p className="mt-1 text-[13px] text-ink-2 line-clamp-1">{book.author}</p>
      <div className="mt-2.5 flex items-center justify-between gap-3">
        <Rating rating={book.rating} size="xs" />
        <span className="label tnum">{book.publishYear}</span>
      </div>
    </div>
  </Link>
);

export default BookCard;
