import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';

const NotFoundPage = () => (
  <PageContainer className="flex min-h-[78vh] items-center">
    <div className="w-full border-y border-rule py-20 text-center">
      <p className="display text-[clamp(4rem,14vw,9rem)] leading-none text-rule-strong">404</p>
      <h1 className="display mt-6 text-[clamp(1.75rem,4vw,2.5rem)] text-ink">
        This page isn't in the catalogue.
      </h1>
      <p className="mx-auto mt-4 max-w-[46ch] text-[15px] leading-relaxed text-ink-2">
        It may have been renamed, or the link was mistyped. The shelves are still where you left
        them.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
        <Link to="/">
          <Button>Back to the front</Button>
        </Link>
        <Link to="/explore" className="label transition-colors hover:text-accent">
          Browse the catalogue →
        </Link>
      </div>
    </div>
  </PageContainer>
);

export default NotFoundPage;
