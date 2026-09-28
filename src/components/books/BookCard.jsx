import { Link } from 'react-router-dom';
import { FiBookmark } from 'react-icons/fi';
import Card from '../common/Card';
import BookCover from '../common/BookCover';
import Rating from '../common/Rating';
import Badge from '../common/Badge';

const BookCard = ({ book }) => {
  return (
    <Card hover={true}>
      <Link to={`/book/${book.id}`}>
        <div className="relative overflow-hidden">
          <div className="transition-transform duration-500 group-hover:scale-105">
            <BookCover book={book} className="w-full h-72 object-cover" />
          </div>
          <div className="absolute top-3 right-3 glass rounded-full p-2.5 shadow-[var(--shadow-sm)] hover:bg-accent-soft transition cursor-pointer">
            <FiBookmark className="text-ink" aria-label={`Save ${book.title}`} />
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-serif font-bold text-lg text-ink line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-muted mb-3">{book.author}</p>

          <div className="flex items-center justify-between mb-3">
            <Rating rating={book.rating} size="sm" />
            <span className="text-xs text-faint">{book.ratingsCount} ratings</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {book.genre.slice(0, 2).map((genre, index) => (
              <Badge key={index} variant="primary" size="sm">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted line-clamp-2 mb-3">{book.description}</p>

          <div className="flex items-center justify-between text-xs text-faint pt-3 border-t border-line">
            <span>{book.pages} pages</span>
            <span>{book.publishYear}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BookCard;
