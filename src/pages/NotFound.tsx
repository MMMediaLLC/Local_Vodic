import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';

export default function NotFound() {
  usePageMeta({ title: 'Страницата не е пронајдена' });

  return (
    <div className="bg-slate-50 min-h-[60vh] py-24 px-4 text-center flex flex-col items-center justify-center">
      <p className="text-6xl font-extrabold text-slate-300 mb-4">404</p>
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Страницата не е пронајдена.</h1>
      <p className="text-slate-600 mb-8 max-w-md mx-auto">
        Се извинуваме, но страницата што ја барате не постои или е преместена.
      </p>
      <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Назад кон почетна
      </Link>
    </div>
  );
}
