'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  MessageCircle, 
  Search, 
  Plus,
  Heart,
  MessageSquare,
  Clock,
  Pin,
  CheckCircle
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const forumPosts = [
  {
    id: 1,
    title: 'Tips menggunakan AutoCAD untuk drawing detail struktur',
    content: 'Halo semua, saya ingin berbagi tips untuk membuat detail struktur yang rapi di AutoCAD. Apakah ada yang punya pengalaman dengan teknik ini?',
    category: 'Tips',
    author: 'Ahmad Rizki',
    authorRole: 'student',
    replies: 12,
    likes: 25,
    isLiked: false,
    isPinned: false,
    hasSolution: true,
    createdAt: new Date('2024-02-15T10:30:00'),
  },
  {
    id: 2,
    title: 'Error saat rendering di Revit - butuh bantuan',
    content: 'Saya mengalami error saat rendering project di Revit. Pesan errornya "Insufficient memory". Sudah coba berbagai cara tapi belum berhasil. Ada yang bisa bantu?',
    category: 'Permasalahan',
    author: 'Siti Nurhaliza',
    authorRole: 'student',
    replies: 8,
    likes: 15,
    isLiked: true,
    isPinned: false,
    hasSolution: false,
    createdAt: new Date('2024-02-14T14:20:00'),
  },
  {
    id: 3,
    title: 'Evaluasi mingguan - Siapkan portfolio terbaik kalian!',
    content: 'Reminder untuk semua peserta PKL, evaluasi mingguan akan dilaksanakan hari Jumat. Pastikan portfolio kalian sudah lengkap dan rapi.',
    category: 'Umum',
    author: 'Mentor Budi',
    authorRole: 'mentor',
    replies: 23,
    likes: 45,
    isLiked: false,
    isPinned: true,
    hasSolution: false,
    createdAt: new Date('2024-02-13T09:00:00'),
  },
  {
    id: 4,
    title: 'Rekomendasi software CAD alternatif untuk pemula',
    content: 'Selain AutoCAD, ada rekomendasi software CAD yang user-friendly untuk pemula? Budget terbatas jadi cari yang free atau murah.',
    category: 'Software',
    author: 'Dini Safitri',
    authorRole: 'student',
    replies: 18,
    likes: 30,
    isLiked: true,
    isPinned: false,
    hasSolution: true,
    createdAt: new Date('2024-02-12T16:45:00'),
  },
  {
    id: 5,
    title: 'Tugas minggu ini: Modeling 3D gedung sederhana',
    content: 'Tugas untuk minggu ini adalah membuat model 3D gedung sederhana menggunakan software pilihan (AutoCAD/Revit/SketchUp). Deadline: Kamis, 22 Februari 2024.',
    category: 'Tugas',
    author: 'Mentor Sarah',
    authorRole: 'mentor',
    replies: 5,
    likes: 12,
    isLiked: false,
    isPinned: true,
    hasSolution: false,
    createdAt: new Date('2024-02-11T11:15:00'),
  },
];

const categories = ['Semua', 'Umum', 'Permasalahan', 'Software', 'Tips', 'Tugas'];

const categoryColors = {
  'Umum': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  'Permasalahan': 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  'Software': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  'Tips': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200',
  'Tugas': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
};

const roleColors = {
  admin: 'bg-red-500 text-white',
  mentor: 'bg-blue-500 text-white',
  developer: 'bg-purple-500 text-white',
  student: 'bg-green-500 text-white',
  graduate: 'bg-gray-500 text-white',
};

export default function ForumPage() {
  const { user } = useAuthStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Semua');

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
            Forum Diskusi
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Diskusikan masalah teknis, berbagi tips, dan tanya jawab dengan komunitas
          </p>
        </div>
        <Button className="mt-4 sm:mt-0 bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600">
          <Plus className="h-4 w-4 mr-2" />
          Buat Diskusi
        </Button>
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
            placeholder="Cari diskusi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`hover:shadow-lg transition-shadow duration-200 ${
              post.isPinned ? 'border-l-4 border-l-blue-500' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {post.isPinned && (
                      <Pin className="h-4 w-4 text-blue-500" />
                    )}
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${categoryColors[post.category as keyof typeof categoryColors]}`}
                    >
                      {post.category}
                    </Badge>
                    {post.hasSolution && (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Terjawab
                      </Badge>
                    )}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${roleColors[post.authorRole as keyof typeof roleColors]}`}
                  >
                    {post.author}
                  </Badge>
                </div>
                <CardTitle className="text-lg hover:text-blue-600 cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.content}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.replies}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className={`h-4 w-4 ${post.isLiked ? 'text-red-500 fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(post.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak ada diskusi ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </motion.div>
      )}
    </div>
  );
}