import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy-loaded components
const Navbar = lazy(() => import('../components/Navbar'));
const PrivateRoute = lazy(() => import('../components/PrivateRoute'));
const UserBusView = lazy(() => import('./pages/UserBusView'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner fullPage />}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<UserBusView />} />
            <Route path="/admin" element={<Login />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/secret-dashboard-179" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
}

export default App;