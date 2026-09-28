import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';
import { FiArrowRight, FiTrendingUp, FiStar } from 'react-icons/fi';

const HomePage = () => {
  const featuredBooks = mockBooks.slice(0, 4);
  const trendingBooks = mockBooks.slice(2, 6);
  const topRated = [...mockBooks].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <div>
      <section className="bg-navy-900 text-white py-20 md:py-28">
        <PageContainer>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              Discover Your Next Great Read
            </h1>
            <p className="text-lg md:text-xl text-navy-200 mb-10 leading-relaxed">
              Join a community of thoughtful readers sharing honest reviews and curated recommendations.
            </p>
            <Link
              to="/explore"
              className="inline-flex items-center space-x-2 bg-amber-500 text-navy-900 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              <span>Start Exploring</span>
              <FiArrowRight />
            </Link>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiStar className="text-amber-500 text-xl" />
              <h2 className="text-2xl font-serif font-bold text-navy-900">Featured Books</h2>
            </div>
            <Link to="/explore" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition">
              View all
            </Link>
          </div>
          <BookGrid books={featuredBooks} />
        </section>

        <section className="py-16 border-t border-cream-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiTrendingUp className="text-amber-500 text-xl" />
              <h2 className="text-2xl font-serif font-bold text-navy-900">Trending Now</h2>
            </div>
            <Link to="/explore?sort=trending" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition">
              View all
            </Link>
          </div>
          <BookGrid books={trendingBooks} />
        </section>

        <section className="py-16 border-t border-cream-200">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <FiStar className="text-amber-500 text-xl" />
              <h2 className="text-2xl font-serif font-bold text-navy-900">Top Rated</h2>
            </div>
            <Link to="/explore?sort=rating" className="text-sm font-medium text-navy-600 hover:text-navy-900 transition">
              View all
            </Link>
          </div>
          <BookGrid books={topRated} />
        </section>
      </PageContainer>
    </div>
  );
};

export default HomePage;
