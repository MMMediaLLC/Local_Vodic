import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-3 sm:mt-16 pt-6 sm:pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-2 sm:mb-4">
              <img
                src="https://img.gostivarpress.mk/i/3fda940c-cc62-4f12-9c2f-b425c2c0d6ef.png"
                alt="GPRESS Локален водич"
                className="h-12 sm:h-14 w-auto"
              />
            </Link>
            <p className="text-slate-600 mb-4 max-w-sm">
              GPRESS Локален водич е дигитален регистар на проверени локални фирми, услуги, институции, продавници и корисни места од Гостивар и регионот, дел од дигиталните сервиси на Gostivarpress.mk.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">Брзи линкови</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Почетна страна</Link></li>
              <li><Link to="/prijavi-subjekt" className="text-slate-600 hover:text-blue-600 transition-colors">Пријави субјект</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">За Вашиот бизнис</h3>
            <ul className="space-y-2">
              <li><Link to="/prijavi-subjekt" className="text-slate-600 hover:text-blue-600 transition-colors">Пријави субјект</Link></li>
              <li><Link to="/admin" className="text-slate-600 hover:text-blue-600 transition-colors">Админ Панел</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Gostivarpress.mk. Сите права се задржани.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privatnost" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Приватност</Link>
            <Link to="/uslovi" className="text-slate-400 hover:text-slate-600 text-sm transition-colors">Услови</Link>
            <a href="https://www.facebook.com/gostivarpress" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/gostivarpress" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
