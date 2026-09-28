import { Link } from 'react-router-dom';
import { FiBook, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="border-t border-line bg-surface mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <FiBook className="text-on-primary text-lg" />
              </div>
              <span className="text-xl font-serif font-bold text-ink tracking-tight">Folio</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              A refined platform for discovering, reviewing, and organizing your reading journey.
            </p>
          </div>

          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Discover</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/explore" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/explore?sort=trending" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/explore?sort=new" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  Book Clubs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  Discussions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted hover:text-accent-strong dark:hover:text-accent transition">
                  Reading Challenges
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-ink font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted hover:text-accent-strong dark:hover:text-accent transition" aria-label="GitHub">
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="text-muted hover:text-accent-strong dark:hover:text-accent transition" aria-label="Twitter">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-muted hover:text-accent-strong dark:hover:text-accent transition" aria-label="Instagram">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line mt-12 pt-8 text-center text-sm text-faint">
          <p>&copy; 2026 Folio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
