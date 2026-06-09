import { usePageMeta } from '../lib/usePageMeta';

export default function Terms() {
  usePageMeta({
    title: 'Услови за користење — GPRESS Локален водич',
    description: 'Услови за користење на GPRESS Локален водич.',
    canonicalPath: '/uslovi',
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-slate-900 mb-2">Услови за користење</h1>
        <p className="text-slate-500 text-sm mb-10">Последна измена: јуни 2026</p>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-8 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. За платформата</h2>
            <p>GPRESS Локален водич е дигитален директориум на деловни субјекти, услуги и институции од Гостивар и Полошкиот регион, во рамки на Gostivarpress.mk.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Точност на информациите</h2>
            <p>Информациите за субјектите ги доставуваат самите субјекти или се собираат од јавно достапни извори. GPRESS не гарантира целосна точност и не е одговорен за застарени или неточни податоци.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Пријавување субјект</h2>
            <p>Со пријавување на субјект потврдувате дека имате овластување да ги доставите наведените информации и давате согласност тие да бидат јавно прикажани. Лажни или злонамерни пријави ќе бидат отстранети.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Авторски права</h2>
            <p>Содржината на платформата (текстови, дизајн, логоа) е сопственост на Gostivarpress.mk. Забранета е употреба без писмена дозвола.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Контакт</h2>
            <p>За прашања: <a href="mailto:info@gostivarpress.mk" className="text-blue-600 hover:underline">info@gostivarpress.mk</a></p>
          </section>

        </div>
      </div>
    </div>
  );
}
