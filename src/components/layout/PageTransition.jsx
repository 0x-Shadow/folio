import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // 'instant' beats the smooth scrolling set on <html> in index.css, so
    // arriving on a new page starts at the top instead of gliding down.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="rise">
      {children}
    </div>
  );
};

export default PageTransition;
