import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-white/90 backdrop-blur-md sm:sticky sm:top-0 sm:z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center sm:justify-start">
        <Link to="/" className="block py-2.5">
          <img
            src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
            alt="GPRESS Локален водич"
            className="h-14 sm:h-20 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
