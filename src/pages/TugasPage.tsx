'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Calendar,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const tasks = [
  {
    id: 1,
    title: 'Modeling 3D Gedung Sederhana',
    description: 'Buat model 3D gedung sederhana 2 lantai menggunakan Revit atau SketchUp. Sertakan detail dasar seperti dinding, pintu, jendela, dan atap.',
    materialLinks: [
      'https://drive.google.com/file/d/example1',
      'https://youtube.com/watch?v=example2'
    ],
    deadline: new Date('2024-02-25'),
    createdBy: 'Mentor Budi',
    assignedTo: ['student'],
    submissions: [
      {
        id: '1',
        studentId: '1',
        studentName: 'Ahmad Rizki',
        portfolioId: '1',
        submittedAt: new Date('2024-02-20'),
        status: 'reviewed',
        feedback: 'Good work, but need more detail on windows'
      },
      {
        id: '2',
        studentId: '2',
        studentName: 'Siti Nurhaliza',
        portfolioId: '2',
        submittedAt: new Date('2024-02-22'),
        status: 'approved',
        feedback: 'Excellent modeling skills!'
      }
    ],
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
  {
    id: 2,
    title: 'Detail Struktur Balok-Kolom',
    description: 'Gambar detail sambungan balok-kolom beton bertulang sesuai standar SNI. Gunakan AutoCAD untuk drafting dengan skala yang tepat.',
    materialLinks: [
      'https://drive.google.com/file/d/example3'
    ],
    deadline: new Date('2024-03-01'),
    createdBy: 'Mentor Sarah',
    assignedTo: ['student'],
    submissions: [
      {
        id: '3',
        studentId: '3',
        studentName: 'Dini Safitri',
        portfolioId: '3',
        submittedAt: new Date('2024-02-28'),
        status: 'needs_revision',
        feedback: 'Detail reinforcement perlu diperbaiki'
      }
    ],
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18'),
  },
  {
    id: 3,
    title: 'Site Plan Perumahan',
    description: 'Buat site plan untuk kompleks perumahan 20 unit dengan fasilitas pendukung. Perhatikan orientasi bangunan dan sirkulasi.',
    materialLinks: [
      'https://drive.google.com/file/d/example4',
      'https://scribd.com/document/example5'
    ],
    deadline: new Date('2024-03-10'),
    createdBy: 'Mentor Budi',
    assignedTo: ['student'],
    submissions: [],
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
];

const statusColors = {
  pending: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  reviewed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  needs_revision: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
};

const statusLabels = {
  pending: 'Pending',
  reviewed: 'Under Review',
  approved: 'Approved',
  needs_revision: 'Needs Revision',
};

export default function TugasPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const getDaysUntilDeadline = (deadline: Date) => {
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getSubmissionStatus = (task: any, userId: string) => {
    const submission = task.submissions.find((sub: any) => sub.studentId === userId);
    return submission ? submission.status : 'not_submitted';
  };

  const canCreateTask = user?.role === 'admin' || user?.role === 'mentor';

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Tugas & Evaluasi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {user?.role === 'student' 
              ? 'Lihat dan kerjakan tugas dari mentor'
              : 'Kelola tugas dan evaluasi peserta PKL'
            }
          </p>
        </div>
        {canCreateTask && (
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Buat Tugas
          </Button>
        )}
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari tugas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Tasks List */}
      <div className="space-y-6">
        {filteredTasks.map((task, index) => {
          const daysLeft = getDaysUntilDeadline(task.deadline);
          const isOverdue = daysLeft < 0;
          const userSubmissionStatus = user ? getSubmissionStatus(task, user.id) : 'not_submitted';
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{task.title}</CardTitle>
                      <CardDescription className="text-base">
                        {task.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      {user?.role === 'student' && (
                        <Badge 
                          variant="secondary" 
                          className={`${statusColors[userSubmissionStatus as keyof typeof statusColors]}`}
                        >
                          {userSubmissionStatus === 'not_submitted' ? 'Belum Submit' : 
                           statusLabels[userSubmissionStatus as keyof typeof statusLabels]}
                        </Badge>
                      )}
                      <Badge variant={isOverdue ? "destructive" : "outline"}>
                        {isOverdue ? `Terlambat ${Math.abs(daysLeft)} hari` : 
                         daysLeft === 0 ? 'Deadline hari ini' : 
                         `${daysLeft} hari lagi`}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Task Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span>Deadline: {formatDate(task.deadline)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span>Dibuat oleh: {task.createdBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckSquare className="h-4 w-4 text-gray-500" />
                        <span>{task.submissions.length} submission</span>
                      </div>
                    </div>

                    {/* Material Links */}
                    {task.materialLinks.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Materi Pendukung:</h4>
                        <div className="flex flex-wrap gap-2">
                          {task.materialLinks.map((link, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(link, '_blank')}
                            >
                              <FileText className="h-3 w-3 mr-1" />
                              Materi {idx + 1}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Submissions (for mentors/admin) */}
                    {(user?.role === 'admin' || user?.role === 'mentor') && task.submissions.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Submissions:</h4>
                        <div className="space-y-2">
                          {task.submissions.map((submission) => (
                            <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <div>
                                <p className="font-medium">{submission.studentName}</p>
                                <p className="text-sm text-gray-500">
                                  Submitted: {formatDate(submission.submittedAt)}
                                </p>
                                {submission.feedback && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    Feedback: {submission.feedback}
                                  </p>
                                )}
                              </div>
                              <Badge 
                                variant="secondary" 
                                className={`${statusColors[submission.status as keyof typeof statusColors]}`}
                              >
                                {statusLabels[submission.status as keyof typeof statusLabels]}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t">
                      {user?.role === 'student' && userSubmissionStatus === 'not_submitted' && (
                        <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
                          <Plus className="h-4 w-4 mr-2" />
                          Submit Tugas
                        </Button>
                      )}
                      
                      {user?.role === 'student' && userSubmissionStatus !== 'not_submitted' && (
                        <Button variant="outline">
                          <FileText className="h-4 w-4 mr-2" />
                          Lihat Submission
                        </Button>
                      )}

                      {(user?.role === 'admin' || user?.role === 'mentor') && (
                        <>
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Edit Tugas
                          </Button>
                          <Button variant="outline">
                            <CheckSquare className="h-4 w-4 mr-2" />
                            Review Submissions
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <CheckSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak ada tugas ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {user?.role === 'student' 
              ? 'Belum ada tugas yang diberikan mentor'
              : 'Belum ada tugas yang dibuat'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}