import { useState, useEffect } from 'react';
import { Screen, Language, Currency, RepairTicket, InventoryAlert, Product, CartItem, Order } from './types';
import { products as defaultProducts } from './data/products';
import TopNavBar from './components/TopNavBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import FeaturedProducts from './components/FeaturedProducts';
import DiagnosticCTA from './components/DiagnosticCTA';
import BookRepairFlow from './components/BookRepairFlow';
import ProductCatalog from './components/ProductCatalog';
import CheckoutFlow from './components/CheckoutFlow';
import OpsDashboard from './components/OpsDashboard';
import Footer from './components/Footer';
import ProductDetailsModal from './components/ProductDetailsModal';

export default function App() {
  // Core UI/State
  const [currentScreen, setScreen] = useState<Screen>('landing');
  const [catalogCategory, setCatalogCategory] = useState<string>('all');
  const [language, setLanguage] = useState<Language>('en');

  // Baridimob RIP and Contact Phones state
  const [ripNumber, setRipNumber] = useState<string>(() => {
    const saved = localStorage.getItem('mp_rip_number');
    return saved || '007999990023456789 23';
  });

  const [contactPhones, setContactPhones] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mp_contact_phones');
      return saved ? JSON.parse(saved) : ['0555 12 34 56', '0666 78 90 12'];
    } catch {
      return ['0555 12 34 56', '0666 78 90 12'];
    }
  });

  const [socialLinks, setSocialLinks] = useState<{ instagram: string; tiktok: string; facebook: string }>(() => {
    try {
      const saved = localStorage.getItem('mp_social_links');
      return saved ? JSON.parse(saved) : {
        instagram: 'https://instagram.com/dz_repair',
        tiktok: 'https://tiktok.com/@dz_repair',
        facebook: 'https://facebook.com/dz_repair'
      };
    } catch {
      return {
        instagram: 'https://instagram.com/dz_repair',
        tiktok: 'https://tiktok.com/@dz_repair',
        facebook: 'https://facebook.com/dz_repair'
      };
    }
  });

  const handleNavigate = (screen: Screen, category?: string) => {
    setScreen(screen);
    if (screen === 'catalog') {
      setCatalogCategory(category || 'all');
    }
  };
  const [currency, setCurrency] = useState<Currency>('DZD'); // Default to Algerian Dinar for local relevance!
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [cartToast, setCartToast] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Stateful Products list for full CRUD in dashboard (persists in localStorage)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('mp_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch {
      return defaultProducts;
    }
  });

  // Stateful Cart array (persists in localStorage)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mp_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Stateful Orders array (persists in localStorage)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('mp_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Initial Repair Tickets (Stateful so booking a repair appends to the queue live!)
  const [tickets, setTickets] = useState<RepairTicket[]>(() => {
    try {
      const saved = localStorage.getItem('mp_tickets');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: '#MP-9942',
        device: 'iPhone 14 Pro (Screen Damage)',
        deviceType: 'smartphone',
        customer: 'Yanis Win',
        wilayaCode: '16', // Algiers
        status: 'waiting',
        technician: 'Sarah J.',
      },
      {
        id: '#MP-9811',
        device: 'iPad Pro 11" (Battery Issues)',
        deviceType: 'tablet',
        customer: 'Sonia K.',
        wilayaCode: '31', // Oran
        status: 'completed',
        technician: 'Mourad A.',
      },
      {
        id: '#MP-1045',
        device: 'Galaxy S24 Ultra (Water Damage)',
        deviceType: 'smartphone',
        customer: 'Amin B.',
        wilayaCode: '25', // Constantine
        status: 'diagnostic',
        technician: 'Amine K.',
      },
    ];
  });

  // Initial Inventory parts state (Stateful so restocking resolves alerts live!)
  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>(() => {
    try {
      const saved = localStorage.getItem('mp_inventory');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'inv-1',
        partName: 'iPhone 15 Pro OLED Panel',
        stock: 2,
        criticalLimit: 5,
      },
      {
        id: 'inv-2',
        partName: 'S24 Ultra Li-ion Replacement Battery',
        stock: 4,
        criticalLimit: 8,
      },
      {
        id: 'inv-3',
        partName: 'Pixel 8 Pro Charging Port Flex',
        stock: 1,
        criticalLimit: 3,
      },
    ];
  });

  // Derived state: Cart items count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Sync states to localStorage
  useEffect(() => {
    localStorage.setItem('mp_products', JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem('mp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('mp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mp_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('mp_inventory', JSON.stringify(inventoryAlerts));
  }, [inventoryAlerts]);

  useEffect(() => {
    localStorage.setItem('mp_rip_number', ripNumber);
  }, [ripNumber]);

  useEffect(() => {
    localStorage.setItem('mp_contact_phones', JSON.stringify(contactPhones));
  }, [contactPhones]);

  useEffect(() => {
    localStorage.setItem('mp_social_links', JSON.stringify(socialLinks));
  }, [socialLinks]);

  // Handle document language RTL support
  useEffect(() => {
    const htmlDoc = document.documentElement;
    if (language === 'ar') {
      htmlDoc.dir = 'rtl';
      htmlDoc.lang = 'ar';
    } else {
      htmlDoc.dir = 'ltr';
      htmlDoc.lang = 'en';
    }
  }, [language]);

  // Actions
  const handleAddTicket = (newTkt: RepairTicket) => {
    setTickets((prev) => [newTkt, ...prev]);
  };

  const handleChangeTicketStatus = (id: string, newStatus: 'diagnostic' | 'waiting' | 'completed') => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleRestockPart = (id: string) => {
    setInventoryAlerts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: 12 } : p)) // restocks to 12
    );
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    setCartToast(language === 'en' ? `Added ${product.name} to cart!` : `تمت إضافة ${product.name} للسلة!`);
    
    // Clear toast
    setTimeout(() => {
      setCartToast(null);
    }, 2500);
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Order Placement
  const handlePlaceOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleChangeOrderStatus = (id: string, newStatus: 'pending' | 'shipped' | 'delivered') => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
  };

  // Product CRUD
  const handleAddProduct = (newProd: Product) => {
    setProductsList((prev) => [newProd, ...prev]);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === updatedProd.id ? updatedProd : p))
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
  };

  // Scroll to top on screen transitions
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-background text-on-surface app-dark' 
        : 'bg-stone-50 text-stone-900 app-light'
    }`}>
      {/* Dynamic Top Navigation Header */}
      <TopNavBar
        currentScreen={currentScreen}
        setScreen={handleNavigate}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        cartCount={cartCount}
      />

      {/* Main Content Area framed by padded container for visual balance */}
      <main className="pt-24 min-h-[75vh]">
        
        {/* LANDING HOMEPAGE SCREEN */}
        {currentScreen === 'landing' && (
          <div className="space-y-4">
            <HeroSection language={language} setScreen={setScreen} />
            <FeaturesSection language={language} />
            <FeaturedProducts 
              language={language} 
              currency={currency} 
              setScreen={setScreen} 
              onAddToCart={handleAddToCart} 
              productsList={productsList}
              onViewDetails={setSelectedProduct}
            />
            <DiagnosticCTA language={language} setScreen={setScreen} />

            {/* Elegant Dynamic Contact Section */}
            <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
              <div className="bg-surface-container/60 border border-outline-variant/20 rounded-3xl p-8 flex flex-col lg:flex-row gap-8 justify-between items-center relative overflow-hidden">
                <div className="space-y-3 max-w-xl text-left">
                  <span className="text-[10px] font-black tracking-widest text-primary-container uppercase bg-primary-container/10 border border-primary-container/20 px-2.5 py-1 rounded">
                    {language === 'ar' ? 'اتصل بنا ودعم العملاء' : 'CONTACT & SUPPORT'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                    {language === 'ar' ? 'هل لديك أي استفسار؟ نحن هنا لخدمتك' : 'Have any questions? We are here to help'}
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    {language === 'ar' 
                      ? 'تواصل معنا مباشرة عبر الأرقام الهاتفية الرسمية لخدمة العملاء والدعم الفني السريع.' 
                      : 'Reach out to our team directly through our official customer support phone lines.'}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  {contactPhones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="bg-surface-container-highest/60 hover:bg-primary-container hover:text-white border border-outline-variant/40 rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-105 shadow font-mono text-base font-black text-white cursor-pointer"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-container/10 flex items-center justify-center text-primary-container hover:bg-white/20 hover:text-white transition-colors">
                        📞
                      </div>
                      <div className="text-left">
                        <span className="text-[9px] block text-on-surface-variant font-sans uppercase font-extrabold">
                          {language === 'ar' ? `خط التواصل #${index + 1}` : `SUPPORT LINE #${index + 1}`}
                        </span>
                        <span>{phone}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* BOOK REPAIR WIZARD SCREEN */}
        {currentScreen === 'repair' && (
          <BookRepairFlow
            language={language}
            currency={currency}
            onAddTicket={handleAddTicket}
            setScreen={setScreen}
          />
        )}

        {/* SHOP PRODUCT CATALOG SCREEN */}
        {currentScreen === 'catalog' && (
          <ProductCatalog
            language={language}
            currency={currency}
            onAddToCart={handleAddToCart}
            cartToast={cartToast}
            productsList={productsList}
            activeCategory={catalogCategory}
            setActiveCategory={setCatalogCategory}
            onViewDetails={setSelectedProduct}
          />
        )}

        {/* SECURE CHECKOUT FLOW SCREEN */}
        {currentScreen === 'checkout' && (
          <CheckoutFlow
            language={language}
            currency={currency}
            cart={cart}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            setScreen={setScreen}
            ripNumber={ripNumber}
          />
        )}

        {/* OPERATIONS ADMIN DASHBOARD SCREEN */}
        {currentScreen === 'dashboard' && (
          <OpsDashboard
            language={language}
            currency={currency}
            tickets={tickets}
            onChangeTicketStatus={handleChangeTicketStatus}
            onRestockPart={handleRestockPart}
            inventoryAlerts={inventoryAlerts}
            productsList={productsList}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onChangeOrderStatus={handleChangeOrderStatus}
            ripNumber={ripNumber}
            setRipNumber={setRipNumber}
            contactPhones={contactPhones}
            setContactPhones={setContactPhones}
            socialLinks={socialLinks}
            setSocialLinks={setSocialLinks}
          />
        )}

      </main>

      {/* Product Details Modal Overlay */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          language={language}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Premium Global Footer */}
      <Footer language={language} setScreen={handleNavigate} contactPhones={contactPhones} socialLinks={socialLinks} />
    </div>
  );
}
