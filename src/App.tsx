import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import ProfileDetail from './pages/ProfileDetail';
import SubmitSubject from './pages/SubmitSubject';
import NotFound from './pages/NotFound';
import Admin from './pages/Admin';
import { DataProvider } from './lib/DataContext';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="kategorija/:slug" element={<CategoryDetail />} />
            <Route path="profil/:slug" element={<ProfileDetail />} />
            <Route path="prijavi-subjekt" element={<SubmitSubject />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
