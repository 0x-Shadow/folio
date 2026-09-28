import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';
import { FiSearch } from 'react-icons/fi';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (query) {
        const searchResults = mockBooks.filter(book =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.author.toLowerCase().includes(query.toLowerCase()) ||
          book.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(searchResults);
      }
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <PageContainer>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-10 h-10 rounded-full bg-accent-soft flex items-center justify-center">
            <FiSearch className="text-accent-strong dark:text-accent text-lg" />
          </span>
          <h1 className="text-3xl font-serif font-bold text-ink">Search Results</h1>
        </div>
        <p className="text-muted">
          {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </p>
      </div>

      {results.length > 0 ? (
        <BookGrid books={results} loading={loading} />
      ) : (
        <div className="glass-card text-center py-16">
          <FiSearch className="mx-auto text-5xl text-faint mb-4" />
          <h3 className="text-xl font-serif font-semibold text-ink mb-2">No results found</h3>
          <p className="text-muted">
            Try searching with different keywords or browse our collection
          </p>
        </div>
      )}
    </PageContainer>
  );
};

export default SearchResultsPage;
