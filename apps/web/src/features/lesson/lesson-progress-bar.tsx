/**
 * Reading progress bar — tracks scroll position and shows a thin bar at the
 * top of the viewport.
 */
import { type ReactNode, useEffect, useState } from 'react';

export function LessonProgressBar(): ReactNode {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.round(pct)));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="lesson-progress-bar" role="progressbar" aria-valuenow={progress}>
      <div
        className="lesson-progress-bar__fill"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
