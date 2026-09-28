import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiSearch, FiMenu, FiX, FiBook, FiBookOpen, FiLogIn, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = () => {
    signOut();
    toast.success('Signed out.');
    setIsMenuOpen(false);
    navigate('/');
  };

  const authControl = user ? (
    <div className="flex items-center gap-3">
      <span
        className="w-8 h-8 rounded-full bg-navy-800 text-amber-400 font-serif font-bold text-sm flex items-center justify-center"
        title={user.name}
        role="img"
        aria-label={`Signed in as ${user.name}`}
      >
        {user.name.charAt(0).toUpperCase()}
      </span>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900 transition"
        aria-label="Sign out"
      >
        <FiLogOut />
        <span className="hidden lg:inline">Sign out</span>
      </button>
    </div>
  ) : (
    <Link
      to="/signin"
      className="flex items-center gap-1.5 text-sm font-medium text-navy-600 hover:text-navy-900 transition"
    >
      <FiLogIn />
      Sign in
    </Link>
  );

  return (
    <header className="bg-white border-b border-cream-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 bg-navy-800 rounded-md flex items-center justify-center">
              <FiBook className="text-white text-lg" />
            </div>
            <span className="text-xl font-serif font-bold text-navy-900 tracking-tight">Folio</span>
          </Link>

          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search books, authors, or genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 bg-cream-100 border border-cream-200 rounded-lg text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent transition"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" />
            </div>
          </form>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/explore" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition">
              Explore
            </Link>
            <Link to="/my-books" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition">
              My Books
            </Link>
            {authControl}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-navy-700 hover:text-navy-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        <form onSubmit={handleSearch} className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-cream-100 border border-cream-200 rounded-lg text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-navy-400" />
          </div>
        </form>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-cream-200">
          <nav className="px-4 py-4 space-y-1">
            <Link
              to="/explore"
              className="flex items-center space-x-3 text-navy-700 hover:text-navy-900 hover:bg-cream-100 px-3 py-2.5 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiBookOpen className="text-lg" />
              <span className="font-medium">Explore</span>
            </Link>
            <Link
              to="/my-books"
              className="flex items-center space-x-3 text-navy-700 hover:text-navy-900 hover:bg-cream-100 px-3 py-2.5 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiBook className="text-lg" />
              <span className="font-medium">My Books</span>
            </Link>
            <div className="px-3 py-2.5">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 text-navy-700 hover:text-navy-900 transition"
                >
                  <FiLogOut className="text-lg" />
                  <span className="font-medium">Sign out ({user.name})</span>
                </button>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center space-x-3 text-navy-700 hover:text-navy-900 transition"
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
