import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  fullNameAr?: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  summaryAr?: string;
  profilePhoto?: string;
  nationality: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  gpa?: string;
  gpaScale: '4.0' | '5.0';
  graduationDate: string;
  location: string;
  relevantCoursework?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'language';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
  certification?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface CVState {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  currentTemplate: string;
  language: 'ar' | 'en';
  currentSection: string;
  completionPercentage: number;
  atsScore: number;
  
  // Actions
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addLanguage: (lang: Language) => void;
  updateLanguage: (id: string, lang: Partial<Language>) => void;
  removeLanguage: (id: string) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  setCurrentTemplate: (template: string) => void;
  setLanguage: (lang: 'ar' | 'en') => void;
  setCurrentSection: (section: string) => void;
  calculateCompletion: () => void;
  calculateATSScore: () => void;
}

export const useCVStore = create<CVState>()(
  persist(
    (set, get) => ({
      personalInfo: {
        fullName: '',
        email: '',
        phone: '+966',
        location: '',
        title: '',
        summary: '',
        nationality: '',
      },
      experience: [],
      education: [],
      skills: [],
      languages: [
        {
          id: '1',
          name: 'Arabic',
          proficiency: 'native',
        },
        {
          id: '2',
          name: 'English',
          proficiency: 'intermediate',
        },
      ],
      certifications: [],
      currentTemplate: 'modern',
      language: 'en',
      currentSection: 'personal',
      completionPercentage: 0,
      atsScore: 0,

      updatePersonalInfo: (info) => {
        set((state) => ({
          personalInfo: { ...state.personalInfo, ...info }
        }));
        get().calculateCompletion();
        get().calculateATSScore();
      },

      addExperience: (exp) => {
        set((state) => ({
          experience: [...state.experience, exp]
        }));
        get().calculateCompletion();
      },

      updateExperience: (id, exp) => {
        set((state) => ({
          experience: state.experience.map(e => e.id === id ? { ...e, ...exp } : e)
        }));
      },

      removeExperience: (id) => {
        set((state) => ({
          experience: state.experience.filter(e => e.id !== id)
        }));
        get().calculateCompletion();
      },

      addEducation: (edu) => {
        set((state) => ({
          education: [...state.education, edu]
        }));
        get().calculateCompletion();
      },

      updateEducation: (id, edu) => {
        set((state) => ({
          education: state.education.map(e => e.id === id ? { ...e, ...edu } : e)
        }));
      },

      removeEducation: (id) => {
        set((state) => ({
          education: state.education.filter(e => e.id !== id)
        }));
        get().calculateCompletion();
      },

      addSkill: (skill) => {
        set((state) => ({
          skills: [...state.skills, skill]
        }));
      },

      updateSkill: (id, skill) => {
        set((state) => ({
          skills: state.skills.map(s => s.id === id ? { ...s, ...skill } : s)
        }));
      },

      removeSkill: (id) => {
        set((state) => ({
          skills: state.skills.filter(s => s.id !== id)
        }));
      },

      addLanguage: (lang) => {
        set((state) => ({
          languages: [...state.languages, lang]
        }));
      },

      updateLanguage: (id, lang) => {
        set((state) => ({
          languages: state.languages.map(l => l.id === id ? { ...l, ...lang } : l)
        }));
      },

      removeLanguage: (id) => {
        set((state) => ({
          languages: state.languages.filter(l => l.id !== id)
        }));
      },

      addCertification: (cert) => {
        set((state) => ({
          certifications: [...state.certifications, cert]
        }));
      },

      updateCertification: (id, cert) => {
        set((state) => ({
          certifications: state.certifications.map(c => c.id === id ? { ...c, ...cert } : c)
        }));
      },

      removeCertification: (id) => {
        set((state) => ({
          certifications: state.certifications.filter(c => c.id !== id)
        }));
      },

      setCurrentTemplate: (template) => {
        set({ currentTemplate: template });
      },

      setLanguage: (lang) => {
        set({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },

      setCurrentSection: (section) => {
        set({ currentSection: section });
      },

      calculateCompletion: () => {
        const state = get();
        let completed = 0;
        let total = 8;

        // Personal info (required fields)
        if (state.personalInfo.fullName && state.personalInfo.email && state.personalInfo.phone && state.personalInfo.title) {
          completed += 1;
        }

        // Summary
        if (state.personalInfo.summary && state.personalInfo.summary.length >= 100) {
          completed += 1;
        }

        // Experience
        if (state.experience.length > 0) {
          completed += 1;
        }

        // Education
        if (state.education.length > 0) {
          completed += 1;
        }

        // Skills
        if (state.skills.length >= 3) {
          completed += 1;
        }

        // Languages (default has 2)
        if (state.languages.length >= 2) {
          completed += 1;
        }

        // Certifications (optional but counts)
        if (state.certifications.length > 0) {
          completed += 1;
        }

        // Template selected
        if (state.currentTemplate) {
          completed += 1;
        }

        const percentage = Math.round((completed / total) * 100);
        set({ completionPercentage: percentage });
      },

      calculateATSScore: () => {
        const state = get();
        let score = 0;

        // Personal info completeness (20 points)
        const personalFields = ['fullName', 'email', 'phone', 'title', 'location'];
        const filledPersonalFields = personalFields.filter(field => state.personalInfo[field as keyof PersonalInfo]);
        score += (filledPersonalFields.length / personalFields.length) * 20;

        // Experience with keywords (25 points)
        if (state.experience.length > 0) {
          score += 15;
          const hasKeywords = state.experience.some(exp => 
            exp.description.some(desc => desc.length > 50)
          );
          if (hasKeywords) score += 10;
        }

        // Education (15 points)
        if (state.education.length > 0) {
          score += 15;
        }

        // Skills variety (20 points)
        if (state.skills.length >= 3) score += 10;
        if (state.skills.length >= 6) score += 5;
        const hasSkillCategories = new Set(state.skills.map(s => s.category)).size >= 2;
        if (hasSkillCategories) score += 5;

        // Summary quality (10 points)
        if (state.personalInfo.summary && state.personalInfo.summary.length >= 100) {
          score += 10;
        }

        // Certifications bonus (10 points)
        if (state.certifications.length > 0) {
          score += Math.min(state.certifications.length * 3, 10);
        }

        set({ atsScore: Math.round(score) });
      },
    }),
    {
      name: 'cv-builder-storage',
    }
  )
);