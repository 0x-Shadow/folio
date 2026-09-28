import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './hooks/useTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RouteProgress from './components/layout/RouteProgress';
import PageTransition from './components/layout/PageTransition';
import ErrorBoundary from './components/common/ErrorBoundary';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BookDetailPage from './pages/BookDetailPage';
import MyBooksPage from './pages/MyBooksPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import NotFoundPage from './pages/NotFoundPage';

function Shell() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:rounded-full focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <RouteProgress />
      <Header />
      <main id="main-content" className="flex-grow">
        <ErrorBoundary>
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/my-books" element={<MyBooksPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/signin" element={<AuthPage />} />
              <Route path="/welcome" element={<OnboardingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PageTransition>
        </ErrorBoundary>
      </main>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} theme={theme} />
    </div>
  );
}

function App() {
  return (
    <Router basename="/folio">
      <ThemeProvider>
        <AuthProvider>
          <Shell />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
