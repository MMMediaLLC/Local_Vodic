import { usePageMeta } from '../lib/usePageMeta';

export default function Privacy() {
  usePageMeta({
    title: 'Политика на приватност — GPRESS Локален водич',
    description: 'Политика на приватност на GPRESS Локален водич.',
    canonicalPath: '/privatnost',
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Политика на приватност</h1>
        <p className="text-slate-500 text-sm mb-10">Последна измена: јуни 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Кои податоци собираме</h2>
            <p>При пријавување на деловен субјект собираме: име на фирма, категорија, локација, телефон, е-маил адреса и адреса. Овие податоци ги доставувате доброволно преку формата за пријавување.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Зошто ги користиме</h2>
            <p>Податоците се користат исклучиво за прикажување на деловниот субјект во директориумот и за контакт во врска со вашата пријава. Не ги продаваме и не ги споделуваме со трети страни.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Колачиња (Cookies)</h2>
            <p>Страницата користи технички неопходни колачиња за нормално функционирање. Не користиме колачиња за следење или рекламирање.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Чување на податоци</h2>
            <p>Податоците се чуваат во безбедна база (Supabase) и се достапни само за администраторите на платформата. Можете да побарате бришење на вашите податоци во секое време.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Контакт</h2>
            <p>За прашања поврзани со приватноста: <a href="mailto:info@gostivarpress.mk" className="text-blue-600 hover:underline">info@gostivarpress.mk</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
