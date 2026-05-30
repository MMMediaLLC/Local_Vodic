import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-100">
      <Link to="/" className="block">
        {/* Мобилен */}
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
          alt="GPRESS Локален водич"
          className="sm:hidden w-full h-auto block"
        />
        {/* Десктоп */}
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/gpress-lokalen-vodic.jpg"
          alt="GPRESS Локален водич"
          className="hidden sm:block w-full h-auto"
        />
      </Link>
    </header>
  );
}
