import { Link } from 'react-router-dom';
import BookCover from '../common/BookCover';
import Rating from '../common/Rating';

// Meta is pinned to the bottom so every card in a row lines up, whatever the
// title length.
const BookCard = ({ book }) => (
  <Link to={`/book/${book.id}`} className="group flex h-full flex-col">
    <BookCover book={book} />

    <div className="mt-4 flex flex-1 flex-col">
      <h3 className="font-display text-[15.5px] font-medium leading-snug text-ink line-clamp-2">
        {book.title}
      </h3>
      <p className="mt-1 text-[13px] text-ink-2 line-clamp-1">{book.author}</p>

      <div className="mt-auto flex items-center gap-2 border-t border-rule pt-2.5">
        <Rating rating={book.rating} size="xs" />
        <span className="label tnum">· {book.publishYear}</span>
      </div>
    </div>
  </Link>
);

export default BookCard;
