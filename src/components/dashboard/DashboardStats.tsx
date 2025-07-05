'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  BookOpen, 
  MessageCircle, 
  FolderOpen, 
  CheckSquare, 
  Users,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const statsData = {
  admin: [
    { title: 'Total Users', value: '156', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: 'Active Students', value: '89', icon: Users, color: 'from-green-500 to-green-600', change: '+8%' },
    { title: 'Course Materials', value: '24', icon: BookOpen, color: 'from-purple-500 to-purple-600', change: '+3%' },
    { title: 'Forum Posts', value: '342', icon: MessageCircle, color: 'from-orange-500 to-orange-600', change: '+15%' },
  ],
  mentor: [
    { title: 'My Students', value: '23', icon: Users, color: 'from-blue-500 to-blue-600', change: '+2%' },
    { title: 'Active Tasks', value: '7', icon: CheckSquare, color: 'from-green-500 to-green-600', change: '+1%' },
    { title: 'Pending Reviews', value: '12', icon: FolderOpen, color: 'from-yellow-500 to-yellow-600', change: '+4%' },
    { title: 'Forum Replies', value: '45', icon: MessageCircle, color: 'from-purple-500 to-purple-600', change: '+8%' },
  ],
  student: [
    { title: 'Materials Completed', value: '18/24', icon: BookOpen, color: 'from-blue-500 to-blue-600', change: '+3%' },
    { title: 'Portfolio Projects', value: '5', icon: FolderOpen, color: 'from-green-500 to-green-600', change: '+1%' },
    { title: 'Tasks Completed', value: '12/15', icon: CheckSquare, color: 'from-purple-500 to-purple-600', change: '+2%' },
    { title: 'Forum Contributions', value: '28', icon: MessageCircle, color: 'from-orange-500 to-orange-600', change: '+7%' },
  ],
  graduate: [
    { title: 'Materials Accessed', value: '42', icon: BookOpen, color: 'from-blue-500 to-blue-600', change: '+5%' },
    { title: 'Portfolio Views', value: '156', icon: FolderOpen, color: 'from-green-500 to-green-600', change: '+23%' },
    { title: 'Forum Discussions', value: '89', icon: MessageCircle, color: 'from-purple-500 to-purple-600', change: '+12%' },
    { title: 'Mentoring Sessions', value: '3', icon: Users, color: 'from-orange-500 to-orange-600', change: '+1%' },
  ],
  developer: [
    { title: 'System Uptime', value: '99.9%', icon: TrendingUp, color: 'from-green-500 to-green-600', change: '+0.1%' },
    { title: 'Active Sessions', value: '145', icon: Users, color: 'from-blue-500 to-blue-600', change: '+12%' },
    { title: 'Bug Reports', value: '3', icon: CheckSquare, color: 'from-yellow-500 to-yellow-600', change: '-2%' },
    { title: 'Feature Requests', value: '8', icon: Award, color: 'from-purple-500 to-purple-600', change: '+3%' },
  ],
};

export default function DashboardStats() {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const stats = statsData[user.role] || statsData.student;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <Badge 
                variant={stat.change.startsWith('+') ? 'success' : 'secondary'}
                className="text-xs"
              >
                {stat.change} from last month
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}