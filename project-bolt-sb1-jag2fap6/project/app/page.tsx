'use client';

import React, { useEffect } from 'react';
import { useCVStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TemplatesShowcase from '@/components/home/TemplatesShowcase';

export default function Home() {
  const { language } = useCVStore();
  const isRTL = language === 'ar';

  useEffect(() => {
    // Set document direction and language on mount and language changes
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <main>
        <Hero />
        <Features />
        <TemplatesShowcase />
        
        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className={`text-4xl font-bold mb-4 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'ابدأ في بناء سيرتك الذاتية اليوم' : 'Start Building Your CV Today'}
            </h2>
            <p className={`text-xl mb-8 text-green-100 max-w-2xl mx-auto ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' 
                ? 'انضم إلى آلاف المهنيين الذين حصلوا على وظائف أحلامهم باستخدام منصتنا'
                : 'Join thousands of professionals who landed their dream jobs using our platform'
              }
            </p>
            <div className={`flex gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <a 
                href="/builder"
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {language === 'ar' ? 'ابدأ مجاناً' : 'Start Free'}
              </a>
              <a 
                href="/templates"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {language === 'ar' ? 'تصفح القوالب' : 'Browse Templates'}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className={`text-center ${isRTL ? 'arabic-font' : 'english-font'}`}>
              <h3 className="text-xl font-bold mb-4">
                {language === 'ar' ? 'منشئ السيرة الذاتية المهني' : 'Professional CV Builder'}
              </h3>
              <p className="text-gray-400 mb-6">
                {language === 'ar' 
                  ? 'مصمم خصيصاً للسوق السعودي والخليجي'
                  : 'Designed specifically for Saudi and Gulf markets'
                }
              </p>
              <div className={`flex justify-center gap-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </a>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'ar' ? 'شروط الاستخدام' : 'Terms of Service'}
                </a>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  {language === 'ar' ? 'اتصل بنا' : 'Contact Us'}
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2025 CV Builder. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}