import type { CategorySeed } from "../types";

/**
 * The demo catalogue is a Tunisian artisan homeware shop. It was chosen because
 * it exercises the things this project has to get right: names that differ
 * genuinely across the three languages rather than reading as machine
 * translation, Arabic that is native rather than transliterated, and a French
 * register that a Tunisian customer would recognise.
 *
 * Arabic slugs are written in Arabic. They percent-encode in the address bar
 * and read correctly everywhere else, which is the right trade for a locale
 * whose readers are the point of the feature. English and French keep Latin
 * slugs of their own — `@@unique([locale, slug])` allows each locale its own
 * namespace, so nothing collides.
 */
export const categories: CategorySeed[] = [
  {
    slug: "lighting",
    sortOrder: 1,
    translations: {
      AR: {
        name: "الإضاءة",
        slug: "الإضاءة",
        description: "فوانيس ومصابيح مصنوعة يدويًا تلقي ظلالًا مزخرفة على الجدران.",
      },
      EN: {
        name: "Lighting",
        slug: "lighting",
        description: "Handmade lanterns and lamps that throw patterned shadows across a wall.",
      },
      FR: {
        name: "Luminaires",
        slug: "luminaires",
        description: "Lanternes et lampes faites main qui projettent des ombres ciselées.",
      },
    },
  },
  {
    slug: "lanterns",
    parentSlug: "lighting",
    sortOrder: 1,
    translations: {
      AR: {
        name: "الفوانيس",
        slug: "الفوانيس",
        description: "فوانيس نحاسية وقصديرية مخرّمة باليد.",
      },
      EN: {
        name: "Lanterns",
        slug: "lanterns",
        description: "Brass and tin lanterns, pierced by hand.",
      },
      FR: {
        name: "Lanternes",
        slug: "lanternes",
        description: "Lanternes en laiton et en fer-blanc, ajourées à la main.",
      },
    },
  },
  {
    slug: "table-lamps",
    parentSlug: "lighting",
    sortOrder: 2,
    translations: {
      AR: {
        name: "مصابيح الطاولة",
        slug: "مصابيح-الطاولة",
        description: "مصابيح للطاولة والأرض من الخزف وخشب الزيتون.",
      },
      EN: {
        name: "Table & Floor Lamps",
        slug: "table-and-floor-lamps",
        description: "Ceramic and olive wood lamps for a table or a corner.",
      },
      FR: {
        name: "Lampes à poser",
        slug: "lampes-a-poser",
        description: "Lampes en céramique et en bois d'olivier, à poser ou au sol.",
      },
    },
  },
  {
    slug: "ceramics",
    sortOrder: 2,
    translations: {
      AR: {
        name: "الخزف",
        slug: "الخزف",
        description: "خزف نابل وسجنان، مرسوم ومزجّج قطعة قطعة.",
      },
      EN: {
        name: "Ceramics",
        slug: "ceramics",
        description: "Nabeul and Sejnane pottery, painted and glazed one piece at a time.",
      },
      FR: {
        name: "Céramique",
        slug: "ceramique",
        description: "Poterie de Nabeul et de Sejnane, peinte et émaillée pièce par pièce.",
      },
    },
  },
  {
    slug: "textiles",
    sortOrder: 3,
    translations: {
      AR: {
        name: "المنسوجات",
        slug: "المنسوجات",
        description: "زرابي وفوط وأغطية منسوجة على النول.",
      },
      EN: {
        name: "Textiles",
        slug: "textiles",
        description: "Rugs, foutas and covers woven on the loom.",
      },
      FR: {
        name: "Textiles",
        slug: "textiles",
        description: "Tapis, foutas et housses tissés au métier.",
      },
    },
  },
  {
    slug: "woodwork",
    sortOrder: 4,
    translations: {
      AR: {
        name: "خشب الزيتون",
        slug: "خشب-الزيتون",
        description: "قطع من خشب الزيتون، لكل واحدة عروقها الخاصة.",
      },
      EN: {
        name: "Olive Wood",
        slug: "olive-wood",
        description: "Olive wood pieces, each one carrying its own grain.",
      },
      FR: {
        name: "Bois d'olivier",
        slug: "bois-olivier",
        description: "Pièces en bois d'olivier, chacune avec son propre veinage.",
      },
    },
  },
  {
    slug: "basketry",
    sortOrder: 5,
    translations: {
      AR: {
        name: "السلال",
        slug: "السلال",
        description: "قفف وسلال من سعف النخيل والحلفاء.",
      },
      EN: {
        name: "Basketry",
        slug: "basketry",
        description: "Baskets and panniers of palm leaf and halfa grass.",
      },
      FR: {
        name: "Vannerie",
        slug: "vannerie",
        description: "Paniers et couffins en feuilles de palmier et en alfa.",
      },
    },
  },
];
