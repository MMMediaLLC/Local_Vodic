import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      {/* Mobile sticky navbar — scrolls with image hidden */}
      <div className="sm:hidden sticky top-0 z-50 bg-[#0f172a]">
        <div className="px-4 h-12 flex items-center gap-4">
          <a href="https://gostivarpress.mk" className="text-white font-bold text-base tracking-wide">
            GOSTIVARPRESS.<span className="text-blue-500">MK</span>
          </a>
          <Link to="/" className="text-white border-b-2 border-blue-500 pb-0.5 text-xs font-semibold">
            Локален водич
          </Link>
        </div>
      </div>

      {/* Image banner — scrolls away on mobile, sticky on desktop */}
      <header className="w-full sm:sticky sm:top-0 sm:z-50">
        <Link to="/" className="block">
          <img
            src="https://i.ibb.co/XGVBhgB/1.png"
            alt="GPRESS Local Guide"
            className="w-full h-auto sm:h-28 sm:object-cover sm:object-left block"
          />
        </Link>
      </header>
    </>
  );
}
