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
        <div className="relative">
          <BookCover book={book} />
          <div className="absolute top-3 right-3 bg-white rounded-full p-2.5 shadow-md hover:bg-cream-100 transition cursor-pointer">
            <FiBookmark className="text-navy-700" aria-label={`Save ${book.title}`} />
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-serif font-bold text-lg text-navy-900 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-navy-500 mb-3">{book.author}</p>

          <div className="flex items-center justify-between mb-3">
            <Rating rating={book.rating} size="sm" />
            <span className="text-xs text-navy-400">
              {book.ratingsCount} ratings
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {book.genre.slice(0, 2).map((genre, index) => (
              <Badge key={index} variant="primary" size="sm">
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-navy-600 line-clamp-2 mb-3">
            {book.description}
          </p>

          <div className="flex items-center justify-between text-xs text-navy-400 pt-3 border-t border-cream-200">
            <span>{book.pages} pages</span>
            <span>{book.publishYear}</span>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BookCard;
