'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Globe, 
  Palette, 
  Brain, 
  Shield, 
  Zap,
  Users,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

const features = [
  {
    icon: Target,
    titleKey: 'features.ats.title',
    descriptionKey: 'features.ats.description',
    color: 'text-red-600',
  },
  {
    icon: Globe,
    titleKey: 'features.bilingual.title',
    descriptionKey: 'features.bilingual.description',
    color: 'text-blue-600',
  },
  {
    icon: Palette,
    titleKey: 'features.templates.title',
    descriptionKey: 'features.templates.description',
    color: 'text-purple-600',
  },
  {
    icon: Brain,
    titleKey: 'features.ai.title',
    descriptionKey: 'features.ai.description',
    color: 'text-orange-600',
  },
  {
    icon: Shield,
    title: { en: 'Privacy Protected', ar: 'محمي الخصوصية' },
    description: { en: 'Your data is encrypted and never shared with third parties', ar: 'بياناتك مشفرة ولا نشاركها مع أطراف ثالثة' },
    color: 'text-green-600',
  },
  {
    icon: Zap,
    title: { en: 'Lightning Fast', ar: 'سريع كالبرق' },
    description: { en: 'Build and export your CV in under 15 minutes', ar: 'أنشئ وصدّر سيرتك الذاتية في أقل من 15 دقيقة' },
    color: 'text-yellow-600',
  },
  {
    icon: Users,
    title: { en: 'HR Approved', ar: 'معتمد من HR' },
    description: { en: 'Templates designed with input from Saudi HR professionals', ar: 'قوالب مصممة بمشاركة متخصصي الموارد البشرية السعوديين' },
    color: 'text-indigo-600',
  },
  {
    icon: Award,
    title: { en: 'Success Proven', ar: 'مؤكد النجاح' },
    description: { en: 'Used by 50,000+ professionals across the Gulf region', ar: 'يستخدمه أكثر من 50,000 مهني في منطقة الخليج' },
    color: 'text-primary',
  },
];

export default function Features() {
  const { language } = useCVStore();
  const isRTL = language === 'ar';

  const getFeatureText = (feature: typeof features[0], key: 'title' | 'description') => {
    if (feature.titleKey && key === 'title') {
      return getTranslation(feature.titleKey, language);
    }
    if (feature.descriptionKey && key === 'description') {
      return getTranslation(feature.descriptionKey, language);
    }
    if (feature[key] && typeof feature[key] === 'object') {
      return feature[key][language];
    }
    return '';
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl font-bold mb-4 text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('features.title', language)}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'منصة شاملة لإنشاء السير الذاتية المهنية المصممة خصيصاً للسوق السعودي'
              : 'Comprehensive platform for creating professional CVs designed specifically for the Saudi market'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-0 bg-gradient-to-br from-white to-gray-50/50">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  
                  <h3 className={`text-lg font-semibold mb-2 text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                    {getFeatureText(feature, 'title')}
                  </h3>
                  
                  <p className={`text-gray-600 text-sm leading-relaxed ${isRTL ? 'arabic-font' : 'english-font'}`}>
                    {getFeatureText(feature, 'description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}