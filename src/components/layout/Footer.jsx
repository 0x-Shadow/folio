import { Link } from 'react-router-dom';
import { FiBook, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-navy-950 text-navy-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-8 h-8 bg-navy-700 rounded-md flex items-center justify-center">
                <FiBook className="text-white text-lg" />
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">Folio</span>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed">
              A refined platform for discovering, reviewing, and organizing your reading journey.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Discover</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/explore" className="text-sm hover:text-amber-400 transition">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/explore?sort=trending" className="text-sm hover:text-amber-400 transition">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/explore?sort=new" className="text-sm hover:text-amber-400 transition">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-amber-400 transition">
                  Book Clubs
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-amber-400 transition">
                  Discussions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-amber-400 transition">
                  Reading Challenges
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-amber-400 transition" aria-label="GitHub">
                <FiGithub className="text-xl" />
              </a>
              <a href="#" className="hover:text-amber-400 transition" aria-label="Twitter">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:text-amber-400 transition" aria-label="Instagram">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 text-center text-sm text-navy-500">
          <p>&copy; 2025 Folio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
