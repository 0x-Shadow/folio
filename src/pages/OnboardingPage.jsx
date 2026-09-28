import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { GENRES } from '../data/genres';
import { mockBooks } from '../data/mockBooks';
import { addToShelf } from '../lib/library';
import { useAuth } from '../hooks/useAuth';

const MINIMUM = 3;

const OnboardingPage = () => {
  const [selected, setSelected] = useState([]);
  const { user } = useAuth();
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

    const taken = new Set();
    selected.forEach((genre) => {
      const pick = [...mockBooks]
        .sort((a, b) => b.rating - a.rating)
        .find((book) => book.genre.includes(genre) && !taken.has(book.id));
      if (pick) {
        taken.add(pick.id);
        addToShelf(user.id, pick.id, 'want-to-read');
      }
    });

    toast.success('Your shelf is stocked.');
    navigate('/my-books');
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-2xl">
        <header>
          <p className="label">Step one of one</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,3rem)] text-ink">
            What do you like reading, {user.name.split(' ')[0]}?
          </h1>
          <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-2">
            Pick at least {MINIMUM} genres. We'll put the highest-rated title from each one on your
            Want to read shelf — you can clear it out later.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2.5 border-y border-rule py-8">
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

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="label tnum">
            {selected.length} selected {selected.length < MINIMUM && `· ${MINIMUM - selected.length} more`}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/" className="label transition-colors hover:text-ink">
              Skip
            </Link>
            <Button onClick={finish}>Build my shelf</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default OnboardingPage;
