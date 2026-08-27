import type { SupplierSeed } from "../types";

/**
 * Fictional workshops. Phone numbers use the +216 8xx range, which is not
 * assigned to subscribers, so nothing here can dial a real person.
 */
export const suppliers: SupplierSeed[] = [
  {
    name: "Atelier Dar Nejma",
    contactPerson: "Nejma Ben Salah",
    email: "contact@dar-nejma.example",
    phone: "+216 80 100 201",
    address: "Rue des Forgerons, Médina de Tunis, 1006 Tunis",
    notes: "Brass and tin lanterns. Pierces to order; allow ten days on custom sizes.",
  },
  {
    name: "Poterie Nabeul Frères Trabelsi",
    contactPerson: "Karim Trabelsi",
    email: "commandes@poterie-trabelsi.example",
    phone: "+216 80 100 202",
    address: "Zone Artisanale, 8000 Nabeul",
    notes:
      "Glazed tableware and tagines. Kiln runs on Mondays, so orders placed Tuesday ship the following week.",
  },
  {
    name: "Tissage El Karama",
    contactPerson: "Fatma Gharbi",
    email: "atelier@elkarama.example",
    phone: "+216 80 100 203",
    address: "Avenue de l'Artisanat, 3100 Kairouan",
    notes:
      "Kilims and margoums. Wool is dyed in small lots, so shades vary slightly between batches.",
  },
  {
    name: "Bois d'Olivier Sidi Bou",
    contactPerson: "Hédi Mansouri",
    email: "hedi@bois-sidibou.example",
    phone: "+216 80 100 204",
    address: "Route de la Marsa, 2026 Sidi Bou Saïd",
    notes: "Turned and carved olive wood, cut from pruned branches only.",
  },
  {
    name: "Vannerie du Sahel",
    contactPerson: "Amel Jelassi",
    email: "amel@vannerie-sahel.example",
    phone: "+216 80 100 205",
    address: "Rue de la Palmeraie, 4000 Sousse",
    notes: "Palm leaf and halfa grass. Seasonal: supply tightens between January and March.",
  },
];
