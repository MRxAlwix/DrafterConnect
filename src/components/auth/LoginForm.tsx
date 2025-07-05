'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, Lock, LogIn, AlertCircle, Info } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';

export default function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showDemoInfo, setShowDemoInfo] = React.useState(false);
  const { login, loading, error, setError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Email dan password harus diisi');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      // Error will be set by the login function
    }
  };

  // Demo login function
  const handleDemoLogin = async (role: string) => {
    const demoCredentials = {
      admin: { email: 'admin@draftconnect.com', password: 'admin123' },
      mentor: { email: 'mentor@draftconnect.com', password: 'mentor123' },
      student: { email: 'student@draftconnect.com', password: 'student123' },
      graduate: { email: 'graduate@draftconnect.com', password: 'graduate123' },
      developer: { email: 'dev@draftconnect.com', password: 'dev123' },
    };

    const creds = demoCredentials[role as keyof typeof demoCredentials];
    if (creds) {
      setError(null);
      setEmail(creds.email);
      setPassword(creds.password);
      const success = await login(creds.email, creds.password);
      
      if (!success && error?.includes('auth/invalid-credential')) {
        setShowDemoInfo(true);
        setError('Demo akun belum dibuat di Firebase Authentication. Silakan buat akun demo terlebih dahulu atau gunakan akun yang sudah terdaftar.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4"
          >
            <span className="text-white font-bold text-2xl">DC</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            DraftConnect
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Platform Komunitas PKL Drafter
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Masuk ke Akun</CardTitle>
            <CardDescription>
              Masukkan email dan password untuk mengakses platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {showDemoInfo && (
              <Alert className="mb-6 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <AlertDescription className="text-blue-800 dark:text-blue-200">
                  <strong>Cara membuat akun demo:</strong>
                  <ol className="mt-2 ml-4 list-decimal text-sm space-y-1">
                    <li>Buka Firebase Console</li>
                    <li>Pilih project "pkl-app-b3bff"</li>
                    <li>Masuk ke Authentication → Users</li>
                    <li>Klik "Add user" dan buat akun dengan email dan password sesuai tombol demo</li>
                  </ol>
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="h-4 w-4 mr-2" />
                    Masuk
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 space-y-3">
              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Demo Login (Development):
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="text-xs"
                >
                  Admin
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('mentor')}
                  className="text-xs"
                >
                  Mentor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('student')}
                  className="text-xs"
                >
                  Student
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('graduate')}
                  className="text-xs"
                >
                  Graduate
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  Super Admin
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  Mentor Teknikal
                </Badge>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Peserta PKL
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  Alumni PKL
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}