import { Language } from '../types';
import { translations } from '../data/translations';
import { Bolt, ShieldCheck, Cpu } from 'lucide-react';

interface FeaturesSectionProps {
  language: Language;
}

export default function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = translations[language];

  return (
    <section className="py-24 px-4 md:px-8 bg-surface-container-lowest border-y border-outline-variant/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-on-surface">
            {t.feature_title}
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-base">
            {t.feature_desc}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Rapid Speed */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/50 hover:border-primary-container/40 transition-all duration-300 group overflow-hidden relative min-h-[300px] flex flex-col justify-between">
            {/* Background Icon Watermark */}
            <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500 text-primary-container pointer-events-none">
              <Bolt className="w-48 h-48" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6 border border-primary-container/20 text-primary-container">
                <Bolt className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-on-surface">
                {t.feature_speed_title}
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                {t.feature_speed_desc}
              </p>
            </div>
          </div>

          {/* Card 2: Enterprise Warranty */}
          <div className="bg-surface-container-high rounded-3xl p-8 border border-outline-variant/70 hover:border-primary-container/40 transition-all duration-300 flex flex-col justify-between min-h-[300px]">
            <div>
              <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6 border border-primary-container/20 text-primary-container">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-on-surface">
                {t.feature_warranty_title}
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                {t.feature_warranty_desc}
              </p>
            </div>

            {/* Custom Interactive Meta (Avatar stack) */}
            <div className="mt-8 pt-6 border-t border-outline-variant/40 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 border-2 border-surface-container flex items-center justify-center text-[10px] font-bold text-slate-300">Y</div>
                <div className="w-8 h-8 rounded-full bg-orange-800 border-2 border-surface-container flex items-center justify-center text-[10px] font-bold text-orange-200">A</div>
                <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-surface-container flex items-center justify-center text-[10px] font-black text-on-primary-container">DZ</div>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant opacity-80">
                {t.feature_warranty_meta}
              </span>
            </div>
          </div>

          {/* Card 3: Technical Expertise */}
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant/50 hover:border-primary-container/40 transition-all duration-300 group overflow-hidden relative min-h-[300px] flex flex-col justify-between">
            {/* Background Icon Watermark */}
            <div className="absolute -right-6 -top-6 opacity-[0.03] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-500 text-primary-container pointer-events-none">
              <Cpu className="w-48 h-48" strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center mb-6 border border-primary-container/20 text-primary-container">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-on-surface">
                {t.feature_expert_title}
              </h3>
              <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
                {t.feature_expert_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
