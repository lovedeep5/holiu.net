const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const envRaw = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
const env = Object.fromEntries(
  envRaw
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .map((l) => l.split("=", 2).map((s) => s.trim()))
);

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

const products = [
  { slug: "2x5-meditation-easy", name_en: "2X5 Meditation Easy – Your Magic Formula for Joy & Success", name_de: "2X5 Meditation Easy – Deine Zauberformel für Freude & Erfolg", description_en: "A powerful 2×5 minute daily meditation practice that rewires your mindset for joy and success. Includes audio guide + workbook.", description_de: "Eine kraftvolle 2×5 Minuten tägliche Meditationspraxis, die dein Mindset für Freude und Erfolg umprogrammiert.", category: "Courses", price: 9700, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/2x5-meditation-easy.png", featured: true, published: true, coming_soon: false },
  { slug: "create-life-you-want-en", name_en: "Create The Life You Want (EN)", name_de: "Erschaffe das Leben, das du willst (EN)", description_en: "A transformative workshop to help you design and manifest the life you truly want. In English.", description_de: "Ein transformativer Workshop auf Englisch.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/create-life-you-want.png", featured: false, published: true, coming_soon: false },
  { slug: "create-life-you-want-de", name_en: "Create The Life You Want (DE)", name_de: "Erschaffe das Leben, das du willst (DE)", description_en: "A transformative workshop to manifest the life you want. In German.", description_de: "Ein transformativer Workshop auf Deutsch.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/create-life-you-want.png", featured: false, published: true, coming_soon: false },
  { slug: "create-new-identity-en", name_en: "Create Your New Identity (EN)", name_de: "Erschaffe deine neue Identität (EN)", description_en: "Erase limiting beliefs and step into a new, empowered version of yourself. Audio workshop in English.", description_de: "Begrenze Glaubenssätze auflösen und in eine neue Version deiner selbst treten. Auf Englisch.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/create-new-identity.png", featured: true, published: true, coming_soon: false },
  { slug: "create-new-identity-de", name_en: "Create Your New Identity (DE)", name_de: "Erschaffe deine neue Identität (DE)", description_en: "Erase limiting beliefs and step into a new version of yourself. In German.", description_de: "Begrenze Glaubenssätze auflösen und in eine neue Version deiner selbst treten. Auf Deutsch.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/create-new-identity.png", featured: false, published: true, coming_soon: false },
  { slug: "create-perfect-love-life", name_en: "Create Your Perfect Love Life", name_de: "Erschaffe dein perfektes Liebesleben", description_en: "Open your heart and attract the love you deserve. A guided audio workshop by Ruth Heinen.", description_de: "Öffne dein Herz und ziehe die Liebe an, die du verdienst.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/create-perfect-love-life.png", featured: false, published: true, coming_soon: false },
  { slug: "energizer", name_en: "Energizer", name_de: "Energizer", description_en: "A quick, powerful meditation to recharge your energy anytime during the day.", description_de: "Eine schnelle, kraftvolle Meditation, um deine Energie jederzeit aufzuladen.", category: "Meditations", price: 900, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/energizer.png", featured: false, published: true, coming_soon: false },
  { slug: "find-your-flow-de", name_en: "Find Your Flow (DE)", name_de: "Finde deinen Flow (DE)", description_en: "Discover your natural rhythm and enter a state of flow. In German.", description_de: "Entdecke deinen natürlichen Rhythmus und trete in einen Zustand des Flow ein. Auf Deutsch.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/find-your-flow.png", featured: false, published: true, coming_soon: false },
  { slug: "healing-witch-wound", name_en: "Healing The Witch Wound", name_de: "Heilung der Hexenwunde", description_en: "Release the ancestral wound that keeps women from stepping into their power. A deep chakra healing session.", description_de: "Die Vorfahrenwunde lösen, die Frauen davon abhält, ihre Kraft zu entfalten.", category: "Chakra Balancing", price: 1200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/healing-witch-wound.png", featured: true, published: true, coming_soon: false },
  { slug: "heilung-familienkarmas", name_en: "Heilung deines Familien Karmas", name_de: "Heilung deines Familien Karmas", description_en: "Heal family karmic patterns that are holding you back. Workshop in German.", description_de: "Familiäre karmische Muster heilen, die dich zurückhalten.", category: "Workshops", price: 2200, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/heilung-familienkarmas.png", featured: false, published: true, coming_soon: false },
  { slug: "individual-chakra-balancing", name_en: "Individual Chakra Balancing Session", name_de: "Individuelle Chakra-Balancing-Sitzung", description_en: "A personalised 1-on-1 chakra balancing session with Ruth Heinen. Book your unique session.", description_de: "Eine persönliche 1-zu-1 Chakra-Balancing-Sitzung mit Ruth Heinen.", category: "Chakra Balancing", price: 14400, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/individual-chakra-balancing.png", featured: false, published: true, coming_soon: false },
  { slug: "personalized-channeling", name_en: "Personalized Channeling", name_de: "Persönliches Channeling", description_en: "Receive personalised messages from your higher self and guides through Ruth's channeling gift.", description_de: "Empfange persönliche Botschaften von deinem höheren Selbst durch Ruths Channeling-Gabe.", category: "Channeling", price: 4400, currency: "EUR", stripe_price_id: null, file_path: null, thumbnail_url: "/images/products/personalized-channeling.png", featured: false, published: true, coming_soon: false },
];

(async () => {
  const { data: existing, error: fetchErr } = await supabase.from("products").select("slug");
  if (fetchErr) { console.error("Fetch error:", fetchErr.message); return; }
  const existingSlugs = new Set((existing ?? []).map((p) => p.slug));
  const toInsert = products.filter((p) => !existingSlugs.has(p.slug));
  if (toInsert.length === 0) { console.log("All products already in Supabase"); return; }
  const { error } = await supabase.from("products").insert(toInsert);
  if (error) console.error("Insert error:", error.message);
  else console.log(`Inserted ${toInsert.length} products into Supabase`);
})();