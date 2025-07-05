'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { 
  Plus,
  Upload,
  MessageSquare,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { UserRole } from '../../types';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  color: string;
  roles: UserRole[];
}

const quickActions: QuickAction[] = [
  {
    title: 'Add New Material',
    description: 'Upload learning materials',
    icon: FileText,
    action: () => console.log('Add material'),
    color: 'from-blue-500 to-blue-600',
    roles: ['admin', 'mentor']
  },
  {
    title: 'Create Task',
    description: 'Assign new task to students',
    icon: Plus,
    action: () => console.log('Create task'),
    color: 'from-green-500 to-green-600',
    roles: ['admin', 'mentor']
  },
  {
    title: 'Upload Portfolio',
    description: 'Share your latest project',
    icon: Upload,
    action: () => console.log('Upload portfolio'),
    color: 'from-purple-500 to-purple-600',
    roles: ['student', 'graduate']
  },
  {
    title: 'Start Discussion',
    description: 'Ask questions in forum',
    icon: MessageSquare,
    action: () => console.log('Start discussion'),
    color: 'from-orange-500 to-orange-600',
    roles: ['admin', 'mentor', 'student', 'graduate']
  },
  {
    title: 'Manage Users',
    description: 'Add or edit user accounts',
    icon: Users,
    action: () => console.log('Manage users'),
    color: 'from-red-500 to-red-600',
    roles: ['admin']
  },
  {
    title: 'View Analytics',
    description: 'Check platform statistics',
    icon: BarChart3,
    action: () => console.log('View analytics'),
    color: 'from-teal-500 to-teal-600',
    roles: ['admin', 'mentor']
  },
];

export default function QuickActions() {
  const { user } = useAuthStore();
  
  if (!user) return null;

  const availableActions = quickActions.filter(action => 
    action.roles.includes(user.role)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks and shortcuts for your role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-all duration-200"
                onClick={action.action}
              >
                <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{action.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}