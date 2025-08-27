'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Building,
  GraduationCap,
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useCVStore } from '@/lib/store';

export default function LivePreview() {
  const { 
    personalInfo, 
    experience, 
    education, 
    skills, 
    languages, 
    certifications,
    language 
  } = useCVStore();
  const isRTL = language === 'ar';

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return dateString;
    }
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  return (
    <div className="h-full bg-gray-100 p-4 overflow-y-auto">
      <div className="mb-4 flex gap-2">
        <Button size="sm" className="bg-primary hover:bg-primary/90 flex-1">
          <Download className="h-4 w-4 mr-1" />
          {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
        </Button>
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* CV Preview */}
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8 space-y-6">
          {/* Header */}
          <div className={`border-b border-gray-200 pb-6 ${isRTL ? 'text-right' : ''}`}>
            <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {personalInfo.fullName || (language === 'ar' ? 'اسم المتقدم' : 'Your Name')}
            </h1>
            <p className={`text-xl text-primary mb-4 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {personalInfo.title || (language === 'ar' ? 'المسمى الوظيفي' : 'Professional Title')}
            </p>
            
            <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {personalInfo.email && (
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="h-4 w-4" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="h-4 w-4" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <MapPin className="h-4 w-4" />
                  <span className={isRTL ? 'arabic-font' : 'english-font'}>{personalInfo.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {personalInfo.summary && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'الملخص المهني' : 'Professional Summary'}
              </h2>
              <p className={`text-gray-700 leading-relaxed ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'الخبرة المهنية' : 'Professional Experience'}
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary/30 pl-4 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 bg-primary rounded-full border-2 border-white"></div>
                    
                    <h3 className={`font-semibold text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {exp.position}
                    </h3>
                    <div className={`flex items-center gap-2 text-gray-600 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Building className="h-4 w-4" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{exp.company}</span>
                      <span className="text-gray-400">•</span>
                      <span>{formatDate(exp.startDate)} - {exp.current ? (language === 'ar' ? 'حتى الآن' : 'Present') : formatDate(exp.endDate)}</span>
                    </div>
                    
                    {exp.description.length > 0 && (
                      <ul className="space-y-1 text-gray-700 text-sm">
                        {exp.description.map((desc, index) => (
                          <li key={index} className={`flex items-start gap-2 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                            <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 shrink-0"></span>
                            <span className={isRTL ? 'arabic-font' : 'english-font'}>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'التعليم' : 'Education'}
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-primary mt-1" />
                    <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <h3 className={`font-semibold text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {edu.degree} - {edu.fieldOfStudy}
                      </h3>
                      <p className={`text-gray-600 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {edu.institution}
                      </p>
                      <div className={`flex items-center gap-3 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span>{formatDate(edu.graduationDate)}</span>
                        {edu.gpa && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span>GPA: {edu.gpa}/{edu.gpaScale}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'المهارات' : 'Skills'}
              </h2>
              <div className="space-y-3">
                {['technical', 'soft'].map((category) => {
                  const categorySkills = getSkillsByCategory(category);
                  if (categorySkills.length === 0) return null;

                  return (
                    <div key={category}>
                      <h3 className={`font-medium text-gray-800 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {category === 'technical' 
                          ? (language === 'ar' ? 'المهارات التقنية' : 'Technical Skills')
                          : (language === 'ar' ? 'المهارات الشخصية' : 'Soft Skills')
                        }
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {categorySkills.map((skill) => (
                          <Badge key={skill.id} variant="outline" className="text-xs">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'اللغات' : 'Languages'}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <div key={lang.id} className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Globe className="h-4 w-4 text-primary" />
                    <div className={isRTL ? 'text-right' : ''}>
                      <span className={`font-medium ${isRTL ? 'arabic-font' : 'english-font'}`}>{lang.name}</span>
                      <p className="text-xs text-gray-500">
                        {lang.proficiency === 'native' ? (language === 'ar' ? 'اللغة الأم' : 'Native') :
                         lang.proficiency === 'fluent' ? (language === 'ar' ? 'طليق' : 'Fluent') :
                         lang.proficiency === 'intermediate' ? (language === 'ar' ? 'متوسط' : 'Intermediate') :
                         (language === 'ar' ? 'أساسي' : 'Basic')
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className={isRTL ? 'text-right' : ''}>
              <h2 className={`text-lg font-bold text-gray-900 mb-3 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                {language === 'ar' ? 'الشهادات' : 'Certifications'}
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Award className="h-4 w-4 text-primary shrink-0" />
                    <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                      <span className={`font-medium ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {cert.name}
                      </span>
                      <p className={`text-sm text-gray-600 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {cert.issuer} • {formatDate(cert.dateObtained)}
                      </p>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 text-blue-600" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}