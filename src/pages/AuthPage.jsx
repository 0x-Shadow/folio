import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const { signUp, signIn, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result =
      mode === 'signup' ? signUp(name, username) : signIn(username);
    if (result.error) {
      toast.error(result.error);
      return;
    }
    toast.success(
      mode === 'signup' ? `Welcome to Folio, ${result.user.name}!` : 'Welcome back!'
    );
    navigate(mode === 'signup' ? '/welcome' : '/');
  };

  const handleGuest = () => {
    continueAsGuest();
    toast.success('Continuing as a guest.');
    navigate('/');
  };

  const inputClass =
    'w-full px-4 py-3 bg-glass border border-line rounded-2xl text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/60 transition';

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="mesh-blob w-[500px] h-[500px] -top-40 -left-32"
          style={{ background: 'var(--mesh-1)' }}
        />
        <div
          className="mesh-blob w-[420px] h-[420px] top-24 right-[-100px]"
          style={{ background: 'var(--mesh-2)', animationDelay: '-9s' }}
        />
      </div>

      <PageContainer className="relative">
        <div className="max-w-md mx-auto py-12 animate-page">
          <h1 className="text-3xl font-serif font-bold text-ink mb-2 text-center">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-muted text-center mb-8">
            {mode === 'signup'
              ? 'Your shelves, reviews, and goals live on this device.'
              : 'Pick up right where you left off.'}
          </p>

          <div className="glass-strong rounded-[28px] p-6 shadow-[var(--shadow-lg)]">
            <div className="flex gap-1 p-1 rounded-full bg-primary-soft mb-6">
              {['signin', 'signup'].map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium transition active:scale-95 ${
                    mode === m
                      ? 'bg-surface text-ink shadow-[var(--shadow-sm)]'
                      : 'text-muted hover:text-ink'
                  }`}
                >
                  {m === 'signin' ? 'Sign in' : 'Sign up'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                    Display name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Reader"
                    className={inputClass}
                  />
                </div>
              )}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-ink mb-1.5">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. alex_reads"
                  className={inputClass}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full">
                {mode === 'signup' ? 'Create account' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4 pt-4 border-t border-line text-center">
              <button
                onClick={handleGuest}
                className="text-sm font-medium text-muted hover:text-accent-strong dark:hover:text-accent transition"
              >
                Continue as a guest →
              </button>
            </div>
          </div>

          <p className="text-xs text-faint text-center mt-6">
            Demo auth — accounts are stored only in this browser. Back home?{' '}
            <Link to="/" className="underline hover:text-ink transition">
              Go back
            </Link>
          </p>
        </div>
      </PageContainer>
    </div>
  );
};

export default AuthPage;
