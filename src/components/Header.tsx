import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-100">
      <Link to="/" className="block">
        {/* Мобилен */}
        <img
          src="https://img.gostivarpress.mk/i/8c707dd0-ebb8-4d15-84fe-3530ae7ee271.jpg"
          alt="GPRESS Локален водич"
          className="sm:hidden w-full h-auto block"
        />
        {/* Десктоп */}
        <img
          src="https://img.gostivarpress.mk/i/156e5e78-1323-43aa-b3b2-6b909a9031ac.jpg"
          alt="GPRESS Локален водич"
          className="hidden sm:block w-full h-auto"
        />
      </Link>
    </header>
  );
}
