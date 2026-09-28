import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageContainer from '../components/layout/PageContainer';
import BookCover from '../components/common/BookCover';
import Button from '../components/common/Button';
import { mockBooks } from '../data/mockBooks';
import { useAuth } from '../hooks/useAuth';

// Four covers shown alongside the form, so the page opens with the thing
// people came for.
const SHOWCASE = [mockBooks[2], mockBooks[1], mockBooks[4], mockBooks[5]];

const AuthPage = () => {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const { signUp, signIn, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const submit = (event) => {
    event.preventDefault();
    const result = mode === 'signup' ? signUp(name, username) : signIn(username);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(mode === 'signup' ? `Welcome to Folio, ${result.user.name}.` : 'Welcome back.');
    navigate(mode === 'signup' ? '/welcome' : '/');
  };

  const continueAsGuestReader = () => {
    continueAsGuest();
    toast.success('Browsing as a guest.');
    navigate('/');
  };

  return (
    <PageContainer className="flex min-h-[78vh] items-center py-16">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-20">
        <div>
          <header>
            <p className="label">Folio account</p>
            <h1 className="display mt-4 text-[clamp(2rem,5vw,2.75rem)] text-ink">
              {mode === 'signup' ? 'Open a shelf' : 'Welcome back'}
            </h1>
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-2">
              {mode === 'signup'
                ? 'Your shelves, reviews, and yearly goal are kept on this device — no email, no password, no server.'
                : 'Sign in with the username you set up on this device.'}
            </p>
          </header>

          <div className="mt-9 flex gap-7 border-b border-rule">
            {[
              { id: 'signin', label: 'Sign in' },
              { id: 'signup', label: 'Create account' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMode(tab.id)}
                className="group relative -mb-px pb-3"
                aria-current={mode === tab.id ? 'true' : undefined}
              >
                <span className={`label ${mode === tab.id ? 'text-accent' : 'group-hover:text-ink'}`}>
                  {tab.label}
                </span>
                <span
                  className={`absolute -bottom-px left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ${
                    mode === tab.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-8 space-y-7">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="label block">
                  Display name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Reader"
                  className="field mt-2"
                />
              </div>
            )}

            <div>
              <label htmlFor="username" className="label block">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="alex_reads"
                className="field mt-2"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-8 border-t border-rule pt-6 text-center">
            <button
              onClick={continueAsGuestReader}
              className="label transition-colors duration-200 hover:text-accent"
            >
              Or browse as a guest →
            </button>
          </div>

          <p className="mt-7 text-[12px] leading-relaxed text-ink-3">
            Demo accounts live in this browser only.{' '}
            <Link to="/" className="underline transition-colors hover:text-ink">
              Back to the catalogue
            </Link>
          </p>
        </div>

        {/* The reading matter, as a printed panel beside the form. */}
        <aside className="hidden lg:block">
          <div className="bg-ink-block p-10 text-on-ink">
            <p className="label opacity-60">Why a shelf?</p>
            <p className="display mt-5 max-w-[18ch] text-[clamp(1.5rem,2.4vw,2.1rem)]">
              Eight titles, argued about properly.
            </p>
            <p className="mt-5 max-w-[46ch] text-[14.5px] leading-relaxed opacity-70">
              Folio keeps what you have read, what you are reading, and what you meant to read
              next — then points you at the next thing worth your evening.
            </p>

            <div className="mt-10 flex gap-4">
              {SHOWCASE.map((book) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="block w-24 transition-transform duration-300 hover:-translate-y-1.5"
                  aria-label={book.title}
                >
                  <BookCover book={book} />
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
};

export default AuthPage;
