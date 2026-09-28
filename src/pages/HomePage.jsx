import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import BookGrid from '../components/books/BookGrid';
import BookCover from '../components/common/BookCover';
import Rating from '../components/common/Rating';
import { mockBooks } from '../data/mockBooks';
import { getShelves } from '../lib/library';
import { recommendBooks } from '../lib/recommend';
import { useAuth } from '../hooks/useAuth';

const SectionHead = ({ title, note, to, count, linkLabel = 'View all' }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-rule pb-3.5">
    <div>
      <h2 className="font-display text-[26px] leading-tight text-ink">{title}</h2>
      {note && <p className="mt-1.5 text-[13px] text-ink-2">{note}</p>}
    </div>
    <div className="flex items-center gap-6">
      {count != null && <span className="label tnum">{count} titles</span>}
      {to && (
        <Link to={to} className="label transition-colors duration-200 hover:text-accent">
          {linkLabel} →
        </Link>
      )}
    </div>
  </div>
);

const HomePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 380);
    return () => clearTimeout(timer);
  }, []);

  const shelves = user ? getShelves(user.id) : [];
  const recommended = user ? recommendBooks(mockBooks, shelves) : [];

  const topRated = [...mockBooks].sort((a, b) => b.rating - a.rating);
  const mostReviewed = [...mockBooks].sort((a, b) => b.reviewsCount - a.reviewsCount);
  const newest = [...mockBooks].sort((a, b) => b.publishYear - a.publishYear);

  const feature = topRated[0];
  const totalReviews = mockBooks.reduce((sum, book) => sum + book.reviewsCount, 0);
  const average = (
    mockBooks.reduce((sum, book) => sum + book.rating, 0) / mockBooks.length
  ).toFixed(1);

  return (
    <div>
      {/* Masthead ------------------------------------------------------- */}
      <section className="border-b border-rule">
        <PageContainer className="pb-14 pt-16 sm:pt-20">
          <p className="label">
            September 2026 · A catalogue of {mockBooks.length} titles
          </p>

          <h1 className="display mt-7 max-w-[15ch] text-[clamp(2.75rem,7vw,5.25rem)] text-ink">
            Books worth arguing about.
          </h1>

          <p className="mt-7 max-w-[54ch] text-[15.5px] leading-relaxed text-ink-2">
            Folio is a small, opinionated catalogue. Every title here earned its place — a debut
            that deserved more attention, a translation that finally works, a paperback that ruined
            paperbacks for everyone else.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-rule pt-6">
            {[
              { value: mockBooks.length, label: 'Titles' },
              { value: totalReviews.toLocaleString(), label: 'Reviews' },
              { value: `${average}★`, label: 'Average' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span className="tnum font-display text-2xl text-ink">{stat.value}</span>
                <span className="label">{stat.label}</span>
              </div>
            ))}
            <Link
              to="/explore"
              className="label ml-auto hidden transition-colors duration-200 hover:text-accent sm:block"
            >
              Browse the catalogue →
            </Link>
          </div>
        </PageContainer>
      </section>

      {/* The feature ---------------------------------------------------- */}
      <section className="border-b border-rule">
        <PageContainer className="py-14">
          <div className="grid gap-10 md:grid-cols-[minmax(0,300px)_1fr] md:gap-16 lg:gap-24">
            <Link to={`/book/${feature.id}`} className="block">
              <BookCover book={feature} className="aspect-[3/4]" />
            </Link>

            <div className="flex flex-col justify-center">
              <p className="label text-accent">The feature</p>
              <h2 className="display mt-5 max-w-[20ch] text-[clamp(2rem,4vw,3.25rem)] text-ink">
                {feature.title}
              </h2>
              <p className="mt-3 text-[15px] text-ink-2">
                {feature.author} · {feature.publishYear} · {feature.pages} pages
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Rating rating={feature.rating} size="md" />
                <span className="label">{feature.ratingsCount.toLocaleString()} ratings</span>
              </div>

              <p className="mt-6 max-w-[62ch] text-[15px] leading-relaxed text-ink-2">
                {feature.description}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-6">
                <Link
                  to={`/book/${feature.id}`}
                  className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent active:translate-y-px"
                >
                  Read the entry
                </Link>
                <Link
                  to="/explore"
                  className="label transition-colors duration-200 hover:text-accent"
                >
                  More like this →
                </Link>
              </div>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Sections ------------------------------------------------------- */}
      <PageContainer>
        {recommended.length > 0 && (
          <section className="pb-16">
            <SectionHead
              title={`Recommended for ${user.name.split(' ')[0]}`}
              note="Picked from the shelves you've filled in."
              to="/explore"
              count={recommended.length}
            />
            <BookGrid books={recommended} loading={loading} count={5} />
          </section>
        )}

        <section className="pb-16">
          <SectionHead
            title="Highest rated"
            note="What readers would defend in an argument."
            to="/explore?sort=rating"
            count={5}
          />
          <BookGrid books={loading ? [] : topRated.slice(0, 5)} loading={loading} count={5} />
        </section>

        <section className="pb-16">
          <SectionHead
            title="Most reviewed"
            note="The titles people had the most to say about."
            to="/explore?sort=reviews"
            count={5}
          />
          <BookGrid books={mostReviewed.slice(0, 5)} />
        </section>

        <section className="pb-4">
          <SectionHead
            title="Newest"
            note="Most recent additions to the shelf."
            to="/explore?sort=recent"
            count={5}
          />
          <BookGrid books={newest.slice(0, 5)} />
        </section>
      </PageContainer>
    </div>
  );
};

export default HomePage;
