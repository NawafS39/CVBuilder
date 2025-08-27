export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.builder': 'CV Builder',
    'nav.templates': 'Templates',
    'nav.examples': 'Examples',
    'nav.language': 'العربية',
    
    // Hero Section
    'hero.title': 'Build Your Professional CV for the Saudi Job Market',
    'hero.subtitle': 'Create ATS-friendly resumes tailored for Saudi Arabia and the Gulf region. Used by thousands of professionals to land their dream jobs.',
    'hero.cta.primary': 'Build Your CV Free',
    'hero.cta.secondary': 'View Templates',
    
    // Features
    'features.title': 'Why Choose Our CV Builder?',
    'features.ats.title': 'ATS-Optimized',
    'features.ats.description': 'Beat applicant tracking systems with optimized formatting',
    'features.bilingual.title': 'Bilingual Support',
    'features.bilingual.description': 'Full Arabic and English support with RTL layout',
    'features.templates.title': 'Professional Templates',
    'features.templates.description': 'Saudi market-focused designs used by HR professionals',
    'features.ai.title': 'AI-Powered Suggestions',
    'features.ai.description': 'Smart content recommendations based on your industry',
    
    // CV Sections
    'section.personal': 'Personal Information',
    'section.summary': 'Professional Summary',
    'section.experience': 'Work Experience',
    'section.education': 'Education',
    'section.skills': 'Skills',
    'section.languages': 'Languages',
    'section.certifications': 'Certifications',
    'section.projects': 'Projects',
    
    // Form Fields
    'field.fullName': 'Full Name',
    'field.fullNameAr': 'Full Name (Arabic)',
    'field.email': 'Email Address',
    'field.phone': 'Phone Number',
    'field.location': 'Location',
    'field.title': 'Professional Title',
    
    // Common
    'button.save': 'Save',
    'button.next': 'Next',
    'button.previous': 'Previous',
    'button.download': 'Download PDF',
    'completion': 'Completion',
    'ats.score': 'ATS Score',
  },
  ar: {
    // Navigation  
    'nav.home': 'الرئيسية',
    'nav.builder': 'منشئ السيرة الذاتية',
    'nav.templates': 'القوالب',
    'nav.examples': 'أمثلة',
    'nav.language': 'English',
    
    // Hero Section
    'hero.title': 'اصنع سيرتك الذاتية المهنية للسوق السعودي',
    'hero.subtitle': 'أنشئ سيرة ذاتية متوافقة مع أنظمة التتبع ومصممة خصيصاً للمملكة العربية السعودية ودول الخليج. استخدمها آلاف المهنيين للحصول على وظائف أحلامهم.',
    'hero.cta.primary': 'اصنع سيرتك الذاتية مجاناً',
    'hero.cta.secondary': 'تصفح القوالب',
    
    // Features
    'features.title': 'لماذا تختار منشئ السيرة الذاتية الخاص بنا؟',
    'features.ats.title': 'محسّن لأنظمة التتبع',
    'features.ats.description': 'تغلب على أنظمة تتبع المتقدمين بتنسيق محسّن',
    'features.bilingual.title': 'دعم ثنائي اللغة',
    'features.bilingual.description': 'دعم كامل للعربية والإنجليزية مع تخطيط من اليمين لليسار',
    'features.templates.title': 'قوالب احترافية',
    'features.templates.description': 'تصاميم مركزة على السوق السعودي يستخدمها متخصصو الموارد البشرية',
    'features.ai.title': 'اقتراحات مدعومة بالذكاء الاصطناعي',
    'features.ai.description': 'توصيات محتوى ذكية بناءً على مجال عملك',
    
    // CV Sections
    'section.personal': 'المعلومات الشخصية',
    'section.summary': 'الملخص المهني',
    'section.experience': 'الخبرة المهنية',
    'section.education': 'التعليم',
    'section.skills': 'المهارات',
    'section.languages': 'اللغات',
    'section.certifications': 'الشهادات',
    'section.projects': 'المشاريع',
    
    // Form Fields
    'field.fullName': 'الاسم الكامل',
    'field.fullNameAr': 'الاسم الكامل (بالعربية)',
    'field.email': 'البريد الإلكتروني',
    'field.phone': 'رقم الهاتف',
    'field.location': 'الموقع',
    'field.title': 'المسمى المهني',
    
    // Common
    'button.save': 'حفظ',
    'button.next': 'التالي',
    'button.previous': 'السابق',
    'button.download': 'تحميل PDF',
    'completion': 'نسبة الإكمال',
    'ats.score': 'نقاط ATS',
  }
};

export type Language = 'ar' | 'en';

export function getTranslation(key: string, language: Language): string {
  return translations[language][key as keyof typeof translations.en] || key;
}

export const isRTL = (language: Language): boolean => language === 'ar';