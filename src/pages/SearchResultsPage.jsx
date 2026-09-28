import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';

const SearchResultsPage = () => {
  const [params] = useSearchParams();
  const query = params.get('q') ?? '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const term = query.trim().toLowerCase();
    setLoading(true);
    const timer = setTimeout(() => {
      setResults(
        term
          ? mockBooks.filter(
              (book) =>
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.some((genre) => genre.toLowerCase().includes(term))
            )
          : []
      );
      setLoading(false);
    }, 260);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <PageContainer>
      <header className="mb-10">
        <p className="label">Search</p>
        <h1 className="display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-ink">
          {query ? `“${query}”` : 'Type something'}
        </h1>
        {!loading && (
          <p className="label tnum mt-3">
            {results.length} {results.length === 1 ? 'match' : 'matches'}
          </p>
        )}
      </header>

      {results.length > 0 ? (
        <BookGrid books={results} loading={loading} count={6} />
      ) : (
        !loading && (
          <div className="border border-rule px-6 py-16 text-center">
            <p className="font-display text-xl text-ink">No match for “{query}”.</p>
            <p className="mt-2 text-sm text-ink-2">
              Try an author, a genre, or part of a title.
            </p>
            <Link
              to="/explore"
              className="label mt-6 inline-block transition-colors hover:text-accent"
            >
              Browse everything instead →
            </Link>
          </div>
        )
      )}
    </PageContainer>
  );
};

export default SearchResultsPage;
