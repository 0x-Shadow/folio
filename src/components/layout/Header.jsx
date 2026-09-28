import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FiSearch,
  FiMenu,
  FiX,
  FiBook,
  FiBookOpen,
  FiLogIn,
  FiLogOut,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/my-books', label: 'My Books' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0, visible: false });
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef(null);
  const itemRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useLayoutEffect(() => {
    const container = navRef.current;
    const active = itemRefs.current[location.pathname];
    if (!container || !active) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    setPill({
      left: aRect.left - cRect.left,
      width: aRect.width,
      visible: true,
    });
  }, [location.pathname, user]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out.');
    setIsMenuOpen(false);
    navigate('/');
  };

  const isActive = (to) => location.pathname === to;

  const themeButton = (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-primary-soft transition active:scale-90"
      aria-label={theme === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance'}
      title="Switch appearance"
    >
      <span className="animate-pop" key={theme}>
        {theme === 'dark' ? <FiMoon className="text-base" /> : <FiSun className="text-base" />}
      </span>
    </button>
  );

  const authControl = user ? (
    <div className="flex items-center gap-2">
      <span
        className="w-8 h-8 rounded-full bg-primary text-on-primary font-serif font-bold text-sm flex items-center justify-center"
        title={user.name}
        role="img"
        aria-label={`Signed in as ${user.name}`}
      >
        {user.name.charAt(0).toUpperCase()}
      </span>
      <button
        onClick={handleSignOut}
        className="w-9 h-9 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:bg-primary-soft transition active:scale-90"
        aria-label="Sign out"
        title="Sign out"
      >
        <FiLogOut />
      </button>
    </div>
  ) : (
    <Link
      to="/signin"
      className="flex items-center gap-1.5 rounded-full bg-primary text-on-primary px-4 py-1.5 text-sm font-medium hover:bg-primary-hover transition active:scale-95"
    >
      <FiLogIn />
      Sign in
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-50 glass-strong transition-shadow duration-300 ${
        scrolled ? 'shadow-[var(--shadow-md)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center space-x-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-sm)]">
              <FiBook className="text-on-primary text-lg" />
            </div>
            <span className="text-xl font-serif font-bold text-ink tracking-tight">Folio</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search books, authors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full bg-glass border border-line text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/60 transition"
                aria-label="Search books"
              />
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
            </div>
          </form>

          <div className="hidden md:flex items-center gap-1 relative" ref={navRef}>
            <span
              className={`nav-pill absolute top-1/2 -translate-y-1/2 h-9 rounded-full bg-primary-soft ${
                pill.visible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ left: pill.left, width: pill.width }}
              aria-hidden="true"
            />
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                ref={(el) => {
                  itemRefs.current[item.to] = el;
                }}
                className={`relative z-10 px-4 h-9 inline-flex items-center text-sm font-medium transition-colors rounded-full ${
                  isActive(item.to) ? 'text-primary' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            {themeButton}
            <div className="hidden md:block">{authControl}</div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full border border-line flex items-center justify-center text-ink hover:bg-primary-soft transition active:scale-90"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
            </button>
          </div>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full bg-glass border border-line text-sm text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-accent/60"
              aria-label="Search books"
            />
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-faint pointer-events-none" />
          </div>
        </form>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-strong border-t border-line animate-pop">
          <nav className="stagger px-4 py-3 space-y-1" onClick={() => setIsMenuOpen(false)}>
            {NAV_ITEMS.map((item) => {
              const Icon = item.to === '/explore' ? FiBookOpen : FiBook;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl transition ${
                    isActive(item.to)
                      ? 'bg-primary-soft text-primary font-medium'
                      : 'text-ink hover:bg-primary-soft'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            <div className="px-4 py-2.5">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 text-ink transition"
                >
                  <FiLogOut className="text-lg" />
                  <span className="font-medium">Sign out ({user.name})</span>
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center space-x-3 text-ink transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="text-lg" />
                  <span className="font-medium">Sign in</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
