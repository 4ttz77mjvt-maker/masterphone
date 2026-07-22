import { Language, Screen } from '../types';
import { translations } from '../data/translations';
import { ShieldAlert, Activity, CheckCircle, ArrowUpRight, HelpCircle } from 'lucide-react';

interface DiagnosticCTAProps {
  language: Language;
  setScreen: (screen: Screen) => void;
}

export default function DiagnosticCTA({ language, setScreen }: DiagnosticCTAProps) {
  const t = translations[language];

  return (
    <section className="py-12 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto bg-surface-container border border-outline-variant/30 rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-lg">
        
        {/* Background icon pattern watermark */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02] pointer-events-none">
          <HelpCircle className="w-[180px] h-[180px] absolute -right-6 -top-6 text-primary-container" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* CTA Pitch */}
          <div className="text-left space-y-3 max-w-2xl">
            <div className="inline-block px-2.5 py-1 rounded bg-primary-container/10 border border-primary-container/20 text-primary-container font-semibold text-[10px] uppercase tracking-wider">
              {language === 'ar' ? 'خدمة صيانة متميزة ومضمونة' : 'EXPERT CERTIFIED REPAIR'}
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {t.cta_title}
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {t.cta_desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 justify-end">
            <button 
              onClick={() => setScreen('repair')}
              className="px-5 py-3 bg-primary-container hover:bg-primary-container/90 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow"
            >
              <Activity className="w-4 h-4 animate-pulse" />
              <span>{t.btn_start_diagnostic}</span>
            </button>
            
            <button 
              onClick={() => setScreen('catalog')}
              className="px-5 py-3 border border-outline-variant text-white hover:bg-surface-container-high hover:border-primary-container/40 rounded-xl font-bold text-sm transition-all cursor-pointer active:scale-95"
            >
              <span>{t.btn_view_pricing}</span>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
