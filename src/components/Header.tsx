import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="w-full sticky top-0 z-50">
      <Link to="/" className="block">
        <img
          src="https://i.ibb.co/XGVBhgB/1.png"
          alt="GPRESS Local Guide"
          className="w-full h-auto sm:h-28 sm:object-cover sm:object-left block"
        />
      </Link>
    </header>
  );
}
