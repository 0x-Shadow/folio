// One place for every way the catalogue can be ordered, so the home page,
// the catalogue and onboarding all sort books the same way.
export const SORTERS = {
  rating: (a, b) => b.rating - a.rating,
  reviews: (a, b) => b.reviewsCount - a.reviewsCount,
  recent: (a, b) => b.publishYear - a.publishYear,
  title: (a, b) => a.title.localeCompare(b.title),
};

// Sorts a copy of the list — never sorts the array you pass in.
export const sortBooks = (books, sortBy = 'rating') => {
  const sorter = SORTERS[sortBy] ?? SORTERS.rating;
  return [...books].sort(sorter);
};

// The highest-rated book in each of the given genres, one per genre.
export const topBookPerGenre = (books, genres) => {
  const taken = new Set();
  const picks = [];

  genres.forEach((genre) => {
    const best = sortBooks(books.filter((book) => book.genre.includes(genre))).find(
      (book) => !taken.has(book.id)
    );
    if (best) {
      taken.add(best.id);
      picks.push(best);
    }
  });

  return picks;
};
