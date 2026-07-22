import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Product, CartItem, Currency, Language, Order } from '../types';
import { wilayas } from '../data/wilayas';
import { ShoppingBag, ArrowLeft, User, Phone, MapPin, Truck, ShieldCheck, CreditCard, ChevronRight } from 'lucide-react';

interface CheckoutFlowProps {
  language: Language;
  currency: Currency;
  cart: CartItem[];
  onClearCart: () => void;
  onPlaceOrder: (order: Order) => void;
  setScreen: (screen: 'landing' | 'repair' | 'catalog' | 'dashboard' | 'checkout') => void;
  ripNumber: string;
}

export default function CheckoutFlow({
  language,
  currency,
  cart,
  onClearCart,
  onPlaceOrder,
  setScreen,
  ripNumber,
}: CheckoutFlowProps) {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedWilaya, setSelectedWilaya] = useState('16'); // Default Algiers
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'baridimob'>('cod');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderRef, setPlacedOrderRef] = useState('');

  // Calculations
  const exchangeRate = 220; // 1 USD = 220 DZD
  const subtotalUsd = cart.reduce((sum, item) => sum + item.product.priceUsd * item.quantity, 0);
  const shippingUsd = selectedWilaya === '16' ? 500 / exchangeRate : 1000 / exchangeRate; // Algiers 500 DA, others 1000 DA
  const totalUsd = subtotalUsd + shippingUsd;

  const formatPrice = (usdVal: number) => {
    const dzd = Math.round(usdVal * exchangeRate);
    return language === 'ar' ? `${dzd.toLocaleString()} د.ج` : `${dzd.toLocaleString()} DZD`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert(language === 'ar' ? 'الرجاء ملء جميع الحقول الإجبارية.' : 'Please fill in all required fields.');
      return;
    }

    const orderRef = `#MP-ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderRef,
      customerName: name,
      customerPhone: phone,
      wilayaCode: selectedWilaya,
      address,
      paymentMethod,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        priceUsd: item.product.priceUsd,
        quantity: item.quantity
      })),
      totalUsd,
      status: 'pending',
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    };

    onPlaceOrder(newOrder);
    setPlacedOrderRef(orderRef);
    setIsSuccess(true);
    onClearCart();
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 md:p-12 rounded-2xl border-emerald-500/20 shadow-xl"
        >
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={48} />
          </div>

          <h2 className="text-3xl font-bold font-display text-white mb-4">
            {language === 'ar' ? 'تم استقبال طلبك بنجاح!' : 'Order Placed Successfully!'}
          </h2>
          <p className="text-on-surface-variant text-lg mb-6">
            {language === 'ar'
              ? 'شكراً لك على ثقتك بـ Master Phone. لقد قمنا بتسجيل طلبك وسنتصل بك قريباً لتأكيد الشحن.'
              : 'Thank you for choosing Master Phone. We have registered your order and will contact you shortly to confirm shipment.'}
          </p>

          <div className="bg-surface-container-high/50 p-6 rounded-xl border border-outline-variant/40 mb-8 max-w-md mx-auto text-left dir-auto">
            <div className="flex justify-between mb-3 border-b border-outline-variant/30 pb-2">
              <span className="text-on-surface-variant text-sm">{language === 'ar' ? 'رقم الطلب:' : 'Order Ref:'}</span>
              <span className="font-mono font-bold text-primary-container">{placedOrderRef}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-on-surface-variant text-sm">{language === 'ar' ? 'الاسم:' : 'Name:'}</span>
              <span className="text-white font-medium">{name}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-on-surface-variant text-sm">{language === 'ar' ? 'الهاتف:' : 'Phone:'}</span>
              <span className="text-white font-mono">{phone}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-on-surface-variant text-sm">{language === 'ar' ? 'الولاية:' : 'Wilaya:'}</span>
              <span className="text-white">
                {wilayas.find(w => w.code === selectedWilaya)?.[language === 'ar' ? 'nameAr' : 'nameEn']}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant text-sm">{language === 'ar' ? 'طريقة الدفع:' : 'Payment Method:'}</span>
              <span className="text-white font-medium">
                {paymentMethod === 'cod'
                  ? (language === 'ar' ? 'الدفع عند الاستلام' : 'Cash on Delivery')
                  : 'Baridimob'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setScreen('catalog')}
              className="bg-primary-container hover:bg-primary-container/90 text-white font-medium px-8 py-3 rounded-xl transition-all cursor-pointer shadow-lg shadow-primary-container/20 flex items-center justify-center gap-2"
            >
              {language === 'ar' ? 'مواصلة التسوق' : 'Continue Shopping'}
              <ChevronRight size={18} className="rtl:rotate-180" />
            </button>
            <button
              onClick={() => setScreen('landing')}
              className="border border-outline-variant hover:bg-surface-container-high text-white font-medium px-8 py-3 rounded-xl transition-all cursor-pointer"
            >
              {language === 'ar' ? 'الرئيسية' : 'Back to Home'}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-surface-container-high text-on-surface-variant rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={28} />
        </div>
        <h2 className="text-2xl font-bold font-display text-white mb-3">
          {language === 'ar' ? 'سلة المشتريات فارغة' : 'Your Cart is Empty'}
        </h2>
        <p className="text-on-surface-variant mb-8">
          {language === 'ar'
            ? 'تصفح قائمة الأجهزة وقطع الغيار المتاحة وأضف ما تحتاجه لتتمكن من الشراء.'
            : 'Explore our catalog of premium smartphones, parts, and tools to make a purchase.'}
        </p>
        <button
          onClick={() => setScreen('catalog')}
          className="bg-primary-container hover:bg-primary-container/90 text-white font-medium px-6 py-3 rounded-xl transition-all cursor-pointer"
        >
          {language === 'ar' ? 'تصفح المنتجات' : 'Go to Product Catalog'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setScreen('catalog')}
          className="w-10 h-10 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/40 rounded-xl flex items-center justify-center text-white transition-all cursor-pointer"
        >
          <ArrowLeft size={18} className="rtl:rotate-180" />
        </button>
        <div>
          <span className="text-xs text-primary-container font-medium uppercase tracking-wider font-display">
            {language === 'ar' ? 'إتمام الشراء' : 'Secure Checkout'}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            {language === 'ar' ? 'تأكيد طلبيتك' : 'Confirm Your Order'}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details Card */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 space-y-5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <User size={18} className="text-primary-container" />
                {language === 'ar' ? 'معلومات المستلم' : 'Receiver Information'}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1.5 font-medium">
                    {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'ar' ? 'أدخل اسمك الثلاثي' : 'Enter your full name'}
                      className="w-full bg-surface-container-lowest border border-outline-variant hover:border-primary-container/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-3 px-4 text-white placeholder-on-surface-variant/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-on-surface-variant mb-1.5 font-medium">
                    {language === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05xx xx xx xx / 06xx xx xx xx"
                      className="w-full bg-surface-container-lowest border border-outline-variant hover:border-primary-container/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-3 px-4 text-white text-left placeholder-on-surface-variant/50 transition-all outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address Card */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 space-y-5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <MapPin size={18} className="text-primary-container" />
                {language === 'ar' ? 'معلومات التوصيل والشحن' : 'Delivery & Shipping Details'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-on-surface-variant mb-1.5 font-medium">
                    {language === 'ar' ? 'الولاية *' : 'Wilaya *'}
                  </label>
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full bg-surface-container-lowest border border-outline-variant hover:border-primary-container/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-3 px-4 text-white transition-all outline-none"
                  >
                    {wilayas.map((w) => (
                      <option key={w.code} value={w.code} className="bg-surface-container text-white">
                        {w.code} - {language === 'ar' ? w.nameAr : w.nameEn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-on-surface-variant mb-1.5 font-medium">
                    {language === 'ar' ? 'سعر التوصيل' : 'Delivery Fee'}
                  </label>
                  <div className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-xl py-3 px-4 text-white flex items-center gap-2 font-medium">
                    <Truck size={16} className="text-primary-container" />
                    {formatPrice(shippingUsd)}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-on-surface-variant mb-1.5 font-medium">
                  {language === 'ar' ? 'العنوان الكامل والبلدية *' : 'Full Address & Municipality *'}
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: حي 20 مسكن، الطابق الأول، بجانب المسجد الكبير' : 'e.g., Cité 20 Logements, Appt 4, next to the pharmacy'}
                  className="w-full bg-surface-container-lowest border border-outline-variant hover:border-primary-container/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-3 px-4 text-white placeholder-on-surface-variant/50 transition-all outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-on-surface-variant mb-1.5 font-medium text-left">
                  {language === 'ar' ? 'ملاحظات إضافية (اختياري)' : 'Additional Notes (Optional)'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: يرجى الاتصال قبل الوصول' : 'e.g., Call before delivery'}
                  className="w-full bg-surface-container-lowest border border-outline-variant hover:border-primary-container/40 focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-xl py-3 px-4 text-white placeholder-on-surface-variant/50 transition-all outline-none"
                />
              </div>
            </div>

            {/* Payment Method Card */}
            <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 space-y-5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2 border-b border-outline-variant/30 pb-3">
                <CreditCard size={18} className="text-primary-container" />
                {language === 'ar' ? 'طريقة الدفع' : 'Payment Method'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* COD Card */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`border rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-primary-container bg-primary-container/5 ring-1 ring-primary-container'
                      : 'border-outline-variant bg-surface-container-lowest/50 hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === 'cod' ? 'bg-primary-container/20 text-primary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                    <Truck size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">{language === 'ar' ? 'الدفع عند الاستلام (COD)' : 'Cash on Delivery (COD)'}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {language === 'ar' ? 'ادفع نقداً عند استلام طلبيتك أمام باب منزلك.' : 'Pay in cash when the courier delivers to your door.'}
                    </p>
                  </div>
                </div>

                {/* Baridimob Card */}
                <div
                  onClick={() => setPaymentMethod('baridimob')}
                  className={`border rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3 ${
                    paymentMethod === 'baridimob'
                      ? 'border-primary-container bg-primary-container/5 ring-1 ring-primary-container'
                      : 'border-outline-variant bg-surface-container-lowest/50 hover:bg-surface-container-high'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${paymentMethod === 'baridimob' ? 'bg-primary-container/20 text-primary-container' : 'bg-surface-container text-on-surface-variant'}`}>
                    <CreditCard size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm text-white">{language === 'ar' ? 'بريديموب (Baridimob)' : 'Baridimob Transfer'}</h4>
                    <p className="text-xs text-on-surface-variant mt-1">
                      {language === 'ar' ? 'الدفع المسبق عبر تحويل بريديموب.' : 'Fast pre-payment via postal transfer.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Baridimob Instructions */}
              {paymentMethod === 'baridimob' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-surface-container p-4 rounded-xl border border-primary-container/20 space-y-2 text-xs text-on-surface-variant font-mono"
                >
                  <p className="text-white font-bold">{language === 'ar' ? '⚠️ تعليمات التحويل لبريديموب:' : '⚠️ Baridimob Transfer Instructions:'}</p>
                  <p>{language === 'ar' ? 'يرجى تحويل المبلغ الإجمالي إلى حسابنا:' : 'Please transfer the total amount to:'}</p>
                  <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant/60 font-bold text-white tracking-wider text-center select-all">
                    RIP: {ripNumber}
                  </div>
                  <p>{language === 'ar' ? 'بعد إكمال التحويل، أرسل لنا لقطة الشاشة للتحقق.' : 'After payment, keep the screenshot receipt for confirmation.'}</p>
                </motion.div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-container hover:bg-primary-container/90 text-white font-bold py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-primary-container/20 text-center flex items-center justify-center gap-2 text-lg"
            >
              {language === 'ar' ? 'تأكيد وإرسال الطلب' : 'Place Order & Complete'}
            </button>
          </form>
        </div>

        {/* Right Sidebar - Order Summary */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 rounded-2xl border border-outline-variant/30 sticky top-28 space-y-6">
            <h3 className="text-lg font-bold font-display text-white border-b border-outline-variant/30 pb-3 flex items-center gap-2">
              <ShoppingBag size={18} className="text-primary-container" />
              {language === 'ar' ? 'ملخص المنتجات' : 'Cart Summary'}
            </h3>

            {/* List */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1 rtl:pl-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 items-center justify-between py-1">
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-surface-container border border-outline-variant/30"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-on-surface-variant">
                        {language === 'ar' ? item.product.specAr : item.product.specEn}
                      </p>
                      <p className="text-xs text-primary-container font-medium mt-0.5">
                        {item.quantity} × {formatPrice(item.product.priceUsd)}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-white font-mono">
                    {formatPrice(item.product.priceUsd * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals Table */}
            <div className="border-t border-outline-variant/30 pt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{language === 'ar' ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                <span className="text-white font-mono">{formatPrice(subtotalUsd)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">{language === 'ar' ? 'تكلفة التوصيل:' : 'Delivery fee:'}</span>
                <span className="text-emerald-400 font-medium font-mono">+{formatPrice(shippingUsd)}</span>
              </div>
              <div className="border-t border-outline-variant/30 pt-4 flex justify-between items-end">
                <div>
                  <span className="font-bold text-base text-white block">{language === 'ar' ? 'المجموع الإجمالي:' : 'Grand Total:'}</span>
                  <span className="text-xs text-on-surface-variant">
                    {language === 'ar' ? 'شامل الرسوم والضرائب' : 'Incl. taxes and shipping fees'}
                  </span>
                </div>
                <span className="text-2xl font-extrabold font-display text-primary-container font-mono">
                  {formatPrice(totalUsd)}
                </span>
              </div>
            </div>

            {/* Extra trust badges */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 text-xs text-on-surface-variant space-y-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-primary-container shrink-0" />
                <span>{language === 'ar' ? 'منتجات أصلية 100% ومضمونة' : '100% Genuine guaranteed parts'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-primary-container shrink-0" />
                <span>{language === 'ar' ? 'توصيل سريع وآمن مع فحص المنتج قبل الدفع' : 'Inspect product contents upon arrival'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
