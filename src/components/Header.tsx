import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Скрол надолу (после праг) → крие; скрол нагоре → покажува
      if (y > lastY.current && y > 120) setHidden(true);
      else setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 border-b border-slate-100 transition-transform duration-300 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <Link to="/" className="block">
        {/* Мобилен */}
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
          alt="GPRESS Локален водич"
          className="sm:hidden w-full h-auto block"
        />
        {/* Десктоп */}
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/r4.jpg"
          alt="GPRESS Локален водич"
          className="hidden sm:block w-full h-auto"
        />
      </Link>
    </header>
  );
}
