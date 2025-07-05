import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Layout from './components/layout/Layout';
import LoginForm from './components/auth/LoginForm';
import DashboardPage from './pages/DashboardPage';
import MateriPage from './pages/MateriPage';
import ForumPage from './pages/ForumPage';
import PortfolioPage from './pages/PortfolioPage';
import TugasPage from './pages/TugasPage';
import PengumumanPage from './pages/PengumumanPage';

function App() {
  const { user, loading, initializeAuth } = useAuthStore();

  React.useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe?.();
  }, [initializeAuth]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {!user ? (
          <LoginForm />
        ) : (
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/materi" element={<MateriPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="/portofolio" element={<PortfolioPage />} />
              <Route path="/tugas" element={<TugasPage />} />
              <Route path="/pengumuman" element={<PengumumanPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        )}
      </div>
    </Router>
  );
}

export default App;