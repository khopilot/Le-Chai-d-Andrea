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
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, cat: "vin", icon: "vin", badge: "", badgeCls: "", name: "Saint-Émilion Grand Cru 2019", desc: "Merlot dominant, château classé. Notes de fruits noirs, café, velours en bouche.", price: 34.9, stock: true, image: "/images/product-saint-emilion.png" },
  { id: 2, cat: "vin", icon: "vin", badge: "Coup de cœur", badgeCls: "", name: "Gevrey-Chambertin 2020", desc: "Pinot noir élégant de la Côte de Nuits. Cerise, sous-bois, grande longueur.", price: 58.0, stock: true, image: "/images/product-gevrey-chambertin.png" },
  { id: 3, cat: "vin", icon: "vin", badge: "Nouveau", badgeCls: "new", name: "Sancerre Blanc — H. Bourgeois", desc: "Sauvignon blanc de Loire. Minéral, agrumes, fraîcheur remarquable.", price: 22.5, stock: true, image: "/images/product-sancerre.png" },
  { id: 4, cat: "vin", icon: "vin", badge: "", badgeCls: "", name: "Châteauneuf-du-Pape 2018", desc: "GSM de grande maturité. Garrigue, épices, puissance solaire et générosité.", price: 44.0, stock: true, image: "/images/product-chateauneuf.png" },
  { id: 5, cat: "spiritueux", icon: "spiritueux", badge: "", badgeCls: "", name: "Armagnac Millésimé 1995", desc: "Vieille réserve de 28 ans d'âge. Prune, vanille, complexité exceptionnelle.", price: 89.0, stock: true, image: "/images/product-armagnac.png" },
  { id: 6, cat: "spiritueux", icon: "spiritueux", badge: "", badgeCls: "", name: "Cognac XO — Maison Fontenay", desc: "Extra Old assemblage de 20+ ans. Rancio, fleurs séchées, onctueux.", price: 74.0, stock: true, image: "/images/product-cognac-xo.png" },
  { id: 7, cat: "epicerie", icon: "epicerie", badge: "", badgeCls: "", name: "Foie Gras de Canard Entier", desc: "Foie gras mi-cuit maison, chutney figues inclus. 180g.", price: 28.9, stock: true, image: "/images/product-foie-gras.png" },
  { id: 8, cat: "epicerie", icon: "epicerie", badge: "Saison", badgeCls: "", name: "Truffe Noire du Périgord", desc: "Tuber melanosporum fraîche (selon saison) ou en conserve. 20g.", price: 45.0, stock: true, image: "/images/product-truffe-noire.png" },
  { id: 9, cat: "epicerie", icon: "epicerie", badge: "", badgeCls: "", name: "Huile d'olive AOP Les Baux", desc: "Première pression à froid, récolte 2024. Fruitée verte, douce amertume.", price: 18.5, stock: true, image: "/images/product-huile-olive.png" },
  { id: 10, cat: "fromage", icon: "fromage", badge: "", badgeCls: "", name: "Plateau Fromages Affinés", desc: "Sélection de 5 fromages : Comté 24 mois, Époisses, Roquefort, chèvre, brie.", price: 32.0, stock: true, image: "/images/product-fromages.png" },
  { id: 11, cat: "coffret", icon: "coffret", badge: "", badgeCls: "", name: "Coffret Découverte Cave", desc: "3 vins sélectionnés par notre sommelier, notes de dégustation, guide accord mets.", price: 69.0, stock: true, image: "/images/product-coffret-decouverte.png" },
  { id: 12, cat: "coffret", icon: "coffret", badge: "Bestseller", badgeCls: "", name: "Coffret Gastronomie Premium", desc: "Foie gras, truffe, huile AOP, 1 grand vin, chocolats artisanaux. Livraison monde.", price: 125.0, stock: true, image: "/images/product-coffret-premium.png" },
];

export const CAT_LABELS: Record<string, string> = {
  vin: "Cave à Vins",
  spiritueux: "Spiritueux",
  epicerie: "Épicerie Fine",
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
    { id: "std", name: "Colissimo Standard", delay: "2-3 jours ouvrés", price: 8.9, free_above: 80 },
    { id: "exp", name: "Chronopost Express", delay: "J+1 avant 13h", price: 14.9, free_above: null },
    { id: "relay", name: "Point Relais", delay: "3-4 jours ouvrés", price: 5.9, free_above: 60 },
  ],
  EU: [
    { id: "std_eu", name: "DHL Economy", delay: "4-6 jours ouvrés", price: 18.9, free_above: 150 },
    { id: "exp_eu", name: "DHL Express", delay: "2-3 jours ouvrés", price: 29.9, free_above: null },
  ],
  WORLD: [
    { id: "std_w", name: "DHL Worldwide Economy", delay: "7-14 jours ouvrés", price: 34.9, free_above: 250 },
    { id: "exp_w", name: "DHL Express Worldwide", delay: "3-5 jours ouvrés", price: 54.9, free_above: null },
    { id: "fedex", name: "FedEx International", delay: "3-5 jours ouvrés", price: 59.9, free_above: null },
  ],
};

export const EU_COUNTRIES = ["BE", "CH", "LU", "DE", "ES", "IT", "NL", "GB", "AT", "PT", "PL"];

export const COUNTRIES = [
  { value: "FR", label: "🇫🇷 France" },
  { value: "BE", label: "🇧🇪 Belgique" },
  { value: "CH", label: "🇨🇭 Suisse" },
  { value: "LU", label: "🇱🇺 Luxembourg" },
  { value: "DE", label: "🇩🇪 Allemagne" },
  { value: "ES", label: "🇪🇸 Espagne" },
  { value: "IT", label: "🇮🇹 Italie" },
  { value: "NL", label: "🇳🇱 Pays-Bas" },
  { value: "GB", label: "🇬🇧 Royaume-Uni" },
  { value: "US", label: "🇺🇸 États-Unis" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "JP", label: "🇯🇵 Japon" },
  { value: "AU", label: "🇦🇺 Australie" },
  { value: "SG", label: "🇸🇬 Singapour" },
  { value: "AE", label: "🇦🇪 Émirats Arabes Unis" },
  { value: "OTHER", label: "🌍 Autre pays" },
];
