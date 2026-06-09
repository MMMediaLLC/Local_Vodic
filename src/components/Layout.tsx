import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useData } from '../lib/DataContext';

export default function Layout() {
  const { isLoading } = useData();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Тенка линија на врвот додека се вчитуваат податоците */}
      {isLoading && (
        <div className="fixed top-0 inset-x-0 z-50 h-1 bg-slate-100">
          <div className="h-full bg-blue-600 w-3/5" style={{ animation: 'loading 1.4s ease-in-out infinite' }} />
        </div>
      )}
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
