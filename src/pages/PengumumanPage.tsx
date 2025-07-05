'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  Bell, 
  Plus, 
  Search, 
  Pin,
  Calendar,
  User,
  AlertCircle,
  Info,
  CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const announcements = [
  {
    id: 1,
    title: 'Evaluasi Mingguan - Persiapan Portfolio',
    content: 'Reminder untuk semua peserta PKL, evaluasi mingguan akan dilaksanakan pada hari Jumat, 23 Februari 2024 pukul 14:00 WIB. Pastikan portfolio kalian sudah lengkap dan rapi. Yang akan dievaluasi: 1) Kelengkapan tugas, 2) Kualitas gambar teknik, 3) Penggunaan software CAD. Bagi yang belum submit tugas minggu ini, harap segera menyelesaikan sebelum deadline.',
    authorId: 'admin1',
    authorName: 'Admin PKL',
    isPinned: true,
    type: 'important',
    createdAt: new Date('2024-02-20T09:00:00'),
    updatedAt: new Date('2024-02-20T09:00:00'),
  },
  {
    id: 2,
    title: 'Workshop AutoCAD 3D - Pendaftaran Dibuka',
    content: 'Kami mengadakan workshop AutoCAD 3D untuk meningkatkan skill modeling peserta PKL. Workshop akan diadakan pada: Tanggal: Sabtu, 24 Februari 2024, Waktu: 09:00 - 15:00 WIB, Tempat: Lab CAD Lantai 2. Materi yang akan dibahas: Basic 3D modeling, Surface modeling, Solid modeling, Rendering techniques. Pendaftaran terbatas untuk 20 peserta. Silakan daftar di link berikut atau hubungi mentor.',
    authorId: 'mentor1',
    authorName: 'Mentor Budi',
    isPinned: true,
    type: 'event',
    createdAt: new Date('2024-02-19T14:30:00'),
    updatedAt: new Date('2024-02-19T14:30:00'),
  },
  {
    id: 3,
    title: 'Update Jadwal Bimbingan Mentor',
    content: 'Terdapat perubahan jadwal bimbingan mentor untuk minggu depan: Mentor Sarah: Senin & Rabu (13:00-15:00), Mentor Budi: Selasa & Kamis (10:00-12:00), Mentor Andi: Senin & Jumat (14:00-16:00). Untuk konsultasi di luar jadwal, silakan buat appointment melalui forum atau WhatsApp grup. Harap catat jadwal baru ini dan jangan sampai terlewat sesi bimbingan.',
    authorId: 'admin1',
    authorName: 'Admin PKL',
    isPinned: false,
    type: 'info',
    createdAt: new Date('2024-02-18T11:15:00'),
    updatedAt: new Date('2024-02-18T11:15:00'),
  },
  {
    id: 4,
    title: 'Maintenance Server - Downtime Terjadwal',
    content: 'Akan dilakukan maintenance server pada hari Minggu, 25 Februari 2024 pukul 02:00 - 06:00 WIB. Selama periode ini, platform DraftConnect tidak dapat diakses. Pastikan untuk: 1) Save semua pekerjaan sebelum maintenance, 2) Download materi yang diperlukan, 3) Backup portfolio yang belum tersimpan. Maintenance ini untuk meningkatkan performa dan keamanan sistem. Terima kasih atas pengertiannya.',
    authorId: 'dev1',
    authorName: 'Dev Team',
    isPinned: false,
    type: 'warning',
    createdAt: new Date('2024-02-17T16:45:00'),
    updatedAt: new Date('2024-02-17T16:45:00'),
  },
  {
    id: 5,
    title: 'Selamat! Peserta Terbaik Bulan Januari',
    content: 'Selamat kepada peserta PKL terbaik bulan Januari 2024: 🥇 Ahmad Rizki - Portfolio terlengkap dan aktif di forum, 🥈 Siti Nurhaliza - Konsisten submit tugas tepat waktu, 🥉 Dini Safitri - Improvement terbaik dalam skill CAD. Apresiasi juga untuk semua peserta yang telah berjuang keras. Keep up the good work! Evaluasi bulan Februari akan segera dimulai.',
    authorId: 'mentor1',
    authorName: 'Mentor Budi',
    isPinned: false,
    type: 'success',
    createdAt: new Date('2024-02-16T10:00:00'),
    updatedAt: new Date('2024-02-16T10:00:00'),
  },
];

const typeColors = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  important: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  event: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
  success: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-200',
};

const typeIcons = {
  info: Info,
  important: AlertCircle,
  event: Calendar,
  warning: AlertCircle,
  success: CheckCircle,
};

const typeLabels = {
  info: 'Info',
  important: 'Penting',
  event: 'Event',
  warning: 'Peringatan',
  success: 'Pencapaian',
};

export default function PengumumanPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} hari yang lalu`;
    if (hours > 0) return `${hours} jam yang lalu`;
    if (minutes > 0) return `${minutes} menit yang lalu`;
    return 'Baru saja';
  };

  const canCreateAnnouncement = user?.role === 'admin';

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
            Pengumuman
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Informasi terbaru, jadwal, dan update penting dari admin dan mentor
          </p>
        </div>
        {canCreateAnnouncement && (
          <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
            <Plus className="h-4 w-4 mr-2" />
            Buat Pengumuman
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
            placeholder="Cari pengumuman..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </motion.div>

      {/* Announcements List */}
      <div className="space-y-6">
        {filteredAnnouncements.map((announcement, index) => {
          const TypeIcon = typeIcons[announcement.type as keyof typeof typeIcons];
          
          return (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`hover:shadow-lg transition-shadow duration-200 ${
                announcement.isPinned ? 'border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 mb-2">
                      {announcement.isPinned && (
                        <Pin className="h-4 w-4 text-blue-500" />
                      )}
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${typeColors[announcement.type as keyof typeof typeColors]}`}
                      >
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {typeLabels[announcement.type as keyof typeof typeLabels]}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {announcement.authorName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatTimeAgo(announcement.createdAt)}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                      {announcement.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(announcement.createdAt)}</span>
                    </div>
                    
                    {canCreateAnnouncement && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          {announcement.isPinned ? 'Unpin' : 'Pin'}
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredAnnouncements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak ada pengumuman ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Coba ubah kata kunci pencarian atau periksa kembali nanti
          </p>
        </motion.div>
      )}
    </div>
  );
}