import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-slate-100">
      <Link to="/" className="block">
        {/* Мобилен */}
        <img
          src="https://img.gostivarpress.mk/i/7759b6d1-92e1-4420-acbe-030167a60db6.jpg"
          alt="GPRESS Локален водич"
          className="sm:hidden w-full h-auto block"
        />
        {/* Десктоп */}
        <img
          src="https://img.gostivarpress.mk/i/6016d1ad-638b-4041-86a3-05983fc791c2.png"
          alt="GPRESS Локален водич"
          className="hidden sm:block w-full h-auto"
        />
      </Link>
    </header>
  );
}
