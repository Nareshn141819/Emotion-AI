import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';

function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) return <LoadingScreen />;
  if (!isSignedIn) return <Navigate to="/auth" replace />;
  return children;
}

function LoadingScreen() {
  return (
    <div style={{
      height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#07090f', flexDirection: 'column', gap: '16px'
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '13px',
        background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px', animation: 'spin 2s linear infinite',
        boxShadow: '0 0 24px rgba(56,189,248,0.4)'
      }}>🎓</div>
      <style>{`@keyframes spin { 0%,100%{transform:rotate(-5deg) scale(1)} 50%{transform:rotate(5deg) scale(1.05)} }`}</style>
      <div style={{ color: '#5a6a88', fontSize: '13px', fontFamily: "'Space Mono', monospace" }}>
        Loading EduBot…
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/chat" element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
