import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiBookmark, FiShare2, FiArrowLeft } from 'react-icons/fi';
import PageContainer from '../components/layout/PageContainer';
import Rating from '../components/common/Rating';
import Button from '../components/common/Button';
import BookCover from '../components/common/BookCover';
import ReviewCard from '../components/reviews/ReviewCard';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';
import { bookshelfTypes, bookshelfLabels } from '../data/mockBookshelves';
import { getReviewsForBook, addReview } from '../lib/reviewStore';
import { getShelves, addToShelf } from '../lib/library';
import { recommendBooks } from '../lib/recommend';
import { useAuth } from '../hooks/useAuth';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, firstName } = useAuth();
  const book = mockBooks.find((b) => b.id === parseInt(id, 10));

  const [reviews, setReviews] = useState(() => (book ? getReviewsForBook(book.id) : []));
  const [myRating, setMyRating] = useState(0);
  const [myText, setMyText] = useState('');

  if (!book) {
    return (
      <PageContainer>
        <div className="border border-rule px-6 py-20 text-center">
          <p className="label">404 — no such entry</p>
          <h1 className="display mt-4 text-3xl text-ink">We don't stock that one.</h1>
          <p className="mt-3 text-sm text-ink-2">The catalogue has moved on without it.</p>
          <Link to="/explore" className="label mt-6 inline-block transition-colors hover:text-accent">
            Browse the catalogue →
          </Link>
        </div>
      </PageContainer>
    );
  }

  const shelves = user ? getShelves(user.id) : [];
  const related = recommendBooks(mockBooks, shelves, { seedBook: book });

  const requireAuth = () => {
    if (!user) {
      toast.info('Sign in to use your shelf.');
      navigate('/signin');
      return false;
    }
    return true;
  };

  const handleAddToShelf = (shelf) => {
    if (!requireAuth()) return;
    addToShelf(user.id, book.id, shelf);
    toast.success(`Added to ${bookshelfLabels[shelf].toLowerCase()}.`);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied.');
    } catch {
      toast.error('Could not copy the link.');
    }
  };

  const submitReview = (event) => {
    event.preventDefault();
    if (!requireAuth()) return;
    if (myRating === 0) {
      toast.error('Pick a star rating first.');
      return;
    }
    if (myText.trim().length < 10) {
      toast.error('Write at least a sentence or two.');
      return;
    }
    const created = addReview({ bookId: book.id, user, rating: myRating, text: myText.trim() });
    if (!created) {
      toast.error('Could not save your review on this device.');
      return;
    }
    setReviews(getReviewsForBook(book.id));
    setMyRating(0);
    setMyText('');
    toast.success('Review published.');
  };

  const totalRatings = book.ratingsCount;
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const weight = { 5: 0.52, 4: 0.27, 3: 0.12, 2: 0.05, 1: 0.04 }[stars];
    return {
      stars,
      count: Math.round(totalRatings * weight),
      percentage: Math.round(weight * 100),
    };
  });

  const meta = [
    { label: 'Pages', value: book.pages },
    { label: 'Published', value: book.publishYear },
    { label: 'Language', value: book.language },
    { label: 'ISBN', value: book.isbn },
  ];

  return (
    <div>
      <PageContainer>
        <button
          onClick={() => navigate(-1)}
          className="label mb-10 inline-flex items-center gap-2 transition-colors hover:text-accent"
        >
          <FiArrowLeft size={13} />
          Back
        </button>

        <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16 lg:gap-24">
          <div>
            <div className="md:sticky md:top-24">
              <BookCover book={book} className="aspect-[3/4]" />

              <div className="mt-6 space-y-2.5">
                <Button className="w-full" onClick={() => handleAddToShelf(bookshelfTypes.WANT_TO_READ)}>
                  <FiBookmark size={14} />
                  Want to read
                </Button>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button variant="outline" onClick={() => handleAddToShelf(bookshelfTypes.READING)}>
                    Reading
                  </Button>
                  <Button variant="outline" onClick={() => handleAddToShelf(bookshelfTypes.READ)}>
                    Read
                  </Button>
                </div>
                <button
                  onClick={handleShare}
                  className="label inline-flex w-full items-center justify-center gap-2 border border-transparent py-2 transition-colors hover:border-rule hover:text-ink"
                >
                  <FiShare2 size={13} />
                  Copy link
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="label">{book.genre.join(' · ')}</p>
            <h1 className="display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] text-ink">{book.title}</h1>
            <p className="mt-3 text-[15px] text-ink-2">
              {book.author} · {book.publishYear}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Rating rating={book.rating} size="lg" />
              <span className="label tnum">
                {book.ratingsCount.toLocaleString()} ratings · {book.reviewsCount} reviews
              </span>
            </div>

            <dl className="mt-10 grid grid-cols-2 border-t border-rule md:grid-cols-4">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-rule py-4 pr-4 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <dt className="label">{item.label}</dt>
                  <dd className="tnum mt-1.5 text-[15px] text-ink">{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-12">
              <h2 className="font-display text-2xl text-ink">The entry</h2>
              <p className="mt-4 max-w-[66ch] text-[15.5px] leading-relaxed text-ink-2">
                {book.description}
              </p>
            </div>

            <div className="mt-12">
              <h2 className="font-display text-2xl text-ink">How readers rated it</h2>
              <div className="mt-5 max-w-lg space-y-2.5">
                {distribution.map((row) => (
                  <div key={row.stars} className="flex items-center gap-4">
                    <span className="label tnum w-10 shrink-0 text-ink-2">{row.stars}★</span>
                    <span className="h-[5px] flex-1 bg-rule">
                      <span
                        className="block h-full bg-ink"
                        style={{ width: `${row.percentage}%` }}
                      />
                    </span>
                    <span className="tnum w-24 shrink-0 text-right text-[12px] text-ink-3">
                      {row.count.toLocaleString()} · {row.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageContainer>

      {related.length > 0 && (
        <section className="border-t border-rule">
          <PageContainer>
            <div className="mb-9 border-b border-rule pb-4">
              <h2 className="font-display text-[26px] text-ink">Readers also finished</h2>
            </div>
            <BookGrid books={related.slice(0, 5)} />
          </PageContainer>
        </section>
      )}

      <section className="border-t border-rule">
        <PageContainer>
          <div className="grid gap-12 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16 lg:gap-24">
            <div>
              <h2 className="font-display text-[26px] text-ink">Reviews</h2>
              <p className="label mt-2 tnum">{reviews.length} on file</p>

              <div className="mt-6 border border-rule bg-raised p-5">
                {user ? (
                  <form onSubmit={submitReview}>
                    <h3 className="font-display text-lg text-ink">
                      Add yours, {firstName}
                    </h3>
                    <div className="mt-4">
                      <span className="label block">Your rating</span>
                      <div className="mt-2">
                        <Rating
                          rating={myRating}
                          size="md"
                          showNumber={false}
                          interactive
                          onRate={setMyRating}
                        />
                      </div>
                    </div>
                    <label htmlFor="review-text" className="label mt-5 block">
                      Your review
                    </label>
                    <textarea
                      id="review-text"
                      rows={4}
                      value={myText}
                      onChange={(e) => setMyText(e.target.value)}
                      placeholder="What held up, what didn't. No spoilers."
                      className="field mt-2 resize-y"
                    />
                    <Button type="submit" className="mt-5 w-full">
                      Publish review
                    </Button>
                  </form>
                ) : (
                  <div>
                    <p className="text-[14px] leading-relaxed text-ink-2">
                      Sign in to leave a review and start your shelf.
                    </p>
                    <Button className="mt-4 w-full" onClick={() => navigate('/signin')}>
                      Sign in
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="stagger">
              {reviews.length > 0 ? (
                reviews.map((review) => <ReviewCard key={review.id} review={review} />)
              ) : (
                <div className="border-t border-rule pt-6">
                  <p className="font-display text-xl text-ink">No reviews yet.</p>
                  <p className="mt-2 text-sm text-ink-2">Be the first to put something on record.</p>
                </div>
              )}
            </div>
          </div>
        </PageContainer>
      </section>
    </div>
  );
};

export default BookDetailPage;
