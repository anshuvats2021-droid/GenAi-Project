import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { LoginPage } from './features/auth/ui/LoginPage.jsx';
import { RegisterPage } from './features/auth/ui/RegisterPage.jsx';
import { AuthenticatedView } from './features/auth/ui/AuthenticatedView.jsx';
import { useAuth } from './features/auth/hooks/useAuth.js';

export default function App() {
  const { user, status, checkSession } = useAuth();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (status === 'checking') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f7f6] dark:bg-[#101613]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#d6e2de] border-t-[#27695b] dark:border-[#33453b] dark:border-t-[#8bb7a1]" />
      </main>
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to="/" replace /> : <RegisterPage />}
      />
      <Route
        path="/"
        element={user ? <AuthenticatedView user={user} /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
