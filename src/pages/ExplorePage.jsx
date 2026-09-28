import { useEffect, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import FilterPanel from '../components/books/FilterPanel';
import { mockBooks } from '../data/mockBooks';
import { sortBooks } from '../lib/sorting';
import { FiSliders, FiX } from 'react-icons/fi';

const ExplorePage = () => {
  const [filters, setFilters] = useState({ genres: [], rating: null, sortBy: 'rating' });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let result = mockBooks;

    if (filters.genres.length > 0) {
      result = result.filter((book) => book.genre.some((genre) => filters.genres.includes(genre)));
    }
    if (filters.rating) {
      result = result.filter((book) => book.rating >= filters.rating);
    }

    // Re-sorting on every filter change is also the loading state: a short
    // pause keeps the grid from flashing between two results.
    setLoading(true);
    const timer = setTimeout(() => {
      setBooks(sortBooks(result, filters.sortBy));
      setLoading(false);
    }, 260);

    return () => clearTimeout(timer);
  }, [filters]);

  return (
    <PageContainer>
      <header className="mb-10">
        <p className="label">The catalogue</p>
        <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] text-ink">Every title</h1>
      </header>

      <div className="flex gap-10 lg:gap-14">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <FilterPanel onFilterChange={setFilters} />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center justify-between gap-4 border-b border-rule pb-4">
            <p className="label tnum">
              {loading ? '—' : `${books.length} ${books.length === 1 ? 'title' : 'titles'}`}
            </p>
            <button
              onClick={() => setDrawerOpen(true)}
              className="label inline-flex items-center gap-2 border border-rule px-3 py-2 transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <FiSliders size={13} />
              Refine
            </button>
          </div>

          <BookGrid books={books} loading={loading} count={10} />
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <button
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close filters"
          />
          <div className="relative flex h-full w-[85vw] max-w-sm flex-col border-l border-rule bg-paper">
            <div className="flex items-center justify-between border-b border-rule px-5 py-4">
              <h2 className="font-display text-lg text-ink">Refine</h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="grid h-8 w-8 place-items-center border border-rule text-ink-2"
                aria-label="Close filters"
              >
                <FiX size={14} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <FilterPanel
                onFilterChange={(next) => {
                  setFilters(next);
                  setDrawerOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default ExplorePage;
