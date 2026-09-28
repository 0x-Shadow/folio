import { read, write } from './storage';
import { mockReviews } from '../data/mockReviews';

const REVIEWS_KEY = 'folio_reviews_v1';

// Community reviews ship with the app; user reviews are layered on top
// and persisted per account.
export const getStoredReviews = () => read(REVIEWS_KEY, []);

export const getReviewsForBook = (bookId) => {
  const stored = getStoredReviews().filter((r) => r.bookId === bookId);
  const community = mockReviews.filter((r) => r.bookId === bookId);
  return [...stored, ...community];
};

export const getReviewsByUser = (userId) =>
  getStoredReviews().filter((r) => r.userId === userId);

export const addReview = ({ bookId, user, rating, text }) => {
  const stored = getStoredReviews();
  const review = {
    id: `u-${Date.now()}`,
    bookId,
    userId: user.id,
    user: { name: user.name, username: user.username, avatar: null },
    rating,
    review: text,
    date: new Date().toISOString(),
    likes: 0,
    helpful: 0,
  };
  stored.unshift(review);
  return write(REVIEWS_KEY, stored) ? review : null;
};
