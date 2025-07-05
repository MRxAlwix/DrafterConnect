'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Filter,
  Eye,
  Heart,
  MessageSquare,
  Calendar,
  User,
  Award
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const portfolios = [
  {
    id: 1,
    title: 'Structural Drawing - Gedung Perkantoran 5 Lantai',
    description: 'Detail struktur beton bertulang untuk gedung perkantoran dengan sistem rangka terbuka. Menggunakan AutoCAD 2023 untuk drafting dan detail connection.',
    images: [
      'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3862379/pexels-photo-3862379.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    software: ['AutoCAD', 'SAP2000'],
    authorId: '1',
    authorName: 'Ahmad Rizki',
    authorRole: 'student',
    status: 'approved',
    feedback: 'Excellent work! Detail struktur sangat rapi dan sesuai standar.',
    views: 45,
    likes: 12,
    comments: 8,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-12'),
  },
  {
    id: 2,
    title: 'Revit Model - Rumah Tinggal 2 Lantai',
    description: 'Model 3D lengkap rumah tinggal dengan detail MEP dan landscape. Project ini menggunakan Revit Architecture untuk modeling dan rendering.',
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    software: ['Revit', 'Lumion'],
    authorId: '2',
    authorName: 'Siti Nurhaliza',
    authorRole: 'student',
    status: 'submitted',
    feedback: '',
    views: 32,
    likes: 8,
    comments: 5,
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: 3,
    title: 'Site Plan - Kompleks Perumahan',
    description: 'Perencanaan site plan untuk kompleks perumahan 50 unit dengan fasilitas umum lengkap. Menggunakan AutoCAD Civil 3D untuk topografi.',
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    software: ['AutoCAD Civil 3D', 'SketchUp'],
    authorId: '3',
    authorName: 'Dini Safitri',
    authorRole: 'student',
    status: 'needs_revision',
    feedback: 'Perlu perbaikan pada detail drainase dan utilitas.',
    views: 28,
    likes: 6,
    comments: 12,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-07'),
  },
  {
    id: 4,
    title: 'Detail Konstruksi - Jembatan Beton',
    description: 'Detail konstruksi jembatan beton prategang bentang 30m. Lengkap dengan detail sambungan dan spesifikasi material.',
    images: [
      'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    software: ['AutoCAD', 'Tekla Structures'],
    authorId: '4',
    authorName: 'Budi Santoso',
    authorRole: 'graduate',
    status: 'approved',
    feedback: 'Portfolio yang sangat baik untuk referensi konstruksi jembatan.',
    views: 67,
    likes: 18,
    comments: 15,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-30'),
  },
];

const statusColors = {
  draft: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  reviewed: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
  approved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  needs_revision: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
};

const statusLabels = {
  draft: 'Draft',
  submitted: 'Submitted',
  reviewed: 'Under Review',
  approved: 'Approved',
  needs_revision: 'Needs Revision',
};

export default function PortfolioPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState('All');

  const statuses = ['All', 'draft', 'submitted', 'reviewed', 'approved', 'needs_revision'];

  const filteredPortfolios = portfolios.filter(portfolio => {
    const matchesSearch = portfolio.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || portfolio.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

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
            Portfolio Proyek
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showcase hasil kerja dan proyek PKL dari seluruh peserta
          </p>
        </div>
        {(user?.role === 'student' || user?.role === 'graduate') && (
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Upload Portfolio
          </Button>
        )}
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari portfolio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'All' ? 'Semua Status' : statusLabels[status as keyof typeof statusLabels]}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPortfolios.map((portfolio, index) => (
          <motion.div
            key={portfolio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-200 overflow-hidden">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={portfolio.images[0]}
                  alt={portfolio.title}
                  className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge 
                    variant="secondary" 
                    className={`${statusColors[portfolio.status as keyof typeof statusColors]}`}
                  >
                    {statusLabels[portfolio.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">
                      {portfolio.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {portfolio.description}
                    </CardDescription>
                  </div>
                </div>
                
                {/* Software Tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {portfolio.software.map(software => (
                    <Badge key={software} variant="outline" className="text-xs">
                      {software}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                {/* Author Info */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{portfolio.authorName}</p>
                    <p className="text-xs text-gray-500">{formatDate(portfolio.createdAt)}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{portfolio.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{portfolio.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{portfolio.comments}</span>
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                {portfolio.feedback && (
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Feedback:</strong> {portfolio.feedback}
                    </p>
                  </div>
                )}

                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Lihat Detail
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPortfolios.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak ada portfolio ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </motion.div>
      )}
    </div>
  );
}