import { Language, Screen } from '../types';
import { translations } from '../data/translations';
import { Smartphone, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  language: Language;
  setScreen: (screen: Screen, category?: string) => void;
  contactPhones: string[];
  socialLinks: { instagram: string; tiktok: string; facebook: string };
}

export default function Footer({ language, setScreen, contactPhones, socialLinks }: FooterProps) {
  const t = translations[language];

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 py-16 px-4 md:px-8 text-left mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* Left column: Brand */}
        <div className="col-span-1 md:col-span-4 space-y-4">
          <div 
            onClick={() => setScreen('landing')}
            className="flex items-center gap-2 cursor-pointer group active:scale-95 transition-transform inline-flex"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container group-hover:bg-primary-container/20 transition-all">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="font-headline-md text-xl font-bold tracking-tighter flex items-center gap-1">
              <span className="text-primary-container">{t.brand_first}</span>
              <span className="text-on-surface">{t.brand_second}</span>
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs">
            {t.footer_desc}
          </p>

          {/* Dynamic Social Links */}
          <div className="flex items-center gap-3 pt-2">
            {socialLinks?.facebook && (
              <a 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary-container hover:text-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant transition-all hover:scale-110 cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary-container hover:text-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant transition-all hover:scale-110 cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {socialLinks?.tiktok && (
              <a 
                href={socialLinks.tiktok} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-surface-container hover:bg-primary-container hover:text-white border border-outline-variant/30 flex items-center justify-center text-on-surface-variant transition-all hover:scale-110 cursor-pointer"
                title="TikTok"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.5-.13-.1-.23-.22-.35-.33v5.39c-.06 2.45-1.12 4.93-3.08 6.45-2.2 1.74-5.32 2.19-7.94 1.14-2.48-.98-4.32-3.37-4.66-6.02-.45-3.18 1.15-6.6 4.12-7.85 1.15-.49 2.41-.65 3.65-.51V11c-.96-.13-1.98.05-2.82.59-.97.6-1.57 1.68-1.63 2.81-.08 1.49.88 2.94 2.29 3.39 1.25.41 2.73.08 3.61-.88.75-.81.99-1.95.95-3.03V.02z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Right column: Services links */}
        <div className="col-span-1 md:col-span-2.5 space-y-3">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest">
            {t.footer_services}
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
            <li><button onClick={() => setScreen('repair')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_screen_repair}</button></li>
            <li><button onClick={() => setScreen('repair')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_battery_service}</button></li>
            <li><button onClick={() => setScreen('repair')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_water_damage}</button></li>
            <li><button onClick={() => setScreen('repair')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_diagnostics}</button></li>
          </ul>
        </div>

        {/* Shop links */}
        <div className="col-span-1 md:col-span-2.5 space-y-3">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest">
            {t.footer_shop}
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
            <li><button onClick={() => setScreen('catalog', 'smartphones')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_smartphones}</button></li>
            <li><button onClick={() => setScreen('catalog', 'parts')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_parts}</button></li>
            <li><button onClick={() => setScreen('catalog', 'tools')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_tools}</button></li>
            <li><button onClick={() => setScreen('catalog', 'refurbished')} className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_refurbished || t.label_refurbished}</button></li>
          </ul>
        </div>

        {/* Company links */}
        <div className="col-span-1 md:col-span-3 space-y-3">
          <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest">
            {t.footer_company}
          </h4>
          <ul className="space-y-2 text-xs font-semibold text-on-surface-variant">
            <li><span className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_about}</span></li>
            <li><span className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_wholesale}</span></li>
            <li><span className="hover:text-primary-container transition-colors cursor-pointer">{t.footer_warranty}</span></li>
            <li>
              <span className="block text-on-surface font-bold uppercase tracking-wider mb-1">{t.footer_contact}</span>
              <div className="space-y-1 font-mono text-[11px] font-bold text-on-surface-variant">
                {contactPhones.map((phone, idx) => (
                  <a key={idx} href={`tel:${phone.replace(/\s+/g, '')}`} className="block hover:text-primary-container transition-all">
                    📞 {phone}
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright area */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-outline-variant/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
        <span className="text-[10px] font-bold text-on-surface-variant opacity-75">
          {t.footer_copy}
        </span>

        <div className="flex items-center gap-6 text-[10px] font-bold text-on-surface-variant opacity-75">
          <span className="hover:text-primary-container cursor-pointer transition-colors">{t.footer_privacy}</span>
          <span className="hover:text-primary-container cursor-pointer transition-colors">{t.footer_terms}</span>
          <button 
            onClick={() => setScreen('dashboard')} 
            className="hover:text-primary-container cursor-pointer text-primary-container transition-colors font-bold text-[10px] bg-primary-container/10 px-2 py-1 rounded border border-primary-container/20 hover:bg-primary-container/20 flex items-center gap-1"
          >
            <span>🔐</span>
            <span>{language === 'ar' ? 'بوابة الإدارة' : 'Admin Portal'}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
