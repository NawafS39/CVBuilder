'use client';

import React, { useEffect } from 'react';
import { useCVStore } from '@/lib/store';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/builder/Sidebar';
import PersonalInfoForm from '@/components/builder/forms/PersonalInfoForm';
import SummaryForm from '@/components/builder/forms/SummaryForm';
import ExperienceForm from '@/components/builder/forms/ExperienceForm';
import EducationForm from '@/components/builder/forms/EducationForm';
import SkillsForm from '@/components/builder/forms/SkillsForm';
import LanguagesForm from '@/components/builder/forms/LanguagesForm';
import CertificationsForm from '@/components/builder/forms/CertificationsForm';
import ProjectsForm from '@/components/builder/forms/ProjectsForm';
import LivePreview from '@/components/builder/LivePreview';

export default function BuilderPage() {
  const { currentSection, language, calculateCompletion, calculateATSScore } = useCVStore();
  const isRTL = language === 'ar';

  useEffect(() => {
    calculateCompletion();
    calculateATSScore();
  }, [calculateCompletion, calculateATSScore]);

  const renderForm = () => {
    switch (currentSection) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'projects':
        return <ProjectsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <Header />
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar />
        
        {/* Main Form Area */}
        <div className="flex-1 flex">
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto">
              {renderForm()}
            </div>
          </div>
          
          {/* Live Preview */}
          <div className="w-96 border-l border-gray-200 bg-white hidden lg:block">
            <LivePreview />
          </div>
        </div>
      </div>
    </div>
  );
}