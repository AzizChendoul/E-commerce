import type { ContentBlockSeed, SiteSettingSeed } from "../types";

/**
 * Every string the storefront renders that is not a UI label.
 *
 * Components look these up by slug. None of this text may be hardcoded in a
 * component — the whole point of the admin's text management screen is that the
 * shop owner changes this copy without a deployment.
 *
 * Slugs are dot-namespaced by the section they belong to, which is what the
 * admin groups on.
 */
export const contentBlocks: ContentBlockSeed[] = [
  // --- Hero -----------------------------------------------------------------
  {
    slug: "hero.eyebrow",
    label: "Hero — eyebrow",
    group: "GENERAL",
    translations: {
      AR: "صناعة تونسية",
      EN: "Made in Tunisia",
      FR: "Fabriqué en Tunisie",
    },
  },
  {
    slug: "hero.title",
    label: "Hero — headline",
    group: "GENERAL",
    translations: {
      AR: "أشياء صُنعت لتبقى",
      EN: "Things made to be kept",
      FR: "Des objets faits pour durer",
    },
  },
  {
    slug: "hero.subtitle",
    label: "Hero — subheadline",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "فوانيس وخزف ومنسوجات من ورشات تونسية نعرف أصحابها بالاسم. تُصنع القطعة الواحدة على مهل، وتُشحن إليك خلال يومين.",
      EN: "Lanterns, ceramics and textiles from Tunisian workshops we know by name. Each piece is made slowly, then shipped to you in two days.",
      FR: "Lanternes, céramique et textiles d'ateliers tunisiens que nous connaissons par leur nom. Chaque pièce est faite lentement, puis expédiée en deux jours.",
    },
  },
  {
    slug: "hero.cta",
    label: "Hero — primary button",
    group: "GENERAL",
    translations: { AR: "تصفّح المتجر", EN: "Browse the shop", FR: "Parcourir la boutique" },
  },
  {
    slug: "hero.ctaSecondary",
    label: "Hero — secondary button",
    group: "GENERAL",
    translations: { AR: "قصّتنا", EN: "Our story", FR: "Notre histoire" },
  },

  // --- Section headings -----------------------------------------------------
  {
    slug: "bestSellers.title",
    label: "Best sellers — heading",
    group: "GENERAL",
    translations: { AR: "الأكثر مبيعًا", EN: "Best sellers", FR: "Meilleures ventes" },
  },
  {
    slug: "bestSellers.subtitle",
    label: "Best sellers — subheading",
    group: "GENERAL",
    translations: {
      AR: "ما يعود إليه الزبائن مرّة بعد مرّة.",
      EN: "What customers come back for.",
      FR: "Ce pour quoi les clients reviennent.",
    },
  },
  {
    slug: "newArrivals.title",
    label: "New arrivals — heading",
    group: "GENERAL",
    translations: { AR: "وصل حديثًا", EN: "New arrivals", FR: "Nouveautés" },
  },
  {
    slug: "newArrivals.subtitle",
    label: "New arrivals — subheading",
    group: "GENERAL",
    translations: {
      AR: "أحدث ما خرج من الورشات.",
      EN: "The latest out of the workshops.",
      FR: "Les dernières pièces sorties des ateliers.",
    },
  },
  {
    slug: "testimonials.title",
    label: "Testimonials — heading",
    group: "GENERAL",
    translations: { AR: "آراء الزبائن", EN: "What customers say", FR: "Avis des clients" },
  },
  {
    slug: "testimonials.subtitle",
    label: "Testimonials — subheading",
    group: "GENERAL",
    translations: {
      AR: "مراجعات من طلبات حقيقية، غير محرّرة.",
      EN: "Reviews from real orders, unedited.",
      FR: "Des avis issus de vraies commandes, non retouchés.",
    },
  },

  // --- Value propositions ---------------------------------------------------
  // The three cards on the landing page. Icon names map to Lucide components —
  // never emoji, per the design system's anti-pattern list.
  {
    slug: "value.1.title",
    label: "Value proposition 1 — title",
    group: "GENERAL",
    translations: { AR: "جودة التعامل", EN: "Business quality", FR: "Qualité de l'entreprise" },
  },
  {
    slug: "value.1.body",
    label: "Value proposition 1 — text",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "نشتري مباشرة من الورشة ونعلن اسمها على صفحة كل منتج. لا وسطاء، ولا غموض في مصدر القطعة.",
      EN: "We buy direct from the workshop and name it on every product page. No middlemen, and no vagueness about where a piece came from.",
      FR: "Nous achetons directement à l'atelier et le nommons sur chaque fiche produit. Pas d'intermédiaires, et aucun flou sur l'origine d'une pièce.",
    },
  },
  {
    slug: "value.2.title",
    label: "Value proposition 2 — title",
    group: "GENERAL",
    translations: { AR: "جودة الخدمة", EN: "Service quality", FR: "Qualité du service" },
  },
  {
    slug: "value.2.body",
    label: "Value proposition 2 — text",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "الدفع عند الاستلام في كل الولايات، وتتبّع الطلب برقمه دون إنشاء حساب. إن تأخّر شيء، نتّصل بك قبل أن تسأل.",
      EN: "Cash on delivery everywhere, and order tracking by number without creating an account. If something is delayed, we call you before you have to ask.",
      FR: "Paiement à la livraison partout, et suivi de commande par numéro sans créer de compte. En cas de retard, nous vous appelons avant que vous ayez à demander.",
    },
  },
  {
    slug: "value.3.title",
    label: "Value proposition 3 — title",
    group: "GENERAL",
    translations: { AR: "جودة المنتج", EN: "Product quality", FR: "Qualité du produit" },
  },
  {
    slug: "value.3.body",
    label: "Value proposition 3 — text",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "كل قطعة مصنوعة يدويًا، فلا تتطابق قطعتان تمامًا. نصوّر ما لدينا فعلًا، ونذكر الاختلافات بدل إخفائها.",
      EN: "Everything is handmade, so no two pieces are identical. We photograph what we actually hold, and we describe the variation rather than hiding it.",
      FR: "Tout est fait main : deux pièces ne sont jamais identiques. Nous photographions ce que nous avons réellement en stock, et nous décrivons les variations au lieu de les masquer.",
    },
  },

  // --- Footer and about -----------------------------------------------------
  {
    slug: "footer.tagline",
    label: "Footer — tagline",
    group: "GENERAL",
    translations: {
      AR: "حرف تونسية، من الورشة إلى بابك.",
      EN: "Tunisian craft, workshop to doorstep.",
      FR: "L'artisanat tunisien, de l'atelier à votre porte.",
    },
  },
  {
    slug: "footer.about",
    label: "Footer — short about text",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "سوق متجر صغير يبيع ما تصنعه ورشات تونسية بعينها. نعرف من صنع كل قطعة، ونقول ذلك.",
      EN: "Souk is a small shop selling what a handful of named Tunisian workshops make. We know who made each piece, and we say so.",
      FR: "Souk est une petite boutique qui vend ce que fabriquent quelques ateliers tunisiens nommément identifiés. Nous savons qui a fait chaque pièce, et nous le disons.",
    },
  },
  {
    slug: "about.title",
    label: "About page — heading",
    group: "GENERAL",
    translations: { AR: "من نحن", EN: "About us", FR: "À propos" },
  },
  {
    slug: "about.body",
    label: "About page — body text",
    group: "GENERAL",
    isMultiline: true,
    translations: {
      AR: "بدأنا بخمس ورشات وقائمة قصيرة من القطع التي نستعملها في بيوتنا. القائمة تكبر ببطء، لأن كل إضافة تعني رحلة إلى ورشة واتفاقًا مع من يعمل فيها. نفضّل أن يبقى الاختيار صغيرًا وأن نعرف مصدر كل شيء فيه.",
      EN: "We started with five workshops and a short list of things we use in our own homes. The list grows slowly, because every addition means a trip to a workshop and an agreement with the people in it. We would rather the selection stayed small and we knew where all of it came from.",
      FR: "Nous avons commencé avec cinq ateliers et une courte liste d'objets que nous utilisons chez nous. La liste s'allonge lentement, car chaque ajout suppose un déplacement en atelier et un accord avec ceux qui y travaillent. Nous préférons une sélection restreinte dont nous connaissons toute l'origine.",
    },
  },

  // --- Contact --------------------------------------------------------------
  {
    slug: "contact.title",
    label: "Contact page — heading",
    group: "CONTACT",
    translations: { AR: "اتصل بنا", EN: "Contact us", FR: "Nous contacter" },
  },
  {
    slug: "contact.intro",
    label: "Contact page — intro text",
    group: "CONTACT",
    isMultiline: true,
    translations: {
      AR: "نردّ على الرسائل خلال يوم عمل واحد. للأسئلة عن طلب قائم، اذكر رقم الطلب ليصل الجواب أسرع.",
      EN: "We answer messages within one working day. For a question about an existing order, include the order number and the reply will be faster.",
      FR: "Nous répondons aux messages sous un jour ouvré. Pour une question sur une commande en cours, indiquez le numéro de commande : la réponse sera plus rapide.",
    },
  },
];

