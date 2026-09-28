import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/common/ErrorBoundary';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BookDetailPage from './pages/BookDetailPage';
import MyBooksPage from './pages/MyBooksPage';
import SearchResultsPage from './pages/SearchResultsPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router basename="/folio">
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-cream-50">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-800 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">
            <ErrorBoundary>
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
            </ErrorBoundary>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
