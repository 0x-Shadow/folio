import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// A thin rule that draws itself across the top on every route change.
// `run` counts the changes and is used as the key: giving an element a new
// key remounts it, which is what restarts the CSS animation.
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
