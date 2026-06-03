import { useState, FormEvent } from 'react';
import { ArrowLeft, Building, MapPin, Phone, Globe, CheckCircle2, ShieldCheck, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, getSubcategories } from '../data/categories';

const WEB3FORMS_KEY = 'fea503c4-271d-4cca-a970-3de6546b9f6b';

export default function SubmitSubject() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [secondaryPhone, setSecondaryPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [workingHours, setWorkingHours] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');
  const [edb, setEdb] = useState('');
  const [embs, setEmbs] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      // 1. Зачувај во Supabase преку backend (се прикажува во админ панелот)
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, category, subcategory, location, phone, secondaryPhone, email,
          address, workingHours, website, facebook, instagram, googleMapsUrl,
          shortDescription: shortDesc, fullDescription: fullDesc,
          edb, embs,
        }),
      }).catch(() => {}); // тивко — не е критично ако API не е достапен

      // 2. Испрати е-маил нотификација преку Web3Forms
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Ново пријавување: ${name}`,
          from_name: 'GPRESS Локален водич',
          '📌 Ime': name,
          '🗂 Kategorija': category,
          '🏷 Potkategorija': subcategory || '—',
          '📍 Lokacija': location,
          '📞 Telefon': phone,
          '📞 Vtor telefon': secondaryPhone || '—',
          '📧 Email': email || '—',
          '🏠 Adresa': address,
          '🗺 Google Maps': googleMapsUrl || '—',
          '🕐 Rabotno vreme': workingHours || '—',
          '🌐 Web': website || '—',
          '📘 Facebook': facebook || '—',
          '📸 Instagram': instagram || '—',
          '📝 Kratok opis': shortDesc,
          '📄 Celos opis': fullDesc,
          '🧾 EDB': edb || '—',
          '🏢 EMBS': embs || '—',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError('Грешка при испраќање. Обидете се повторно.');
      }
    } catch {
      setSubmitError('Грешка при испраќање. Проверете ја врската.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-16 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-2xl border border-slate-200 text-center shadow-lg shadow-slate-200/50">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Успешно испратено!</h2>
          <p className="text-slate-500 mb-10 leading-relaxed">
            Вашиот профил е испратен на преглед. Тимот на <b className="text-slate-700">Gostivarpress</b> ќе го разгледа и објави во најкраток можен рок.
          </p>
          <Link to="/" className="inline-flex justify-center items-center px-6 py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors w-full shadow-md shadow-blue-600/20">
            Врати се на почетна
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <Link to="/" className="text-slate-500 hover:text-blue-600 flex items-center gap-2 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Назад кон водичот
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Пријавете го вашиот бизнис</h1>
              <p className="text-lg text-slate-600">
                Пополнете ги податоците за да креираме профил во деловниот директориум. Профилот им помага на граѓаните полесно да ја најдат вашата фирма, услуга, адреса, контакт и работно време.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 space-y-10">

                {/* Основни информации */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <Building className="w-4 h-4" />
                    </div>
                    Основни информации за клиентот
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Име на фирмa / субјект <span className="text-red-500">*</span></label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: Автосервис Ибро" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Главна категорија <span className="text-red-500">*</span></label>
                      <select value={category} onChange={e => { setCategory(e.target.value); setSubcategory(''); }} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700">
                        <option value="">Изберете категорија</option>
                        {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Подкатегорија</label>
                      <select value={subcategory} onChange={e => setSubcategory(e.target.value)} disabled={getSubcategories(category).length === 0} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 disabled:bg-slate-100 disabled:text-slate-400">
                        <option value="">Изберете подкатегорија</option>
                        {getSubcategories(category).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Локација (Град/Село) <span className="text-red-500">*</span></label>
                      <input type="text" value={location} onChange={e => setLocation(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: Гостивар" />
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Контакт */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    Контакт информации (кои ќе бидат јавни)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон (главен) <span className="text-red-500">*</span></label>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: 070 123 456" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Телефон (втор)</label>
                      <input type="tel" value={secondaryPhone} onChange={e => setSecondaryPhone(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: 042 123 456" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Електронска пошта (Email)</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: info@biznis.mk" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Работно време</label>
                      <input type="text" value={workingHours} onChange={e => setWorkingHours(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: Пон-Пет 08-17, Саб 09-14" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                        Точна адреса <span className="text-red-500">*</span>
                        <MapPin className="w-4 h-4 text-slate-400" />
                      </label>
                      <input type="text" value={address} onChange={e => setAddress(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: ул. Живко Брајковски бр. 10" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Google Maps локација (линк)</label>
                      <input type="text" value={googleMapsUrl} onChange={e => setGoogleMapsUrl(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Залепи Google Maps линк до вашето место (опционо)" />
                      <p className="text-xs text-slate-400 mt-1.5">Незадолжително. Отворете го местото во Google Maps → „Сподели" → копирајте го линкот и залепете го тука, за да ја прикажеме точната локација на профилот.</p>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Опис */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    Презентација
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Краток опис (мото или една реченица) <span className="text-red-500">*</span></label>
                      <input type="text" value={shortDesc} onChange={e => setShortDesc(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: Вашиот најсигурен партнер за автоделови." />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Целосен опис (Услуги / Продукти) <span className="text-red-500">*</span></label>
                      <textarea rows={5} value={fullDesc} onChange={e => setFullDesc(e.target.value)} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Опишете ги детално вашите услуги..."></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Веб-страница</label>
                        <input type="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="https://" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook страница</label>
                        <input type="url" value={facebook} onChange={e => setFacebook(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="https://facebook.com/..." />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram профил</label>
                        <input type="url" value={instagram} onChange={e => setInstagram(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="https://instagram.com/..." />
                      </div>
                    </div>
                  </div>
                </section>

                <hr className="border-slate-100" />

                {/* Верификација */}
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    Верификација (незадолжително)
                  </h3>
                  <div className="flex items-start gap-2 text-sm text-slate-500 bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
                    <ShieldCheck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p>
                      Доколку сакате вашиот профил да ја добие ознаката „Верифициран профил“, внесете ЕДБ и ЕМБС. Овие податоци се користат исклучиво за проверка на деловниот статус и нема да бидат јавно прикажани. Полињата се незадолжителни.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">ЕДБ (Единствен даночен број)</label>
                      <input type="text" value={edb} onChange={e => setEdb(e.target.value)} inputMode="numeric" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: 4030000000000" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">ЕМБС (Матичен број на субјект)</label>
                      <input type="text" value={embs} onChange={e => setEmbs(e.target.value)} inputMode="numeric" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-slate-400" placeholder="Пр: 1234567" />
                    </div>
                  </div>
                </section>

              </div>

              <div className="bg-slate-50 px-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500">Сите полиња со <span className="text-red-500">*</span> се задолжителни.</p>
                <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                  {submitError && (
                    <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      {submitError}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-600/20 active:scale-95"
                  >
                    {isSubmitting ? 'Се испраќа...' : 'Испрати податоци'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Што добивате со профилот?</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Поголема локална видливост</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Вашиот бизнис ќе биде прикажан во деловниот директориум.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Јасни контакт-информации</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Телефон, адреса, работно време, мапа, опис на услуги и линкови.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Верифициран профил</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Ознака дека основните деловни и контакт-податоци се проверени.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Поголема доверба</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">Профилот изгледа професионално и е поврзан со локален медиум.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white text-center shadow-lg">
                <h3 className="font-bold mb-2">Техничка поддршка</h3>
                <p className="text-slate-400 text-sm mb-4">Доколку имате проблем со формата или ви е потребна помош, слободно контактирајте нè.</p>
                <a href="mailto:info@gostivarpress.mk" className="inline-block px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                  info@gostivarpress.mk
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
