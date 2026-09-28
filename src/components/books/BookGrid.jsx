import BookCard from './BookCard';

const SkeletonCard = () => (
  <div className="rounded-[20px] border border-line overflow-hidden bg-surface">
    <div className="skeleton h-72 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <div className="skeleton h-5 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
      <div className="flex justify-between">
        <div className="skeleton h-4 w-20" />
        <div className="skeleton h-4 w-12" />
      </div>
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-2/3" />
    </div>
  </div>
);

const BookGrid = ({ books, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div className="glass-card text-center py-16 px-6">
        <p className="font-serif text-xl text-ink mb-1">No books found</p>
        <p className="text-sm text-muted">Try a different search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;
