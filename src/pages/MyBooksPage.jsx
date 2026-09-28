import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import Button from '../components/common/Button';
import { mockBooks } from '../data/mockBooks';
import { bookshelfTypes } from '../data/mockBookshelves';
import { getShelves, getGoal, setGoal } from '../lib/library';
import { getReviewsByUser } from '../lib/reviewStore';
import { useAuth } from '../hooks/useAuth';

const MyBooksPage = () => {
  const { user, firstName } = useAuth();
  const [activeShelf, setActiveShelf] = useState('all');
  // Goals are saved in localStorage, so nudge a re-render after each write.
  const [, setGoalTick] = useState(0);

  if (!user) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-lg border border-rule px-6 py-16 text-center">
          <p className="label">Your shelf is empty</p>
          <h1 className="display mt-4 text-3xl text-ink">Sign in to start one.</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
            Track what you're reading, set a goal for the year, and keep your reviews in one
            place. Everything stays on this device.
          </p>
          <Link to="/signin" className="mt-8 inline-block">
            <Button>Sign in</Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const shelves = getShelves(user.id);
  const onShelf = (type) => shelves.filter((entry) => entry.shelf === type);
  const readBooks = onShelf(bookshelfTypes.READ);
  const readingBooks = onShelf(bookshelfTypes.READING);
  const wantBooks = onShelf(bookshelfTypes.WANT_TO_READ);

  const tabs = [
    { id: 'all', name: 'All', count: shelves.length },
    { id: bookshelfTypes.READ, name: 'Read', count: readBooks.length },
    { id: bookshelfTypes.READING, name: 'Reading', count: readingBooks.length },
    { id: bookshelfTypes.WANT_TO_READ, name: 'Want to read', count: wantBooks.length },
  ];

  // The books on the selected shelf, matched up with the catalogue.
  const visible = (activeShelf === 'all' ? shelves : onShelf(activeShelf))
    .map((entry) => mockBooks.find((book) => book.id === entry.bookId))
    .filter(Boolean);

  const pagesRead = readBooks.reduce((sum, entry) => {
    const book = mockBooks.find((b) => b.id === entry.bookId);
    return sum + (book?.pages ?? 0);
  }, 0);

  const reviewsWritten = getReviewsByUser(user.id).length;
  const goal = getGoal(user.id);
  const progress = Math.min(100, Math.round((readBooks.length / Math.max(goal, 1)) * 100));

  const adjustGoal = (delta) => {
    setGoal(user.id, Math.min(100, Math.max(1, goal + delta)));
    setGoalTick((tick) => tick + 1);
  };

  const stats = [
    { value: readBooks.length, label: 'Books read' },
    { value: pagesRead.toLocaleString(), label: 'Pages' },
    { value: readingBooks.length, label: 'Reading now' },
    { value: reviewsWritten, label: 'Reviews' },
  ];

  return (
    <PageContainer>
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Your shelf</p>
          <h1 className="display mt-4 text-[clamp(2.25rem,5vw,3.5rem)] text-ink">
            {firstName}&rsquo;s library
          </h1>
        </div>
        <Link
          to="/explore"
          className="label inline-flex items-center gap-2 border border-rule px-4 py-2.5 transition-colors hover:border-accent hover:text-accent"
        >
          Find something new
          <FiArrowRight size={13} />
        </Link>
      </header>

      {/* Reading figures, set like a table row. */}
      <dl className="grid grid-cols-2 border-y border-rule md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`py-6 pr-4 ${index % 2 === 1 ? 'border-l border-rule pl-4' : ''} ${
              index > 1 ? 'border-t border-rule md:border-t-0' : ''
            } ${index === 2 ? 'md:border-l md:border-rule md:pl-4' : ''} ${
              index === 3 ? 'md:border-l md:border-rule md:pl-4' : ''
            }`}
          >
            <dt className="label">{stat.label}</dt>
            <dd className="tnum font-display mt-2 text-3xl text-ink">{stat.value}</dd>
          </div>
        ))}
      </dl>

      {/* The goal, as an inset panel. */}
      <section className="mt-10 border border-rule bg-raised p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <FiTarget className="mt-1 text-accent" size={20} />
            <div>
              <h2 className="font-display text-2xl text-ink">This year&rsquo;s goal</h2>
              <p className="tnum mt-1.5 text-sm text-ink-2">
                {readBooks.length} of {goal} books · {progress}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => adjustGoal(-1)}
              className="grid h-9 w-9 place-items-center border border-rule text-ink-2 transition-colors hover:border-accent hover:text-accent"
              aria-label="Lower the goal by one book"
            >
              <FiMinus size={14} />
            </button>
            <span className="tnum w-10 text-center font-display text-2xl text-ink">{goal}</span>
            <button
              onClick={() => adjustGoal(1)}
              className="grid h-9 w-9 place-items-center border border-rule text-ink-2 transition-colors hover:border-accent hover:text-accent"
              aria-label="Raise the goal by one book"
            >
              <FiPlus size={14} />
            </button>
          </div>
        </div>

        <div className="mt-7 h-[3px] w-full bg-rule">
          <div
            className="h-full bg-accent transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </section>

      {/* Shelves, as a table of contents. */}
      <div className="mt-12 flex flex-wrap gap-x-8 gap-y-1 border-b border-rule">
        {tabs.map((tab) => {
          const active = activeShelf === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveShelf(tab.id)}
              className="group relative -mb-px flex items-center gap-2 pb-3"
              aria-current={active ? 'true' : undefined}
            >
              <span className={`label transition-colors ${active ? 'text-accent' : 'group-hover:text-ink'}`}>
                {tab.name}
              </span>
              <span className="tnum text-[11px] text-ink-3">{tab.count}</span>
              <span
                className={`absolute -bottom-px left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ${
                  active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        {visible.length > 0 ? (
          <BookGrid books={visible} />
        ) : (
          <div className="border border-rule px-6 py-16 text-center">
            <p className="font-display text-xl text-ink">This shelf is empty.</p>
            <Link
              to="/explore"
              className="label mt-4 inline-block transition-colors hover:text-accent"
            >
              Find something to read →
            </Link>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default MyBooksPage;
