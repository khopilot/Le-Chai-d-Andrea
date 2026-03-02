export interface Product {
  id: number;
  cat: string;
  icon: string;
  badge: string;
  badgeCls: string;
  name: string;
  desc: string;
  price: number;
  stock: boolean;
}

export const PRODUCTS: Product[] = [
  { id: 1, cat: "vin", icon: "\u{1F377}", badge: "", badgeCls: "", name: "Saint-\u00C9milion Grand Cru 2019", desc: "Merlot dominant, ch\u00E2teau class\u00E9. Notes de fruits noirs, caf\u00E9, velours en bouche.", price: 34.9, stock: true },
  { id: 2, cat: "vin", icon: "\u{1F37E}", badge: "Coup de c\u0153ur", badgeCls: "", name: "Gevrey-Chambertin 2020", desc: "Pinot noir \u00E9l\u00E9gant de la C\u00F4te de Nuits. Cerise, sous-bois, grande longueur.", price: 58.0, stock: true },
  { id: 3, cat: "vin", icon: "\u{1F942}", badge: "Nouveau", badgeCls: "new", name: "Sancerre Blanc \u2014 H. Bourgeois", desc: "Sauvignon blanc de Loire. Min\u00E9ral, agrumes, fra\u00EEcheur remarquable.", price: 22.5, stock: true },
  { id: 4, cat: "vin", icon: "\u{1F377}", badge: "", badgeCls: "", name: "Ch\u00E2teauneuf-du-Pape 2018", desc: "GSM de grande maturit\u00E9. Garrigue, \u00E9pices, puissance solaire et g\u00E9n\u00E9rosit\u00E9.", price: 44.0, stock: true },
  { id: 5, cat: "spiritueux", icon: "\u{1F943}", badge: "", badgeCls: "", name: "Armagnac Mill\u00E9sim\u00E9 1995", desc: "Vieille r\u00E9serve de 28 ans d\u2019\u00E2ge. Prune, vanille, complexit\u00E9 exceptionnelle.", price: 89.0, stock: true },
  { id: 6, cat: "spiritueux", icon: "\u{1F376}", badge: "", badgeCls: "", name: "Cognac XO \u2014 Maison Fontenay", desc: "Extra Old assemblage de 20+ ans. Rancio, fleurs s\u00E9ch\u00E9es, onctueux.", price: 74.0, stock: true },
  { id: 7, cat: "epicerie", icon: "\u{1FAD9}", badge: "", badgeCls: "", name: "Foie Gras de Canard Entier", desc: "Foie gras mi-cuit maison, chutney figues inclus. 180g.", price: 28.9, stock: true },
  { id: 8, cat: "epicerie", icon: "\u{1F344}", badge: "Saison", badgeCls: "", name: "Truffe Noire du P\u00E9rigord", desc: "Tuber melanosporum fra\u00EEche (selon saison) ou en conserve. 20g.", price: 45.0, stock: true },
  { id: 9, cat: "epicerie", icon: "\u{1FAD2}", badge: "", badgeCls: "", name: "Huile d\u2019olive AOP Les Baux", desc: "Premi\u00E8re pression \u00E0 froid, r\u00E9colte 2024. Fruit\u00E9e verte, douce amertume.", price: 18.5, stock: true },
  { id: 10, cat: "fromage", icon: "\u{1F9C0}", badge: "", badgeCls: "", name: "Plateau Fromages Affin\u00E9s", desc: "S\u00E9lection de 5 fromages : Comt\u00E9 24 mois, \u00C9poisses, Roquefort, ch\u00E8vre, brie.", price: 32.0, stock: true },
  { id: 11, cat: "coffret", icon: "\u{1F381}", badge: "", badgeCls: "", name: "Coffret D\u00E9couverte Cave", desc: "3 vins s\u00E9lectionn\u00E9s par notre sommelier, notes de d\u00E9gustation, guide accord mets.", price: 69.0, stock: true },
  { id: 12, cat: "coffret", icon: "\u{1F381}", badge: "Bestseller", badgeCls: "", name: "Coffret Gastronomie Premium", desc: "Foie gras, truffe, huile AOP, 1 grand vin, chocolats artisanaux. Livraison monde.", price: 125.0, stock: true },
];

export const CAT_LABELS: Record<string, string> = {
  vin: "Cave \u00E0 Vins",
  spiritueux: "Spiritueux",
  epicerie: "\u00C9picerie Fine",
  fromage: "Fromagerie",
  coffret: "Coffrets Cadeaux",
};

export interface ShippingOption {
  id: string;
  name: string;
  delay: string;
  price: number;
  free_above: number | null;
}

export const SHIPPING_OPTIONS: Record<string, ShippingOption[]> = {
  FR: [
    { id: "std", name: "Colissimo Standard", delay: "2-3 jours ouvr\u00E9s", price: 8.9, free_above: 80 },
    { id: "exp", name: "Chronopost Express", delay: "J+1 avant 13h", price: 14.9, free_above: null },
    { id: "relay", name: "Point Relais", delay: "3-4 jours ouvr\u00E9s", price: 5.9, free_above: 60 },
  ],
  EU: [
    { id: "std_eu", name: "DHL Economy", delay: "4-6 jours ouvr\u00E9s", price: 18.9, free_above: 150 },
    { id: "exp_eu", name: "DHL Express", delay: "2-3 jours ouvr\u00E9s", price: 29.9, free_above: null },
  ],
  WORLD: [
    { id: "std_w", name: "DHL Worldwide Economy", delay: "7-14 jours ouvr\u00E9s", price: 34.9, free_above: 250 },
    { id: "exp_w", name: "DHL Express Worldwide", delay: "3-5 jours ouvr\u00E9s", price: 54.9, free_above: null },
    { id: "fedex", name: "FedEx International", delay: "3-5 jours ouvr\u00E9s", price: 59.9, free_above: null },
  ],
};

export const EU_COUNTRIES = ["BE", "CH", "LU", "DE", "ES", "IT", "NL", "GB", "AT", "PT", "PL"];

export const COUNTRIES = [
  { value: "FR", label: "\u{1F1EB}\u{1F1F7} France" },
  { value: "BE", label: "\u{1F1E7}\u{1F1EA} Belgique" },
  { value: "CH", label: "\u{1F1E8}\u{1F1ED} Suisse" },
  { value: "LU", label: "\u{1F1F1}\u{1F1FA} Luxembourg" },
  { value: "DE", label: "\u{1F1E9}\u{1F1EA} Allemagne" },
  { value: "ES", label: "\u{1F1EA}\u{1F1F8} Espagne" },
  { value: "IT", label: "\u{1F1EE}\u{1F1F9} Italie" },
  { value: "NL", label: "\u{1F1F3}\u{1F1F1} Pays-Bas" },
  { value: "GB", label: "\u{1F1EC}\u{1F1E7} Royaume-Uni" },
  { value: "US", label: "\u{1F1FA}\u{1F1F8} \u00C9tats-Unis" },
  { value: "CA", label: "\u{1F1E8}\u{1F1E6} Canada" },
  { value: "JP", label: "\u{1F1EF}\u{1F1F5} Japon" },
  { value: "AU", label: "\u{1F1E6}\u{1F1FA} Australie" },
  { value: "SG", label: "\u{1F1F8}\u{1F1EC} Singapour" },
  { value: "AE", label: "\u{1F1E6}\u{1F1EA} \u00C9mirats Arabes Unis" },
  { value: "OTHER", label: "\u{1F30D} Autre pays" },
];
