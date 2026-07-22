import { useState } from 'react';
import { Language, Currency, Wilaya, RepairTicket } from '../types';
import { translations } from '../data/translations';
import { wilayas } from '../data/wilayas';
import { 
  Smartphone, Laptop, Tablet, Watch, ChevronLeft, Calendar, Clock, 
  MapPin, ShieldCheck, Star, Award, Settings, Check, Droplet, Battery, HelpCircle,
  Camera, Volume2, Cpu, Fingerprint, Image as ImageIcon
} from 'lucide-react';

interface BookRepairFlowProps {
  language: Language;
  currency: Currency;
  onAddTicket: (ticket: RepairTicket) => void;
  setScreen: (screen: any) => void;
}

export default function BookRepairFlow({
  language,
  currency,
  onAddTicket,
  setScreen,
}: BookRepairFlowProps) {
  const t = translations[language];

  // Steps: 1 = Device, 2 = Issue, 3 = Schedule & Quote, 4 = Success
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [selectedDeviceType, setSelectedDeviceType] = useState<any>('smartphone');
  const [selectedIssue, setSelectedIssue] = useState<string>('');
  const [selectedWilaya, setSelectedWilaya] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('Tue 15');
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM');
  const [createdTicketId, setCreatedTicketId] = useState<string>('');

  // Customer info & custom problem details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [problemNotes, setProblemNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');

  const deviceTypes = [
    { name: 'iPhone', type: 'smartphone', icon: <Smartphone className="w-8 h-8" /> },
    { name: 'Samsung', type: 'smartphone', icon: <Smartphone className="w-8 h-8 text-primary-container" /> },
    { name: 'iPad', type: 'tablet', icon: <Tablet className="w-8 h-8" /> },
    { name: 'MacBook', type: 'laptop', icon: <Laptop className="w-8 h-8" /> },
    { name: 'Apple Watch', type: 'watch', icon: <Watch className="w-8 h-8" /> },
    { name: 'Other', type: 'other', icon: <Settings className="w-8 h-8" /> },
  ];

  const commonIssues = [
    { name: language === 'en' ? 'Screen Damage' : 'إصلاح وتغيير الشاشة', desc: language === 'en' ? 'Cracked or unresponsive display' : 'شاشة مكسورة أو غير مستجيبة لمسياً', price: 129, icon: <Award className="w-6 h-6" /> },
    { name: language === 'en' ? 'Battery Issues' : 'مشاكل واستبدال البطارية', desc: language === 'en' ? 'Not charging or rapid drain' : 'نفاد شحن سريع أو عدم شحن الهاتف', price: 69, icon: <Battery className="w-6 h-6" /> },
    { name: language === 'en' ? 'Camera Repair' : 'صيانة وإصلاح الكاميرا', desc: language === 'en' ? 'Blurry focus, broken lens, or black camera screen' : 'عدم وضوح التركيز، كسر العدسة أو ظهور شاشة سوداء', price: 79, icon: <Camera className="w-6 h-6" /> },
    { name: language === 'en' ? 'Back Glass Replacement' : 'استبدال الزجاج الخلفي المكسور', desc: language === 'en' ? 'Cracked or shattered back housing cover' : 'غطاء خلفي مكسور أو متشظٍ للهاتف', price: 89, icon: <ImageIcon className="w-6 h-6" /> },
    { name: language === 'en' ? 'Charging Port' : 'منفذ الشحن والتوصيل', desc: language === 'en' ? 'Loose or blocked connection' : 'اتصال ضعيف أو منفذ مغلق بالأتربة', price: 49, icon: <Settings className="w-6 h-6" /> },
    { name: language === 'en' ? 'Water Damage' : 'أضرار تسرب السوائل والمياه', desc: language === 'en' ? 'Liquid contact or corrosion' : 'تعرض الجهاز للماء أو السوائل', price: 159, icon: <Droplet className="w-6 h-6" /> },
    { name: language === 'en' ? 'Speaker & Microphone' : 'سماعة ومكبر الصوت والميكروفون', desc: language === 'en' ? 'Low sound, crackling speaker or no mic audio' : 'صوت منخفض، مكبر صوت مشوش أو عدم التقاط الصوت', price: 39, icon: <Volume2 className="w-6 h-6" /> },
    { name: language === 'en' ? 'Biometrics (Face ID / Touch ID)' : 'بصمة الإصبع وبصمة الوجه', desc: language === 'en' ? 'Face ID failed or fingerprint sensor not working' : 'تعطل ميزة Face ID أو عدم استشعار البصمة', price: 59, icon: <Fingerprint className="w-6 h-6" /> },
    { name: language === 'en' ? 'Software & System Errors' : 'أخطاء نظام التشغيل والسوفتوير', desc: language === 'en' ? 'Bootloop, stuck on logo, or data recovery request' : 'تكرار التشغيل، التوقف عند الشعار، أو استعادة البيانات', price: 49, icon: <Cpu className="w-6 h-6" /> },
    { name: language === 'en' ? 'Other Issues' : 'أعطال أو مشاكل أخرى', desc: language === 'en' ? 'Unlisted problem (Custom diagnostics & quote)' : 'مشكلة غير مدرجة (فحص مخصص وتسعيرة دقيقة)', price: 29, icon: <HelpCircle className="w-6 h-6" /> },
  ];

  const dates = [
    { day: language === 'en' ? 'Mon' : 'الاثنين', num: '14' },
    { day: language === 'en' ? 'Tue' : 'الثلاثاء', num: '15' },
    { day: language === 'en' ? 'Wed' : 'الأربعاء', num: '16' },
    { day: language === 'en' ? 'Thu' : 'الخميس', num: '17' },
  ];

  const times = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  // Current selected issue base price (default 129 if not selected)
  const activeIssueObj = commonIssues.find(i => i.name === selectedIssue) || commonIssues[0];
  const activePriceUsd = activeIssueObj.price;

  const getDzdValue = (usdVal: number) => {
    return Math.round(usdVal * 220);
  };

  const formatPrice = (usdAmount: number) => {
    return `${getDzdValue(usdAmount).toLocaleString()} ${language === 'en' ? 'DZD' : 'د.ج'}`;
  };

  const handleDeviceSelect = (device: string, type: any) => {
    setSelectedDevice(device);
    setSelectedDeviceType(type);
    setCurrentStep(2);
  };

  const handleIssueSelect = (issue: string) => {
    setSelectedIssue(issue);
    setCurrentStep(3);
  };

  const handleConfirmBooking = () => {
    if (!customerName.trim()) {
      setFormError(language === 'ar' ? 'الرجاء إدخال الاسم الكامل!' : 'Please enter your full name!');
      return;
    }
    if (!customerPhone.trim()) {
      setFormError(language === 'ar' ? 'الرجاء إدخال رقم الهاتف!' : 'Please enter your phone number!');
      return;
    }
    if (!problemNotes.trim()) {
      setFormError(language === 'ar' ? 'الرجاء كتابة تفاصيل المشكلة أو العطل!' : 'Please describe the issue or problem!');
      return;
    }
    setFormError('');

    // Generate simulated Ticket ID
    const ticketNum = Math.floor(1000 + Math.random() * 9000);
    const ticketId = `#MP-${ticketNum}`;
    
    // Add to main App repair tickets queue
    const finalDeviceDesc = `${selectedDevice} (${selectedIssue} - ${problemNotes.trim()})`;

    const newTicket: RepairTicket = {
      id: ticketId,
      device: finalDeviceDesc,
      deviceType: selectedDeviceType,
      customer: `${customerName.trim()} (${customerPhone.trim()})`,
      wilayaCode: selectedWilaya || '16', // Default Algiers
      status: 'diagnostic',
      technician: 'Sarah J.',
    };

    onAddTicket(newTicket);
    setCreatedTicketId(ticketId);
    setCurrentStep(4);
  };

  const selectedWilayaObj = wilayas.find(w => w.code === selectedWilaya);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      
      {/* Progress Stepper (Only active during selection steps) */}
      {currentStep <= 3 && (
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -translate-y-1/2 z-0"></div>
            
            {/* Active line width */}
            <div 
              className="absolute top-1/2 left-0 h-[2px] bg-primary-container -translate-y-1/2 z-0 transition-all duration-500 shadow-[0_0_15px_rgba(255,102,0,0.3)]"
              style={{ width: `${(currentStep - 1) * 50}%` }}
            ></div>
            
            {/* Stepper Dots */}
            <div className="relative z-10 flex justify-between">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-3">
                <div 
                  onClick={() => currentStep > 1 && setCurrentStep(1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-background cursor-pointer transition-all ${
                    currentStep >= 1 ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className={`text-[11px] md:text-xs font-semibold ${currentStep >= 1 ? 'text-primary-container' : 'text-on-surface-variant'}`}>
                  {t.step_device}
                </span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center gap-3">
                <div 
                  onClick={() => currentStep > 2 && setCurrentStep(2)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-background transition-all ${
                    currentStep > 2 ? 'bg-primary-fixed-dim text-on-primary' : 
                    currentStep === 2 ? 'bg-primary-container text-on-primary-container' : 
                    'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {currentStep > 2 ? <Check className="w-5 h-5" /> : <Award className="w-5 h-5" />}
                </div>
                <span className={`text-[11px] md:text-xs font-semibold ${currentStep >= 2 ? 'text-primary-container' : 'text-on-surface-variant'}`}>
                  {t.step_issue}
                </span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-3">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-background transition-all ${
                    currentStep === 3 ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                </div>
                <span className={`text-[11px] md:text-xs font-semibold ${currentStep === 3 ? 'text-primary-container' : 'text-on-surface-variant'}`}>
                  {t.step_quote}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Selection Area */}
        <div className="lg:col-span-8">
          
          {/* STEP 1: CHOOSE DEVICE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-4">
                <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  {t.book_title}
                </h1>
                <span className="text-xs font-bold text-on-surface-variant font-mono uppercase tracking-widest bg-surface-container px-3 py-1 rounded">
                  1 / 3
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                {deviceTypes.map((device, index) => (
                  <button
                    key={index}
                    onClick={() => handleDeviceSelect(device.name, device.type)}
                    className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-surface-container border border-outline-variant/60 hover:border-primary-container hover:bg-surface-container-high transition-all group active:scale-95 duration-100 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant group-hover:bg-primary-container/20 group-hover:text-primary-container transition-all mb-4 border border-outline-variant/30">
                      {device.icon}
                    </div>
                    <span className="text-lg font-bold text-on-surface group-hover:text-primary-container transition-colors">
                      {device.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE ISSUE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="p-2 border border-outline-variant/40 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  {t.book_issue_title}
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {commonIssues.map((issue, index) => (
                  <button
                    key={index}
                    onClick={() => handleIssueSelect(issue.name)}
                    className="flex items-center gap-5 p-6 rounded-2xl bg-surface-container border border-outline-variant/60 hover:border-primary-container hover:bg-surface-container-high text-left group active:scale-98 transition-all cursor-pointer"
                  >
                    <div className="bg-surface-container-highest border border-outline-variant/30 p-4 rounded-xl text-primary-container group-hover:bg-primary-container/20 group-hover:text-primary-container transition-all">
                      {issue.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-on-surface group-hover:text-primary-container transition-colors">
                        {issue.name}
                      </h3>
                      <p className="text-xs text-on-surface-variant font-medium mt-1">
                        {issue.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: SCHEDULE & QUOTE */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fade-in text-left">
              <div className="flex items-center gap-4 border-b border-outline-variant/20 pb-4">
                <button 
                  onClick={() => setCurrentStep(2)}
                  className="p-2 border border-outline-variant/40 rounded-xl hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
                  {t.book_quote_title}
                </h1>
              </div>

              {/* Total Instant Estimate Card */}
              <div className="bg-surface-container-high p-8 rounded-2xl border-2 border-primary-container/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <ShieldCheck className="w-40 h-40 text-primary-container" />
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold text-primary-container uppercase tracking-wider block mb-1">
                      {t.book_est_total}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-primary-container animate-pulse">
                      {formatPrice(activePriceUsd)}
                    </h2>
                    <p className="text-xs text-on-surface-variant font-semibold mt-2">
                      {t.book_includes}
                    </p>
                  </div>

                  <div className="flex gap-3 bg-surface-container p-4 rounded-xl border border-outline-variant/30 self-start md:self-center">
                    <Clock className="w-5 h-5 text-primary-container" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">
                        {t.book_repair_time}
                      </p>
                      <p className="text-sm font-bold text-on-surface">
                        {t.book_minutes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Algerian Wilaya Location Selector */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-on-surface uppercase tracking-wider">
                  {t.book_select_wilaya}
                </label>
                <div className="relative">
                  <select
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded-xl p-4 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all cursor-pointer font-semibold text-sm"
                  >
                    <option value="" disabled>{t.book_select_wilaya_placeholder}</option>
                    {wilayas.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {language === 'en' ? w.nameEn : w.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Display Chosen Drop-off details dynamically */}
                {selectedWilaya && (
                  <div className="mt-3 bg-primary-container/5 border border-primary-container/20 rounded-xl p-4 flex gap-3.5 items-center">
                    <MapPin className="w-6 h-6 text-primary-container shrink-0" />
                    <div className="text-sm">
                      <p className="font-extrabold text-on-surface">
                        {t.wilaya_dropoff_center} - {language === 'en' ? selectedWilayaObj?.nameEn : selectedWilayaObj?.nameAr}
                      </p>
                      <p className="text-xs text-on-surface-variant font-medium mt-1">
                        {t.wilaya_address} {selectedWilayaObj?.code}, {language === 'en' ? 'Algeria' : 'الجزائر'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Customer Contact & Problem Details */}
              <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/60 space-y-4">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-container rounded-full animate-ping"></span>
                  <span>{language === 'ar' ? 'معلومات الزبون وتفاصيل العطل' : 'Client Details & Problem Description'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant block">
                      {language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={language === 'ar' ? 'مثال: محمد بن علي' : 'e.g. Yanis Win'}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-3.5 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-sm font-semibold"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-on-surface-variant block">
                      {language === 'ar' ? 'رقم الهاتف (الجزائر) *' : 'Phone Number (Algeria) *'}
                    </label>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => {
                        setCustomerPhone(e.target.value);
                        if (formError) setFormError('');
                      }}
                      placeholder={language === 'ar' ? '05/06/07XXXXXXXX' : '05 / 06 / 07 XXXXXXXX'}
                      className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-3.5 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-sm font-mono font-bold"
                    />
                  </div>
                </div>

                {/* Problem Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant block">
                    {language === 'ar' ? 'اكتب تفاصيل المشكلة أو العطل بدقة *' : 'Describe the exact issue/problem *'}
                  </label>
                  <textarea
                    rows={3}
                    value={problemNotes}
                    onChange={(e) => {
                      setProblemNotes(e.target.value);
                      if (formError) setFormError('');
                    }}
                    placeholder={language === 'ar' ? 'صف العطل هنا بدقة لمساعدتنا في تجهيز قطع الغيار المناسبة...' : 'Describe what happened (e.g., dropped on concrete, screen is fully black but vibrates...)'}
                    className="w-full bg-surface-container-lowest border border-outline-variant/50 rounded-xl p-3.5 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all text-sm"
                  />
                </div>

                {formError && (
                  <p className="text-red-500 text-xs font-extrabold flex items-center gap-1.5 animate-pulse">
                    ❌ {formError}
                  </p>
                )}
              </div>

              {/* Schedule Cal Drop-off */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider">
                  {t.book_schedule}
                </h3>
                
                {/* Date slots */}
                <div className="grid grid-cols-4 gap-3">
                  {dates.map((d, idx) => {
                    const idStr = `${d.day} ${d.num}`;
                    const isSel = selectedDate === idStr;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(idStr)}
                        className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSel 
                            ? 'bg-primary-container text-on-primary-container border-primary-container font-black shadow-lg shadow-primary-container/25' 
                            : 'bg-surface-container border-outline-variant/50 text-on-surface hover:border-primary-container'
                        }`}
                      >
                        <p className="text-[10px] font-bold uppercase opacity-80">{d.day}</p>
                        <p className="text-lg font-black mt-1">{d.num}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Time slots */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {times.map((time, idx) => {
                    const isSel = selectedTime === time;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(time)}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          isSel 
                            ? 'bg-primary-container text-on-primary-container' 
                            : 'bg-surface-container-highest text-on-surface hover:bg-secondary-container'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedWilaya}
                className="w-full bg-primary-container text-on-primary-container py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary-container/20 hover:scale-[1.01] active:scale-95 transition-all cursor-pointer duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {t.btn_confirm}
              </button>
            </div>
          )}

          {/* STEP 4: BOOKING SUCCESS COMPLETED SCREEN */}
          {currentStep === 4 && (
            <div className="text-center py-12 px-6 bg-surface-container rounded-[2rem] border border-outline-variant/40 space-y-8 animate-fade-in">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <Check className="w-10 h-10" />
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-black text-on-surface">
                  {t.booking_success}
                </h1>
                <p className="text-on-surface-variant max-w-lg mx-auto text-sm md:text-base">
                  {t.booking_success_desc}{' '}
                  <span className="font-mono font-bold text-primary-container">{createdTicketId}</span>{' '}
                  {t.booking_success_wilaya}{' '}
                  <span className="text-on-surface font-extrabold text-sm md:text-base uppercase underline">
                    {language === 'en' ? selectedWilayaObj?.nameEn : selectedWilayaObj?.nameAr}
                  </span>.
                </p>
                <p className="text-xs text-primary-container font-extrabold bg-primary-container/15 inline-block px-3 py-1.5 rounded-md border border-primary-container/10">
                  {selectedDate} @ {selectedTime}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
                <button
                  onClick={() => setScreen('dashboard')}
                  className="px-6 py-3.5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface rounded-xl font-bold text-sm cursor-pointer transition-colors active:scale-95"
                >
                  {t.nav_dashboard}
                </button>
                <button
                  onClick={() => setScreen('landing')}
                  className="px-6 py-3.5 bg-primary-container text-on-primary-container rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(255,102,0,0.3)] transition-all cursor-pointer active:scale-95"
                >
                  {t.btn_back_home}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right sidebar: Trust Indicators and Verification Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant space-y-6 sticky top-24 text-left">
            <h4 className="text-xs font-bold text-primary-container uppercase tracking-widest border-b border-outline-variant/20 pb-3">
              {t.why_title}
            </h4>

            {/* Why Item 1 */}
            <div className="flex gap-4">
              <div className="text-primary-container shrink-0 mt-0.5">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">{t.why_cert_title}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{t.why_cert_desc}</p>
              </div>
            </div>

            {/* Why Item 2 */}
            <div className="flex gap-4">
              <div className="text-primary-container shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">{t.why_warranty_title}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{t.why_warranty_desc}</p>
              </div>
            </div>

            {/* Why Item 3 */}
            <div className="flex gap-4">
              <div className="text-primary-container shrink-0 mt-0.5">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface">{t.why_parts_title}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-1 leading-relaxed">{t.why_parts_desc}</p>
              </div>
            </div>

            {/* Verification Rating & Testimony */}
            <div className="pt-6 border-t border-outline-variant">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-0.5 text-primary-container">
                  <Star className="w-4 h-4 fill-primary-container text-primary-container" />
                  <Star className="w-4 h-4 fill-primary-container text-primary-container" />
                  <Star className="w-4 h-4 fill-primary-container text-primary-container" />
                  <Star className="w-4 h-4 fill-primary-container text-primary-container" />
                  <Star className="w-4 h-4 fill-primary-container text-primary-container" />
                </div>
                <span className="text-xs font-bold text-on-surface-variant">{t.rating_meta}</span>
              </div>
              
              <p className="italic text-xs text-on-surface-variant leading-relaxed">
                {t.testimony}
              </p>
              <p className="text-[11px] font-bold mt-3 text-on-surface block">
                {t.client_name}
              </p>
            </div>

            {/* Micro-soldering background card */}
            <div className="rounded-xl overflow-hidden grayscale contrast-[1.15] h-32 relative">
              <img 
                className="w-full h-full object-cover relative z-0" 
                alt="Pro engineering micro circuit"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg2QfxF6eZGcKp9UGDZ5xgBCbcvU95SXtkGWnyI_yNuKcYoDmwdUxxLoxj1xCvg0ll9_xIVzOqRhEywTO3MJ4GIgW-fn3UQkhIBPmjKk0UfpmP4GBux5VDIcpOqvBWKvSfy0NW8WXJXZsZA5AWqBkyJHmG6mCpq42R2yWm133KH-oqhiQ6ZCg66uWNjEbXeB4MzGUgit6R7ZTCRBWXu0-C7LYfbuM02VQRlmNwtMJqM-mDhdQ2HEKK5Mw9AgEoTShnilfzKvVj1Wo"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary-container/15 mix-blend-overlay z-10"></div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
