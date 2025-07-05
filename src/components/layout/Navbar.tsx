'use client';

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  FolderOpen, 
  CheckSquare, 
  Bell,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useAuthStore } from '../../stores/authStore';
import { useThemeStore } from '../../stores/themeStore';
import { UserRole } from '../../types';

const roleLabels: Record<UserRole, string> = {
  admin: 'Super Admin',
  mentor: 'Mentor Teknikal',
  developer: 'Dev Crew',
  student: 'Peserta PKL Aktif',
  graduate: 'Alumni PKL'
};

const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-500',
  mentor: 'bg-blue-500',
  developer: 'bg-purple-500',
  student: 'bg-green-500',
  graduate: 'bg-gray-500'
};

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Materi', href: '/materi', icon: BookOpen },
  { name: 'Forum', href: '/forum', icon: MessageCircle },
  { name: 'Portofolio', href: '/portofolio', icon: FolderOpen },
  { name: 'Tugas', href: '/tugas', icon: CheckSquare },
  { name: 'Pengumuman', href: '/pengumuman', icon: Bell },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center space-x-2 cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DC</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DraftConnect
              </span>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button 
                key={item.name} 
                variant={location.pathname === item.href ? "default" : "ghost"} 
                className="flex items-center space-x-2"
                onClick={() => navigate(item.href)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Button>
            ))}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <Badge 
                  variant="secondary" 
                  className={`${roleColors[user.role]} text-white text-xs`}
                >
                  {roleLabels[user.role]}
                </Badge>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
        >
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.href);
                  setIsMenuOpen(false);
                }}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.name}
              </Button>
            ))}
            <hr className="my-2" />
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="w-full justify-start"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
            <Button
              variant="ghost"
              onClick={logout}
              className="w-full justify-start text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}