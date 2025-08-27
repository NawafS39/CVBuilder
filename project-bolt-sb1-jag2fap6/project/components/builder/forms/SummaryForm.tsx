'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Lightbulb, Zap, Target } from 'lucide-react';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

export default function SummaryForm() {
  const { personalInfo, updatePersonalInfo, language } = useCVStore();
  const [suggestions] = useState([
    {
      en: 'Results-driven software engineer with 5+ years of experience in full-stack development...',
      ar: 'مهندس برمجيات موجه للنتائج مع أكثر من 5 سنوات خبرة في التطوير الشامل...'
    },
    {
      en: 'Dynamic marketing professional specializing in digital transformation and brand growth...',
      ar: 'متخصص تسويق ديناميكي يختص في التحول الرقمي ونمو العلامة التجارية...'
    },
    {
      en: 'Accomplished project manager with proven track record of delivering complex projects...',
      ar: 'مدير مشاريع ماهر مع سجل مؤكد في تسليم المشاريع المعقدة...'
    }
  ]);
  const isRTL = language === 'ar';
  const wordCount = personalInfo.summary?.split(' ').filter(word => word.trim() !== '').length || 0;
  const minWords = 50;
  const maxWords = 150;

  const handleSummaryChange = (value: string) => {
    updatePersonalInfo({ summary: value });
  };

  const useSuggestion = (suggestion: { en: string; ar: string }) => {
    handleSummaryChange(suggestion[language]);
  };

  const getQualityScore = () => {
    if (wordCount < minWords) return { score: 'weak', color: 'text-red-500', text: language === 'ar' ? 'ضعيف' : 'Weak' };
    if (wordCount < maxWords) return { score: 'good', color: 'text-yellow-500', text: language === 'ar' ? 'جيد' : 'Good' };
    return { score: 'excellent', color: 'text-green-500', text: language === 'ar' ? 'ممتاز' : 'Excellent' };
  };

  const quality = getQualityScore();

  return (
    <div className="space-y-6">
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
          {getTranslation('section.summary', language)}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'اكتب ملخصاً مهنياً يجذب انتباه مسؤولي التوظيف'
            : 'Write a compelling professional summary that grabs recruiters\' attention'
          }
        </p>
      </div>

      {/* Writing Guidelines */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Lightbulb className="h-5 w-5 text-blue-600 mt-1" />
            <div className={isRTL ? 'text-right' : ''}>
              <h4 className={`font-medium text-blue-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'نصائح للكتابة' : 'Writing Tips'}
              </h4>
              <ul className={`text-sm text-blue-800 space-y-1 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                <li>• {language === 'ar' ? 'ابدأ بسنوات خبرتك ومجال تخصصك' : 'Start with years of experience and field'}</li>
                <li>• {language === 'ar' ? 'أذكر 2-3 من إنجازاتك الرئيسية' : 'Mention 2-3 key achievements'}</li>
                <li>• {language === 'ar' ? 'استخدم كلمات مفتاحية من الوصف الوظيفي' : 'Use keywords from job descriptions'}</li>
                <li>• {language === 'ar' ? 'اجعله موجزاً بين 50-150 كلمة' : 'Keep it concise: 50-150 words'}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Editor */}
      <Card className="form-field">
        <CardHeader>
          <CardTitle className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <FileText className="h-5 w-5" />
              <span className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'الملخص المهني' : 'Professional Summary'}
              </span>
            </div>
            <Badge variant={quality.score === 'excellent' ? 'default' : quality.score === 'good' ? 'secondary' : 'destructive'}>
              <Target className="h-3 w-3 mr-1" />
              {quality.text}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Label htmlFor="summary" className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'اكتب ملخصك المهني' : 'Write your professional summary'}
              </Label>
              <span className={`text-sm ${quality.color} font-medium`}>
                {wordCount}/{maxWords} {language === 'ar' ? 'كلمة' : 'words'}
              </span>
            </div>
            <Textarea
              id="summary"
              value={personalInfo.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder={language === 'ar' 
                ? 'مطور برمجيات متمرس مع أكثر من 5 سنوات خبرة في تطوير التطبيقات الويب باستخدام React وNode.js. خبرة واسعة في قيادة الفرق وإدارة المشاريع التقنية في البيئة السعودية...'
                : 'Experienced software developer with 5+ years in web application development using React and Node.js. Extensive experience leading teams and managing technical projects in the Saudi environment...'
              }
              className={`min-h-32 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div className={`flex items-center justify-between text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>
              {language === 'ar' ? 'الحد الأدنى: 50 كلمة' : 'Minimum: 50 words'}
            </span>
            <span>
              {language === 'ar' ? 'موصى به: 100-120 كلمة' : 'Recommended: 100-120 words'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <Zap className="h-5 w-5 text-yellow-500" />
            {language === 'ar' ? 'اقتراحات ذكية' : 'Smart Suggestions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
              <div className={`flex justify-between items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <p className={`text-sm text-gray-700 flex-1 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}>
                  {suggestion[language].substring(0, 80)}...
                </p>
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => useSuggestion(suggestion)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  {language === 'ar' ? 'استخدام' : 'Use'}
                </Button>
              </div>
            </div>
          ))}
          
          <Button variant="outline" className="w-full mt-4">
            <Zap className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'المزيد من الاقتراحات' : 'More Suggestions'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}