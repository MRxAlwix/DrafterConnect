'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  MessageCircle, 
  FolderOpen, 
  CheckSquare, 
  Bell,
  Clock
} from 'lucide-react';
import { formatDate, formatTime } from '../../lib/utils';

const activities = [
  {
    id: 1,
    type: 'forum',
    title: 'New reply in "AutoCAD Tips & Tricks"',
    user: 'Ahmad Rizki',
    time: new Date(Date.now() - 1000 * 60 * 30),
    icon: MessageCircle,
    color: 'text-blue-500'
  },
  {
    id: 2,
    type: 'portfolio',
    title: 'Portfolio "Structural Drawing" submitted',
    user: 'Siti Nurhaliza',
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    icon: FolderOpen,
    color: 'text-green-500'
  },
  {
    id: 3,
    type: 'task',
    title: 'New task assigned: "3D Modeling Exercise"',
    user: 'Mentor Budi',
    time: new Date(Date.now() - 1000 * 60 * 60 * 4),
    icon: CheckSquare,
    color: 'text-purple-500'
  },
  {
    id: 4,
    type: 'announcement',
    title: 'Weekly evaluation schedule updated',
    user: 'Admin',
    time: new Date(Date.now() - 1000 * 60 * 60 * 6),
    icon: Bell,
    color: 'text-orange-500'
  },
  {
    id: 5,
    type: 'forum',
    title: 'Question about Revit materials answered',
    user: 'Dini Safitri',
    time: new Date(Date.now() - 1000 * 60 * 60 * 8),
    icon: MessageCircle,
    color: 'text-blue-500'
  },
];

export default function RecentActivity() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>
          Latest updates and activities from the community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {activity.user}
                  </p>
                  <span className="text-xs text-gray-400">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(activity.time)}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}