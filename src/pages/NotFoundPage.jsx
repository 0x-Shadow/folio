import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';

const NotFoundPage = () => (
  <PageContainer>
    <div className="text-center py-24">
      <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">404</p>
      <h1 className="text-3xl font-serif font-bold text-navy-900 mb-3">Page not found</h1>
      <p className="text-navy-600 mb-8">
        This chapter does not exist — but plenty of good books do.
      </p>
      <Link to="/">
        <Button variant="primary">Back to home</Button>
      </Link>
    </div>
  </PageContainer>
);

export default NotFoundPage;
