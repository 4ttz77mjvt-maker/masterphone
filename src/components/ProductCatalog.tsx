import { useState } from 'react';
import { Language, Currency, Product } from '../types';
import { translations } from '../data/translations';
import { Star, ShoppingCart, SlidersHorizontal, Search, RotateCcw, ShieldCheck, Check } from 'lucide-react';

interface ProductCatalogProps {
  language: Language;
  currency: Currency;
  onAddToCart: (product: Product) => void;
  cartToast: string | null;
  productsList: Product[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCatalog({
  language,
  currency,
  onAddToCart,
  cartToast,
  productsList,
  activeCategory,
  setActiveCategory,
  onViewDetails,
}: ProductCatalogProps) {
  const t = translations[language];

  // Filters State
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const categories = [
    { id: 'all', label: t.cat_all },
    { id: 'smartphones', label: language === 'en' ? 'Flagships' : 'الهواتف الرائدة' },
    { id: 'refurbished', label: t.nav_repair + ' / ' + t.label_refurbished },
    { id: 'parts', label: t.nav_parts },
    { id: 'tools', label: t.nav_tools },
  ];

  const formatPrice = (priceUsd: number) => {
    const dzdVal = Math.round(priceUsd * 220);
    return `${dzdVal.toLocaleString()} ${language === 'en' ? 'DZD' : 'د.ج'}`;
  };

  const getLabelTranslated = (condition: string) => {
    const uc = condition.toUpperCase();
    if (uc === 'REFURBISHED') return t.label_refurbished;
    if (uc === 'NEW') return t.label_new;
    if (uc === 'CERTIFIED' || uc === 'CERTIFIED A+') return t.label_certified;
    if (uc === 'HIGH CAP') return t.label_high_cap;
    if (uc === 'OEM QUALITY') return t.label_oem_quality;
    if (uc === 'PRO TOOLSET') return t.label_pro_toolset;
    return uc;
  };

  // Filter & Sort Logic
  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
    const matchesCondition = selectedCondition === 'all' || 
      (selectedCondition === 'new' && p.condition.toLowerCase() === 'new') ||
      (selectedCondition === 'refurbished' && (p.condition.toLowerCase().includes('refurbished') || p.condition.toLowerCase().includes('certified')));
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.specEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.specAr.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesBrand && matchesCondition && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.priceUsd - b.priceUsd;
    if (sortBy === 'high-low') return b.priceUsd - a.priceUsd;
    return b.rating - a.rating; // Default recommended = rating desc
  });

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedBrand('all');
    setSelectedCondition('all');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 text-left">
      
      {/* Search Header Banner */}
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-on-surface mb-3">
          {t.cat_title}
        </h1>
        <p className="text-on-surface-variant text-sm md:text-base max-w-3xl leading-relaxed">
          {t.cat_desc}
        </p>
      </div>

