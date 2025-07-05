export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  joinedAt: Date;
  isActive: boolean;
}

export type UserRole = 'admin' | 'mentor' | 'developer' | 'student' | 'graduate';

export interface Material {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  tags: string[];
  type: 'wajib' | 'opsional' | 'tugas';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  replies: ForumReply[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
}

export interface ForumReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  likes: string[];
  createdAt: Date;
  isSolution: boolean;
}

export interface Portfolio {
  id: string;
  title: string;
  description: string;
  images: string[];
  software: string[];
  authorId: string;
  authorName: string;
  status: 'draft' | 'submitted' | 'reviewed' | 'approved';
  feedback?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  materialLinks: string[];
  deadline: Date;
  createdBy: string;
  assignedTo: string[];
  submissions: TaskSubmission[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskSubmission {
  id: string;
  studentId: string;
  portfolioId: string;
  submittedAt: Date;
  feedback?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'needs_revision';
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}