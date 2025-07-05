'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { 
  BookOpen, 
  ExternalLink, 
  Search, 
  Filter,
  Play,
  FileText,
  Video,
  Link2
} from 'lucide-react';

const materials = [
  {
    id: 1,
    title: 'AutoCAD Fundamentals',
    description: 'Dasar-dasar penggunaan AutoCAD untuk drafting teknik',
    link: 'https://drive.google.com/file/d/example1',
    category: 'AutoCAD',
    type: 'wajib',
    format: 'PDF',
    duration: '2 hours',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: 2,
    title: 'Revit Architecture Basics',
    description: 'Pengenalan Revit untuk modeling arsitektur',
    link: 'https://youtube.com/watch?v=example2',
    category: 'Revit',
    type: 'wajib',
    format: 'Video',
    duration: '1.5 hours',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: 3,
    title: 'Structural Drawing Standards',
    description: 'Standar gambar struktur dan detail konstruksi',
    link: 'https://scribd.com/document/example3',
    category: 'Dasar Struktur',
    type: 'opsional',
    format: 'Document',
    duration: '45 minutes',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: 4,
    title: 'Advanced 3D Modeling',
    description: 'Teknik modeling 3D lanjutan untuk proyek kompleks',
    link: 'https://drive.google.com/file/d/example4',
    category: 'Layout',
    type: 'tugas',
    format: 'PDF',
    duration: '3 hours',
    createdAt: new Date('2024-02-01'),
  },
  {
    id: 5,
    title: 'Technical Drawing Exercises',
    description: 'Latihan soal gambar teknik dan drafting',
    link: 'https://youtube.com/playlist?list=example5',
    category: 'AutoCAD',
    type: 'tugas',
    format: 'Video Series',
    duration: '4 hours',
    createdAt: new Date('2024-02-05'),
  },
  {
    id: 6,
    title: 'BIM Workflow Introduction',
    description: 'Pengenalan workflow BIM dalam proyek konstruksi',
    link: 'https://drive.google.com/file/d/example6',
    category: 'Revit',
    type: 'opsional',
    format: 'PDF',
    duration: '1 hour',
    createdAt: new Date('2024-02-10'),
  },
];

const typeColors = {
  wajib: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  opsional: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
  tugas: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
};

const formatIcons = {
  PDF: FileText,
  Video: Video,
  Document: FileText,
  'Video Series': Play,
};

export default function MateriPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedType, setSelectedType] = React.useState('All');

  const categories = ['All', ...new Set(materials.map(m => m.category))];
  const types = ['All', 'wajib', 'opsional', 'tugas'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || material.category === selectedCategory;
    const matchesType = selectedType === 'All' || material.type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Materi Pembelajaran
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Akses semua materi pembelajaran CAD, teknik sipil, dan drafting
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between"
      >
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari materi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'All' ? 'Semua Jenis' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((material, index) => {
          const FormatIcon = formatIcons[material.format as keyof typeof formatIcons] || FileText;
          
          return (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FormatIcon className="h-5 w-5 text-gray-500" />
                      <Badge variant="outline" className="text-xs">
                        {material.category}
                      </Badge>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${typeColors[material.type as keyof typeof typeColors]}`}
                    >
                      {material.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{material.format}</span>
                    <span>{material.duration}</span>
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={() => window.open(material.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Akses Materi
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Tidak ada materi ditemukan
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </motion.div>
      )}
    </div>
  );
}