/**
 * Configuration that is not prose.
 *
 * `value` is Json, so this one table holds a string, a number, a boolean and a
 * list of links without a column per setting. Every read goes through a Zod
 * schema keyed by `key`, so the looseness stops at the boundary.
 */
export const siteSettings: SiteSettingSeed[] = [
  { key: "store.name", label: "Store name", group: "GENERAL", value: "Souk" },
  {
    key: "store.tagline",
    label: "Store tagline",
    group: "GENERAL",
    value: { AR: "حرف تونسية", EN: "Tunisian craft", FR: "Artisanat tunisien" },
  },
  {
    key: "store.logoUrl",
    label: "Logo",
    group: "APPEARANCE",
    // Null until an admin uploads one. The header falls back to the store name
    // set as type, which is a deliberate design, not a missing-image state.
    value: null,
  },
  { key: "store.faviconUrl", label: "Favicon", group: "APPEARANCE", value: null },
  {
    key: "appearance.defaultTheme",
    label: "Default theme",
    group: "APPEARANCE",
    value: "system",
  },

  {
    key: "contact.email",
    label: "Contact email",
    group: "CONTACT",
    value: "bonjour@souk.example",
  },
  { key: "contact.phone", label: "Contact phone", group: "CONTACT", value: "+216 80 100 100" },
  {
    key: "contact.address",
    label: "Shop address",
    group: "CONTACT",
    value: {
      AR: "١٢ نهج سيدي بومنديل، المدينة، ١٠٠٦ تونس",
      EN: "12 Rue Sidi Boumendil, Medina, 1006 Tunis",
      FR: "12 rue Sidi Boumendil, Médina, 1006 Tunis",
    },
  },
  {
    key: "contact.hours",
    label: "Opening hours",
    group: "CONTACT",
    value: {
      AR: "الاثنين إلى السبت، ٩:٠٠ – ١٨:٠٠",
      EN: "Monday to Saturday, 9:00 – 18:00",
      FR: "Du lundi au samedi, 9h00 – 18h00",
    },
  },

  {
    key: "social.links",
    label: "Social links",
    group: "SOCIAL",
    value: [
      { platform: "instagram", url: "https://instagram.com/souk.example" },
      { platform: "facebook", url: "https://facebook.com/souk.example" },
    ],
  },

  // Currency lives here rather than in code, so switching the store to MAD or
  // EUR is a settings change. `decimals` travels with the code because TND has
  // three and almost everything else has two.
  { key: "commerce.currency", label: "Currency", group: "COMMERCE", value: "TND" },
  {
    key: "commerce.currencyDecimals",
    label: "Currency decimal places",
    group: "COMMERCE",
    value: 3,
  },
  {
    key: "commerce.lowStockThreshold",
    label: "Low stock alert threshold",
    group: "COMMERCE",
    value: 5,
  },
  {
    key: "commerce.paymentMethods",
    label: "Enabled payment methods",
    group: "COMMERCE",
    value: ["CASH_ON_DELIVERY"],
  },

  {
    key: "i18n.activeLocales",
    label: "Active languages",
    group: "GENERAL",
    value: ["AR", "EN", "FR"],
  },
  { key: "i18n.defaultLocale", label: "Default language", group: "GENERAL", value: "AR" },
];
