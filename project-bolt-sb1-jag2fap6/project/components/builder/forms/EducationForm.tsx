'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  MapPin,
  Building,
  Award
} from 'lucide-react';
import { useCVStore, type Education } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { v4 as uuidv4 } from 'uuid';

const saudiUniversities = [
  'King Saud University', 'King Abdulaziz University', 'King Fahd University of Petroleum and Minerals',
  'Princess Nourah bint Abdulrahman University', 'Imam Mohammad Ibn Saud Islamic University',
  'King Khalid University', 'Qassim University', 'King Faisal University', 'Taibah University'
];

const degreeTypes = {
  en: ['High School Diploma', 'Diploma', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD/Doctorate'],
  ar: ['الثانوية العامة', 'دبلوم', 'بكالوريوس', 'ماجستير', 'دكتوراه']
};

export default function EducationForm() {
  const { education, addEducation, updateEducation, removeEducation, language } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState<Education>({
    id: '',
    institution: '',
    degree: '',
    fieldOfStudy: '',
    gpa: '',
    gpaScale: '4.0',
    graduationDate: '',
    location: '',
    relevantCoursework: []
  });

  const resetForm = () => {
    setFormData({
      id: '',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      gpa: '',
      gpaScale: '4.0',
      graduationDate: '',
      location: '',
      relevantCoursework: []
    });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.institution || !formData.degree || !formData.fieldOfStudy) return;

    const eduData = {
      ...formData,
      id: editingId || uuidv4(),
    };

    if (editingId) {
      updateEducation(editingId, eduData);
    } else {
      addEducation(eduData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingId(edu.id);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('section.education', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أضف معلومات تعليمك وتأهيلك الأكاديمي'
              : 'Add your educational background and academic qualifications'
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
              {language === 'ar' ? 'إضافة تعليم' : 'Add Education'}
            </Button>
          </DialogTrigger>
          
          <DialogContent className={`max-w-2xl ${isRTL ? 'arabic-font' : 'english-font'}`}>
            <DialogHeader>
              <DialogTitle className={isRTL ? 'text-right' : ''}>
                {editingId 
                  ? (language === 'ar' ? 'تعديل المؤهل التعليمي' : 'Edit Education')
                  : (language === 'ar' ? 'إضافة مؤهل تعليمي' : 'Add Education')
                }
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Institution & Degree */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Building className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'المؤسسة التعليمية' : 'Institution'} *
                  </Label>
                  <Select value={formData.institution} onValueChange={(value) => setFormData({ ...formData, institution: value })}>
                    <SelectTrigger className={isRTL ? 'text-right' : ''}>
                      <SelectValue placeholder={language === 'ar' ? 'اختر الجامعة' : 'Select university'} />
                    </SelectTrigger>
                    <SelectContent>
                      {saudiUniversities.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <GraduationCap className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'الدرجة العلمية' : 'Degree'} *
                  </Label>
                  <Select value={formData.degree} onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                    <SelectTrigger className={isRTL ? 'text-right' : ''}>
                      <SelectValue placeholder={language === 'ar' ? 'اختر الدرجة' : 'Select degree'} />
                    </SelectTrigger>
                    <SelectContent>
                      {degreeTypes[language].map((degree, index) => (
                        <SelectItem key={degree} value={degreeTypes.en[index]}>
                          {degree}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Field of Study & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    {language === 'ar' ? 'التخصص' : 'Field of Study'} *
                  </Label>
                  <Input
                    value={formData.fieldOfStudy}
                    onChange={(e) => setFormData({ ...formData, fieldOfStudy: e.target.value })}
                    placeholder={language === 'ar' ? 'علوم الحاسب' : 'Computer Science'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

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
              </div>

              {/* GPA & Graduation Date */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Award className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'المعدل التراكمي' : 'GPA'}
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    placeholder="3.75"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    {language === 'ar' ? 'مقياس المعدل' : 'GPA Scale'}
                  </Label>
                  <Select value={formData.gpaScale} onValueChange={(value: '4.0' | '5.0') => setFormData({ ...formData, gpaScale: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4.0">4.0</SelectItem>
                      <SelectItem value="5.0">5.0</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'تاريخ التخرج' : 'Graduation Date'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.graduationDate}
                    onChange={(e) => setFormData({ ...formData, graduationDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingId 
                    ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes')
                    : (language === 'ar' ? 'إضافة المؤهل' : 'Add Education')
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

      {/* Education List */}
      <div className="space-y-4">
        {education.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-2 border-gray-200">
            <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'لا يوجد تعليم مضاف' : 'No education added'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'ar' 
                ? 'أضف مؤهلاتك التعليمية لتعزيز سيرتك الذاتية'
                : 'Add your educational qualifications to strengthen your CV'
              }
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة أول مؤهل' : 'Add First Education'}
            </Button>
          </Card>
        ) : (
          education.map((edu) => (
            <Card key={edu.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={isRTL ? 'text-right' : ''}>
                    <CardTitle className={`text-lg ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {edu.degree} - {edu.fieldOfStudy}
                    </CardTitle>
                    <div className={`flex items-center gap-2 text-gray-600 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Building className="h-4 w-4" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{edu.institution}</span>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {edu.gpa && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        GPA: {edu.gpa}/{edu.gpaScale}
                      </Badge>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(edu)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeEducation(edu.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Calendar className="h-3 w-3" />
                    <span>{edu.graduationDate}</span>
                  </div>
                  {edu.location && (
                    <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <MapPin className="h-3 w-3" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{edu.location}</span>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}