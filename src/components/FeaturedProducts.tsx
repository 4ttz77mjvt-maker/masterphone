import { Language, Currency, Screen, Product } from '../types';
import { translations } from '../data/translations';
import { ArrowLeft, ArrowRight, ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface FeaturedProductsProps {
  language: Language;
  currency: Currency;
  setScreen: (screen: Screen) => void;
  onAddToCart: (product: Product) => void;
  productsList: Product[];
  onViewDetails?: (product: Product) => void;
}

export default function FeaturedProducts({
  language,
  currency,
  setScreen,
  onAddToCart,
  productsList,
  onViewDetails,
}: FeaturedProductsProps) {
  const t = translations[language];

  // We show 4 products for the homepage from the stateful productsList
  const featured = productsList.slice(0, 4);

  // Currency Converter
  const formatPrice = (priceUsd: number) => {
    const dzdVal = Math.round(priceUsd * 220);
    return `${dzdVal.toLocaleString()} ${language === 'en' ? 'DZD' : 'د.ج'}`;
  };

  const getLabelTranslated = (condition: string) => {
    if (condition.toUpperCase() === 'REFURBISHED') return t.label_refurbished;
    if (condition.toUpperCase() === 'NEW') return t.label_new;
    if (condition.toUpperCase() === 'CERTIFIED') return t.label_certified;
    return condition.toUpperCase();
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight text-on-surface">
              {t.hardware_title}
            </h2>
            <p className="text-on-surface-variant text-base">
              {t.hardware_desc}
            </p>
          </div>
          
          {/* Action Carousel buttons - triggers catalog navigation */}
          <div className="flex gap-3">
            <button 
              onClick={() => setScreen('catalog')}
              className="p-3 border border-outline-variant rounded-full hover:bg-surface-container-high hover:border-primary-container/40 transition-colors cursor-pointer active:scale-90"
            >
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
            <button 
              onClick={() => setScreen('catalog')}
              className="p-3 border border-outline-variant rounded-full hover:bg-surface-container-high hover:border-primary-container/40 transition-colors cursor-pointer active:scale-90"
            >
              <ArrowRight className="w-5 h-5 text-on-surface" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((p) => (
            <div 
              key={p.id}
              className="group flex flex-col justify-between h-full bg-surface-container rounded-3xl border border-outline-variant/60 hover:border-primary-container/40 transition-all duration-300 p-5 overflow-hidden"
            >
              {/* Clickable Image + Info */}
              <div 
                onClick={() => onViewDetails?.(p)}
                className="cursor-pointer flex-1 flex flex-col"
              >
                {/* Product Visual Container */}
                <div className="relative bg-surface-container-lowest rounded-2xl aspect-[3/4] p-4 mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
                  
                  {/* Condition Badge */}
                  <div className="absolute top-3 left-3 bg-primary-container text-on-primary-container font-bold text-[10px] px-2.5 py-1 rounded tracking-wider uppercase z-10">
                    {getLabelTranslated(p.condition)}
                  </div>

                  {/* Rating badge */}
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-outline-variant/30 text-primary-container font-semibold text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5 z-10">
                    <Star className="w-3 h-3 fill-primary-container text-primary-container" />
                    <span>{p.rating}</span>
                  </div>

                  {/* Detail Hover Overlay */}
                  <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                    <span className="bg-primary-container text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg uppercase tracking-wide">
                      {language === 'en' ? 'Quick View' : 'عرض التفاصيل'}
                    </span>
                  </div>

                  <img 
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-0"
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Product Meta */}
                <div className="text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 text-on-surface group-hover:text-primary-container transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-on-surface-variant text-xs mb-3 font-medium">
                      {language === 'en' ? p.specEn : p.specAr}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/20 text-left">
                <span className="text-xl font-black text-primary-container">
                  {formatPrice(p.priceUsd)}
                </span>
                
                <button 
                  onClick={() => onAddToCart(p)}
                  className="p-2 bg-primary-container/10 text-primary-container rounded-xl hover:bg-primary-container hover:text-on-primary-container transition-all cursor-pointer active:scale-90"
                  title={t.btn_add_cart}
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
