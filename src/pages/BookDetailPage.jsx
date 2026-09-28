import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiBookmark, FiShare2, FiBook } from 'react-icons/fi';
import PageContainer from '../components/layout/PageContainer';
import Rating from '../components/common/Rating';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import BookCover from '../components/common/BookCover';
import ReviewCard from '../components/reviews/ReviewCard';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';
import { getReviewsForBook, addReview } from '../lib/reviewStore';
import { getShelves, addToShelf } from '../lib/library';
import { recommendBooks } from '../lib/recommend';
import { useAuth } from '../hooks/useAuth';
import { toast } from 'react-toastify';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const book = mockBooks.find((b) => b.id === parseInt(id));
  const [reviews, setReviews] = useState(() =>
    book ? getReviewsForBook(book.id) : []
  );
  const [myRating, setMyRating] = useState(0);
  const [myText, setMyText] = useState('');

  if (!book) {
    return (
      <PageContainer>
        <div className="glass-card text-center py-16 max-w-lg mx-auto">
          <h2 className="text-2xl font-serif font-bold text-ink mb-2">Book Not Found</h2>
          <p className="text-muted">The book you're looking for doesn't exist.</p>
        </div>
      </PageContainer>
    );
  }

  const shelves = user ? getShelves(user.id) : [];
  const relatedBooks = recommendBooks(mockBooks, shelves, { seedBook: book });

  const requireAuth = () => {
    if (!user) {
      toast.info('Sign in to use your library.');
      navigate('/signin');
      return false;
    }
    return true;
  };

  const handleAddToShelf = (shelf) => {
    if (!requireAuth()) return;
    addToShelf(user.id, book.id, shelf);
    toast.success(`Added to ${shelf}!`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Could not copy the link.');
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (myRating === 0) {
      toast.error('Please pick a star rating first.');
      return;
    }
    if (myText.trim().length < 10) {
      toast.error('Please write at least a sentence or two.');
      return;
    }
    const created = addReview({
      bookId: book.id,
      user,
      rating: myRating,
      text: myText.trim(),
    });
    if (!created) {
      toast.error('Could not save your review on this device.');
      return;
    }
    setReviews(getReviewsForBook(book.id));
    setMyRating(0);
    setMyText('');
    toast.success('Review published!');
  };

  const ratingDistribution = [
    { stars: 5, count: 856, percentage: 56 },
    { stars: 4, count: 425, percentage: 28 },
    { stars: 3, count: 167, percentage: 11 },
    { stars: 2, count: 45, percentage: 3 },
    { stars: 1, count: 30, percentage: 2 },
  ];

  const meta = [
    { label: 'Pages', value: book.pages },
    { label: 'Published', value: book.publishYear },
    { label: 'Language', value: book.language },
    { label: 'ISBN', value: book.isbn },
  ];

  return (
    <div>
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative mb-6">
                <div
                  className="absolute -inset-4 rounded-3xl blur-2xl opacity-40 -z-10"
                  style={{ background: 'var(--mesh-1)' }}
                  aria-hidden="true"
                />
                <BookCover
                  book={book}
                  className="w-full rounded-2xl shadow-[var(--shadow-lg)] aspect-[3/4] object-cover"
                />
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => handleAddToShelf('Want to Read')}
                >
                  <FiBookmark className="inline mr-2" />
                  Want to Read
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleAddToShelf('Currently Reading')}
                  >
                    Reading
                  </Button>
                  <Button variant="outline" onClick={() => handleAddToShelf('Read')}>
                    Read
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleShare}
                  aria-label="Copy link to this book"
                >
                  <FiShare2 className="inline mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-serif font-bold text-ink mb-2 tracking-tight">
              {book.title}
            </h1>
            <h2 className="text-xl text-muted mb-4">by {book.author}</h2>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Rating rating={book.rating} size="lg" />
              <span className="text-muted">
                {book.ratingsCount.toLocaleString()} ratings · {book.reviewsCount} reviews
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {book.genre.map((genre, index) => (
                <Badge key={index} variant="primary" size="md">
                  {genre}
                </Badge>
              ))}
            </div>

            <div className="glass-card p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {meta.map((item) => (
                  <div key={item.label}>
                    <p className="text-sm text-muted mb-1">{item.label}</p>
                    <p className="font-semibold text-ink text-sm md:text-base">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-ink mb-4">About this book</h3>
              <p className="text-muted leading-relaxed">{book.description}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-serif font-bold text-ink mb-4">Rating Distribution</h3>
              <div className="space-y-2">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted w-16">
                      {item.stars} stars
                    </span>
                    <div className="flex-1 bg-line rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-accent to-accent-strong h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-faint w-20 text-right">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {relatedBooks.length > 0 && (
          <div className="mb-14">
            <h3 className="text-xl font-serif font-bold text-ink mb-6">Readers Also Enjoyed</h3>
            <BookGrid books={relatedBooks} />
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif font-bold text-ink">
              Reviews ({reviews.length})
            </h3>
          </div>

          <div className="glass-card p-6 mb-6">
            {user ? (
              <form onSubmit={handleSubmitReview}>
                <h4 className="font-semibold text-ink mb-3">
                  Share your take, {user.name.split(' ')[0]}
                </h4>
                <div className="mb-3">
                  <span className="block text-sm font-medium text-ink mb-1.5">
                    Your rating
                  </span>
                  <Rating
                    rating={myRating}
                    size="lg"
                    showNumber={false}
                    interactive
                    onRate={setMyRating}
                  />
                </div>
                <label
                  htmlFor="review-text"
                  className="block text-sm font-medium text-ink mb-1.5"
                >
                  Your review
                </label>
                <textarea
                  id="review-text"
                  value={myText}
                  onChange={(e) => setMyText(e.target.value)}
                  rows={4}
                  placeholder="What did you love? What fell flat? No spoilers, please."
                  className="w-full px-4 py-3 bg-glass border border-line rounded-2xl text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/60 mb-3 resize-y"
                />
                <Button type="submit" variant="primary">
                  Publish review
                </Button>
              </form>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                <p className="text-muted">Sign in to write a review and build your library.</p>
                <Button variant="primary" onClick={() => navigate('/signin')}>
                  Sign in
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4 stagger">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))
            ) : (
              <div className="glass-card text-center py-14">
                <FiBook className="mx-auto text-4xl text-faint mb-3" />
                <p className="text-muted">No reviews yet. Be the first to review!</p>
              </div>
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default BookDetailPage;
