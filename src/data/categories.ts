// ============================================================
// Централна дефиниција на категории — единствен извор на вистина.
// 10 главни категории, секоја со 5 подкатегории.
// icon/color се задржани 1:1 од старите категории за да не се
// промени визуелниот изглед (HeroSection мапа, картички итн).
// legacyNames/legacySlugs овозможуваат backward-compat мапирање на
// постоечки профили кои сè уште носат стари категориски вредности.
// ============================================================

export interface CategoryDef {
  id: string;            // канонски slug (се користи како categorySlug)
  name: string;          // целосно име (category page / profile page)
  shortName: string;     // кратко име (картички, за да не се крши layout)
  description: string;
  icon: string;          // lucide-react име
  color: string;
  subcategories: string[];
  legacyNames: string[]; // стари category names што мапираат тука
  legacySlugs: string[]; // стари category slugs што мапираат тука
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: 'sport-rekreacija-aktiven-zivot',
    name: 'Спорт, Рекреација и Активен Живот',
    shortName: 'Спорт и Рекреација',
    description: 'Фитнес, спортски клубови, рекреација и активен живот.',
    icon: 'Dumbbell',
    color: 'emerald',
    subcategories: [
      'Фитнес центри и теретани',
      'Спортски клубови',
      'Лични тренери и групни тренинзи',
      'Спортска опрема и облека',
      'Рекреативни активности и школи',
    ],
    legacyNames: ['Спорт и Рекреација'],
    legacySlugs: ['sport-i-rekreacija'],
  },
  {
    id: 'zabava-nastani-kreativni-uslugi',
    name: 'Забава, Настани и Креативни Услуги',
    shortName: 'Забава и Настани',
    description: 'Фото, видео, детски забави, декорации, музика и културни настани.',
    icon: 'PartyPopper',
    color: 'yellow',
    subcategories: [
      'Фото и видео услуги',
      'Игротеки и детски забави',
      'Декорации и организација на настани',
      'Музика, DJ и озвучување',
      'Културни и забавни настани',
    ],
    legacyNames: ['Забава и Настани'],
    legacySlugs: ['zabava-i-nastani'],
  },
  {
    id: 'obrazovanie-kursevi-razvoj',
    name: 'Образование, Курсеви и Развој',
    shortName: 'Образование и Курсеви',
    description: 'Школи, приватни часови, обуки и развој на вештини.',
    icon: 'GraduationCap',
    color: 'indigo',
    subcategories: [
      'Јазични школи',
      'Приватни часови и инструкции',
      'Обуки и професионални курсеви',
      'Детски едукативни центри',
      'IT, дигитални и креативни вештини',
    ],
    legacyNames: ['Едукација и Курсеви'],
    legacySlugs: ['edukacija-i-kursevi'],
  },
  {
    id: 'profesionalni-uslugi-agencii',
    name: 'Професионални Услуги и Агенции',
    shortName: 'Професионални Услуги',
    description: 'Сметководство, право, маркетинг, недвижности и деловна поддршка.',
    icon: 'Briefcase',
    color: 'slate',
    subcategories: [
      'Сметководство и финансии',
      'Правни и консултантски услуги',
      'Маркетинг и дигитални услуги',
      'Недвижности и агенции',
      'Превод, администрација и деловна поддршка',
    ],
    legacyNames: ['Услуги и Агенции'],
    legacySlugs: ['uslugi-i-agencii'],
  },
  {
    id: 'ubavina-nega-wellness',
    name: 'Убавина, Нега и Wellness',
    shortName: 'Убавина и Нега',
    description: 'Фризерски, козметички, wellness и естетски услуги.',
    icon: 'Sparkles',
    color: 'pink',
    subcategories: [
      'Фризерски салони',
      'Козметички салони',
      'Маникир, педикир и шминка',
      'Масажа и wellness услуги',
      'Нега, козметика и естетски третмани',
    ],
    legacyNames: ['Убавина и Нега'],
    legacySlugs: ['ubavina-i-nega'],
  },
  {
    id: 'prodavnici-trgovija-lokalni-proizvodi',
    name: 'Продавници, Трговија и Локални Производи',
    shortName: 'Продавници',
    description: 'Маркети, бутици, техника, декорации и локални производи.',
    icon: 'ShoppingBag',
    color: 'green',
    subcategories: [
      'Маркети и прехранбени продавници',
      'Бутици и облека',
      'Техника, мобилни и електроника',
      'Дом, подароци и декорации',
      'Локални производи и специјализирани продавници',
    ],
    legacyNames: ['Продавници и Трговија'],
    legacySlugs: ['prodavnici-i-trgovija'],
  },
  {
    id: 'hrana-kafulinja-ugostitelstvo',
    name: 'Храна, Кафулиња и Угостителство',
    shortName: 'Храна и Угостителство',
    description: 'Ресторани, кафулиња, пекарници, достава и кетеринг.',
    icon: 'Utensils',
    color: 'orange',
    subcategories: [
      'Ресторани',
      'Кафулиња и барови',
      'Слаткарници и пекарници',
      'Брза храна и достава',
      'Кетеринг и прослави',
    ],
    legacyNames: ['Храна и Угостителство'],
    legacySlugs: ['hrana-i-ugostitelstvo'],
  },
  {
    id: 'avto-moto-transport',
    name: 'Авто-мото и Транспорт',
    shortName: 'Авто-мото',
    description: 'Авто сервиси, автоделови, перални, такси и транспорт.',
    icon: 'Car',
    color: 'red',
    subcategories: [
      'Авто сервиси',
      'Автоделови и опрема',
      'Автоперални и detailing',
      'Такси и превоз',
      'Мото услуги и продажба',
    ],
    legacyNames: ['Авто-мото'],
    legacySlugs: ['avto-moto'],
  },
  {
    id: 'dom-gradba-majstorski-uslugi',
    name: 'Дом, Градба и Мајсторски Услуги',
    shortName: 'Дом и Мајстори',
    description: 'Градба, поправки, ентериер, електрика, водовод и одржување.',
    icon: 'Hammer',
    color: 'amber',
    subcategories: [
      'Градежни фирми и изведувачи',
      'Водовод, електрика и молерисување',
      'Мебел и ентериер',
      'Греење, ладење и климатизација',
      'Мајстори, поправки и одржување',
    ],
    legacyNames: ['Градежништво и Мајстори'],
    legacySlugs: ['gradeznistvo-i-majstori'],
  },
  {
    id: 'zdravstvo-medicina-farmacija',
    name: 'Здравство, Медицина и Фармација',
    shortName: 'Здравство',
    description: 'Ординации, аптеки, лаборатории, дијагностика и терапија.',
    icon: 'HeartPulse',
    color: 'blue',
    subcategories: [
      'Ординации и специјалисти',
      'Стоматолошки ординации',
      'Аптеки',
      'Лаборатории и дијагностика',
      'Физиотерапија и рехабилитација',
    ],
    legacyNames: ['Здравство и Медицина'],
    legacySlugs: ['zdravstvo-i-medicina'],
  },
];

// ── Helpers ──────────────────────────────────────────────────

/** Најди категорија по нов id/name/shortName ИЛИ стар name/slug. */
export function findCategory(key?: string | null): CategoryDef | undefined {
  if (!key) return undefined;
  const k = key.trim().toLowerCase();
  return CATEGORIES.find(c =>
    c.id.toLowerCase() === k ||
    c.name.toLowerCase() === k ||
    c.shortName.toLowerCase() === k ||
    c.legacyNames.some(n => n.toLowerCase() === k) ||
    c.legacySlugs.some(s => s.toLowerCase() === k)
  );
}

/** Подкатегории за дадена категорија (по било кој клуч). */
export function getSubcategories(key?: string | null): string[] {
  return findCategory(key)?.subcategories ?? [];
}
