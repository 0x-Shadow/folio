import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { GENRES } from '../../data/genres';

const RATINGS = [5, 4, 3, 2, 1];

const SORTS = [
  { value: 'rating', label: 'Highest rated' },
  { value: 'reviews', label: 'Most reviewed' },
  { value: 'recent', label: 'Newest first' },
  { value: 'title', label: 'Title A–Z' },
];

const FilterPanel = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(null);
  const [sortBy, setSortBy] = useState('rating');

  const emit = (next) => onFilterChange({ genres: next.genres, rating: next.rating, sortBy: next.sort });

  const toggleGenre = (genre) => {
    const next = genres.includes(genre) ? genres.filter((g) => g !== genre) : [...genres, genre];
    setGenres(next);
    emit({ genres: next, rating, sort: sortBy });
  };

  const toggleRating = (value) => {
    const next = rating === value ? null : value;
    setRating(next);
    emit({ genres, rating: next, sort: sortBy });
  };

  const changeSort = (value) => {
    setSortBy(value);
    emit({ genres, rating, sort: value });
  };

  const clear = () => {
    setGenres([]);
    setRating(null);
    setSortBy('rating');
    onFilterChange({ genres: [], rating: null, sortBy: 'rating' });
  };

  return (
    <div className="border border-rule bg-raised p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg text-ink">Refine</h2>
        <button onClick={clear} className="label transition-colors hover:text-accent">
          Clear
        </button>
      </div>

      <div className="mt-7">
        <label htmlFor="sort" className="label block">
          Sort by
        </label>
        <div className="relative mt-2">
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => changeSort(e.target.value)}
            className="field cursor-pointer pr-6"
          >
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FiChevronDown
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink-3"
            size={14}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="label">Genre</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => toggleGenre(genre)}
              aria-pressed={genres.includes(genre)}
              className="chip"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="label">Minimum rating</h3>
        <div className="mt-3 space-y-1.5">
          {RATINGS.map((value) => (
            <button
              key={value}
              onClick={() => toggleRating(value)}
              aria-pressed={rating === value}
              className="chip w-full justify-between"
            >
              <span>{value} stars &amp; up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
