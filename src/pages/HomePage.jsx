import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import { mockBooks } from '../data/mockBooks';
import { getShelves } from '../lib/library';
import { recommendBooks } from '../lib/recommend';
import { useAuth } from '../hooks/useAuth';
import { FiArrowRight, FiTrendingUp, FiStar, FiCompass } from 'react-icons/fi';

const HomePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const shelves = user ? getShelves(user.id) : [];
  const recommended = user ? recommendBooks(mockBooks, shelves) : [];
  const featuredBooks = mockBooks.slice(0, 4);
  const trendingBooks = mockBooks.slice(2, 6);
  const topRated = [...mockBooks].sort((a, b) => b.rating - a.rating).slice(0, 4);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { value: mockBooks.length, label: 'Curated titles' },
    { value: mockBooks.reduce((sum, b) => sum + b.reviewsCount, 0), label: 'Reader reviews' },
    { value: `${(mockBooks.reduce((s, b) => s + b.rating, 0) / mockBooks.length).toFixed(1)} ★`, label: 'Average rating' },
  ];

  const sectionHeader = (Icon, title, href) => (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-accent-soft flex items-center justify-center">
          <Icon className="text-accent-strong dark:text-accent text-lg" />
        </span>
        <h2 className="text-2xl font-serif font-bold text-ink">{title}</h2>
      </div>
      <Link
        to={href}
        className="text-sm font-medium text-muted hover:text-accent-strong dark:hover:text-accent transition"
      >
        View all
      </Link>
    </div>
  );

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="mesh-blob w-[520px] h-[520px] -top-40 -left-24"
            style={{ background: 'var(--mesh-1)' }}
          />
          <div
            className="mesh-blob w-[440px] h-[440px] -top-10 right-[-80px]"
            style={{ background: 'var(--mesh-2)', animationDelay: '-7s' }}
          />
        </div>

        <PageContainer className="relative py-24 md:py-32">
          <div className="max-w-2xl animate-page">
            <span className="inline-flex items-center gap-2 rounded-full bg-glass border border-line px-4 py-1.5 text-sm text-muted mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Your reading, beautifully kept
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-[1.08] tracking-tight text-ink">
              Discover Your Next <span className="text-accent-strong dark:text-accent italic">Great Read</span>
            </h1>
            <p className="text-lg md:text-xl text-muted mb-10 leading-relaxed">
              Join a community of thoughtful readers sharing honest reviews and curated
              recommendations.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/explore"
                className="inline-flex items-center space-x-2 bg-primary text-on-primary px-7 py-3 rounded-full font-semibold hover:bg-primary-hover transition active:scale-95 shadow-[var(--shadow-md)]"
              >
                <span>Start Exploring</span>
                <FiArrowRight />
              </Link>
              <Link
                to="/explore?sort=rating"
                className="inline-flex items-center space-x-2 border border-line-strong px-7 py-3 rounded-full font-semibold text-ink hover:bg-primary-soft transition active:scale-95"
              >
                <span>Browse top rated</span>
              </Link>
            </div>

            <dl className="flex flex-wrap gap-10 mt-14">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-3xl font-serif font-bold text-ink">{stat.value}</span>
                    <span className="text-sm text-faint">{stat.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        {recommended.length > 0 && (
          <section className="py-14">
            {sectionHeader(FiCompass, `Recommended for you, ${user.name.split(' ')[0]}`, '/explore')}
            <BookGrid books={recommended} loading={loading} />
          </section>
        )}

        <section className={`py-14 ${recommended.length > 0 ? 'border-t border-line' : ''}`}>
          {sectionHeader(FiStar, 'Featured Books', '/explore')}
          <BookGrid books={featuredBooks} loading={loading} />
        </section>

        <section className="py-14 border-t border-line">
          {sectionHeader(FiTrendingUp, 'Trending Now', '/explore?sort=trending')}
          <BookGrid books={trendingBooks} loading={loading} />
        </section>

        <section className="py-14 border-t border-line">
          {sectionHeader(FiStar, 'Top Rated', '/explore?sort=rating')}
          <BookGrid books={topRated} loading={loading} />
        </section>
      </PageContainer>
    </div>
  );
};

export default HomePage;
