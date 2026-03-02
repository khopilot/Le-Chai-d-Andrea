export interface MenuItem {
  name: string;
  desc: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface Formule {
  name: string;
  price: string;
  desc: string;
  featured?: boolean;
  badge?: string;
}

export const FORMULES: Formule[] = [
  { name: "Le D\u00E9jeuner", price: "24", desc: "Entr\u00E9e + Plat\nou Plat + Dessert\nCaf\u00E9 offert" },
  { name: "Le Chai Complet", price: "39", desc: "Entr\u00E9e + Plat + Dessert\nVerre de vin inclus\nCaf\u00E9 & mignardises", featured: true, badge: "Signature" },
  { name: "Accord Mets-Vins", price: "65", desc: "Menu 5 services\nAccords vins au verre\nS\u00E9lection sommelier" },
];

export const ENTREES: MenuCategory[] = [
  {
    title: "Entr\u00E9es froides",
    items: [
      { name: "Foie gras de canard maison", desc: "Chutney figues, brioche toast\u00E9e, fleur de sel", price: "18 \u20AC" },
      { name: "Tartare de saumon fum\u00E9", desc: "Avocat, citron caviar, cr\u00E8me wasabi, blinis", price: "16 \u20AC" },
      { name: "Burrata cr\u00E9meuse", desc: "Tomates heirloom, huile d\u2019olive AOP, basilic", price: "14 \u20AC" },
      { name: "Velout\u00E9 de champignons des bois", desc: "Truffe noire, mousse de lard fum\u00E9", price: "13 \u20AC" },
    ],
  },
  {
    title: "Entr\u00E9es chaudes",
    items: [
      { name: "Escargots de Bourgogne", desc: "Beurre persill\u00E9, ail confit, pain de campagne", price: "15 \u20AC" },
      { name: "Coquilles Saint-Jacques po\u00EAl\u00E9es", desc: "Pur\u00E9e panais, \u00E9mulsion champagne, ciboulette", price: "22 \u20AC" },
      { name: "Tarte fine aux oignons doux", desc: "Tome de brebis, lardons, roquette", price: "12 \u20AC" },
      { name: "Soupe de poissons", desc: "Rouille maison, gruy\u00E8re, cro\u00FBtons aill\u00E9s", price: "14 \u20AC" },
    ],
  },
];

export const PLATS: MenuCategory[] = [
  {
    title: "Viandes & Volailles",
    items: [
      { name: "Filet de b\u0153uf Rossini", desc: "M\u00E9daillon foie gras, sauce P\u00E9rigueux, pommes dauphine", price: "36 \u20AC" },
      { name: "C\u00F4te de veau fermi\u00E8re", desc: "Jus cors\u00E9 aux morilles, gnocchis, l\u00E9gumes glac\u00E9s", price: "32 \u20AC" },
      { name: "Supr\u00EAme de pintade", desc: "Farci aux herbes, r\u00E9duction vin jaune, crozets", price: "28 \u20AC" },
      { name: "Magret de canard r\u00F4ti", desc: "Cerises noires, betteraves confites, sauce cassis", price: "27 \u20AC" },
    ],
  },
  {
    title: "Poissons & Fruits de mer",
    items: [
      { name: "Sole meuni\u00E8re", desc: "Beurre noisette, c\u00E2pres, citron confit, haricots verts", price: "34 \u20AC" },
      { name: "Dos de cabillaud en cro\u00FBte d\u2019herbes", desc: "Fondue de poireaux, beurre blanc nantais", price: "26 \u20AC" },
      { name: "Homard bleu r\u00F4ti", desc: "Bisque l\u00E9g\u00E8re, riz sauvage \u2014 selon arrivage", price: "58 \u20AC" },
      { name: "Risotto truffes noires du P\u00E9rigord", desc: "Parmesan 36 mois, copeaux, huile de truffe", price: "34 \u20AC" },
    ],
  },
];

export const DESSERTS: MenuCategory[] = [
  {
    title: "Desserts maison",
    items: [
      { name: "Souffl\u00E9 au Grand Marnier", desc: "Glace vanille Bourbon", price: "14 \u20AC" },
      { name: "Cr\u00E8me br\u00FBl\u00E9e \u00E0 la lavande", desc: "Tuile aux amandes, coulis fruits rouges", price: "11 \u20AC" },
      { name: "Tarte Tatin revisit\u00E9e", desc: "Pommes caram\u00E9lis\u00E9es, cr\u00E8me fra\u00EEche, calvados", price: "12 \u20AC" },
      { name: "\u00CEle flottante au safran", desc: "Nougatine, pralines roses", price: "10 \u20AC" },
    ],
  },
  {
    title: "Fromages & Accords",
    items: [
      { name: "Plateau de fromages affin\u00E9s", desc: "S\u00E9lection fromager, noix, raisins, pain aux noix", price: "16 \u20AC" },
      { name: "Accord fromages & vins doux", desc: "3 fromages + 2 verres de vins liquoreux", price: "24 \u20AC" },
      { name: "Mignardises du Chai", desc: "Caf\u00E9/th\u00E9 + macarons, chocolats, guimauves", price: "8 \u20AC" },
    ],
  },
];

export const VINS_VERRE: MenuCategory[] = [
  {
    title: "Vins blancs",
    items: [
      { name: "Sancerre \u2014 H. Bourgeois", desc: "Loire \u00B7 Sauvignon \u00B7 Agrumes, min\u00E9ralit\u00E9", price: "11 \u20AC" },
      { name: "Chablis 1er Cru", desc: "Bourgogne \u00B7 Chardonnay \u00B7 Iode, fra\u00EEcheur", price: "13 \u20AC" },
      { name: "Condrieu \u2014 E. Guigal", desc: "Rh\u00F4ne \u00B7 Viognier \u00B7 Floral, p\u00EAche, soyeux", price: "16 \u20AC" },
      { name: "Riesling R\u00E9serve \u2014 Trimbach", desc: "Alsace \u00B7 Riesling \u00B7 Sec, p\u00E9trol\u00E9", price: "10 \u20AC" },
    ],
  },
  {
    title: "Vins rouges",
    items: [
      { name: "Saint-\u00C9milion Grand Cru", desc: "Bordeaux \u00B7 Merlot \u00B7 Velours, fruits noirs", price: "15 \u20AC" },
      { name: "Gevrey-Chambertin", desc: "Bourgogne \u00B7 Pinot noir \u00B7 \u00C9l\u00E9gance, cerise", price: "18 \u20AC" },
      { name: "Ch\u00E2teauneuf-du-Pape", desc: "Rh\u00F4ne \u00B7 GSM \u00B7 Garrigue, \u00E9pices", price: "14 \u20AC" },
      { name: "C\u00F4te de Nuits-Villages", desc: "Bourgogne \u00B7 Pinot \u00B7 Fruit\u00E9, souple", price: "11 \u20AC" },
    ],
  },
];

export const EVENTS = [
  {
    day: "14",
    month: "F\u00E9vrier",
    year: "2025",
    type: "D\u00EEner de St-Valentin",
    name: "Le Festin des Amoureux",
    desc: "Menu d\u00E9gustation 6 services en duo, accord vins doux naturels. Sur r\u00E9servation uniquement.",
    linkText: "R\u00E9server",
    linkAction: "resa",
    image: "/images/event-valentine.png",
  },
  {
    day: "08",
    month: "Mars",
    year: "2025",
    type: "D\u00E9gustation verticale",
    name: "Nuits de Bourgogne",
    desc: "8 grands crus comment\u00E9s par notre sommelier, plateau de fromages affin\u00E9s. 20 places max.",
    linkText: "S\u2019inscrire",
    linkAction: "contact",
    image: "/images/event-degustation.png",
  },
  {
    day: "22",
    month: "Mars",
    year: "2025",
    type: "March\u00E9 du Chai",
    name: "Journ\u00E9e Producteurs",
    desc: "Rencontrez nos vignerons et producteurs partenaires. D\u00E9gustation, vente directe. Entr\u00E9e libre.",
    linkText: "En savoir plus",
    linkAction: "contact",
    image: "/images/event-marche.png",
  },
];

export const MONTHS_FR = [
  "Janvier", "F\u00E9vrier", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Ao\u00FBt", "Septembre", "Octobre", "Novembre", "D\u00E9cembre",
];

export const TIME_MIDI = ["12h00", "12h15", "12h30", "12h45", "13h00", "13h15", "13h30", "13h45", "14h00"];
export const TIME_SOIR = ["19h00", "19h15", "19h30", "19h45", "20h00", "20h15", "20h30", "20h45", "21h00", "21h15"];
export const UNAVAIL_MIDI = ["12h15", "13h30"];
export const UNAVAIL_SOIR = ["19h15", "20h00", "20h15"];
