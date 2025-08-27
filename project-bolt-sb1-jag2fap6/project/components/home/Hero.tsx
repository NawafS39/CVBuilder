'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, FileText, CheckCircle, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function Hero() {
  const { language } = useCVStore();
  const isRTL = language === 'ar';

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            className={`lg:w-1/2 ${isRTL ? 'lg:text-right' : 'lg:text-left'} text-center`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 text-gray-900 leading-tight ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {getTranslation('hero.title', language)}
            </h1>
            
            <p className={`text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {getTranslation('hero.subtitle', language)}
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
              >
                {getTranslation('hero.cta.primary', language)}
                <ChevronRight className={`h-5 w-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg"
              >
                {getTranslation('hero.cta.secondary', language)}
              </Button>
            </div>

            <div className={`mt-8 flex items-center justify-center lg:justify-start gap-8 ${isRTL ? 'lg:flex-row-reverse lg:justify-end' : ''}`}>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">ATS Optimized</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600">1000+ Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-600">PDF Export</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md mx-auto transform rotate-3">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-full bg-primary/10"></div>
                    <div className="text-right">
                      <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
                      <div className="h-2 w-16 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-primary/20 rounded"></div>
                    <div className="h-4 w-3/4 bg-gray-100 rounded"></div>
                    <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-accent/30 rounded"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-accent/30 rounded"></div>
                      <div className="h-2 w-3/4 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-primary text-white rounded-full p-3">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}