// One-time bootstrap catalogue for the Product collection. This is NOT read at
// runtime by the app — it only exists so `npm run seed` can populate MongoDB,
// after which the database is the single source of truth and the Admin panel
// manages everything. Safe to edit/extend or delete once you have real data.

export const SEED_PRODUCTS = [
  // ---- Single stems (transparent images used by the bouquet builder) ----
  { name: 'Rose', price: 80, category: 'Anniversary', stock: 40, image: '/image/products/image1.png', description: 'A timeless red rose, hand-picked at dawn — the classic way to say it all.' },
  { name: 'Pink Rose', price: 100, category: 'Anniversary', stock: 35, image: '/image/products/image2.png', description: 'A soft blush rose full of gentle romance and grace.' },
  { name: 'White Rose', price: 100, category: 'Anniversary', stock: 30, image: '/image/products/image3.png', description: 'A pure white rose symbolising elegance and new beginnings.' },
  { name: 'Chrysanthemum', price: 60, category: 'Decoration', stock: 50, image: '/image/products/image4.png', description: 'A full, cheerful chrysanthemum that adds warmth to any arrangement.' },
  { name: 'Sunflower', price: 280, category: 'Birthday', stock: 22, image: '/image/products/image5.png', description: 'Bright and sunny, a bloom that keeps smiling all week long.' },
  { name: 'Carnation', price: 60, category: 'Decoration', stock: 45, image: '/image/products/image6.png', description: 'Ruffled, long-lasting carnations in a delicate two-tone finish.' },
  { name: 'Gerbera', price: 60, category: 'Birthday', stock: 38, image: '/image/products/image7.png', description: 'Playful gerbera daisies bursting with colour and joy.' },
  { name: 'Lily', price: 500, category: 'Decoration', stock: 18, image: '/image/products/image8.png', description: 'Elegant, fragrant lilies for a truly special occasion.' },

  // ---- Birthday bouquets ----
  { name: 'Birthday Blush', price: 350, category: 'Birthday', stock: 18, image: '/image/products/birthday.jpg', description: 'A soft, pretty bouquet in blush tones to make their birthday extra special.' },
  { name: 'Confetti Blooms', price: 420, category: 'Birthday', stock: 12, image: '/image/products/birthday1.jpg', description: 'A playful burst of colourful blooms, as festive as a party popper.' },
  { name: 'Celebration Bouquet', price: 500, category: 'Birthday', stock: 9, image: '/image/products/birthday2.jpg', description: 'A generous mix of bright flowers built for cheering on another year.' },
  { name: 'Party Petals', price: 300, category: 'Birthday', stock: 22, image: '/image/products/birthday3.jpg', description: 'Cheerful petals in happy hues that bring the party mood to any room.' },
  { name: 'Birthday Sunshine', price: 380, category: 'Birthday', stock: 16, image: '/image/products/birthday4.jpg', description: 'Warm, sunny blooms that wish someone a bright and beautiful day.' },
  { name: 'Sweet Surprise', price: 450, category: 'Birthday', stock: 6, image: '/image/products/birthday5.jpg', description: 'A delightful surprise arrangement for the sweetest of birthdays.' },
  { name: 'Joyful Jubilee', price: 540, category: 'Birthday', stock: 7, image: '/image/products/birthday6.jpg', description: 'A jubilant bouquet overflowing with joy for a milestone celebration.' },
  { name: 'Festive Fuchsia', price: 330, category: 'Birthday', stock: 19, image: '/image/products/birthday7.jpg', description: 'Bold fuchsia blooms that make a vibrant, unforgettable statement.' },
  { name: 'Birthday Bloom Box', price: 600, category: 'Birthday', stock: 5, image: '/image/products/birthday8.jpg', description: 'A luxe box of hand-tied blooms — a birthday gift that truly wows.' },
  { name: 'Cheerful Charm', price: 290, category: 'Birthday', stock: 24, image: '/image/products/birthday9.jpg', description: 'A charming little bunch to add a cheerful sparkle to their day.' },
  { name: 'Wish Bouquet', price: 410, category: 'Birthday', stock: 11, image: '/image/products/birthday10.jpg', description: 'A dreamy bouquet crafted for birthday wishes come true.' },
  { name: 'Rosy Celebration', price: 470, category: 'Anniversary', stock: 8, image: '/image/products/birthday11.jpg', description: 'Romantic roses arranged to celebrate someone you adore.' },
  { name: 'Pink Fiesta', price: 400, category: 'Birthday', stock: 13, image: '/image/products/birthday13.jpg', description: 'A fiesta of pink blossoms bursting with birthday energy.' },
  { name: 'Golden Wishes', price: 520, category: 'Anniversary', stock: 6, image: '/image/products/birthday14.jpg', description: 'Golden-toned blooms to send warm, glowing wishes.' },
  { name: 'Birthday Blossoms', price: 340, category: 'Birthday', stock: 17, image: '/image/products/birthday15.jpg', description: 'A fresh gathering of seasonal blossoms to make their birthday bloom.' },

  // ---- Classic / decoration ----
  { name: 'Lotus', price: 120, category: 'Decoration', stock: 15, image: '/image/products/lotus.jpg', description: 'A serene lotus, symbol of calm and beauty, for a peaceful space.' },
  { name: 'Mixed Bunch', price: 90, category: 'Anniversary', stock: 20, image: '/image/products/mixed.jpg', description: 'A florist-curated mix of seasonal blooms, effortlessly elegant.' },
  { name: 'Hibiscus', price: 50, category: 'Decoration', stock: 26, image: '/image/products/hibiscus.jpg', description: 'Vivid hibiscus flowers that add a tropical, exotic accent.' },
  { name: 'Tulip', price: 60, category: 'Birthday', stock: 30, image: '/image/products/tulip.jpg', description: 'Bright, cheerful tulips that bring a burst of colour to any room.' },
];
