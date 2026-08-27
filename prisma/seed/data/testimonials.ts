import type { TestimonialSeed } from "../types";

/**
 * Demo testimonials. Fictional people, written to sound like three different
 * customers rather than one voice translated three times — which is what a
 * testimonial section usually reads like and why nobody believes it.
 *
 * Ratings are not all five. A wall of perfect scores reads as fabricated, and
 * a four that explains itself is more persuasive than a five that does not.
 */
export const testimonials: TestimonialSeed[] = [
  {
    customerName: "أمينة بن يوسف",
    rating: 5,
    sortOrder: 1,
    translations: {
      AR: {
        message:
          "طلبت الفانوس النحاسي هدية لأمي وكنت خائفة أن يصل مكسورًا. وصل مغلّفًا بعناية بعد يومين، وأمي علّقته في المدخل في نفس المساء.",
        role: "زبونة من أريانة",
      },
      EN: {
        message:
          "I ordered the brass lantern as a gift for my mother and was sure it would arrive broken. It came carefully packed two days later, and she had it hanging in the entrance that same evening.",
        role: "Customer, Ariana",
      },
      FR: {
        message:
          "J'ai commandé la lanterne en laiton pour ma mère, persuadée qu'elle arriverait cassée. Elle est arrivée soigneusement emballée deux jours plus tard, et ma mère l'avait accrochée dans l'entrée le soir même.",
        role: "Cliente, Ariana",
      },
    },
  },
  {
    customerName: "Karim Belhadj",
    rating: 5,
    sortOrder: 2,
    translations: {
      AR: {
        message:
          "أستعمل لوح خشب الزيتون يوميًا منذ ثمانية أشهر. لم يتشقّق ولم يحتفظ برائحة الثوم، وهو ما لا أستطيع قوله عن اللوح الذي سبقه.",
        role: "طاهٍ، سوسة",
      },
      EN: {
        message:
          "I have used the olive wood board every day for eight months. It has not split and it does not hold onto garlic, which I could not say about the one before it.",
        role: "Chef, Sousse",
      },
      FR: {
        message:
          "J'utilise la planche en bois d'olivier tous les jours depuis huit mois. Elle n'a pas fendu et ne garde pas l'ail — ce que je ne pouvais pas dire de la précédente.",
        role: "Chef, Sousse",
      },
    },
  },
  {
    customerName: "Sonia Mejri",
    rating: 4,
    sortOrder: 3,
    translations: {
      AR: {
        message:
          "الزربية أجمل مما بدت في الصور، لكن الألوان أدفأ قليلًا من المتوقّع. تأخّر التوصيل يومًا عن الموعد وأخبروني بذلك مسبقًا، فلم يزعجني.",
        role: "مصمّمة ديكور، صفاقس",
      },
      EN: {
        message:
          "The kilim is better in person than in the photographs, though the colours run a little warmer than I expected. Delivery was a day later than quoted, but they told me in advance, so it did not bother me.",
        role: "Interior designer, Sfax",
      },
      FR: {
        message:
          "Le kilim est plus beau en vrai que sur les photos, même si les couleurs sont un peu plus chaudes que je ne l'imaginais. La livraison a eu un jour de retard, mais on m'a prévenue à l'avance, donc cela ne m'a pas gênée.",
        role: "Architecte d'intérieur, Sfax",
      },
    },
  },
  {
    customerName: "محمد الطرابلسي",
    rating: 5,
    sortOrder: 4,
    translations: {
      AR: {
        message:
          "الدفع عند الاستلام هو ما جعلني أطلب أصلًا. طلبت طقم الأكواب، دفعت للسائق، وانتهى الأمر. لا حاجة إلى بطاقة ولا إلى حساب.",
        role: "زبون من بنزرت",
      },
      EN: {
        message:
          "Cash on delivery is the only reason I ordered at all. I ordered the mug set, paid the driver, and that was that — no card, no account.",
        role: "Customer, Bizerte",
      },
      FR: {
        message:
          "Le paiement à la livraison est la seule raison pour laquelle j'ai commandé. J'ai pris le lot de mugs, j'ai payé le livreur, et c'était réglé — sans carte, sans compte.",
        role: "Client, Bizerte",
      },
    },
  },
  {
    customerName: "Leïla Gharbi",
    rating: 5,
    sortOrder: 5,
    translations: {
      AR: {
        message:
          "أول قفّة اشتريتها قبل سنتين ما زالت تُستعمل كل أسبوع. اشتريت الثانية لأختي، لا لأن الأولى تلفت.",
        role: "زبونة من نابل",
      },
      EN: {
        message:
          "The first basket I bought two years ago is still in weekly use. I bought the second one for my sister, not because the first wore out.",
        role: "Customer, Nabeul",
      },
      FR: {
        message:
          "Le premier couffin, acheté il y a deux ans, sert encore toutes les semaines. J'ai pris le deuxième pour ma sœur, pas parce que le premier était usé.",
        role: "Cliente, Nabeul",
      },
    },
  },
];
