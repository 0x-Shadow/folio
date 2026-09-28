import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
    <PageContainer>
      <div className="mx-auto max-w-md">
        <header className="text-center">
          <p className="label">Folio account</p>
          <h1 className="display mt-4 text-[clamp(2rem,5vw,2.75rem)] text-ink">
            {mode === 'signup' ? 'Open a shelf' : 'Welcome back'}
          </h1>
          <p className="mx-auto mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-ink-2">
            {mode === 'signup'
              ? 'Your shelves, reviews, and yearly goal are kept on this device — no email, no password, no server.'
              : 'Sign in with the username you set up on this device.'}
          </p>
        </header>

        <div className="mt-10 flex justify-center gap-7 border-b border-rule">
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

        <form onSubmit={submit} className="mt-9 space-y-7">
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

        <p className="mt-8 text-center text-[12px] leading-relaxed text-ink-3">
          Demo accounts live in this browser only.{' '}
          <Link to="/" className="underline transition-colors hover:text-ink">
            Back to the catalogue
          </Link>
        </p>
      </div>
    </PageContainer>
  );
};

export default AuthPage;
