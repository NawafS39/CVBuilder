'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Award, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  Building,
  ExternalLink,
  Shield
} from 'lucide-react';
import { useCVStore, type Certification } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { format, parseISO } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const popularCertifications = {
  en: [
    'AWS Certified Solutions Architect',
    'PMP - Project Management Professional',
    'Certified ScrumMaster (CSM)',
    'Microsoft Azure Fundamentals',
    'Google Analytics Certified',
    'Salesforce Administrator',
    'CISSP - Information Security',
    'Oracle Database Administrator',
    'Cisco CCNA',
    'Six Sigma Green Belt'
  ],
  ar: [
    'مهندس حلول AWS معتمد',
    'محترف إدارة المشاريع PMP',
    'ماستر سكرام معتمد',
    'أساسيات مايكروسوفت أزور',
    'معتمد جوجل أناليتكس',
    'مدير سيلزفورس',
    'CISSP أمن المعلومات',
    'مدير قاعدة بيانات أوراكل',
    'سيسكو CCNA',
    'حزام أخضر Six Sigma'
  ]
};

export default function CertificationsForm() {
  const { certifications, addCertification, updateCertification, removeCertification, language } = useCVStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState<Certification>({
    id: '',
    name: '',
    issuer: '',
    dateObtained: '',
    expiryDate: '',
    credentialId: '',
    url: ''
  });

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      issuer: '',
      dateObtained: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.name || !formData.issuer || !formData.dateObtained) return;

    const certData = {
      ...formData,
      id: editingId || uuidv4(),
    };

    if (editingId) {
      updateCertification(editingId, certData);
    } else {
      addCertification(certData);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (cert: Certification) => {
    setFormData(cert);
    setEditingId(cert.id);
    setIsDialogOpen(true);
  };

  const addSuggestedCertification = (certName: string, index: number) => {
    const commonIssuers = {
      'AWS Certified Solutions Architect': 'Amazon Web Services',
      'PMP - Project Management Professional': 'Project Management Institute',
      'Certified ScrumMaster (CSM)': 'Scrum Alliance',
      'Microsoft Azure Fundamentals': 'Microsoft',
      'Google Analytics Certified': 'Google',
      'Salesforce Administrator': 'Salesforce',
      'CISSP - Information Security': '(ISC)²',
      'Oracle Database Administrator': 'Oracle',
      'Cisco CCNA': 'Cisco',
      'Six Sigma Green Belt': 'ASQ'
    };

    setFormData({
      id: '',
      name: popularCertifications.en[index],
      issuer: commonIssuers[popularCertifications.en[index] as keyof typeof commonIssuers] || '',
      dateObtained: '',
      expiryDate: '',
      credentialId: '',
      url: ''
    });
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const isExpired = (expiryDate: string) => {
    if (!expiryDate) return false;
    try {
      return new Date(expiryDate) < new Date();
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('section.certifications', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أضف شهاداتك المهنية والتدريبية لتعزيز ملفك الوظيفي'
              : 'Add your professional certifications and training credentials'
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
              {language === 'ar' ? 'إضافة شهادة' : 'Add Certification'}
            </Button>
          </DialogTrigger>
          
          <DialogContent className={`max-w-2xl ${isRTL ? 'arabic-font' : 'english-font'}`}>
            <DialogHeader>
              <DialogTitle className={isRTL ? 'text-right' : ''}>
                {editingId 
                  ? (language === 'ar' ? 'تعديل الشهادة' : 'Edit Certification')
                  : (language === 'ar' ? 'إضافة شهادة' : 'Add Certification')
                }
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Certification Name & Issuer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Award className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'اسم الشهادة' : 'Certification Name'} *
                  </Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={language === 'ar' ? 'مهندس حلول AWS معتمد' : 'AWS Certified Solutions Architect'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Building className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'الجهة المصدرة' : 'Issuing Organization'} *
                  </Label>
                  <Input
                    value={formData.issuer}
                    onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                    placeholder={language === 'ar' ? 'أمازون ويب سيرفيسز' : 'Amazon Web Services'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'تاريخ الحصول' : 'Date Obtained'} *
                  </Label>
                  <Input
                    type="date"
                    value={formData.dateObtained}
                    onChange={(e) => setFormData({ ...formData, dateObtained: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'تاريخ الانتهاء (اختياري)' : 'Expiry Date (Optional)'}
                  </Label>
                  <Input
                    type="date"
                    value={formData.expiryDate || ''}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Credential ID & URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Shield className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'رقم الشهادة' : 'Credential ID'}
                  </Label>
                  <Input
                    value={formData.credentialId || ''}
                    onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                    placeholder="ABC123456789"
                    className="english-font"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <ExternalLink className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'رابط التحقق' : 'Verification URL'}
                  </Label>
                  <Input
                    value={formData.url || ''}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://www.credly.com/badges/..."
                    className="english-font"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className={`flex gap-3 pt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                  {editingId 
                    ? (language === 'ar' ? 'حفظ التعديلات' : 'Save Changes')
                    : (language === 'ar' ? 'إضافة الشهادة' : 'Add Certification')
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

      {/* Certifications List */}
      <div className="space-y-4">
        {certifications.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-2 border-gray-200">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'لا توجد شهادات مضافة' : 'No certifications added'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'ar' 
                ? 'أضف شهاداتك المهنية لتعزيز ملفك الوظيفي'
                : 'Add your professional certifications to enhance your profile'
              }
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة أول شهادة' : 'Add First Certification'}
            </Button>
          </Card>
        ) : (
          certifications.map((cert) => (
            <Card key={cert.id} className="transition-all duration-200 hover:shadow-md">
              <CardContent className="p-4">
                <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <h3 className={`font-semibold text-gray-900 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                        {cert.name}
                      </h3>
                      {cert.expiryDate && isExpired(cert.expiryDate) && (
                        <Badge variant="destructive" className="text-xs">
                          {language === 'ar' ? 'منتهية الصلاحية' : 'Expired'}
                        </Badge>
                      )}
                      {cert.expiryDate && !isExpired(cert.expiryDate) && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          {language === 'ar' ? 'نشطة' : 'Active'}
                        </Badge>
                      )}
                    </div>
                    
                    <div className={`flex items-center gap-2 text-gray-600 mb-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Building className="h-4 w-4" />
                      <span className={isRTL ? 'arabic-font' : 'english-font'}>{cert.issuer}</span>
                    </div>

                    <div className={`flex items-center gap-4 text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        <span>
                          {formatDate(cert.dateObtained)}
                          {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                        </span>
                      </div>
                      {cert.credentialId && (
                        <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Shield className="h-3 w-3" />
                          <span className="font-mono text-xs">{cert.credentialId}</span>
                        </div>
                      )}
                    </div>

                    {cert.url && (
                      <div className={`mt-2 ${isRTL ? 'text-right' : ''}`}>
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          {language === 'ar' ? 'التحقق من الشهادة' : 'Verify Certificate'}
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(cert)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeCertification(cert.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Popular Certifications Suggestions */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <Award className="h-5 w-5 text-blue-600" />
            {language === 'ar' ? 'الشهادات الشائعة' : 'Popular Certifications'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {popularCertifications[language].map((cert, index) => (
              <Button
                key={cert}
                size="sm"
                variant="outline"
                onClick={() => addSuggestedCertification(cert, index)}
                className={`text-xs justify-start ${isRTL ? 'text-right arabic-font' : 'english-font'}`}
                disabled={certifications.some(c => c.name === popularCertifications.en[index])}
              >
                <Plus className="h-3 w-3 mr-1" />
                {cert}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      {certifications.length > 0 && (
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Shield className="h-5 w-5 text-green-600 mt-1" />
              <div className={isRTL ? 'text-right' : ''}>
                <h4 className={`font-medium text-green-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                  {language === 'ar' ? 'نصائح للشهادات' : 'Certification Tips'}
                </h4>
                <ul className={`text-sm text-green-800 space-y-1 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                  <li>• {language === 'ar' ? 'أضف فقط الشهادات ذات الصلة بمجالك' : 'Only include certifications relevant to your field'}</li>
                  <li>• {language === 'ar' ? 'تأكد من صحة تواريخ انتهاء الصلاحية' : 'Verify expiry dates are accurate'}</li>
                  <li>• {language === 'ar' ? 'أضف روابط التحقق عند توفرها' : 'Include verification links when available'}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}