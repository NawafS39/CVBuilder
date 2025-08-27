'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Eye, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/lib/store';

const templates = [
  {
    id: 'modern-saudi',
    name: { en: 'Modern Saudi', ar: 'عصري سعودي' },
    preview: '/api/placeholder/300/400',
    isATS: true,
    category: 'Modern',
    popularity: 95,
    description: { 
      en: 'Clean, modern design perfect for tech and finance roles',
      ar: 'تصميم عصري ونظيف مثالي لأدوار التكنولوجيا والمالية'
    }
  },
  {
    id: 'traditional-gulf',
    name: { en: 'Traditional Gulf', ar: 'خليجي تقليدي' },
    preview: '/api/placeholder/300/400',
    isATS: true,
    category: 'Traditional',
    popularity: 88,
    description: { 
      en: 'Professional design suited for government and corporate positions',
      ar: 'تصميم مهني مناسب للمناصب الحكومية والشركات'
    }
  },
  {
    id: 'creative-pro',
    name: { en: 'Creative Professional', ar: 'إبداعي مهني' },
    preview: '/api/placeholder/300/400',
    isATS: false,
    category: 'Creative',
    popularity: 79,
    description: { 
      en: 'Eye-catching design for creative and marketing roles',
      ar: 'تصميم جذاب للأدوار الإبداعية والتسويقية'
    }
  },
  {
    id: 'executive-elite',
    name: { en: 'Executive Elite', ar: 'تنفيذي متميز' },
    preview: '/api/placeholder/300/400',
    isATS: true,
    category: 'Executive',
    popularity: 92,
    description: { 
      en: 'Sophisticated design for senior management positions',
      ar: 'تصميم متطور للمناصب الإدارية العليا'
    }
  },
];

export default function TemplatesShowcase() {
  const { language } = useCVStore();
  const isRTL = language === 'ar';

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl font-bold mb-4 text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {language === 'ar' ? 'قوالب احترافية للسوق السعودي' : 'Professional Templates for Saudi Market'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'قوالب مصممة خصيصاً للسوق السعودي ومعتمدة من قبل متخصصي الموارد البشرية'
              : 'Templates specifically designed for the Saudi market and approved by HR professionals'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="template-card group overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-white to-gray-100 p-6">
                    {/* CV Template Preview */}
                    <div className="h-full bg-white rounded-lg shadow-inner p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded mb-1"></div>
                          <div className="h-1.5 bg-gray-100 rounded w-3/4"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1.5">
                        <div className="h-1.5 bg-primary/30 rounded"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-5/6"></div>
                        <div className="h-1.5 bg-gray-100 rounded w-4/5"></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <div className="space-y-1">
                          <div className="h-1 bg-accent/40 rounded"></div>
                          <div className="h-1 bg-gray-100 rounded w-2/3"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="h-1 bg-accent/40 rounded"></div>
                          <div className="h-1 bg-gray-100 rounded w-2/3"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {template.isATS && (
                    <Badge className="absolute top-4 right-4 ats-badge">
                      ATS
                    </Badge>
                  )}
                  
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                      <Eye className="h-4 w-4 mr-1" />
                      {language === 'ar' ? 'معاينة' : 'Preview'}
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Download className="h-4 w-4 mr-1" />
                      {language === 'ar' ? 'استخدام' : 'Use'}
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className={`flex items-center justify-between mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <h3 className={`font-semibold text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {template.name[language]}
                    </h3>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-500">{template.popularity}%</span>
                    </div>
                  </div>
                  
                  <p className={`text-sm text-gray-600 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                    {template.description[language]}
                  </p>
                  
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Badge variant="outline" className="text-xs">
                      {template.category}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {language === 'ar' ? 'تحديث حديث' : 'Recently Updated'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
            {language === 'ar' ? 'عرض جميع القوالب' : 'View All Templates'}
            <CheckCircle className={`h-5 w-5 ml-2 ${isRTL ? 'rotate-180' : ''}`} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}