import { read, write } from './storage';
import { mockReviews } from '../data/mockReviews';

const REVIEWS_KEY = 'folio_reviews_v1';

// Community reviews ship with the app; reviews a reader writes are
// layered on top and saved per account.
const getStoredReviews = () => read(REVIEWS_KEY, []);

export const getReviewsForBook = (bookId) => {
  const mine = getStoredReviews().filter((review) => review.bookId === bookId);
  const community = mockReviews.filter((review) => review.bookId === bookId);
  return [...mine, ...community];
};

export const getReviewsByUser = (userId) =>
  getStoredReviews().filter((review) => review.userId === userId);

export const addReview = ({ bookId, user, rating, text }) => {
  const stored = getStoredReviews();
  const review = {
    // Saved reviews get a string id so they can never clash with the
    // numbered ids of the reviews that ship with the app.
    id: `r-${Date.now()}`,
    bookId,
    userId: user.id,
    user: {
      name: user.name,
      username: user.username,
      // New accounts have no avatar image; Avatar draws initials instead.
      avatar: null,
    },
    rating,
    review: text,
    date: new Date().toISOString(),
    likes: 0,
  };

  stored.unshift(review);
  return write(REVIEWS_KEY, stored) ? review : null;
};
