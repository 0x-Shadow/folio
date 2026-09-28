import { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { GENRES } from '../../data/genres';
import Badge from '../common/Badge';

const FilterPanel = ({ onFilterChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [sortBy, setSortBy] = useState('rating');

  const genres = GENRES;
  const ratings = [5, 4, 3, 2, 1];
  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'reviews', label: 'Most Reviews' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'title', label: 'Title A-Z' }
  ];

  const handleGenreToggle = (genre) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(newGenres);
    applyFilters(newGenres, selectedRating, sortBy);
  };

  const handleRatingChange = (rating) => {
    const newRating = selectedRating === rating ? null : rating;
    setSelectedRating(newRating);
    applyFilters(selectedGenres, newRating, sortBy);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    applyFilters(selectedGenres, selectedRating, value);
  };

  const applyFilters = (genres, rating, sort) => {
    onFilterChange({ genres, rating, sortBy: sort });
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedRating(null);
    setSortBy('rating');
    onFilterChange({ genres: [], rating: null, sortBy: 'rating' });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
          <FiFilter />
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-sm text-accent-strong dark:text-accent font-medium hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-ink mb-3 text-sm">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-glass border border-line rounded-full text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent/60"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold text-ink mb-3 text-sm">Genres</h4>
        <div className="flex flex-wrap gap-2">
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => handleGenreToggle(genre)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition active:scale-95 ${
                selectedGenres.includes(genre)
                  ? 'bg-primary text-on-primary'
                  : 'bg-primary-soft text-muted hover:text-ink'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-ink mb-3 text-sm">Minimum Rating</h4>
        <div className="space-y-2">
          {ratings.map(rating => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition active:scale-[0.98] ${
                selectedRating === rating
                  ? 'bg-primary text-on-primary'
                  : 'bg-primary-soft text-muted hover:text-ink'
              }`}
            >
              <span className="text-accent">★</span>
              {rating}+ stars
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
