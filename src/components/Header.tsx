import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full sm:sticky sm:top-0 sm:z-50">
      <Link to="/" className="block">
        <img
          src="https://gostivarpress.mk/wp-content/uploads/2026/05/lg.jpg"
          alt="GPRESS Local Guide"
          className="w-full h-auto sm:h-28 sm:object-cover sm:object-left block"
        />
      </Link>
    </header>
  );
}
