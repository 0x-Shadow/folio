import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { GENRES } from '../data/genres';
import { mockBooks } from '../data/mockBooks';
import { bookshelfTypes } from '../data/mockBookshelves';
import { addToShelf } from '../lib/library';
import { topBookPerGenre } from '../lib/sorting';
import { useAuth } from '../hooks/useAuth';

const MINIMUM = 3;

const OnboardingPage = () => {
  const [selected, setSelected] = useState([]);
  const { user, firstName } = useAuth();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/signin" replace />;

  const toggle = (genre) => {
    setSelected((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const finish = () => {
    if (selected.length < MINIMUM) {
      toast.error(`Pick at least ${MINIMUM} genres so we can stock your shelf.`);
      return;
    }

    topBookPerGenre(mockBooks, selected).forEach((book) => {
      addToShelf(user.id, book.id, bookshelfTypes.WANT_TO_READ);
    });

    toast.success('Your shelf is stocked.');
    navigate('/my-books');
  };

  return (
    <PageContainer className="flex min-h-[78vh] items-center py-16">
      <div className="mx-auto w-full max-w-2xl">
        <header>
          <p className="label">Step one of one</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3rem)] text-ink">
            What do you like reading, {firstName}?
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
            Pick at least {MINIMUM} genres. We&rsquo;ll put the highest-rated title from each one on your
            Want to read shelf — you can clear it out later.
          </p>
        </header>

        <div className="mt-9 border border-rule bg-raised">
          <div className="flex items-baseline justify-between gap-4 border-b border-rule px-6 py-4">
            <h2 className="font-display text-lg text-ink">Genres</h2>
            <p className="label tnum">
              {selected.length} of {MINIMUM} needed
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 p-6">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggle(genre)}
                aria-pressed={selected.includes(genre)}
                className="chip"
              >
                {selected.includes(genre) && <span aria-hidden="true">✓</span>}
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="label transition-colors hover:text-ink">
            Skip for now
          </Link>
          <Button onClick={finish}>Build my shelf</Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default OnboardingPage;
