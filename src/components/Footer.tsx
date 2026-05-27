import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">GP</span>
              </div>
              <span className="text-slate-900 font-bold text-xl tracking-tight">
                Локален водич
              </span>
            </div>
            <p className="text-slate-600 mb-4 max-w-sm">
              Најдете локални фирми, услуги, институции и продавници во Гостивар и Полошкиот регион. Проект на Gostivarpress.mk.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">Брзи линкови</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">Почетна страта</Link></li>
              <li><Link to="/prijavi-subjekt" className="text-slate-600 hover:text-blue-600 transition-colors">Пријави субјект</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-4 tracking-tight">За Вашиот бизнис</h3>
            <ul className="space-y-2">
              <li><Link to="/prijavi-subjekt" className="text-slate-600 hover:text-blue-600 transition-colors">Пријави субјект (Бесплатно)</Link></li>
              <li><a href="https://gostivarpress.mk/marketing" className="text-slate-600 hover:text-blue-600 transition-colors">Маркетинг и рекламирање</a></li>
              <li><Link to="/admin" className="text-slate-600 hover:text-blue-600 transition-colors">Админ Панел</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Gostivarpress.mk. Сите права се задржани.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-slate-400 hover:text-slate-500">Facebook</a>
            <a href="#" className="text-slate-400 hover:text-slate-500">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
