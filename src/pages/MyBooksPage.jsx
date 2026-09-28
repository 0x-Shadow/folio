import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiBookOpen, FiClock, FiStar, FiTarget, FiMinus, FiPlus } from 'react-icons/fi';
import PageContainer from '../components/layout/PageContainer';
import BookCard from '../components/books/BookCard';
import Button from '../components/common/Button';
import { mockBooks } from '../data/mockBooks';
import { bookshelfTypes } from '../data/mockBookshelves';
import { getShelves, getGoal, setGoal } from '../lib/library';
import { getReviewsByUser } from '../lib/reviewStore';
import { useAuth } from '../hooks/useAuth';

const MyBooksPage = () => {
  const [activeShelf, setActiveShelf] = useState('all');
  const { user } = useAuth();
  const [goalTick, setGoalTick] = useState(0);

  if (!user) {
    return (
      <PageContainer>
        <div className="glass-card max-w-md mx-auto py-16 px-8 text-center">
          <span className="w-16 h-16 rounded-full bg-accent-soft mx-auto flex items-center justify-center mb-5">
            <FiBook className="text-accent-strong dark:text-accent text-3xl" />
          </span>
          <h1 className="text-3xl font-serif font-bold text-ink mb-2">Your library awaits</h1>
          <p className="text-muted mb-8">
            Sign in to track your shelves, set reading goals, and get recommendations.
          </p>
          <Link to="/signin">
            <Button variant="primary">Sign in</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const shelves = getShelves(user.id);
  const onShelf = (type) => shelves.filter((b) => b.shelf === type);
  const readBooks = onShelf(bookshelfTypes.READ);
  const readingBooks = onShelf(bookshelfTypes.READING);
  const wantBooks = onShelf(bookshelfTypes.WANT_TO_READ);

  const shelfTypes = [
    { id: 'all', name: 'All Books', count: shelves.length },
    { id: bookshelfTypes.READ, name: 'Read', count: readBooks.length },
    { id: bookshelfTypes.READING, name: 'Currently Reading', count: readingBooks.length },
    { id: bookshelfTypes.WANT_TO_READ, name: 'Want to Read', count: wantBooks.length },
  ];

  const filtered = (activeShelf === 'all' ? shelves : onShelf(activeShelf)).map((entry) => {
    const book = mockBooks.find((b) => b.id === entry.bookId);
    return { ...book, shelfInfo: entry };
  });

  const pagesRead = readBooks.reduce((sum, entry) => {
    const book = mockBooks.find((b) => b.id === entry.bookId);
    return sum + (book?.pages ?? 0);
  }, 0);
  const myReviews = getReviewsByUser(user.id);

  const stats = [
    { icon: FiBook, label: 'Books read', value: readBooks.length },
    { icon: FiBookOpen, label: 'Pages read', value: pagesRead.toLocaleString() },
    { icon: FiClock, label: 'Currently reading', value: readingBooks.length },
    { icon: FiStar, label: 'Reviews written', value: myReviews.length },
  ];

  const goal = getGoal(user.id);
  const progress = Math.min(100, Math.round((readBooks.length / Math.max(goal, 1)) * 100));

  const adjustGoal = (delta) => {
    setGoal(user.id, Math.min(100, Math.max(1, goal + delta)));
    setGoalTick((t) => t + 1);
  };
  void goalTick;

  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-ink mb-2">
          {user.name.split(' ')[0]}&rsquo;s Library
        </h1>
        <p className="text-muted">Organize and track your reading journey</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 stagger">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-5 text-center">
            <span className="w-9 h-9 rounded-full bg-accent-soft mx-auto flex items-center justify-center mb-3">
              <stat.icon className="text-accent-strong dark:text-accent text-lg" />
            </span>
            <p className="text-2xl font-serif font-bold text-ink mb-1">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[20px] p-6 mb-8 text-white bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 shadow-[var(--shadow-lg)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-amber-400/20 flex items-center justify-center">
              <FiTarget className="text-amber-300 text-xl" />
            </span>
            <div>
              <p className="font-semibold">Yearly reading goal</p>
              <p className="text-sm text-navy-200">
                {readBooks.length} of {goal} books · {progress}%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => adjustGoal(-1)}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition active:scale-90"
              aria-label="Decrease yearly goal"
            >
              <FiMinus />
            </button>
            <span className="w-12 text-center font-bold text-lg">{goal}</span>
            <button
              onClick={() => adjustGoal(1)}
              className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition active:scale-90"
              aria-label="Increase yearly goal"
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <div className="mt-4 bg-white/20 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-300 to-amber-400 h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="inline-flex gap-1 p-1 rounded-full bg-glass border border-line overflow-x-auto max-w-full backdrop-blur-md">
          {shelfTypes.map((shelf) => (
            <button
              key={shelf.id}
              onClick={() => setActiveShelf(shelf.id)}
              className={`px-5 py-2 font-medium whitespace-nowrap transition text-sm rounded-full active:scale-95 ${
                activeShelf === shelf.id
                  ? 'bg-primary text-on-primary shadow-[var(--shadow-sm)]'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {shelf.name}
              <span
                className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  activeShelf === shelf.id
                    ? 'bg-white/20 text-on-primary'
                    : 'bg-primary-soft text-muted'
                }`}
              >
                {shelf.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger">
          {filtered.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              {book.shelfInfo?.progress && (
                <div className="absolute bottom-2 left-2 right-2 glass-strong rounded-2xl p-3 shadow-[var(--shadow-md)]">
                  <div className="flex justify-between text-xs text-muted mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium text-ink">{book.shelfInfo.progress}%</span>
                  </div>
                  <div className="w-full bg-line rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full transition-all"
                      style={{ width: `${book.shelfInfo.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card text-center py-16">
          <p className="text-muted">No books in this shelf yet.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default MyBooksPage;
