'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, FileText, Download } from 'lucide-react';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Header() {
  const { language, setLanguage } = useCVStore();
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <FileText className="h-8 w-8 text-primary" />
            <span className={`text-2xl font-bold text-primary ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'منشئ السيرة الذاتية' : 'CV Builder'}
            </span>
          </div>

          <nav className={`hidden md:flex items-center space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            <a href="/" className="text-gray-600 hover:text-primary transition-colors">
              {getTranslation('nav.home', language)}
            </a>
            <a href="/builder" className="text-gray-600 hover:text-primary transition-colors">
              {getTranslation('nav.builder', language)}
            </a>
            <a href="/templates" className="text-gray-600 hover:text-primary transition-colors">
              {getTranslation('nav.templates', language)}
            </a>
            <a href="/examples" className="text-gray-600 hover:text-primary transition-colors">
              {getTranslation('nav.examples', language)}
            </a>
          </nav>

          <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className={`${isRTL ? 'arabic-font' : 'english-font'}`}
            >
              <Languages className="h-4 w-4 mr-2" />
              {getTranslation('nav.language', language)}
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4 mr-2" />
              {getTranslation('button.download', language)}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}