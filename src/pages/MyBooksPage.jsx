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
        <div className="max-w-md mx-auto py-16 text-center">
          <FiBook className="mx-auto text-5xl text-navy-300 mb-4" />
          <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">Your library awaits</h1>
          <p className="text-navy-600 mb-8">
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
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2">
          {user.name.split(' ')[0]}&rsquo;s Library
        </h1>
        <p className="text-navy-600">Organize and track your reading journey</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-cream-200 p-5 text-center">
            <stat.icon className="mx-auto text-xl text-amber-500 mb-2" />
            <p className="text-2xl font-bold text-navy-900 mb-1">{stat.value}</p>
            <p className="text-sm text-navy-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-navy-900 rounded-lg p-6 mb-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div className="flex items-center gap-3">
            <FiTarget className="text-amber-400 text-2xl" />
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
              className="w-9 h-9 rounded-lg bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition"
              aria-label="Decrease yearly goal"
            >
              <FiMinus />
            </button>
            <span className="w-12 text-center font-bold text-lg">{goal}</span>
            <button
              onClick={() => adjustGoal(1)}
              className="w-9 h-9 rounded-lg bg-navy-700 hover:bg-navy-600 flex items-center justify-center transition"
              aria-label="Increase yearly goal"
            >
              <FiPlus />
            </button>
          </div>
        </div>
        <div className="mt-4 bg-navy-700 rounded-full h-2.5">
          <div
            className="bg-amber-400 h-2.5 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8 border-b border-cream-200">
        <div className="flex gap-1 overflow-x-auto">
          {shelfTypes.map((shelf) => (
            <button
              key={shelf.id}
              onClick={() => setActiveShelf(shelf.id)}
              className={`px-5 py-3 font-medium whitespace-nowrap transition text-sm ${
                activeShelf === shelf.id
                  ? 'border-b-2 border-navy-800 text-navy-800'
                  : 'text-navy-500 hover:text-navy-900'
              }`}
            >
              {shelf.name}
              <span className="ml-2 text-xs bg-cream-200 text-navy-600 px-2 py-0.5 rounded-full">
                {shelf.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((book) => (
            <div key={book.id} className="relative">
              <BookCard book={book} />
              {book.shelfInfo?.progress && (
                <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg p-3 shadow-md border border-cream-200">
                  <div className="flex justify-between text-xs text-navy-600 mb-1.5">
                    <span>Progress</span>
                    <span className="font-medium">{book.shelfInfo.progress}%</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2">
                    <div
                      className="bg-navy-700 h-2 rounded-full transition-all"
                      style={{ width: `${book.shelfInfo.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-cream-100 rounded-lg">
          <p className="text-navy-600">No books in this shelf yet.</p>
        </div>
      )}
    </PageContainer>
  );
};

export default MyBooksPage;
