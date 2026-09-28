import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// A printed progress rule: it draws itself on every route change, then wipes out.
const RouteProgress = () => {
  const location = useLocation();
  const [run, setRun] = useState(0);

  useEffect(() => {
    setRun((r) => r + 1);
  }, [location.pathname]);

  if (run === 0) return null;

  return <div key={run} className="progress-rule" aria-hidden="true" />;
};

export default RouteProgress;
