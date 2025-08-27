'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Languages, 
  Award, 
  FolderOpen,
  CheckCircle,
  Circle,
  Target,
  TrendingUp
} from 'lucide-react';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

const sections = [
  { id: 'personal', icon: User, key: 'section.personal' },
  { id: 'summary', icon: FileText, key: 'section.summary' },
  { id: 'experience', icon: Briefcase, key: 'section.experience' },
  { id: 'education', icon: GraduationCap, key: 'section.education' },
  { id: 'skills', icon: Code, key: 'section.skills' },
  { id: 'languages', icon: Languages, key: 'section.languages' },
  { id: 'certifications', icon: Award, key: 'section.certifications' },
  { id: 'projects', icon: FolderOpen, key: 'section.projects' },
];

export default function Sidebar() {
  const { 
    language, 
    currentSection, 
    setCurrentSection, 
    completionPercentage, 
    atsScore,
    personalInfo,
    experience,
    education,
    skills,
    languages,
    certifications
  } = useCVStore();
  const isRTL = language === 'ar';

  const getSectionCompletion = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'personal':
        return !!(personalInfo.fullName && personalInfo.email && personalInfo.phone && personalInfo.title);
      case 'summary':
        return !!(personalInfo.summary && personalInfo.summary.length >= 100);
      case 'experience':
        return experience.length > 0;
      case 'education':
        return education.length > 0;
      case 'skills':
        return skills.length >= 3;
      case 'languages':
        return languages.length >= 2;
      case 'certifications':
        return certifications.length > 0;
      case 'projects':
        return false; // TODO: Add projects to store
      default:
        return false;
    }
  };

  const getATSScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-500';
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <h2 className={`text-xl font-bold text-gray-900 mb-4 ${isRTL ? 'arabic-font text-right' : 'english-font'}`}>
          {language === 'ar' ? 'منشئ السيرة الذاتية' : 'CV Builder'}
        </h2>
        
        {/* Progress Card */}
        <Card className="p-4 bg-gradient-to-r from-green-50 to-yellow-50 border-green-200">
          <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">
                {getTranslation('completion', language)}
              </p>
              <p className="text-2xl font-bold text-primary">
                {completionPercentage}%
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <Progress value={completionPercentage} className="h-2 mb-3" />
        </Card>

        {/* ATS Score */}
        <Card className="p-4 mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className={isRTL ? 'text-right' : ''}>
              <p className="text-sm text-gray-600">
                {getTranslation('ats.score', language)}
              </p>
              <p className={`text-2xl font-bold ${getATSScoreColor(atsScore)}`}>
                {atsScore}/100
              </p>
            </div>
            <Target className={`h-8 w-8 ${getATSScoreColor(atsScore)}`} />
          </div>
          <div className="mt-2">
            <Badge 
              variant={atsScore >= 80 ? 'default' : atsScore >= 60 ? 'secondary' : 'destructive'}
              className="text-xs"
            >
              {atsScore >= 80 ? (language === 'ar' ? 'ممتاز' : 'Excellent') : 
               atsScore >= 60 ? (language === 'ar' ? 'جيد' : 'Good') : 
               (language === 'ar' ? 'يحتاج تحسين' : 'Needs Work')}
            </Badge>
          </div>
        </Card>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {sections.map((section) => {
            const isCompleted = getSectionCompletion(section.id);
            const isActive = currentSection === section.id;
            
            return (
              <Button
                key={section.id}
                variant={isActive ? 'default' : 'ghost'}
                className={`
                  w-full justify-start h-auto p-4 
                  ${isActive ? 'bg-primary text-white' : 'hover:bg-gray-50'}
                  ${isRTL ? 'flex-row-reverse text-right' : ''}
                `}
                onClick={() => setCurrentSection(section.id)}
              >
                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <section.icon className="h-5 w-5" />
                  <div className="flex-1">
                    <div className={`font-medium ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {getTranslation(section.key, language)}
                    </div>
                  </div>
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-100 space-y-3">
        <Button className="w-full bg-primary hover:bg-primary/90">
          {language === 'ar' ? 'معاينة السيرة الذاتية' : 'Preview CV'}
        </Button>
        <Button variant="outline" className="w-full">
          {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
}