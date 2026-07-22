import { Language, Currency, Screen } from '../types';
import { translations } from '../data/translations';
import { ShoppingCart, Bell, Globe, Sun, Moon, DollarSign, Smartphone } from 'lucide-react';

interface TopNavBarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen, category?: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  cartCount: number;
}

export default function TopNavBar({
  currentScreen,
  setScreen,
  language,
  setLanguage,
  currency,
  setCurrency,
  isDarkMode,
  setIsDarkMode,
  cartCount,
}: TopNavBarProps) {
  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-surface-container-highest bg-background/80 backdrop-blur-md transition-all duration-300">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-4 max-w-7xl mx-auto">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setScreen('landing')}
          className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 rounded-xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:bg-primary-container/20 transition-all">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <span className="font-headline-md text-2xl font-bold tracking-tighter flex items-center gap-1">
            <span className="text-primary-container">{t.brand_first}</span>
            <span className="text-on-surface">{t.brand_second}</span>
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 items-center">
          <button 
            onClick={() => setScreen('repair')}
            className={`font-body-md text-base font-medium transition-all pb-1 border-b-2 hover:text-primary-container ${
              currentScreen === 'repair' 
                ? 'text-primary-container border-primary-container' 
                : 'text-on-surface border-transparent'
            }`}
          >
            {t.nav_repair}
          </button>
          <button 
            onClick={() => setScreen('catalog')}
            className={`font-body-md text-base font-medium transition-all pb-1 border-b-2 hover:text-primary-container ${
              currentScreen === 'catalog' 
                ? 'text-primary-container border-primary-container' 
                : 'text-on-surface border-transparent'
            }`}
          >
            {t.nav_catalog}
          </button>
          <button 
            onClick={() => {
              setScreen('catalog', 'parts');
            }}
            className="font-body-md text-base text-on-surface hover:text-primary-container transition-colors"
          >
            {t.nav_parts}
          </button>
          <button 
            onClick={() => {
              setScreen('catalog', 'tools');
            }}
            className="font-body-md text-base text-on-surface hover:text-primary-container transition-colors"
          >
            {t.nav_tools}
          </button>
        </div>

        {/* Dynamic Controls / Actions */}
        <div className="flex items-center gap-3">


          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="p-2 border border-outline-variant rounded-xl hover:border-primary-container hover:text-primary-container transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="Switch Language"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl border border-outline-variant hover:border-primary-container hover:text-primary-container transition-all active:scale-95 text-on-surface"
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Cart & Notify */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setScreen('checkout')}
              className="p-2 text-on-surface hover:text-primary-container hover:bg-surface-container-high rounded-full transition-colors relative"
              title={language === 'ar' ? 'سلة المشتريات والدفع' : 'Cart & Checkout'}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-container text-on-primary-container text-[10px] font-black px-1.5 py-0.5 rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="p-2 text-on-surface hover:text-primary-container hover:bg-surface-container-high rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
          </div>

          {/* Checkout CTA */}
          <button 
            onClick={() => setScreen('checkout')}
            className="hidden sm:block px-4 py-2 bg-primary-container text-on-primary-container rounded-xl font-medium hover:bg-opacity-90 active:scale-95 transition-all duration-100 text-sm cursor-pointer"
          >
            {language === 'ar' ? 'إتمام الشراء' : 'Checkout'}
          </button>
        </div>
      </div>
    </nav>
  );
}
