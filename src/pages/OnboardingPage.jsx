import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { GENRES } from '../data/genres';
import { mockBooks } from '../data/mockBooks';
import { addToShelf } from '../lib/library';

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
    if (selected.length < 3) {
      toast.error('Pick at least 3 genres so we can seed your shelves.');
      return;
    }
    const added = new Set();
    selected.forEach((genre) => {
      const pick = [...mockBooks]
        .sort((a, b) => b.rating - a.rating)
        .find((book) => book.genre.includes(genre) && !added.has(book.id));
      if (pick) {
        added.add(pick.id);
        addToShelf(user.id, pick.id, 'want-to-read');
      }
    });
    toast.success('Your library is seeded. Happy reading!');
    navigate('/my-books');
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="mesh-blob w-[460px] h-[460px] -top-32 right-[-80px]"
          style={{ background: 'var(--mesh-1)' }}
        />
        <div
          className="mesh-blob w-[420px] h-[420px] bottom-[-120px] left-[-100px]"
          style={{ background: 'var(--mesh-2)', animationDelay: '-5s' }}
        />
      </div>

      <PageContainer className="relative">
        <div className="max-w-2xl mx-auto py-12 animate-page">
          <h1 className="text-3xl font-serif font-bold text-ink mb-2 text-center">
            What do you love to read, {user.name.split(' ')[0]}?
          </h1>
          <p className="text-muted text-center mb-8">
            Pick at least 3 genres and we will stock your Want to Read shelf with top-rated picks.
          </p>

          <div className="glass-strong rounded-[28px] p-6 mb-6 shadow-[var(--shadow-lg)]">
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre, index) => (
                <button
                  key={genre}
                  onClick={() => toggle(genre)}
                  aria-pressed={selected.includes(genre)}
                  style={{ animationDelay: `${index * 0.03}s` }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition animate-pop active:scale-95 ${
                    selected.includes(genre)
                      ? 'bg-primary text-on-primary shadow-[var(--shadow-sm)]'
                      : 'bg-primary-soft text-muted hover:text-ink'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-sm font-medium text-muted hover:text-ink transition"
            >
              Skip for now
            </Link>
            <Button variant="primary" onClick={finish}>
              Build my library ({selected.length})
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default OnboardingPage;
