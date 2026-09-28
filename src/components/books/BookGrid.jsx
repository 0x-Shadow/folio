import BookCard from './BookCard';

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
      <div className="border border-rule px-6 py-16 text-center">
        <p className="font-display text-xl text-ink">Nothing here yet.</p>
        <p className="mt-2 text-sm text-ink-2">Try a different filter or search term.</p>
      </div>
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
