'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FolderOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Calendar,
  ExternalLink,
  Code,
  Users,
  Target
} from 'lucide-react';
import { useCVStore } from '@/lib/store';
import { getTranslation } from '@/lib/i18n';
import { v4 as uuidv4 } from 'uuid';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  url?: string;
  repository?: string;
  teamSize?: string;
  achievements: string[];
}

export default function ProjectsForm() {
  const { language } = useCVStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isRTL = language === 'ar';

  const [formData, setFormData] = useState<Project>({
    id: '',
    title: '',
    description: '',
    technologies: [],
    role: '',
    startDate: '',
    endDate: '',
    current: false,
    url: '',
    repository: '',
    teamSize: '',
    achievements: ['']
  });

  const resetForm = () => {
    setFormData({
      id: '',
      title: '',
      description: '',
      technologies: [],
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      url: '',
      repository: '',
      teamSize: '',
      achievements: ['']
    });
    setEditingId(null);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.role) return;

    const projectData = {
      ...formData,
      id: editingId || uuidv4(),
      achievements: formData.achievements.filter(a => a.trim() !== '')
    };

    if (editingId) {
      setProjects(projects.map(p => p.id === editingId ? projectData : p));
    } else {
      setProjects([...projects, projectData]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (project: Project) => {
    setFormData(project);
    setEditingId(project.id);
    setIsDialogOpen(true);
  };

  const removeProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const addTechnology = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, tech.trim()]
      });
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, '']
    });
  };

  const updateAchievement = (index: number, value: string) => {
    const updated = [...formData.achievements];
    updated[index] = value;
    setFormData({ ...formData, achievements: updated });
  };

  const removeAchievement = (index: number) => {
    setFormData({
      ...formData,
      achievements: formData.achievements.filter((_, i) => i !== index)
    });
  };

  const [techInput, setTechInput] = useState('');

  const commonTechnologies = [
    'React', 'Node.js', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'PHP',
    'MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'AWS', 'Azure', 'Docker', 'Kubernetes'
  ];

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
            {getTranslation('section.projects', language)}
          </h1>
          <p className="text-gray-600">
            {language === 'ar' 
              ? 'أضف مشاريعك الهامة التي تُظهر مهاراتك وخبراتك'
              : 'Add important projects that showcase your skills and experience'
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
              {language === 'ar' ? 'إضافة مشروع' : 'Add Project'}
            </Button>
          </DialogTrigger>
          
          <DialogContent className={`max-w-3xl max-h-[90vh] overflow-y-auto ${isRTL ? 'arabic-font' : 'english-font'}`}>
            <DialogHeader>
              <DialogTitle className={isRTL ? 'text-right' : ''}>
                {editingId 
                  ? (language === 'ar' ? 'تعديل المشروع' : 'Edit Project')
                  : (language === 'ar' ? 'إضافة مشروع' : 'Add Project')
                }
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Project Title & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <FolderOpen className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'اسم المشروع' : 'Project Title'} *
                  </Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder={language === 'ar' ? 'تطبيق التجارة الإلكترونية' : 'E-commerce Platform'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Users className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'دورك في المشروع' : 'Your Role'} *
                  </Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder={language === 'ar' ? 'مطور الواجهة الأمامية الرئيسي' : 'Lead Frontend Developer'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  {language === 'ar' ? 'وصف المشروع' : 'Project Description'} *
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder={language === 'ar' 
                    ? 'منصة تجارة إلكترونية شاملة تتضمن نظام إدارة المنتجات، الدفع الإلكتروني، وتتبع الطلبات...'
                    : 'Comprehensive e-commerce platform including product management, payment processing, and order tracking...'
                  }
                  className={`min-h-24 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                  <Code className="h-4 w-4 inline mr-1" />
                  {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
                </Label>
                <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder={language === 'ar' ? 'React، Node.js، MongoDB' : 'React, Node.js, MongoDB'}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTechnology(techInput);
                        setTechInput('');
                      }
                    }}
                    className="flex-1"
                  />
                  <Button 
                    type="button"
                    onClick={() => {
                      addTechnology(techInput);
                      setTechInput('');
                    }}
                    disabled={!techInput.trim()}
                  >
                    {language === 'ar' ? 'إضافة' : 'Add'}
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="cursor-pointer">
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>

                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">
                    {language === 'ar' ? 'تقنيات شائعة:' : 'Common technologies:'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {commonTechnologies.filter(tech => !formData.technologies.includes(tech)).slice(0, 8).map((tech) => (
                      <Button
                        key={tech}
                        size="sm"
                        variant="ghost"
                        onClick={() => addTechnology(tech)}
                        className="text-xs h-6 px-2"
                      >
                        + {tech}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dates & Team Size */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Users className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'حجم الفريق' : 'Team Size'}
                  </Label>
                  <Input
                    value={formData.teamSize || ''}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    placeholder={language === 'ar' ? '5 أعضاء' : '5 members'}
                    className={isRTL ? 'text-right arabic-font' : 'english-font'}
                  />
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <ExternalLink className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'رابط المشروع' : 'Project URL'}
                  </Label>
                  <Input
                    value={formData.url || ''}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://myproject.com"
                    className="english-font"
                    dir="ltr"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Code className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'مستودع الكود' : 'Repository URL'}
                  </Label>
                  <Input
                    value={formData.repository || ''}
                    onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                    placeholder="https://github.com/username/project"
                    className="english-font"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-3">
                <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Label className={isRTL ? 'arabic-font' : 'english-font'}>
                    <Target className="h-4 w-4 inline mr-1" />
                    {language === 'ar' ? 'الإنجازات والنتائج' : 'Achievements & Results'}
                  </Label>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addAchievement}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {language === 'ar' ? 'إضافة إنجاز' : 'Add Achievement'}
                  </Button>
                </div>
                
                {formData.achievements.map((achievement, index) => (
                  <div key={index} className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Textarea
                      value={achievement}
                      onChange={(e) => updateAchievement(index, e.target.value)}
                      placeholder={language === 'ar' 
                        ? 'زيادة سرعة التطبيق بنسبة 40% من خلال تحسين الكود والأداء'
                        : 'Improved application performance by 40% through code optimization'
                      }
                      className={`flex-1 min-h-16 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {formData.achievements.length > 1 && (
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeAchievement(index)}
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
                    : (language === 'ar' ? 'إضافة المشروع' : 'Add Project')
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

      {/* Projects List */}
      <div className="space-y-4">
        {projects.length === 0 ? (
          <Card className="p-8 text-center border-dashed border-2 border-gray-200">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-lg font-medium text-gray-900 mb-2 ${isRTL ? 'arabic-font' : 'english-font'}`}>
              {language === 'ar' ? 'لا توجد مشاريع مضافة' : 'No projects added'}
            </h3>
            <p className="text-gray-500 mb-4">
              {language === 'ar' 
                ? 'أضف مشاريعك الهامة لإظهار مهاراتك العملية'
                : 'Add your important projects to showcase your practical skills'
              }
            </p>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'إضافة أول مشروع' : 'Add First Project'}
            </Button>
          </Card>
        ) : (
          projects.map((project) => (
            <Card key={project.id} className="transition-all duration-200 hover:shadow-md">
              <CardHeader className="pb-3">
                <div className={`flex items-start justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                    <CardTitle className={`text-lg ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {project.title}
                    </CardTitle>
                    <p className={`text-gray-600 mt-1 ${isRTL ? 'arabic-font' : 'english-font'}`}>
                      {project.role}
                    </p>
                    
                    <div className={`flex items-center gap-4 text-sm text-gray-500 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <Calendar className="h-3 w-3" />
                        <span>
                          {project.startDate} - {project.current ? (language === 'ar' ? 'مستمر' : 'Ongoing') : project.endDate}
                        </span>
                      </div>
                      {project.teamSize && (
                        <div className={`flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Users className="h-3 w-3" />
                          <span>{project.teamSize}</span>
                        </div>
                      )}
                    </div>

                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(project)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeProject(project.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className={`text-gray-700 text-sm mb-3 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}>
                  {project.description}
                </p>

                {project.achievements.length > 0 && (
                  <div>
                    <h4 className={`font-medium text-gray-900 mb-2 ${isRTL ? 'arabic-font text-right' : 'english-font'}`}>
                      {language === 'ar' ? 'الإنجازات:' : 'Key Achievements:'}
                    </h4>
                    <ul className={`space-y-1 ${isRTL ? 'text-right arabic-font' : 'english-font'}`}>
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-700 text-sm flex items-start gap-2">
                          <Target className="h-3 w-3 text-primary mt-1 shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {(project.url || project.repository) && (
                  <div className={`flex gap-4 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {project.url && (
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        {language === 'ar' ? 'عرض المشروع' : 'View Project'}
                      </a>
                    )}
                    {project.repository && (
                      <a 
                        href={project.repository} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1"
                      >
                        <Code className="h-3 w-3" />
                        {language === 'ar' ? 'الكود المصدري' : 'Source Code'}
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}