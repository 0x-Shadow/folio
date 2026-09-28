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
    <PageContainer>
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2 text-center">
          What do you love to read, {user.name.split(' ')[0]}?
        </h1>
        <p className="text-navy-600 text-center mb-8">
          Pick at least 3 genres and we will stock your Want to Read shelf with top-rated picks.
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 mb-6">
          <div className="flex flex-wrap gap-2">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => toggle(genre)}
                aria-pressed={selected.includes(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selected.includes(genre)
                    ? 'bg-navy-800 text-white'
                    : 'bg-cream-100 text-navy-700 hover:bg-cream-200'
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
            className="text-sm font-medium text-navy-600 hover:text-navy-900 transition"
          >
            Skip for now
          </Link>
          <Button variant="primary" onClick={finish}>
            Build my library ({selected.length})
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default OnboardingPage;
