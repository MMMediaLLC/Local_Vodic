import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ресетира scroll на врв при секоја промена на патеката.
// Без ова, отворање профил од дното на листата ја прикажува
// новата страница скролована надолу (класичен SPA проблем).
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