      {/* Cart Toast Notification Feedback */}
      {cartToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-green-600 text-white font-bold text-sm px-6 py-4 rounded-xl flex items-center gap-3 shadow-lg animate-bounce border border-green-500">
          <Check className="w-5 h-5 text-white" />
          <span>{cartToast}</span>
        </div>
      )}

      {/* Grid Filter Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Sidebar Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant space-y-6">
            <div className="flex justify-between items-center border-b border-outline-variant/30 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary-container" />
                {t.cat_filters}
              </span>
              <button 
                onClick={handleResetFilters}
                className="text-[10px] uppercase font-bold text-primary-container hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'en' ? 'Reset' : 'إعادة تعيين'}</span>
              </button>
            </div>

            {/* Live Search */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                {language === 'en' ? 'Search Products' : 'البحث في المنتجات'}
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'en' ? 'Type model, parts...' : 'ابحث عن هاتف أو قطعة غيار...'}
                  className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl px-4 py-3 text-xs text-on-surface outline-none focus:border-primary-container font-semibold"
                />
                <Search className="w-4 h-4 text-on-surface-variant/70 absolute right-3.5 top-3.5" />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                {t.cat_brand}
              </label>
              <div className="flex flex-col gap-2">
                {['all', 'Apple', 'Samsung', 'Google'].map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(brand)}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedBrand === brand 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-surface-container-highest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant'
                    }`}
                  >
                    {brand === 'all' ? t.cat_all : brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                {t.cat_condition}
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { id: 'all', label: t.cat_all },
                  { id: 'new', label: t.cat_brand_new },
                  { id: 'refurbished', label: t.cat_refurbished_ap }
                ].map((cond) => (
                  <button
                    key={cond.id}
                    onClick={() => setSelectedCondition(cond.id)}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      selectedCondition === cond.id 
                        ? 'bg-primary-container text-on-primary-container' 
                        : 'bg-surface-container-highest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface-variant'
                    }`}
                  >
                    {cond.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Warranty tag inside filter sidebar */}
            <div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-4 flex gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-container shrink-0 mt-0.5" />
              <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed">
                {language === 'en' 
                  ? 'All listed flagships pass our certified 45-point hardware diagnostic test.' 
                  : 'تخضع جميع الهواتف المعروضة لاختبار فني دقيق من 45 نقطة قبل الاعتماد.'}
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Grid List */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Quick Category tabs & sorting */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-b border-outline-variant/20 pb-4">
            
            {/* Horizontal Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === tab.id 
                      ? 'bg-primary-container text-on-primary-container shadow-md' 
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-on-surface-variant whitespace-nowrap">
                {t.cat_sort}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface-container border border-outline-variant rounded-lg px-3 py-1.5 text-xs text-on-surface focus:border-primary-container outline-none font-bold cursor-pointer"
              >
                <option value="recommended">{t.cat_sort_recommended}</option>
                <option value="low-high">{t.cat_sort_low_high}</option>
                <option value="high-low">{t.cat_sort_high_low}</option>
              </select>
            </div>

          </div>

          {/* Catalog products grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((p) => (
                <div 
                  key={p.id}
                  className="group flex flex-col justify-between h-full bg-surface-container rounded-2xl border border-outline-variant/60 hover:border-primary-container/40 transition-all duration-300 p-4 relative"
                >
                  {/* Clickable Image + Info */}
                  <div 
                    onClick={() => onViewDetails?.(p)}
                    className="cursor-pointer flex-1 flex flex-col"
                  >
                    {/* Image container */}
                    <div className="relative bg-surface-container-lowest rounded-xl aspect-[4/3] p-4 mb-4 flex items-center justify-center border border-outline-variant/20 overflow-hidden">
                      <div className="absolute top-2 left-2 bg-primary-container text-on-primary-container font-bold text-[9px] px-2 py-0.5 rounded uppercase tracking-wider z-10">
                        {getLabelTranslated(p.condition)}
                      </div>
                      
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md border border-outline-variant/30 text-primary-container font-semibold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-0.5 z-10">
                        <Star className="w-2.5 h-2.5 fill-primary-container text-primary-container" />
                        <span>{p.rating}</span>
                      </div>

                      {/* Detail Hover Overlay */}
                      <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <span className="bg-primary-container text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg uppercase tracking-wide">
                          {language === 'en' ? 'Quick View' : 'عرض التفاصيل'}
                        </span>
                      </div>

                      <img 
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 relative z-0" 
                        src={p.image} 
                        alt={p.name}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Info details */}
                    <div className="flex-1 flex flex-col justify-between text-left">
                      <div>
                        <h3 className="text-base font-bold text-on-surface group-hover:text-primary-container transition-colors">
                          {p.name}
                        </h3>
                        <p className="text-[11px] text-on-surface-variant font-medium mt-1">
                          {language === 'en' ? p.specEn : p.specAr}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Row */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-outline-variant/20 text-left">
                    <span className="text-lg font-black text-primary-container">
                      {formatPrice(p.priceUsd)}
                    </span>

                    <button
                      onClick={() => onAddToCart(p)}
                      className="px-3 py-1.5 bg-primary-container/15 hover:bg-primary-container hover:text-on-primary-container text-primary-container rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Add' : 'إضافة'}</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-surface-container rounded-2xl border border-outline-variant/40 space-y-4">
              <p className="text-on-surface-variant font-medium text-sm md:text-base">
                {language === 'en' ? 'No products matched your criteria.' : 'لم يتم العثور على أي منتج يطابق خيارات التصفية الحالية.'}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-primary-container text-on-primary-container rounded-xl font-bold text-xs hover:scale-105 transition-transform cursor-pointer"
              >
                {language === 'en' ? 'Clear Filters' : 'مسح الفلاتر'}
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
