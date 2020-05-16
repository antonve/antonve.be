export interface Resume {
  skills: SkillCategory[]
  education: EducationEntry[]
  experience: WorkExperienceEntry[]
  certificates: Certificate[]
}

export interface SkillCategory {
  label: string
  weight: number
  tags: string[]
}

export interface EducationEntry {
  name: string
  when: string
  notes: string
}

export interface WorkExperienceEntry {
  company: string
  title: string
  location: string
  when: string
  description: string[]
  tags: string[]
}

export interface Certificate {
  name: string
  when: string
}

export interface Project {
  title: string
  preview: string
  when: string
  description: string[]
  tags: string[]
}
