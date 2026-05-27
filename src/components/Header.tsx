import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Вести ∨', href: 'https://gostivarpress.mk', external: true },
    { name: 'Локален водич', href: '/', isActive: true },
    { name: 'Настани', href: 'https://gostivarpress.mk/nastani', external: true },
    { name: 'Спорт', href: 'https://gostivarpress.mk/sport', external: true },
    { name: 'Магазин', href: 'https://gostivarpress.mk/magazin', external: true }
  ];

  return (
    <header className="bg-[#0f172a] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="https://gostivarpress.mk" className="flex-shrink-0 flex items-center">
              <span className="text-white font-bold text-xl tracking-wide">
                GOSTIVARPRESS.<span className="text-blue-500">MK</span>
              </span>
            </a>
          </div>
          
          <nav className="hidden lg:flex h-full ml-8">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.name} href={link.href} className="text-slate-300 hover:text-white flex items-center px-4 text-sm font-medium h-full transition-colors">
                  {link.name}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className={`flex items-center px-4 text-sm font-medium h-full transition-colors ${
                    link.isActive 
                      ? 'text-white border-b-4 border-blue-600 pt-1' // pt-1 to offset the border visual shift
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <button className="text-white p-2">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
            >
              <span className="sr-only">Отвори мени</span>
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0f172a] border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.external ? (
                <a key={link.name} href={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/10">
                  {link.name.replace(' ∨', '')}
                </a>
              ) : (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${link.isActive ? 'text-white bg-blue-600/20' : 'text-slate-300 hover:text-white hover:bg-white/10'}`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
