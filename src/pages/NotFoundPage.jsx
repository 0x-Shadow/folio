import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';

const NotFoundPage = () => (
  <div className="relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        className="mesh-blob w-[420px] h-[420px] top-0 left-1/2 -translate-x-1/2"
        style={{ background: 'var(--mesh-1)' }}
      />
    </div>

    <PageContainer className="relative">
      <div className="text-center py-24 animate-page">
        <p className="text-sm font-semibold text-accent-strong dark:text-accent uppercase tracking-widest mb-3">
          404
        </p>
        <h1 className="text-4xl font-serif font-bold text-ink mb-3">Page not found</h1>
        <p className="text-muted mb-8">
          This chapter does not exist — but plenty of good books do.
        </p>
        <Link to="/">
          <Button variant="primary">Back to home</Button>
        </Link>
      </div>
    </PageContainer>
  </div>
);

export default NotFoundPage;
