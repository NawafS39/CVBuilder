'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Languages, 
  Plus, 
  Edit, 
  Trash2, 
  Globe,
  Award,
  Star
} from 'lucide-react';
import { useCVStore, type Language as LanguageType } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { v4 as uuidv4 } from 'uuid';

const commonLanguages = [
  'Arabic', 'English', 'French', 'Spanish', 'German', 'Mandarin', 'Japanese', 'Korean', 'Italian', 'Portuguese'
];

const proficiencyLevels = {
  en: ['Basic', 'Intermediate', 'Fluent', 'Native'],
  ar: ['أساسي', 'متوسط', 'طليق', 'اللغة الأم']
};

export default function LanguagesForm() {
  const { languages, addLanguage, updateLanguage, removeLanguage, language } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState<LanguageType>({
    id: '',
    name: '',
    proficiency: 'intermediate',
    certification: ''
  });

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      proficiency: 'intermediate',
      certification: ''
    });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name) return;

    const langData = {
      ...formData,
      id: editingId || uuidv4(),
    };

    if (editingId) {
      updateLanguage(editingId, langData);
    } else {
      addLanguage(langData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (lang: LanguageType) => {
    setFormData(lang);
    setEditingId(lang.id);
    setIsDialogOpen(true);
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'native': return 'bg-green-100 text-green-800 border-green-200';
      case 'fluent': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'basic': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getProficiencyText = (proficiency: string) => {
    const profIndex = ['basic', 'intermediate', 'fluent', 'native'].indexOf(proficiency);
    return proficiencyLevels[language][profIndex] || proficiency;
  };

  const getProficiencyStars = (proficiency: string) => {
    const levels = { basic: 1, intermediate: 2, fluent: 3, native: 4 };
    return levels[proficiency as keyof typeof levels] || 0;
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('section.languages', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أضف اللغات التي تتقنها مع مستوى الإتقان'
              : 'Add languages you speak with proficiency levels'
            }
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => resetForm()}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة لغة' : 'Add Language'}
            </Button>
          </DialogTrigger>
          
          <DialogContent className={`max-w-lg ${isRTL ? 'arabic-font' : 'english-font'}`}>
            <DialogHeader>
              <DialogTitle className={isRTL ? 'text-right' : ''}>
                {editingId 
                  ? (language === 'ar' ? 'تعديل اللغة' : 'Edit Language')
                  : (language === 'ar' ? 'إضافة لغة' : 'Add Language')
                }
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  <Globe className="h-4 w-4 inline mr-1" />
                  {language === 'ar' ? 'اللغة' : 'Language'} *
                </Label>
                <Select value={formData.name} onValueChange={(value) => setFormData({ ...formData, name: value })}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue placeholder={language === 'ar' ? 'اختر اللغة' : 'Select language'} />
                  </SelectTrigger>
                  <SelectContent>
                    {commonLanguages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  {language === 'ar' ? 'مستوى الإتقان' : 'Proficiency Level'} *
                </Label>
                <Select value={formData.proficiency} onValueChange={(value: 'basic' | 'intermediate' | 'fluent' | 'native') => setFormData({ ...formData, proficiency: value })}>
                  <SelectTrigger className={isRTL ? 'text-right' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.en.map((level, index) => (
                      <SelectItem key={level} value={level}>
                        {proficiencyLevels[language][index]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  <Award className="h-4 w-4 inline mr-1" />
                  {language === 'ar' ? 'الشهادة (اختياري)' : 'Certification (Optional)'}
                </Label>
                <Input
                  value={formData.certification || ''}
                  onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                  placeholder={language === 'ar' ? 'IELTS 7.5, TOEFL 100' : 'IELTS 7.5, TOEFL 100'}
                  className={isRTL ? 'text-right arabic-font' : 'english-font'}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingId 
                    ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes')
                    : (language === 'ar' ? 'إضافة اللغة' : 'Add Language')
                  }
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(false);
                  }}
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Languages List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((lang) => (
          <Card key={lang.id} className="transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <h3 className={`font-semibold text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                    {lang.name}
                  </h3>
                  
                  <div className={`flex items-center gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Badge className={getProficiencyColor(lang.proficiency)}>
                      {getProficiencyText(lang.proficiency)}
                    </Badge>
                    
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-3 w-3 ${
                            i < getProficiencyStars(lang.proficiency) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {lang.certification && (
                    <div className={`flex items-center gap-1 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Award className="h-3 w-3 text-blue-600" />
                      <span className="text-xs text-blue-600">{lang.certification}</span>
                    </div>
                  )}
                </div>
                
                <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(lang)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {languages.length > 2 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeLanguage(lang.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}