import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

// ─── Full Local Product Catalog (using public/assets/) ────────────────────────
// Used as fallback when the API is unavailable (e.g., CORS in local dev)

const LOCAL_PRODUCTS = [
  // ── WOMEN – Dresses ──────────────────────────────────────────────────────
  {
    _id: 'w-dress-01',
    name: 'Premium Evening Gown',
    description: 'An elegant black evening gown with delicate mesh overlay. Perfect for formal events and special occasions.',
    price: 5999,
    image: ['/assets/BalckDressCoverpage.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-02',
    name: 'Blue Party Dress',
    description: 'Stunning blue party dress for special occasions. Modern cut with a comfortable fit.',
    price: 4499,
    image: ['/assets/bluecoverpage.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-03',
    name: 'Golden Elegant Wear',
    description: 'Beautiful golden dress with premium fabric. Turn heads at any event.',
    price: 5299,
    image: ['/assets/goldencoverpage.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-04',
    name: 'Chic Wrap Dress',
    description: 'Versatile wrap dress that flatters every figure. Available in multiple sizes.',
    price: 3799,
    image: ['/assets/woman/1175634002-202410-PP-0068.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-05',
    name: 'Floral Midi Dress',
    description: 'A flowy midi dress with a delicate print, perfect for any occasion.',
    price: 4199,
    image: ['/assets/woman/1193099004-202410-PP-0025.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-06',
    name: 'Satin Slip Dress',
    description: 'Luxurious satin slip dress for an effortlessly elegant look.',
    price: 4999,
    image: ['/assets/woman/1288739001-202502-PP-0573.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-07',
    name: 'Linen Summer Dress',
    description: 'Breezy linen dress for easy warm-weather styling.',
    price: 3199,
    image: ['/assets/woman/1288739002-202502-PP-0508.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-08',
    name: 'Asymmetric Hem Dress',
    description: 'Modern asymmetric hem dress for a bold fashion statement.',
    price: 4599,
    image: ['/assets/woman/1288742003-202502-PP-0584.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-09',
    name: 'Dance Collection Dress',
    description: 'H&M Move dance-inspired dress combining performance and style.',
    price: 3599,
    image: ['/assets/woman/HM-Move-Dance-collection-1285425005.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-10',
    name: 'Move Active Dress',
    description: 'Athletic-inspired dress designed for movement and comfort.',
    price: 2999,
    image: ['/assets/woman/HM-Move-Dance-collection-1294765004.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-11',
    name: 'Studio Dance Dress',
    description: 'Perfect from studio to street — a dancer\'s essential wardrobe piece.',
    price: 3299,
    image: ['/assets/woman/HM-Move-Dance-collection-1294765005.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },
  {
    _id: 'w-dress-12',
    name: 'Move Activewear Dress',
    description: 'Technical stretch fabric for maximum freedom of movement.',
    price: 3499,
    image: ['/assets/woman/HM-Move-Dance-collection-1294765006.jpg'],
    category: 'Women',
    subCategory: 'Dresses',
    isSold: false,
  },

  // ── WOMEN – Topwear ───────────────────────────────────────────────────────
  {
    _id: 'w-top-01',
    name: 'Casual V-Neck Top',
    description: 'Comfortable everyday wear top for women. A wardrobe staple.',
    price: 1499,
    image: ['/assets/coverpageimg.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-02',
    name: 'Ribbed Long-Sleeve Top',
    description: 'Fitted ribbed top perfect for layering or wearing alone.',
    price: 1299,
    image: ['/assets/woman/1256115001-202410-PP-0063.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-03',
    name: 'Classic White Shirt',
    description: 'A wardrobe staple. Crisp, clean, versatile white shirt.',
    price: 1799,
    image: ['/assets/woman/1283780001-202502-PP-0065.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-04',
    name: 'Satin Finish Blouse',
    description: 'Elegant satin blouse with a graceful drape for any occasion.',
    price: 2299,
    image: ['/assets/woman/1309077001-202502-PP-0078.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-05',
    name: 'Casual Wrap Blouse',
    description: 'Easy-to-wear wrap blouse that transitions from work to weekend.',
    price: 1899,
    image: ['/assets/woman/1297694004-202502-PP-0092.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-06',
    name: 'Cropped Cord Shirt',
    description: 'On-trend corduroy cropped shirt for a casual but stylish look.',
    price: 2099,
    image: ['/assets/woman/1306623001-202502-PP-0010.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-07',
    name: 'Boxy Cotton Tee',
    description: 'Relaxed boxy fit tee made from premium organic cotton.',
    price: 999,
    image: ['/assets/woman/1308249001-202502-PP-0068.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-08',
    name: 'Open-Back Knit Top',
    description: 'Elegant open-back knit top, perfect for evenings out.',
    price: 2599,
    image: ['/assets/woman/1309054001-202502-PP-001.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-09',
    name: 'Printed Graphic Tee',
    description: 'Statement graphic tee with artistic print. A casual must-have.',
    price: 1199,
    image: ['/assets/woman/1309068001-202502-PP-0049.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-10',
    name: 'Lightweight Linen Shirt',
    description: 'Breathable linen shirt ideal for warm days.',
    price: 1999,
    image: ['/assets/woman/1309080001-202502-PP-0110.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-11',
    name: 'Off-Shoulder Cotton Top',
    description: 'Flirty off-shoulder top made from soft cotton blend.',
    price: 1699,
    image: ['/assets/woman/1309085001-202502-PP-0029.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-12',
    name: 'Ruched Side Top',
    description: 'Trendy ruched side detail top for an effortlessly chic look.',
    price: 1499,
    image: ['/assets/woman/1309086001-202502-PP-0036.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-13',
    name: 'Puff Sleeve Blouse',
    description: 'Romantic puff sleeve blouse with a feminine aesthetic.',
    price: 2199,
    image: ['/assets/woman/1311132001-202502-PP-0077.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-14',
    name: 'Dance Move Active Top',
    description: 'Sporty active top from the H&M Move Dance collection.',
    price: 1599,
    image: ['/assets/woman/HM-Move-Dance-collection-1302767003.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-top-15',
    name: 'Fitted Studio Top',
    description: 'Slim-fit top designed for the studio or the street.',
    price: 1399,
    image: ['/assets/woman/2002-GENE-PR-Portrait-A4-Stills-AdobeRGB-300ppi-10.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },

  // ── WOMEN – Trousers ──────────────────────────────────────────────────────
  {
    _id: 'w-trousers-01',
    name: 'Wide-Leg Tailored Trousers',
    description: 'Sophisticated wide-leg trousers for a sharp, modern look.',
    price: 2999,
    image: ['/assets/womantrousers/1313746002-202502-PP-0036.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },
  {
    _id: 'w-trousers-02',
    name: 'Straight Fit Suit Pants',
    description: 'Classic straight fit pants, ideal for the office or smart casual looks.',
    price: 2599,
    image: ['/assets/womantrousers/1317761001-202502-PP-0075.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },
  {
    _id: 'w-trousers-03',
    name: 'High-Waisted Culottes',
    description: 'Trendy high-waisted culottes offering comfort and style.',
    price: 2299,
    image: ['/assets/womantrousers/1319643001-202502-PP-0103.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },
  {
    _id: 'w-trousers-04',
    name: 'Relaxed Fit Cargo Pants',
    description: 'Casual utility-inspired cargo pants with ample pocket space.',
    price: 2799,
    image: ['/assets/womantrousers/1321044001-202502-PP-0064.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },
  {
    _id: 'w-trousers-05',
    name: 'Palazzo Trousers',
    description: 'Flowing palazzo trousers for an elegant silhouette.',
    price: 2499,
    image: ['/assets/womantrousers/1305816001-202502-PP-0046.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },
  {
    _id: 'w-trousers-06',
    name: 'Pleated Wide Trousers',
    description: 'Smart pleated wide-leg trousers with a tailored finish.',
    price: 3199,
    image: ['/assets/womantrousers/1320293001-202502-PP-0519.jpg'],
    category: 'Women',
    subCategory: 'Trousers',
    isSold: false,
  },

  // ── WOMEN – Winter ────────────────────────────────────────────────────────
  {
    _id: 'w-winter-01',
    name: 'Women\'s Down Puffer Jacket',
    description: 'Warm and stylish red down puffer jacket for the coldest days.',
    price: 5999,
    image: ['/assets/winter/women red puffer.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-winter-02',
    name: 'Oversized Wool Coat',
    description: 'Luxurious oversized wool-blend coat for cold-weather elegance.',
    price: 7499,
    image: ['/assets/winter/1295898001-202502-PP-0024.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-winter-03',
    name: 'Padded Long Jacket',
    description: 'Full-length padded jacket offering maximum warmth and style.',
    price: 6499,
    image: ['/assets/winter/1302639002-202502-PP-0101.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },
  {
    _id: 'w-winter-04',
    name: 'Quilted Puffer Coat',
    description: 'Lightweight quilted puffer coat with a chic finish.',
    price: 5499,
    image: ['/assets/winter/1313857001-202502-PP-0155.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },

  // ── WOMEN – Accessories ───────────────────────────────────────────────────
  {
    _id: 'w-acc-01',
    name: 'Statement Drop Earrings',
    description: 'Bold drop earrings that elevate any outfit instantly.',
    price: 799,
    image: ['/assets/earings/1319782001-202502-PP-0084.jpg'],
    category: 'Women',
    subCategory: 'Topwear',
    isSold: false,
  },

  // ── MEN – Winterwear ──────────────────────────────────────────────────────
  {
    _id: 'm-winter-01',
    name: 'Winter Atelier Coat',
    description: 'Premium winter atelier coat for men. Stay warm and stylish.',
    price: 14999,
    image: ['/assets/men/HMAtelierWinter.jpg'],
    category: 'Men',
    subCategory: 'Winterwear',
    isSold: false,
  },
  {
    _id: 'm-winter-02',
    name: 'Men\'s Puffer Vest',
    description: 'Lightweight insulated puffer vest for layered winter looks.',
    price: 3999,
    image: ['/assets/men/1315979001-202502-PP-0149.jpg'],
    category: 'Men',
    subCategory: 'Winterwear',
    isSold: false,
  },

  // ── MEN – Jackets ─────────────────────────────────────────────────────────
  {
    _id: 'm-jacket-01',
    name: 'Leather Atelier Jacket',
    description: 'High-quality leather jacket from our Winter Atelier collection.',
    price: 17499,
    image: ['/assets/men/HMLeatherAtelierWinter.jpg'],
    category: 'Men',
    subCategory: 'Jackets',
    isSold: false,
  },
  {
    _id: 'm-jacket-02',
    name: 'Lightweight Bomber Jacket',
    description: 'A modern bomber jacket with a relaxed fit. Versatile and cool.',
    price: 5999,
    image: ['/assets/men/1318859001-202502-PP-0069.jpg'],
    category: 'Men',
    subCategory: 'Jackets',
    isSold: false,
  },
  {
    _id: 'm-jacket-03',
    name: 'Denim Trucker Jacket',
    description: 'Classic denim trucker jacket — a timeless wardrobe essential.',
    price: 4999,
    image: ['/assets/men/1318862001-202502-PP-0103.jpg'],
    category: 'Men',
    subCategory: 'Jackets',
    isSold: false,
  },
  {
    _id: 'm-jacket-04',
    name: 'Quilted Puffer Jacket',
    description: 'Packable quilted puffer jacket with a sleek sporty look.',
    price: 6999,
    image: ['/assets/men/1318864001-202502-PP-0123.jpg'],
    category: 'Men',
    subCategory: 'Jackets',
    isSold: false,
  },

  // ── MEN – Running ─────────────────────────────────────────────────────────
  {
    _id: 'm-run-01',
    name: 'Move Running Top',
    description: 'Breathable, moisture-wicking top for your everyday runs.',
    price: 2999,
    image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1291853001.jpg'],
    category: 'Men',
    subCategory: 'Running',
    isSold: false,
  },
  {
    _id: 'm-run-02',
    name: 'Move Active Jacket',
    description: 'Lightweight zip-up jacket designed for athletic performance.',
    price: 4499,
    image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1291853002.jpg'],
    category: 'Men',
    subCategory: 'Running',
    isSold: false,
  },
  {
    _id: 'm-run-03',
    name: 'Move Performance Tee',
    description: 'Premium fabric tee that keeps you cool during intense workouts.',
    price: 1999,
    image: ['/assets/men/sports/HM-Move-Mens-running-AW25-1298916001.jpg'],
    category: 'Men',
    subCategory: 'Running',
    isSold: false,
  },

  // ── MEN – Shorts ──────────────────────────────────────────────────────────
  {
    _id: 'm-shorts-01',
    name: 'Move Running Shorts',
    description: 'Comfortable fit running shorts with inner brief and secure pockets.',
    price: 1799,
    image: ['/assets/men/sports/shorts/HM-Move-Mens-running-AW25-1255779002.jpg'],
    category: 'Men',
    subCategory: 'Shorts',
    isSold: false,
  },
  {
    _id: 'm-shorts-02',
    name: 'Move Training Shorts',
    description: 'Flexible athletic shorts suitable for the gym or the track.',
    price: 1599,
    image: ['/assets/men/sports/shorts/HM-Move-Mens-running-AW25-1299570001.jpg'],
    category: 'Men',
    subCategory: 'Shorts',
    isSold: false,
  },
];

export const ShopContextProvider = ({ children }) => {
  const [products, setProducts]   = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('cartItems');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch {
      return {};
    }
  });
  const [token, setToken]         = useState(localStorage.getItem('token') || '');
  const [user, setUser]           = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return null;
      const parsed = JSON.parse(storedUser);
      // Reject stale objects that have 'token' inside them (old bug) or have no name/email
      if (parsed?.token || (!parsed?.name && !parsed?.email)) {
        localStorage.removeItem('user');
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Sync cartItems with localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch Products — fall back to local catalog on CORS/network error
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://backend-agammaurya15-7047s-projects.vercel.app';
        const res  = await fetch(`${backendUrl}/api/products`);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(LOCAL_PRODUCTS);
        }
      } catch (error) {
        console.warn('API unavailable — using local product catalog.');
        setProducts(LOCAL_PRODUCTS);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (itemId, size) => {
    setCartItems(prev => {
      const cart = structuredClone(prev);
      if (!cart[itemId]) cart[itemId] = {};
      cart[itemId][size] = (cart[itemId][size] || 0) + 1;
      return cart;
    });
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems(prev => {
      const cart = structuredClone(prev);
      if (quantity <= 0) {
        delete cart[itemId]?.[size];
      } else {
        if (!cart[itemId]) cart[itemId] = {};
        cart[itemId][size] = quantity;
      }
      return cart;
    });
  };

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          total += product.price * cartItems[itemId][size];
        }
      }
    }
    return total;
  };

  const getCartCount = () => {
    let count = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) count += cartItems[itemId][size];
      }
    }
    return count;
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem('cartItems');
  };

  const value = {
    products,
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    getCartAmount,
    getCartCount,
    clearCart,
    token,
    setToken,
    user,
    setUser,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};
