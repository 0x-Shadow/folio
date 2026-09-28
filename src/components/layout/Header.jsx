import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiSearch, FiX, FiMenu, FiSun, FiMoon } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Catalogue' },
  { to: '/my-books', label: 'My Shelf' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const submitSearch = (event) => {
    event.preventDefault();
    const term = query.trim();
    if (!term) return;
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setQuery('');
    setMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out.');
    setMenuOpen(false);
    navigate('/');
  };

  const searchField = (
    <div className="relative w-full">
      <FiSearch
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3"
        size={14}
        aria-hidden="true"
      />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search title, author, genre"
        aria-label="Search the catalogue"
        className="search-input"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery('')}
          className="absolute right-2 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center text-ink-3 transition-colors hover:text-ink"
          aria-label="Clear search"
        >
          <FiX size={12} />
        </button>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-[6px] transition-colors duration-300">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex h-16 items-center gap-8">
          <Link to="/" className="flex shrink-0 items-end gap-2.5" aria-label="Folio home">
            <span className="mb-1 block h-5 w-[3px] bg-accent" aria-hidden="true" />
            <span className="font-display text-[22px] font-medium leading-none tracking-[-0.02em] text-ink">
              Folio
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link key={item.to} to={item.to} className="group relative py-2" aria-current={active ? 'page' : undefined}>
                  <span className={`label transition-colors duration-200 group-hover:text-ink ${active ? 'text-accent' : ''}`}>
                    {item.label}
                  </span>
                  <span
                    className={`absolute -bottom-px left-0 h-[2px] w-full origin-left bg-accent transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <form onSubmit={submitSearch} role="search" className="ml-auto hidden w-64 lg:block">
            {searchField}
          </form>

          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center border border-rule text-ink-2 transition-colors duration-200 hover:border-accent hover:text-accent"
              aria-label={theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'}
              title="Switch appearance"
            >
              {theme === 'dark' ? <FiMoon size={14} /> : <FiSun size={14} />}
            </button>

            {user ? (
              <div className="hidden items-center gap-4 sm:flex">
                <span className="label text-ink-2">{user.name}</span>
                <button onClick={handleSignOut} className="label transition-colors duration-200 hover:text-accent">
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="label hidden text-ink transition-colors duration-200 hover:text-accent sm:block"
              >
                Sign in
              </Link>
            )}

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="grid h-9 w-9 place-items-center border border-rule text-ink transition-colors hover:border-accent hover:text-accent md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={14} /> : <FiMenu size={14} />}
            </button>
          </div>
        </div>

        <form onSubmit={submitSearch} role="search" className="pb-3 lg:hidden">
          {searchField}
        </form>
      </div>

      {menuOpen && (
        <div className="border-t border-rule bg-paper md:hidden">
          <nav className="stagger flex flex-col px-5 py-2 sm:px-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className={`label border-b border-rule py-3.5 ${location.pathname === item.to ? 'text-accent' : 'text-ink-2'}`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleSignOut} className="label border-b border-rule py-3.5 text-left text-ink-2">
                Sign out
              </button>
            ) : (
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="label border-b border-rule py-3.5 text-left text-ink-2"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
