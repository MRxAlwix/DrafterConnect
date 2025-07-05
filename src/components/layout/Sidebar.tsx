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
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Materi', href: '/materi', icon: BookOpen },
  { name: 'Forum', href: '/forum', icon: MessageCircle },
  { name: 'Portofolio', href: '/portofolio', icon: FolderOpen },
  { name: 'Tugas', href: '/tugas', icon: CheckSquare, roles: ['admin', 'mentor', 'student'] },
  { name: 'Pengumuman', href: '/pengumuman', icon: Bell },
  { name: 'Kelola User', href: '/users', icon: Users, roles: ['admin'] },
  { name: 'Analytics', href: '/analytics', icon: BarChart3, roles: ['admin', 'mentor'] },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const filteredNavigation = navigation.filter(item => 
    !item.roles || item.roles.includes(user.role)
  );

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {filteredNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start ${
                        isActive
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => navigate(item.href)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Button>
                  </motion.div>
                );
              })}
            </nav>
          </div>
          
          <div className="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex flex-col space-y-2 w-full">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/profil')}
              >
                <User className="h-4 w-4 mr-2" />
                Profil
              </Button>
              <Button
                variant="ghost"
                onClick={logout}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}