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

  return (
    <PageContainer>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-serif font-bold text-navy-900 mb-2 text-center">
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-navy-600 text-center mb-8">
          {mode === 'signup'
            ? 'Your shelves, reviews, and goals live on this device.'
            : 'Pick up right where you left off.'}
        </p>

        <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6">
          <div className="flex gap-2 mb-6">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition ${
                  mode === m
                    ? 'bg-navy-800 text-white'
                    : 'bg-cream-100 text-navy-700 hover:bg-cream-200'
                }`}
              >
                {m === 'signin' ? 'Sign in' : 'Sign up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-1.5">
                  Display name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Reader"
                  className="w-full px-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500"
                />
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-navy-900 mb-1.5">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. alex_reads"
                className="w-full px-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              {mode === 'signup' ? 'Create account' : 'Sign in'}
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-cream-200 text-center">
            <button
              onClick={handleGuest}
              className="text-sm font-medium text-navy-600 hover:text-navy-900 transition"
            >
              Continue as a guest →
            </button>
          </div>
        </div>

        <p className="text-xs text-navy-400 text-center mt-6">
          Demo auth — accounts are stored only in this browser. Back home?{' '}
          <Link to="/" className="underline hover:text-navy-700">Go back</Link>
        </p>
      </div>
    </PageContainer>
  );
};

export default AuthPage;
