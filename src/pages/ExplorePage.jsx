import { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import FilterPanel from '../components/books/FilterPanel';
import { mockBooks } from '../data/mockBooks';
import { FiFilter, FiX } from 'react-icons/fi';

const ExplorePage = () => {
  const [filteredBooks, setFilteredBooks] = useState(mockBooks);
  const [filters, setFilters] = useState({ genres: [], rating: null, sortBy: 'rating' });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let books = [...mockBooks];

    if (filters.genres.length > 0) {
      books = books.filter(book =>
        book.genre.some(g => filters.genres.includes(g))
      );
    }

    if (filters.rating) {
      books = books.filter(book => book.rating >= filters.rating);
    }

    switch (filters.sortBy) {
      case 'rating':
        books.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        books.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'title':
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'recent':
        books.sort((a, b) => b.publishYear - a.publishYear);
        break;
      default:
        break;
    }

    setFilteredBooks(books);
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">Explore Books</h1>
        <p className="text-muted">Discover your next favorite read from our collection</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <FilterPanel onFilterChange={handleFilterChange} />
        </aside>

        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-2.5 rounded-full font-medium mb-4 active:scale-95 transition"
        >
          <FiFilter />
          Filters
        </button>

        {showMobileFilters && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={() => setShowMobileFilters(false)}
          >
            <div
              className="glass-strong h-full w-80 p-6 overflow-y-auto animate-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-ink">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-muted hover:text-ink"
                  aria-label="Close filters"
                >
                  <FiX className="text-xl" />
                </button>
              </div>
              <FilterPanel onFilterChange={handleFilterChange} />
            </div>
          </div>
        )}

        <div className="flex-1">
          <div className="mb-4 text-sm text-muted">
            Showing {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}
          </div>
          <BookGrid books={filteredBooks} loading={loading} />
        </div>
      </div>
    </PageContainer>
  );
};

export default ExplorePage;
