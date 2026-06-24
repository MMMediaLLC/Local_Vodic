import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-100">
      <Link to="/" className="block">
        {/* Мобилен */}
        <img
          src="https://img.gostivarpress.mk/i/75985120-b15a-4f92-890e-4fa9421170c6.jpg"
          alt="GPRESS Локален водич"
          className="sm:hidden w-full h-auto block"
        />
        {/* Десктоп */}
        <img
          src="https://img.gostivarpress.mk/i/75985120-b15a-4f92-890e-4fa9421170c6.jpg"
          alt="GPRESS Локален водич"
          className="hidden sm:block w-full h-auto"
        />
      </Link>
    </header>
  );
}
