import type { ProductSeed } from "../types";

/**
 * Twenty-four demo products — four in each of the six leaf categories.
 *
 * Prices are in millimes: 129_500 is 129,500 TND. See lib/money.ts for why
 * nothing here is a decimal.
 *
 * `salesCount` is spread deliberately rather than randomly, so Best Sellers has
 * a clear and stable top eight to render and the ordering can be eyeballed
 * against this file.
 */
export const products: ProductSeed[] = [
  // ---------------------------------------------------------------- lanterns
  {
    sku: "SK-LAN-001",
    categorySlug: "lanterns",
    supplierName: "Atelier Dar Nejma",
    price: 129_500,
    compareAtPrice: 165_000,
    stock: 14,
    isFeatured: true,
    salesCount: 312,
    weightGrams: 1100,
    image: "/seed/products/lighting-1.webp",
    translations: {
      AR: {
        name: "فانوس نحاسي مخرّم",
        slug: "فانوس-نحاسي-مخرّم",
        shortDescription: "نحاس مخرّم باليد، يلقي نقشًا نجميًا على الجدار.",
        description:
          "فانوس من النحاس الأصفر، تُخرم زخارفه قطعة قطعة بالإزميل في ورشة بالمدينة العتيقة. حين تُضاء الشمعة بداخله ينعكس النقش على الجدار والسقف، فيتغيّر شكل الغرفة بأكملها.",
      },
      EN: {
        name: "Pierced Brass Lantern",
        slug: "pierced-brass-lantern",
        shortDescription: "Hand-pierced brass that throws a star pattern across the wall.",
        description:
          "Brass, chiselled one hole at a time in a workshop in the old medina. Lit from inside, the piercing projects onto the wall and ceiling, which changes the whole room rather than just the corner it stands in.",
      },
      FR: {
        name: "Lanterne en laiton ajouré",
        slug: "lanterne-laiton-ajoure",
        shortDescription: "Laiton ajouré à la main, qui projette un motif étoilé sur le mur.",
        description:
          "Du laiton, ciselé trou par trou dans un atelier de la médina. Allumée de l'intérieur, la lanterne projette son motif sur le mur et le plafond : c'est la pièce entière qui change, pas seulement le coin où elle est posée.",
      },
    },
  },
  {
    sku: "SK-LAN-002",
    categorySlug: "lanterns",
    supplierName: "Atelier Dar Nejma",
    price: 74_000,
    stock: 23,
    salesCount: 198,
    weightGrams: 620,
    image: "/seed/products/lighting-2.webp",
    translations: {
      AR: {
        name: "فانوس معلّق من القصدير",
        slug: "فانوس-معلّق-من-القصدير",
        shortDescription: "خفيف بما يكفي ليُعلّق من غصن أو من سقف الشرفة.",
        description:
          "قصدير مطروق مع زجاج ملوّن، بحلقة علوية للتعليق. خفيف بما يكفي للشرفة أو الحديقة، ويتحمّل الليالي الرطبة دون أن يصدأ.",
      },
      EN: {
        name: "Hanging Tin Lantern",
        slug: "hanging-tin-lantern",
        shortDescription: "Light enough to hang from a branch or a balcony ceiling.",
        description:
          "Beaten tin with coloured glass panes and a ring at the top. Light enough for a balcony or a garden, and it takes damp nights without rusting.",
      },
      FR: {
        name: "Lanterne suspendue en fer-blanc",
        slug: "lanterne-suspendue-fer-blanc",
        shortDescription:
          "Assez légère pour être suspendue à une branche ou à un plafond de balcon.",
        description:
          "Fer-blanc martelé et verre coloré, avec un anneau de suspension. Assez légère pour un balcon ou un jardin, et elle supporte les nuits humides sans rouiller.",
      },
    },
  },
  {
    sku: "SK-LAN-003",
    categorySlug: "lanterns",
    supplierName: "Atelier Dar Nejma",
    price: 189_000,
    stock: 6,
    isNew: true,
    salesCount: 41,
    weightGrams: 2400,
    image: "/seed/products/lighting-3.webp",
    translations: {
      AR: {
        name: "فانوس أرضي كبير",
        slug: "فانوس-أرضي-كبير",
        shortDescription: "بارتفاع سبعين سنتيمترًا، يُوضع على الأرض لا على الطاولة.",
        description:
          "فانوس بارتفاع سبعين سنتيمترًا على قاعدة ثقيلة، مصمّم ليقف على الأرض بجانب مقعد أو عند مدخل. الباب الجانبي يفتح بالكامل، فتبديل الشمعة لا يتطلّب رفعه.",
      },
      EN: {
        name: "Large Floor Lantern",
        slug: "large-floor-lantern",
        shortDescription: "Seventy centimetres tall — meant for the floor, not a table.",
        description:
          "Seventy centimetres on a weighted base, made to stand on the floor beside a chair or at an entrance. The side door opens fully, so changing the candle does not mean lifting the whole thing.",
      },
      FR: {
        name: "Grande lanterne de sol",
        slug: "grande-lanterne-de-sol",
        shortDescription: "Soixante-dix centimètres : elle se pose au sol, pas sur une table.",
        description:
          "Soixante-dix centimètres sur une base lestée, conçue pour le sol, à côté d'un fauteuil ou à l'entrée. La porte latérale s'ouvre entièrement : changer la bougie n'oblige pas à la soulever.",
      },
    },
  },
  {
    sku: "SK-LAN-004",
    categorySlug: "lanterns",
    supplierName: "Atelier Dar Nejma",
    price: 52_500,
    stock: 41,
    salesCount: 264,
    weightGrams: 340,
    image: "/seed/products/lighting-4.webp",
    translations: {
      AR: {
        name: "طقم فوانيس صغيرة (ثلاثة)",
        slug: "طقم-فوانيس-صغيرة",
        shortDescription: "ثلاثة بأحجام متدرّجة، تُوضع معًا على طاولة.",
        description:
          "ثلاثة فوانيس بارتفاعات اثني عشر وستة عشر وعشرين سنتيمترًا، تعمل معًا على وسط طاولة أو منفردة على رفّ. تناسب شموع الإشعال العادية.",
      },
      EN: {
        name: "Set of Three Small Lanterns",
        slug: "set-of-three-small-lanterns",
        shortDescription: "Three graduated sizes, grouped on a table.",
        description:
          "Three lanterns at twelve, sixteen and twenty centimetres. They work grouped on a table centre or separated along a shelf, and take ordinary tealights.",
      },
      FR: {
        name: "Lot de trois petites lanternes",
        slug: "lot-trois-petites-lanternes",
        shortDescription: "Trois tailles graduées, à regrouper sur une table.",
        description:
          "Trois lanternes de douze, seize et vingt centimètres. Elles fonctionnent groupées en centre de table ou dispersées sur une étagère, et acceptent des bougies chauffe-plat standard.",
      },
    },
  },

  // ------------------------------------------------------------- table lamps
  {
    sku: "SK-LMP-001",
    categorySlug: "table-lamps",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 214_000,
    stock: 9,
    isFeatured: true,
    salesCount: 137,
    weightGrams: 2100,
    image: "/seed/products/ceramics-1.webp",
    translations: {
      AR: {
        name: "مصباح طاولة خزفي",
        slug: "مصباح-طاولة-خزفي",
        shortDescription: "قاعدة خزفية مزجّجة مع عاكس كتّان.",
        description:
          "قاعدة مرميّة على الدولاب ومزجّجة بأزرق نابل، مع عاكس من الكتّان غير المبيّض. الأسلاك مطابقة للمعايير الأوروبية ويأتي بقابس من النوع C.",
      },
      EN: {
        name: "Ceramic Table Lamp",
        slug: "ceramic-table-lamp",
        shortDescription: "Glazed ceramic base with an unbleached linen shade.",
        description:
          "A base thrown on the wheel and glazed in Nabeul blue, under an unbleached linen shade. Wired to European standard with a type C plug.",
      },
      FR: {
        name: "Lampe de table en céramique",
        slug: "lampe-de-table-ceramique",
        shortDescription: "Pied en céramique émaillée, abat-jour en lin écru.",
        description:
          "Un pied tourné et émaillé au bleu de Nabeul, sous un abat-jour en lin écru. Câblage aux normes européennes, fiche de type C.",
      },
    },
  },
  {
    sku: "SK-LMP-002",
    categorySlug: "table-lamps",
    supplierName: "Bois d'Olivier Sidi Bou",
    price: 385_000,
    compareAtPrice: 450_000,
    stock: 4,
    isNew: true,
    isFeatured: true,
    salesCount: 58,
    weightGrams: 5200,
    image: "/seed/products/woodwork-1.webp",
    translations: {
      AR: {
        name: "مصباح أرضي من خشب الزيتون",
        slug: "مصباح-أرضي-من-خشب-الزيتون",
        shortDescription: "عمود من قطعة واحدة، لا قطعتين ملصوقتين.",
        description:
          "عمود مخروط من قطعة واحدة من خشب الزيتون بارتفاع مئة وأربعين سنتيمترًا، فالعروق تجري متصلة من الأسفل إلى الأعلى. لكل قطعة رسم عروق مختلف؛ ما تستلمه لن يطابق الصورة تمامًا.",
      },
      EN: {
        name: "Olive Wood Floor Lamp",
        slug: "olive-wood-floor-lamp",
        shortDescription: "A single-piece column, not two lengths joined.",
        description:
          "A hundred and forty centimetres turned from one piece of olive wood, so the grain runs unbroken from base to top. Every piece figures differently — what arrives will not match the photograph exactly.",
      },
      FR: {
        name: "Lampadaire en bois d'olivier",
        slug: "lampadaire-bois-olivier",
        shortDescription: "Un fût d'une seule pièce, pas deux morceaux aboutés.",
        description:
          "Cent quarante centimètres tournés dans une seule pièce de bois d'olivier : le veinage court sans rupture de la base au sommet. Chaque pièce est différente — celle que vous recevrez ne sera pas exactement celle de la photo.",
      },
    },
  },
  {
    sku: "SK-LMP-003",
    categorySlug: "table-lamps",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 96_500,
    stock: 18,
    salesCount: 89,
    weightGrams: 900,
    image: "/seed/products/ceramics-2.webp",
    translations: {
      AR: {
        name: "مصباح ليلي خزفي",
        slug: "مصباح-ليلي-خزفي",
        shortDescription: "ضوء خافت يكفي للممرّ أو لجانب السرير.",
        description:
          "مصباح صغير بثقوب مخرّمة في جسم الخزف نفسه، يعطي ضوءًا خافتًا لا يوقظ أحدًا. مناسب لجانب السرير أو لممرّ.",
      },
      EN: {
        name: "Ceramic Night Light",
        slug: "ceramic-night-light",
        shortDescription: "Dim enough for a hallway or a bedside.",
        description:
          "A small lamp with the piercing cut into the ceramic body itself, giving a low light that will not wake anyone. Sized for a bedside table or a hallway.",
      },
      FR: {
        name: "Veilleuse en céramique",
        slug: "veilleuse-ceramique",
        shortDescription: "Assez tamisée pour un couloir ou une table de chevet.",
        description:
          "Une petite lampe dont les perforations sont taillées dans la céramique elle-même, pour une lumière basse qui ne réveille personne. À la bonne échelle pour un chevet ou un couloir.",
      },
    },
  },
  {
    sku: "SK-LMP-004",
    categorySlug: "table-lamps",
    supplierName: "Vannerie du Sahel",
    price: 118_000,
    stock: 12,
    salesCount: 74,
    weightGrams: 480,
    image: "/seed/products/basketry-1.webp",
    translations: {
      AR: {
        name: "عاكس ضوء من الخيزران",
        slug: "عاكس-ضوء-من-الخيزران",
        shortDescription: "عاكس معلّق ينسج الضوء على السقف.",
        description:
          "عاكس منسوج بقطر خمسة وأربعين سنتيمترًا، يُركّب على تجهيزة تعليق قائمة. النسج المفتوح يترك الضوء يمرّ فيرسم شبكة على السقف بدل أن يحصره إلى الأسفل.",
      },
      EN: {
        name: "Wicker Pendant Shade",
        slug: "wicker-pendant-shade",
        shortDescription: "A hanging shade that weaves light across the ceiling.",
        description:
          "A forty-five centimetre woven shade that fits an existing pendant fitting. The open weave lets light through, so it patterns the ceiling instead of pushing everything downward.",
      },
      FR: {
        name: "Abat-jour suspendu en osier",
        slug: "abat-jour-suspendu-osier",
        shortDescription: "Un abat-jour suspendu qui tisse la lumière au plafond.",
        description:
          "Un abat-jour tressé de quarante-cinq centimètres, qui se monte sur une suspension existante. Le tressage ouvert laisse passer la lumière et dessine une trame au plafond au lieu de tout rabattre vers le bas.",
      },
    },
  },

  // ---------------------------------------------------------------- ceramics
  {
    sku: "SK-CER-001",
    categorySlug: "ceramics",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 68_000,
    stock: 32,
    isFeatured: true,
    salesCount: 421,
    weightGrams: 1400,
    image: "/seed/products/ceramics-3.webp",
    translations: {
      AR: {
        name: "قصعة نابل للتقديم",
        slug: "قصعة-نابل-للتقديم",
        shortDescription: "بقطر ثلاثين سنتيمترًا، مرسومة باليد على الدولاب.",
        description:
          "قصعة بقطر ثلاثين سنتيمترًا، مرسومة باليد قبل الزجاج فتختلف كل قطعة قليلًا عن الأخرى. تدخل غسّالة الصحون والميكروويف.",
      },
      EN: {
        name: "Nabeul Serving Bowl",
        slug: "nabeul-serving-bowl",
        shortDescription: "Thirty centimetres across, painted by hand on the wheel.",
        description:
          "Thirty centimetres across, painted freehand before glazing, so no two carry quite the same line. Dishwasher and microwave safe.",
      },
      FR: {
        name: "Saladier de Nabeul",
        slug: "saladier-de-nabeul",
        shortDescription: "Trente centimètres de diamètre, peint à la main au tour.",
        description:
          "Trente centimètres de diamètre, peint à main levée avant émaillage : aucun exemplaire n'a tout à fait le même trait. Va au lave-vaisselle et au micro-ondes.",
      },
    },
  },
  {
    sku: "SK-CER-002",
    categorySlug: "ceramics",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 145_000,
    compareAtPrice: 178_000,
    stock: 11,
    salesCount: 356,
    weightGrams: 2600,
    image: "/seed/products/ceramics-4.webp",
    translations: {
      AR: {
        name: "طاجين مرسوم يدويًا",
        slug: "طاجين-مرسوم-يدويًا",
        shortDescription: "للطبخ فعلًا، لا للعرض فقط.",
        description:
          "طاجين للطهي على نار هادئة أو في الفرن، لا للزينة. عالجه بالزيت قبل أول استعمال وتجنّب صدمة الحرارة المفاجئة، ويعمّر سنوات.",
      },
      EN: {
        name: "Hand-Painted Tagine",
        slug: "hand-painted-tagine",
        shortDescription: "Made to actually cook in, not to sit on a shelf.",
        description:
          "For slow cooking on a low flame or in the oven, not for display. Season it with oil before first use and keep it away from sudden temperature changes, and it will last for years.",
      },
      FR: {
        name: "Tajine peint à la main",
        slug: "tajine-peint-a-la-main",
        shortDescription: "Fait pour cuisiner, pas pour rester sur une étagère.",
        description:
          "Pour une cuisson lente à feu doux ou au four, pas pour la décoration. Culottez-le à l'huile avant le premier usage et évitez les chocs thermiques : il durera des années.",
      },
    },
  },
  {
    sku: "SK-CER-003",
    categorySlug: "ceramics",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 84_500,
    stock: 27,
    salesCount: 203,
    weightGrams: 1800,
    image: "/seed/products/ceramics-1.webp",
    translations: {
      AR: {
        name: "طقم أكواب مزجّجة (أربعة)",
        slug: "طقم-أكواب-مزجّجة",
        shortDescription: "أربعة أكواب، كل واحد بلون زجاج مختلف.",
        description:
          "أربعة أكواب بسعة ثلاثمئة ملّيلتر لكل واحد، بأربعة ألوان زجاج من نفس الطبخة. المقبض مصنوع ليدخله الإصبع فعلًا، لا ليبدو جميلًا فحسب.",
      },
      EN: {
        name: "Glazed Mug Set of Four",
        slug: "glazed-mug-set-of-four",
        shortDescription: "Four mugs, each in a different glaze.",
        description:
          "Four mugs of three hundred millilitres each, in four glazes from the same firing. The handle is sized for a finger to actually go through, which is not true of every handmade mug.",
      },
      FR: {
        name: "Lot de quatre mugs émaillés",
        slug: "lot-quatre-mugs-emailles",
        shortDescription: "Quatre mugs, chacun dans un émail différent.",
        description:
          "Quatre mugs de trois cents millilitres, dans quatre émaux issus de la même cuisson. L'anse est dimensionnée pour qu'un doigt y passe réellement, ce qui n'est pas le cas de tous les mugs faits main.",
      },
    },
  },
  {
    sku: "SK-CER-004",
    categorySlug: "ceramics",
    supplierName: "Poterie Nabeul Frères Trabelsi",
    price: 112_000,
    stock: 8,
    isNew: true,
    salesCount: 47,
    weightGrams: 1900,
    image: "/seed/products/ceramics-2.webp",
    translations: {
      AR: {
        name: "مزهرية سجنان الفخارية",
        slug: "مزهرية-سجنان-الفخارية",
        shortDescription: "فخّار غير مزجّج بزخارف سجنان الأمازيغية.",
        description:
          "فخّار غير مزجّج مرسوم بالرموز الهندسية التي تتوارثها نساء سجنان. غير مانع للماء بحكم طبيعته، فاستعمل بطانة داخلية للزهور الطازجة.",
      },
      EN: {
        name: "Sejnane Terracotta Vase",
        slug: "sejnane-terracotta-vase",
        shortDescription: "Unglazed terracotta with Amazigh Sejnane markings.",
        description:
          "Unglazed terracotta, painted with the geometric marks the women of Sejnane have passed down between them. Not waterproof by nature, so use an inner liner for fresh flowers.",
      },
      FR: {
        name: "Vase en terre cuite de Sejnane",
        slug: "vase-terre-cuite-sejnane",
        shortDescription: "Terre cuite non émaillée aux motifs amazighs de Sejnane.",
        description:
          "Terre cuite non émaillée, peinte des signes géométriques que les femmes de Sejnane se transmettent. Non étanche par nature : utilisez une doublure pour des fleurs fraîches.",
      },
    },
  },

  // ---------------------------------------------------------------- textiles
  {
    sku: "SK-TEX-001",
    categorySlug: "textiles",
    supplierName: "Tissage El Karama",
    price: 640_000,
    compareAtPrice: 780_000,
    stock: 3,
    isFeatured: true,
    salesCount: 96,
    weightGrams: 4800,
    image: "/seed/products/textiles-1.webp",
    translations: {
      AR: {
        name: "زربية كليم منسوجة يدويًا",
        slug: "زربية-كليم-منسوجة-يدويًا",
        shortDescription: "متر ونصف في متر، صوف مصبوغ بمواد طبيعية.",
        description:
          "زربية بمقاس مئة وخمسين في مئة سنتيمتر، منسوجة على النول من صوف مصبوغ بمواد طبيعية. تحتاج نحو ثلاثة أسابيع من العمل، ولذلك لا يوجد منها إلا القليل في أي وقت.",
      },
      EN: {
        name: "Handwoven Kilim Rug",
        slug: "handwoven-kilim-rug",
        shortDescription: "A metre and a half by one metre, in naturally dyed wool.",
        description:
          "A hundred and fifty by a hundred centimetres, woven on the loom in naturally dyed wool. Each one takes about three weeks at the loom, which is why there are never many in stock.",
      },
      FR: {
        name: "Tapis kilim tissé main",
        slug: "tapis-kilim-tisse-main",
        shortDescription: "Un mètre cinquante sur un mètre, laine teinte naturellement.",
        description:
          "Cent cinquante sur cent centimètres, tissé au métier en laine teinte naturellement. Chaque pièce demande environ trois semaines de travail — d'où le stock toujours limité.",
      },
    },
  },
  {
    sku: "SK-TEX-002",
    categorySlug: "textiles",
    supplierName: "Tissage El Karama",
    price: 42_000,
    stock: 64,
    isFeatured: true,
    salesCount: 512,
    weightGrams: 380,
    image: "/seed/products/textiles-2.webp",
    translations: {
      AR: {
        name: "فوطة قطنية",
        slug: "فوطة-قطنية",
        shortDescription: "منشفة حمّام، ومنشفة شاطئ، وغطاء أريكة.",
        description:
          "قطن مئة بالمئة، تنشف بسرعة وتُطوى إلى حجم أصغر من أي منشفة عادية. تصلح للحمّام وللشاطئ وكغطاء لأريكة.",
      },
      EN: {
        name: "Cotton Fouta Towel",
        slug: "cotton-fouta-towel",
        shortDescription: "A bath towel, a beach towel, and a sofa throw.",
        description:
          "Pure cotton that dries fast and folds smaller than any terry towel. It works in a bathroom, on a beach, and thrown over the back of a sofa.",
      },
      FR: {
        name: "Fouta en coton",
        slug: "fouta-en-coton",
        shortDescription: "Serviette de bain, serviette de plage et jeté de canapé.",
        description:
          "Coton pur, qui sèche vite et se plie plus petit que n'importe quelle éponge. Elle fonctionne dans une salle de bain, à la plage, et jetée sur un canapé.",
      },
    },
  },
  {
    sku: "SK-TEX-003",
    categorySlug: "textiles",
    supplierName: "Tissage El Karama",
    price: 58_500,
    stock: 38,
    salesCount: 287,
    weightGrams: 320,
    image: "/seed/products/textiles-3.webp",
    translations: {
      AR: {
        name: "غطاء وسادة مرقوم",
        slug: "غطاء-وسادة-مرقوم",
        shortDescription: "خمسة وأربعون في خمسة وأربعين، بسحّاب مخفيّ.",
        description:
          "غطاء بمقاس خمسة وأربعين في خمسة وأربعين سنتيمترًا، منسوج بزخرفة المرقوم الهندسية، مع سحّاب مخفيّ. الحشوة غير مضمّنة.",
      },
      EN: {
        name: "Margoum Cushion Cover",
        slug: "margoum-cushion-cover",
        shortDescription: "Forty-five by forty-five, with a concealed zip.",
        description:
          "Forty-five by forty-five centimetres, woven in the geometric margoum pattern, with a concealed zip. The insert is not included.",
      },
      FR: {
        name: "Housse de coussin margoum",
        slug: "housse-coussin-margoum",
        shortDescription: "Quarante-cinq sur quarante-cinq, fermeture invisible.",
        description:
          "Quarante-cinq sur quarante-cinq centimètres, tissée au motif géométrique margoum, avec fermeture éclair invisible. Le coussin de garnissage n'est pas inclus.",
      },
    },
  },
  {
    sku: "SK-TEX-004",
    categorySlug: "textiles",
    supplierName: "Tissage El Karama",
    price: 196_000,
    stock: 7,
    isNew: true,
    salesCount: 63,
    weightGrams: 1600,
    image: "/seed/products/textiles-4.webp",
    translations: {
      AR: {
        name: "بطانية صوف",
        slug: "بطانية-صوف",
        shortDescription: "صوف غير مصبوغ، بلونه الأصلي.",
        description:
          "بطانية بمقاس مئة وثمانين في مئة وثلاثين سنتيمترًا من صوف غير مصبوغ، فالتدرّجات هي ألوان الصوف نفسه. تُغسل باليد فقط.",
      },
      EN: {
        name: "Wool Throw Blanket",
        slug: "wool-throw-blanket",
        shortDescription: "Undyed wool, in the colours the fleece came in.",
        description:
          "A hundred and eighty by a hundred and thirty centimetres of undyed wool, so the shading is the fleece's own. Hand wash only.",
      },
      FR: {
        name: "Plaid en laine",
        slug: "plaid-en-laine",
        shortDescription: "Laine non teinte, dans les couleurs de la toison.",
        description:
          "Cent quatre-vingts sur cent trente centimètres de laine non teinte : les nuances sont celles de la toison elle-même. Lavage à la main uniquement.",
      },
    },
  },

  // ---------------------------------------------------------------- woodwork
  {
    sku: "SK-WOD-001",
    categorySlug: "woodwork",
    supplierName: "Bois d'Olivier Sidi Bou",
    price: 76_000,
    stock: 29,
    isFeatured: true,
    salesCount: 398,
    weightGrams: 1300,
    image: "/seed/products/woodwork-2.webp",
    translations: {
      AR: {
        name: "لوح تقطيع من خشب الزيتون",
        slug: "لوح-تقطيع-من-خشب-الزيتون",
        shortDescription: "خشب كثيف لا يبتلع الروائح.",
        description:
          "خشب الزيتون كثيف وقليل المسام، فلا يحتفظ برائحة الثوم في اليوم التالي. اغسله باليد وادهنه بزيت معدني للأغذية من حين لآخر.",
      },
      EN: {
        name: "Olive Wood Chopping Board",
        slug: "olive-wood-chopping-board",
        shortDescription: "Dense wood that does not hold onto smells.",
        description:
          "Olive wood is dense and close-grained, so it does not keep yesterday's garlic. Hand wash, and oil it with food-safe mineral oil now and then.",
      },
      FR: {
        name: "Planche à découper en bois d'olivier",
        slug: "planche-a-decouper-bois-olivier",
        shortDescription: "Un bois dense, qui ne garde pas les odeurs.",
        description:
          "Le bois d'olivier est dense et serré : il ne garde pas l'ail de la veille. Lavage à la main, et un peu d'huile minérale alimentaire de temps en temps.",
      },
    },
  },
  {
    sku: "SK-WOD-002",
    categorySlug: "woodwork",
    supplierName: "Bois d'Olivier Sidi Bou",
    price: 38_500,
    stock: 46,
    salesCount: 341,
    weightGrams: 220,
    image: "/seed/products/woodwork-3.webp",
    translations: {
      AR: {
        name: "أدوات سلطة من خشب الزيتون",
        slug: "أدوات-سلطة-من-خشب-الزيتون",
        shortDescription: "لا تخدش القصعة ولا تُكسِد الخضار.",
        description:
          "ملعقة وشوكة بطول ثلاثين سنتيمترًا، منحوتتان من قطعة واحدة لكل منهما. الخشب لا يخدش القصعة ولا يُكسِد الأوراق الخضراء كما يفعل المعدن.",
      },
      EN: {
        name: "Olive Wood Salad Servers",
        slug: "olive-wood-salad-servers",
        shortDescription: "They will not scratch the bowl or bruise the leaves.",
        description:
          "A thirty centimetre spoon and fork, each carved from a single piece. Wood will not scratch a glazed bowl, and it does not discolour leaves the way metal does.",
      },
      FR: {
        name: "Couverts à salade en bois d'olivier",
        slug: "couverts-salade-bois-olivier",
        shortDescription: "Ils n'abîment ni le saladier ni les feuilles.",
        description:
          "Une cuillère et une fourchette de trente centimètres, chacune taillée dans une seule pièce. Le bois ne raye pas un saladier émaillé et n'oxyde pas les feuilles comme le métal.",
      },
    },
  },
  {
    sku: "SK-WOD-003",
    categorySlug: "woodwork",
    supplierName: "Bois d'Olivier Sidi Bou",
    price: 265_000,
    stock: 5,
    salesCount: 52,
    weightGrams: 3400,
    image: "/seed/products/woodwork-4.webp",
    translations: {
      AR: {
        name: "إطار مرآة خشبي منقوش",
        slug: "إطار-مرآة-خشبي-منقوش",
        shortDescription: "قطر ستون سنتيمترًا، بنقش يدوي على الحافة.",
        description:
          "مرآة مستديرة بقطر ستين سنتيمترًا في إطار منقوش بالإزميل على الحافة. تأتي بعلّاقة مركّبة وجاهزة للتعليق.",
      },
      EN: {
        name: "Carved Wooden Mirror Frame",
        slug: "carved-wooden-mirror-frame",
        shortDescription: "Sixty centimetres across, chisel-carved at the edge.",
        description:
          "A round mirror sixty centimetres across in a frame chisel-carved around the rim. It arrives with the hanging fixture already fitted.",
      },
      FR: {
        name: "Cadre de miroir en bois sculpté",
        slug: "cadre-miroir-bois-sculpte",
        shortDescription: "Soixante centimètres de diamètre, bordure sculptée au ciseau.",
        description:
          "Un miroir rond de soixante centimètres dans un cadre sculpté au ciseau sur tout le pourtour. Livré avec l'attache déjà posée.",
      },
    },
  },
  {
    sku: "SK-WOD-004",
    categorySlug: "woodwork",
    supplierName: "Bois d'Olivier Sidi Bou",
    price: 92_000,
    stock: 21,
    salesCount: 176,
    weightGrams: 1100,
    image: "/seed/products/woodwork-1.webp",
    translations: {
      AR: {
        name: "هاون ومدقّة من خشب الزيتون",
        slug: "هاون-ومدقّة-من-خشب-الزيتون",
        shortDescription: "ثقيل بما يكفي ليبقى ثابتًا تحت الدقّ.",
        description:
          "هاون ومدقّة بوزن يكفي لئلا يتحرّكا على الطاولة أثناء دقّ التوابل أو الثوم. الجدار الداخلي مصقول بما يمنع التصاق البقايا.",
      },
      EN: {
        name: "Olive Wood Mortar and Pestle",
        slug: "olive-wood-mortar-and-pestle",
        shortDescription: "Heavy enough to stay put while you pound.",
        description:
          "A mortar and pestle weighted so they do not travel across the counter while you work spices or garlic. The inside is finished smooth enough that nothing lodges in it.",
      },
      FR: {
        name: "Mortier et pilon en bois d'olivier",
        slug: "mortier-pilon-bois-olivier",
        shortDescription: "Assez lourd pour ne pas bouger pendant qu'on pile.",
        description:
          "Un mortier et son pilon, assez lestés pour ne pas se promener sur le plan de travail quand on pile des épices ou de l'ail. L'intérieur est poli de façon à ne rien retenir.",
      },
    },
  },

  // ---------------------------------------------------------------- basketry
  {
    sku: "SK-BAS-001",
    categorySlug: "basketry",
    supplierName: "Vannerie du Sahel",
    price: 54_000,
    stock: 52,
    isFeatured: true,
    salesCount: 445,
    weightGrams: 640,
    image: "/seed/products/basketry-2.webp",
    translations: {
      AR: {
        name: "قفّة سوق من سعف النخيل",
        slug: "قفّة-سوق-من-سعف-النخيل",
        shortDescription: "تحمل ما يعادل ثلاثة أكياس بلاستيكية.",
        description:
          "قفّة من سعف النخيل بمقبضين جلديين، تتّسع لما يعادل ثلاثة أكياس بلاستيكية. السعف يلين مع الاستعمال ولا ينكسر.",
      },
      EN: {
        name: "Palm Leaf Market Basket",
        slug: "palm-leaf-market-basket",
        shortDescription: "Holds about three plastic bags' worth.",
        description:
          "Palm leaf with two leather handles, holding roughly what three plastic bags would. The leaf softens with use rather than cracking.",
      },
      FR: {
        name: "Couffin en feuilles de palmier",
        slug: "couffin-feuilles-palmier",
        shortDescription: "Contient l'équivalent de trois sacs plastique.",
        description:
          "Feuille de palmier et deux anses en cuir, pour l'équivalent d'environ trois sacs plastique. La feuille s'assouplit à l'usage au lieu de casser.",
      },
    },
  },
  {
    sku: "SK-BAS-002",
    categorySlug: "basketry",
    supplierName: "Vannerie du Sahel",
    price: 128_000,
    compareAtPrice: 156_000,
    stock: 16,
    salesCount: 231,
    weightGrams: 1500,
    image: "/seed/products/basketry-3.webp",
    translations: {
      AR: {
        name: "طقم سلال تخزين (ثلاثة)",
        slug: "طقم-سلال-تخزين",
        shortDescription: "ثلاثة أحجام متداخلة، للتخزين لا للعرض.",
        description:
          "ثلاث سلال بأقطار خمسة وعشرين وخمسة وثلاثين وخمسة وأربعين سنتيمترًا، تتداخل داخل بعضها عند عدم الاستعمال. تتحمّل وزن الأغطية والألعاب لا مجرّد المناديل.",
      },
      EN: {
        name: "Set of Three Woven Storage Baskets",
        slug: "set-of-three-woven-storage-baskets",
        shortDescription: "Three nesting sizes, for storage rather than display.",
        description:
          "Three baskets at twenty-five, thirty-five and forty-five centimetres, nesting inside each other when not in use. Built to take the weight of blankets and toys, not just tea towels.",
      },
      FR: {
        name: "Lot de trois paniers de rangement",
        slug: "lot-trois-paniers-rangement",
        shortDescription: "Trois tailles gigognes, pour ranger et pas seulement décorer.",
        description:
          "Trois paniers de vingt-cinq, trente-cinq et quarante-cinq centimètres, qui s'emboîtent quand on ne s'en sert pas. Conçus pour le poids de plaids et de jouets, pas seulement de torchons.",
      },
    },
  },
  {
    sku: "SK-BAS-003",
    categorySlug: "basketry",
    supplierName: "Vannerie du Sahel",
    price: 46_500,
    stock: 34,
    salesCount: 158,
    weightGrams: 420,
    image: "/seed/products/basketry-4.webp",
    translations: {
      AR: {
        name: "مفارش من الحلفاء (ستة)",
        slug: "مفارش-من-الحلفاء",
        shortDescription: "ستة مفارش، تمسح بقطعة قماش مبلّلة.",
        description:
          "ستة مفارش مستديرة بقطر خمسة وثلاثين سنتيمترًا من الحلفاء. تُمسح بقطعة قماش مبلّلة وتُترك لتجفّ مسطّحة.",
      },
      EN: {
        name: "Halfa Grass Placemats, Set of Six",
        slug: "halfa-grass-placemats-set-of-six",
        shortDescription: "Six mats, wiped clean with a damp cloth.",
        description:
          "Six round mats of thirty-five centimetres in halfa grass. Wipe with a damp cloth and let them dry flat.",
      },
      FR: {
        name: "Sets de table en alfa, lot de six",
        slug: "sets-de-table-alfa-lot-six",
        shortDescription: "Six sets, à essuyer d'un linge humide.",
        description:
          "Six sets ronds de trente-cinq centimètres en alfa. Essuyez d'un linge humide et laissez sécher à plat.",
      },
    },
  },
  {
    sku: "SK-BAS-004",
    categorySlug: "basketry",
    supplierName: "Vannerie du Sahel",
    price: 89_000,
    stock: 19,
    isNew: true,
    salesCount: 71,
    weightGrams: 890,
    image: "/seed/products/basketry-1.webp",
    translations: {
      AR: {
        name: "سلة غسيل بغطاء",
        slug: "سلة-غسيل-بغطاء",
        shortDescription: "غطاء يبقى مكانه ونسج يترك الهواء يمرّ.",
        description:
          "سلة بارتفاع ستين سنتيمترًا بغطاء يستقرّ في مكانه ولا ينزلق. النسج مفتوح بما يكفي ليمرّ الهواء، فلا تحبس الرطوبة.",
      },
      EN: {
        name: "Lidded Laundry Basket",
        slug: "lidded-laundry-basket",
        shortDescription: "A lid that stays put, and a weave that breathes.",
        description:
          "Sixty centimetres tall with a lid that seats properly instead of sliding off. The weave is open enough to let air through, so nothing stays damp inside.",
      },
      FR: {
        name: "Panier à linge avec couvercle",
        slug: "panier-a-linge-avec-couvercle",
        shortDescription: "Un couvercle qui tient, un tressage qui respire.",
        description:
          "Soixante centimètres de haut, avec un couvercle qui se pose correctement au lieu de glisser. Le tressage est assez ouvert pour laisser passer l'air : rien ne reste humide à l'intérieur.",
      },
    },
  },
];
