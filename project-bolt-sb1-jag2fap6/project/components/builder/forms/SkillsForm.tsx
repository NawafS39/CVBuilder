'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Plus, 
  X, 
  Lightbulb,
  Cpu,
  Users,
  Languages
} from 'lucide-react';
import { useCVStore, type Skill } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { v4 as uuidv4 } from 'uuid';

const skillSuggestions = {
  technical: {
    en: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'MongoDB'],
    ar: ['جافا سكريبت', 'بايثون', 'React', 'Node.js', 'SQL', 'AWS', 'Docker', 'Git', 'TypeScript', 'MongoDB']
  },
  soft: {
    en: ['Leadership', 'Communication', 'Problem Solving', 'Team Management', 'Project Management', 'Critical Thinking'],
    ar: ['القيادة', 'التواصل', 'حل المشكلات', 'إدارة الفرق', 'إدارة المشاريع', 'التفكير النقدي']
  }
};

const skillLevels = {
  en: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
  ar: ['مبتدئ', 'متوسط', 'متقدم', 'خبير']
};

export default function SkillsForm() {
  const { skills, addSkill, updateSkill, removeSkill, language } = useCVStore();
  const [newSkill, setNewSkill] = useState({ name: '', category: 'technical' as const, level: 'intermediate' as const });
  const isRTL = language === 'ar';

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) return;

    addSkill({
      id: uuidv4(),
      ...newSkill,
      name: newSkill.name.trim()
    });

    setNewSkill({ name: '', category: 'technical', level: 'intermediate' });
  };

  const addSuggestedSkill = (skillName: string, category: 'technical' | 'soft') => {
    addSkill({
      id: uuidv4(),
      name: skillName,
      category,
      level: 'intermediate'
    });
  };

  const getSkillsByCategory = (category: string) => {
    return skills.filter(skill => skill.category === category);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <Cpu className="h-4 w-4" />;
      case 'soft': return <Users className="h-4 w-4" />;
      case 'language': return <Languages className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    const titles = {
      technical: { en: 'Technical Skills', ar: 'المهارات التقنية' },
      soft: { en: 'Soft Skills', ar: 'المهارات الشخصية' },
      language: { en: 'Language Skills', ar: 'مهارات اللغة' }
    };
    return titles[category as keyof typeof titles]?.[language] || category;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-green-100 text-green-800 border-green-200';
      case 'advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'beginner': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelText = (level: string) => {
    const levelIndex = ['beginner', 'intermediate', 'advanced', 'expert'].indexOf(level);
    return skillLevels[language][levelIndex] || level;
  };

  return (
    <div className="space-y-6">
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
          {getTranslation('section.skills', language)}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'أضف مهاراتك التقنية والشخصية مع تحديد مستوى الخبرة'
            : 'Add your technical and soft skills with proficiency levels'
          }
        </p>
      </div>

      {/* Add New Skill */}
      <Card className="form-field">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <Plus className="h-5 w-5" />
            {language === 'ar' ? 'إضافة مهارة جديدة' : 'Add New Skill'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 space-y-2">
              <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'اسم المهارة' : 'Skill Name'} *
              </Label>
              <Input
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder={language === 'ar' ? 'JavaScript' : 'JavaScript'}
                className={isRTL ? 'text-right arabic-font' : 'english-font'}
                dir={isRTL ? 'rtl' : 'ltr'}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
            </div>

            <div className="space-y-2">
              <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'الفئة' : 'Category'}
              </Label>
              <Select value={newSkill.category} onValueChange={(value: 'technical' | 'soft' | 'language') => setNewSkill({ ...newSkill, category: value })}>
                <SelectTrigger className={isRTL ? 'text-right' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">{language === 'ar' ? 'تقني' : 'Technical'}</SelectItem>
                  <SelectItem value="soft">{language === 'ar' ? 'شخصي' : 'Soft'}</SelectItem>
                  <SelectItem value="language">{language === 'ar' ? 'لغة' : 'Language'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'المستوى' : 'Level'}
              </Label>
              <Select value={newSkill.level} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced' | 'expert') => setNewSkill({ ...newSkill, level: value })}>
                <SelectTrigger className={isRTL ? 'text-right' : ''}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.en.map((level, index) => (
                    <SelectItem key={level} value={level}>
                      {skillLevels[language][index]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleAddSkill} className="w-full bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة المهارة' : 'Add Skill'}
          </Button>
        </CardContent>
      </Card>

      {/* Skills by Category */}
      {['technical', 'soft', 'language'].map((category) => {
        const categorySkills = getSkillsByCategory(category);
        if (categorySkills.length === 0) return null;

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
                {getCategoryIcon(category)}
                {getCategoryTitle(category)}
                <Badge variant="outline">{categorySkills.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className={`group relative`}>
                    <Badge 
                      variant="outline"
                      className={`${getLevelColor(skill.level)} cursor-pointer ${isRTL ? 'arabic-font' : 'english-font'}`}
                    >
                      {skill.name} 
                      <span className="ml-2 text-xs">({getLevelText(skill.level)})</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="ml-2 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Skill Suggestions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <Lightbulb className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'اقتراحات المهارات' : 'Skill Suggestions'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className={`font-medium text-blue-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'المهارات التقنية الشائعة' : 'Popular Technical Skills'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions.technical[language].map((skill, index) => (
                <Button
                  key={skill}
                  size="sm"
                  variant="outline"
                  onClick={() => addSuggestedSkill(skillSuggestions.technical.en[index], 'technical')}
                  className="text-xs"
                  disabled={skills.some(s => s.name === skillSuggestions.technical.en[index])}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className={`font-medium text-blue-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'المهارات الشخصية المطلوبة' : 'In-Demand Soft Skills'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {skillSuggestions.soft[language].map((skill, index) => (
                <Button
                  key={skill}
                  size="sm"
                  variant="outline"
                  onClick={() => addSuggestedSkill(skillSuggestions.soft.en[index], 'soft')}
                  className="text-xs"
                  disabled={skills.some(s => s.name === skillSuggestions.soft.en[index])}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}