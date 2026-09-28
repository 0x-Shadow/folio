import BookCard from './BookCard';
import EmptyState from '../common/EmptyState';

const Placeholder = () => (
  <div>
    <div className="placeholder-block aspect-[2/3] w-full" />
    <div className="mt-4 space-y-2.5">
      <div className="placeholder-block h-3.5 w-4/5" />
      <div className="placeholder-block h-3 w-1/3" />
      <div className="placeholder-block h-3 w-1/2" />
    </div>
  </div>
);

const BookGrid = ({ books, loading = false, count }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count ?? 10 }, (_, i) => (
          <Placeholder key={i} />
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <EmptyState title="Nothing here yet.">
        Try a different filter, or browse the catalogue for something new.
      </EmptyState>
    );
  }

  return (
    <div className="stagger grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
