import { useState } from 'react';
import { Language, Product } from '../types';
import { X, Star, ShoppingCart, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

interface ProductDetailsModalProps {
  product: Product;
  language: Language;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailsModal({
  product,
  language,
  onClose,
  onAddToCart,
}: ProductDetailsModalProps) {
  const t = translations[language];
  const [added, setAdded] = useState(false);

  // Fallback to primary image if images is empty or undefined
  const allImages = product.images && product.images.length > 0 
    ? [product.image, ...product.images] 
    : [product.image];

  const [activeImage, setActiveImage] = useState(allImages[0]);

  // Pricing conversion
  const formatPrice = (priceUsd: number) => {
    const dzdVal = Math.round(priceUsd * 220);
    return `${dzdVal.toLocaleString()} ${language === 'en' ? 'DZD' : 'د.ج'}`;
  };

  const getLabelTranslated = (condition: string) => {
    if (condition.toUpperCase() === 'REFURBISHED') return t.label_refurbished;
    if (condition.toUpperCase() === 'NEW') return t.label_new;
    if (condition.toUpperCase() === 'CERTIFIED' || condition.toUpperCase() === 'CERTIFIED A+') return t.label_certified || 'درجة أولى';
    if (condition.toUpperCase() === 'PRE-OWNED') return language === 'ar' ? 'مستعمل نظيف' : 'PRE-OWNED';
    if (condition.toUpperCase() === 'OEM QUALITY') return t.label_oem_quality || 'جودة أصلية';
    if (condition.toUpperCase() === 'PRO TOOLSET') return t.label_pro_toolset || 'طقم احترافي';
    if (condition.toUpperCase() === 'HIGH CAP') return t.label_high_cap || 'قدرة عالية';
    return condition;
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-surface-container border border-outline-variant/60 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-8 max-h-[90vh] md:max-h-none overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-surface-container-highest hover:bg-primary-container hover:text-white text-on-surface-variant transition-all cursor-pointer z-20"
          title={language === 'en' ? 'Close' : 'إغلاق'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Visual Gallery */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="relative bg-surface-container-lowest rounded-2xl aspect-[4/3] p-6 flex items-center justify-center border border-outline-variant/30 select-none overflow-hidden group">
            {/* Condition Badge */}
            <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container font-bold text-xs px-3 py-1 rounded-lg tracking-wider uppercase z-10">
              {getLabelTranslated(product.condition)}
            </div>

            {/* Rating */}
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md border border-outline-variant/30 text-primary-container font-semibold text-xs px-2.5 py-1 rounded-full flex items-center gap-1 z-10">
              <Star className="w-3.5 h-3.5 fill-primary-container text-primary-container" />
              <span>{product.rating}</span>
            </div>

            <img
              src={activeImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain transition-all duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Thumbnails list if there is more than 1 image */}
          {allImages.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center py-1">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 p-1 rounded-xl bg-surface-container-lowest border-2 transition-all cursor-pointer overflow-hidden flex items-center justify-center ${
                    activeImage === img 
                      ? 'border-primary-container scale-105 shadow' 
                      : 'border-outline-variant/30 hover:border-outline-variant'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Specs & Purchase */}
        <div className="flex-1 flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-primary-container uppercase">
                {product.brand}
              </span>
              <h2 className="text-2xl md:text-3xl font-black mt-1 text-on-surface tracking-tight">
                {product.name}
              </h2>
            </div>

            {/* Specs */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 space-y-3">
              <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider border-b border-outline-variant/20 pb-2">
                {language === 'en' ? 'Product Specifications' : 'مواصفات المنتج'}
              </div>
              <p className="text-sm text-on-surface font-medium leading-relaxed">
                {language === 'en' ? product.specEn : product.specAr}
              </p>
              {language !== 'en' && product.specEn && (
                <p className="text-xs text-on-surface-variant italic leading-relaxed">
                  {product.specEn}
                </p>
              )}
              {language === 'en' && product.specAr && (
                <p className="text-xs text-on-surface-variant italic leading-relaxed text-right">
                  {product.specAr}
                </p>
              )}
            </div>

            {/* Warranty Badge / Quick Info */}
            <div className="bg-primary-container/10 border border-primary-container/20 rounded-2xl p-4 flex gap-3">
              <ShieldCheck className="w-6 h-6 text-primary-container shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-on-surface">
                  {(() => {
                    const months = product.warrantyMonths !== undefined ? product.warrantyMonths : 12;
                    if (months === 0) {
                      return language === 'en' ? 'No Warranty' : 'بدون ضمان';
                    }
                    if (language === 'en') {
                      return months === 1 ? '1-Month Guarantee' : `${months}-Month Guarantee`;
                    } else {
                      if (months === 1) return 'ضمان لمدة شهر';
                      if (months === 2) return 'ضمان لمدة شهرين';
                      if (months >= 3 && months <= 10) return `ضمان لمدة ${months} أشهر`;
                      return `ضمان لمدة ${months} شهراً`;
                    }
                  })()}
                </h4>
                <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed">
                  {product.warrantyMonths === 0
                    ? (language === 'en' ? 'Sold as-is without any hardware warranty.' : 'يباع كما هو بدون أي ضمان على القطع.')
                    : (language === 'en' 
                      ? 'Fully diagnostic tested and certified to have 100% stable hardware performance.' 
                      : 'خضع لفحص شامل ومعتمد لضمان استقرار أداء جميع القطع الداخلية بنسبة 100٪.')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="block text-[11px] text-on-surface-variant font-bold uppercase tracking-wider">
                {language === 'en' ? 'Price / السعر' : 'السعر / Price'}
              </span>
              <span className="text-2xl md:text-3xl font-black text-primary-container">
                {formatPrice(product.priceUsd)}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
                added 
                  ? 'bg-green-600 text-white shadow-green-600/20' 
                  : 'bg-primary-container text-white hover:bg-primary-container/90 shadow-primary-container/20'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'en' ? 'Added!' : 'تمت الإضافة!'}</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>{language === 'en' ? 'Add to Cart' : 'أضف إلى السلة'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
