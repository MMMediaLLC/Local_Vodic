import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-[#0f172a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <a href="https://gostivarpress.mk" className="flex-shrink-0 flex items-center">
            <span className="text-white font-bold text-xl tracking-wide">
              GOSTIVARPRESS.<span className="text-blue-500">MK</span>
            </span>
          </a>
          <div className="ml-6">
            <Link
              to="/"
              className="text-white border-b-2 border-blue-500 pb-0.5 text-sm font-semibold"
            >
              Локален водич
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
