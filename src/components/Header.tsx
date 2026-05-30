import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full sm:sticky sm:top-0 sm:z-50 bg-white border-b border-slate-100">
      <Link to="/" className="block">
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
          alt="GPRESS Локален водич"
          className="w-full h-auto block"
        />
      </Link>
    </header>
  );
}
