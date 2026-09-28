// Scores books by genre overlap with the reader's shelves,
// blended with community rating. Shelved books are excluded.
const scoreBook = (book, genreWeights, shelvedIds, seedBook) => {
  if (shelvedIds.has(book.id)) return -1;
  if (seedBook && book.id === seedBook.id) return -1;
  const overlap = book.genre.reduce(
    (sum, genre) => sum + (genreWeights[genre] ?? 0),
    0
  );
  return overlap * 2 + book.rating * 0.5;
};

const buildWeights = (books, shelves, seedBook) => {
  const weights = {};
  const touch = (genre, amount) => {
    weights[genre] = (weights[genre] ?? 0) + amount;
  };
  shelves.forEach((entry) => {
    const book = books.find((b) => b.id === entry.bookId);
    if (book) book.genre.forEach((genre) => touch(genre, 1));
  });
  if (seedBook) seedBook.genre.forEach((genre) => touch(genre, 2));
  return weights;
};

export const recommendBooks = (books, shelves, { seedBook = null, limit = 4 } = {}) => {
  const shelvedIds = new Set(shelves.map((entry) => entry.bookId));
  const weights = buildWeights(books, shelves, seedBook);
  return books
    .map((book) => ({ book, score: scoreBook(book, weights, shelvedIds, seedBook) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ book }) => book);
};
