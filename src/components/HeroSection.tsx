import { Language, Screen } from '../types';
import { translations } from '../data/translations';
import { Wrench, Store } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

export default function HeroSection({ language, setScreen }: HeroSectionProps) {
  const t = translations[language];

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 md:px-8 py-16 overflow-hidden">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,102,0,0.08)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Column: Copy & Actions */}
        <div className="space-y-8 text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-container font-semibold text-xs uppercase tracking-widest">
            {t.badge_hero}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-on-surface tracking-tight">
            {t.title_hero_1}{' '}
            <span className="text-primary-container text-glow block sm:inline">
              {t.title_hero_span}
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-on-surface-variant max-w-lg leading-relaxed">
            {t.desc_hero}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setScreen('repair')}
              className="px-8 py-4 bg-primary-container text-on-primary-container font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(255,102,0,0.4)] transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 duration-150"
            >
              <Wrench className="w-5 h-5" />
              <span>{t.btn_book_repair}</span>
            </button>
            
            <button 
              onClick={() => setScreen('catalog')}
              className="px-8 py-4 border border-outline-variant text-on-surface font-semibold rounded-xl hover:bg-surface-container-high hover:border-primary-container/40 transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 duration-150"
            >
              <Store className="w-5 h-5" />
              <span>{t.btn_shop_parts}</span>
            </button>
          </div>
        </div>
        
        {/* Right Column: Premium Master Phone Logo Container */}
        <div className="relative flex justify-center items-center">
          <div className="w-full max-w-[420px] aspect-square relative glass-card rounded-[2rem] p-8 flex items-center justify-center overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            {/* Outer hardware glow */}
            <div className="absolute inset-0 bg-primary-container/5 rounded-[2rem] border border-primary-container/10 pointer-events-none" />
            
            <img 
              alt="Master Phone Enterprise Logo" 
              className="w-full h-full object-contain drop-shadow-2xl relative z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG9-UAgsm9ybNnttLRWId6Uikk6IjwdwRhOzXBrPRr7p2UW4fmH2dQKvH8MYIzDQMBSnQRSgEmn_Y34MY5JAOe6z5K8UD4THoVc18DjdDoMvo49qfL_jlWmw83aiIZ6jwL8fCXT9v_pdjJYl0dvVyHWr6sFFrbhWC23_hDHKhTGToKXXEALyr-hyGqdzsZHfnzVZeqUz33Jm2T2phHk_edZmVYjxCwowK25hOpiAM8qXMvmn7TBOE73-50v0bNTOn9FqjbZt_Wfig"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
