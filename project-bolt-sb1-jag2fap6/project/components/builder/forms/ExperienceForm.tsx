'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Briefcase, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Building,
  Target,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { useCVStore, type Experience } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export default function ExperienceForm() {
  const { experience, addExperience, updateExperience, removeExperience, language } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState<Experience>({
    id: '',
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
    achievements: ['']
  });

  const resetForm = () => {
    setFormData({
      id: '',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
      achievements: ['']
    });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.company || !formData.position || !formData.startDate) return;

    const expData = {
      ...formData,
      id: editingId || uuidv4(),
      description: formData.description.filter(d => d.trim() !== ''),
      achievements: formData.achievements.filter(a => a.trim() !== '')
    };

    if (editingId) {
      updateExperience(editingId, expData);
    } else {
      addExperience(expData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingId(exp.id);
    setIsDialogOpen(true);
  };

  const addDescriptionPoint = () => {
    setFormData({
      ...formData,
      description: [...formData.description, '']
    });
  };

  const updateDescriptionPoint = (index: number, value: string) => {
    const updated = [...formData.description];
    updated[index] = value;
    setFormData({ ...formData, description: updated });
  };

  const removeDescriptionPoint = (index: number) => {
    setFormData({
      ...formData,
      description: formData.description.filter((_, i) => i !== index)
    });
  };

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const formatDateRange = (start: string, end: string, current: boolean) => {
    try {
      const startDate = format(parseISO(start), 'MMM yyyy');
      const endDate = current ? (language === 'ar' ? 'حتى الآن' : 'Present') : format(parseISO(end), 'MMM yyyy');
      return `${startDate} - ${endDate}`;
    } catch {
      return start && end ? `${start} - ${end}` : '';
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('section.experience', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أضف خبراتك المهنية مع التركيز على الإنجازات والنتائج'
              : 'Add your professional experience focusing on achievements and results'
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
              {language === 'ar' ? 'إضافة خبرة' : 'Add Experience'}
            </Button>
          </DialogTrigger>
          
          <DialogContent className={`max-w-2xl max-h-[90vh] overflow-y-auto ${isRTL ? 'arabic-font' : 'english-font'}`}>
            <DialogHeader>
              <DialogTitle className={isRTL ? 'text-right' : ''}>
                {editingId 
                  ? (language === 'ar' ? 'تعديل الخبرة المهنية' : 'Edit Work Experience')
                  : (language === 'ar' ? 'إضافة خبرة مهنية' : 'Add Work Experience')
                }
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Company & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Building className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'اسم الشركة' : 'Company Name'} *
                  </Label>
                  <Input
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={language === 'ar' ? 'أرامكو السعودية' : 'Saudi Aramco'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    {language === 'ar' ? 'المسمى الوظيفي' : 'Job Title'} *
                  </Label>
                  <Input
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    placeholder={language === 'ar' ? 'مطور برمجيات أول' : 'Senior Software Developer'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Location & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'الموقع' : 'Location'}
                  </Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={language === 'ar' ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'تاريخ البداية' : 'Start Date'} *
                  </Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    {language === 'ar' ? 'تاريخ الانتهاء' : 'End Date'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    disabled={formData.current}
                  />
                </div>
              </div>

              {/* Current Job Toggle */}
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Switch
                  checked={formData.current}
                  onCheckedChange={(checked) => setFormData({ ...formData, current: checked, endDate: checked ? '' : formData.endDate })}
                />
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  {language === 'ar' ? 'أعمل حالياً في هذا المنصب' : 'I currently work in this role'}
                </Label>
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    {language === 'ar' ? 'الوصف الوظيفي والمسؤوليات' : 'Job Description & Responsibilities'}
                  </Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addDescriptionPoint}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {language === 'ar' ? 'إضافة نقطة' : 'Add Point'}
                  </Button>
                </div>
                
                {formData.description.map((desc, index) => (
                  <div key={index} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Textarea
                      value={desc}
                      onChange={(e) => updateDescriptionPoint(index, e.target.value)}
                      placeholder={language === 'ar' 
                        ? 'قم بتطوير وصيانة تطبيقات الويب باستخدام React وNode.js...'
                        : 'Develop and maintain web applications using React and Node.js...'
                      }
                      className={`flex-1 min-h-20 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {formData.description.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeDescriptionPoint(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Save Button */}
              <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingId 
                    ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes')
                    : (language === 'ar' ? 'إضافة الخبرة' : 'Add Experience')
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

      {/* Experience List */}
      <div className="space-y-4">
        {experience.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-2 border-gray-200">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'لا توجد خبرات مهنية' : 'No work experience added'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'ar' 
                ? 'ابدأ بإضافة خبراتك المهنية لتحسين سيرتك الذاتية'
                : 'Start adding your work experience to improve your CV'
              }
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة أول خبرة' : 'Add First Experience'}
            </Button>
          </Card>
        ) : (
          experience.map((exp) => (
            <Card key={exp.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <CardTitle className={`text-lg ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {exp.position}
                    </CardTitle>
                    <div className={`flex items-center gap-2 text-gray-600 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Building className="h-4 w-4" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{exp.company}</span>
                      {exp.current && (
                        <Badge variant="secondary" className="ml-2">
                          {language === 'ar' ? 'حالياً' : 'Current'}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleExpanded(exp.id)}
                    >
                      {expandedItems.has(exp.id) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(exp)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{formatDateRange(exp.startDate, exp.endDate, exp.current)}</span>
                  </div>
                  {exp.location && (
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="h-3 w-3" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{exp.location}</span>
                    </div>
                  )}
                </div>
              </CardHeader>

              {expandedItems.has(exp.id) && (
                <CardContent className="pt-0">
                  {exp.description.length > 0 && (
                    <div className="space-y-2">
                      <h4 className={`font-medium text-gray-900 ${isRTL ? 'arabic-font text-right' : 'english-font'}`}>
                        {language === 'ar' ? 'المسؤوليات:' : 'Responsibilities:'}
                      </h4>
                      <ul className={`space-y-1 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}>
                        {exp.description.map((desc, index) => (
                          <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                            <Target className="h-3 w-3 text-primary mt-1 shrink-0" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.achievements.length > 0 && (
                    <div className="space-y-2 mt-4">
                      <h4 className={`font-medium text-gray-900 ${isRTL ? 'arabic-font text-right' : 'english-font'}`}>
                        {language === 'ar' ? 'الإنجازات:' : 'Achievements:'}
                      </h4>
                      <ul className={`space-y-1 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}>
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                            <Target className="h-3 w-3 text-accent mt-1 shrink-0" />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>

      {/* Tips Card */}
      {experience.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-4">
            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Target className="h-5 w-5 text-yellow-600 mt-1" />
              <div className={isRTL ? 'text-right' : ''}>
                <h4 className={`font-medium text-yellow-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                  {language === 'ar' ? 'نصائح لتحسين ATS' : 'ATS Optimization Tips'}
                </h4>
                <ul className={`text-sm text-yellow-800 space-y-1 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                  <li>• {language === 'ar' ? 'استخدم أرقام ونتائج محددة' : 'Use specific numbers and results'}</li>
                  <li>• {language === 'ar' ? 'أضف كلمات مفتاحية من الوصف الوظيفي' : 'Include keywords from job descriptions'}</li>
                  <li>• {language === 'ar' ? 'ابدأ كل نقطة بفعل قوي' : 'Start each bullet with a strong action verb'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}