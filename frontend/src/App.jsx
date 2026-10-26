import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, fetchProjects } from './redux/appSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function ProtectedDashboard() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.app);
  const isAuthorized = isAuthenticated && currentUser && ['superadmin', 'admin', 'moderator'].includes(currentUser.role);

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardPage />;
}

export default function App() {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.app.themeMode);

  useEffect(() => {
    // Initial fetch of live services and projects from Express + MongoDB backend
    dispatch(fetchServices());
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('cb_theme', themeMode);
  }, [themeMode]);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signin" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
