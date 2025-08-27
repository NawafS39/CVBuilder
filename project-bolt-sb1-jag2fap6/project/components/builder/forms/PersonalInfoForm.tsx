'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, MapPin, Phone, Mail, LinkedIn, Globe } from 'lucide-react';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';

const saudiCities = [
  'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran',
  'Taif', 'Buraidah', 'Tabuk', 'Hail', 'Khamis Mushait', 'Najran', 'Jazan'
];

const nationalities = [
  'Saudi', 'Egyptian', 'Pakistani', 'Indian', 'Bangladeshi', 'Filipino',
  'Jordanian', 'Palestinian', 'Lebanese', 'Syrian', 'Sudanese', 'Yemeni'
];

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo, language } = useCVStore();
  const isRTL = language === 'ar';

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className={isRTL ? 'text-right' : ''}>
        <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
          {getTranslation('section.personal', language)}
        </h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'ابدأ بإدخال معلوماتك الشخصية الأساسية'
            : 'Start by entering your basic personal information'
          }
        </p>
      </div>

      {/* Profile Photo */}
      <Card className="form-field">
        <CardContent className="p-6">
          <div className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Avatar className="w-24 h-24">
              <AvatarImage src={personalInfo.profilePhoto} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {personalInfo.fullName.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className={isRTL ? 'text-right' : ''}>
              <Button variant="outline" className="mb-2">
                <Upload className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'رفع صورة' : 'Upload Photo'}
              </Button>
              <p className="text-xs text-gray-500">
                {language === 'ar' 
                  ? 'اختياري - صورة احترافية بحجم أقصى 2MB'
                  : 'Optional - Professional photo, max 2MB'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Information */}
      <Card className="form-field">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <User className="h-5 w-5" />
            {language === 'ar' ? 'المعلومات الأساسية' : 'Basic Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className={isRTL ? 'arabic-font' : 'english-font'}>
                {getTranslation('field.fullName', language)} *
              </Label>
              <Input
                id="fullName"
                value={personalInfo.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder={language === 'ar' ? 'أحمد محمد العلي' : 'Ahmed Mohammed AlAli'}
                className={isRTL ? 'text-right arabic-font' : 'english-font'}
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
            
            {language === 'ar' && (
              <div className="space-y-2">
                <Label htmlFor="fullNameEn" className="english-font">
                  Full Name (English)
                </Label>
                <Input
                  id="fullNameEn"
                  value={personalInfo.fullNameAr}
                  onChange={(e) => handleInputChange('fullNameAr', e.target.value)}
                  placeholder="Ahmed Mohammed AlAli"
                  className="english-font"
                  dir="ltr"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className={isRTL ? 'arabic-font' : 'english-font'}>
              {getTranslation('field.title', language)} *
            </Label>
            <Input
              id="title"
              value={personalInfo.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder={language === 'ar' ? 'مطور برمجيات أول' : 'Senior Software Developer'}
              className={isRTL ? 'text-right arabic-font' : 'english-font'}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nationality" className={isRTL ? 'arabic-font' : 'english-font'}>
                {language === 'ar' ? 'الجنسية' : 'Nationality'} *
              </Label>
              <Select value={personalInfo.nationality} onValueChange={(value) => handleInputChange('nationality', value)}>
                <SelectTrigger className={isRTL ? 'text-right arabic-font' : 'english-font'}>
                  <SelectValue placeholder={language === 'ar' ? 'اختر الجنسية' : 'Select nationality'} />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality}>
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className={isRTL ? 'arabic-font' : 'english-font'}>
                <MapPin className="h-4 w-4 inline mr-1" />
                {getTranslation('field.location', language)} *
              </Label>
              <Select value={personalInfo.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger className={isRTL ? 'text-right arabic-font' : 'english-font'}>
                  <SelectValue placeholder={language === 'ar' ? 'اختر المدينة' : 'Select city'} />
                </SelectTrigger>
                <SelectContent>
                  {saudiCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="form-field">
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse arabic-font' : 'english-font'}`}>
            <Mail className="h-5 w-5" />
            {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className={isRTL ? 'arabic-font' : 'english-font'}>
                <Mail className="h-4 w-4 inline mr-1" />
                {getTranslation('field.email', language)} *
              </Label>
              <Input
                id="email"
                type="email"
                value={personalInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="ahmed.ali@gmail.com"
                className="english-font"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className={isRTL ? 'arabic-font' : 'english-font'}>
                <Phone className="h-4 w-4 inline mr-1" />
                {getTranslation('field.phone', language)} *
              </Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+966 50 123 4567"
                className="english-font"
                dir="ltr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className={isRTL ? 'arabic-font' : 'english-font'}>
                <LinkedIn className="h-4 w-4 inline mr-1" />
                {language === 'ar' ? 'لينكد إن' : 'LinkedIn'}
              </Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedIn || ''}
                onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                placeholder="linkedin.com/in/ahmed-ali"
                className="english-font"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolio" className={isRTL ? 'arabic-font' : 'english-font'}>
                <Globe className="h-4 w-4 inline mr-1" />
                {language === 'ar' ? 'الموقع الشخصي' : 'Portfolio/Website'}
              </Label>
              <Input
                id="portfolio"
                value={personalInfo.portfolio || ''}
                onChange={(e) => handleInputChange('portfolio', e.target.value)}
                placeholder="ahmed-ali.dev"
                className="english-font"
                dir="ltr"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}