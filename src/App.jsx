import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AppShell } from './components/layout/AppShell';

// Eagerly loaded for quick perceived performance on landing
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

// Lazy loaded pages for code splitting
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Search = lazy(() => import('./pages/Search').then(module => ({ default: module.Search })));
const Library = lazy(() => import('./pages/Library').then(module => ({ default: module.Library })));
const PlaylistView = lazy(() => import('./pages/PlaylistView').then(module => ({ default: module.PlaylistView })));
const AlbumView = lazy(() => import('./pages/AlbumView').then(module => ({ default: module.AlbumView })));
const ArtistView = lazy(() => import('./pages/ArtistView').then(module => ({ default: module.ArtistView })));
const Profile = lazy(() => import('./pages/Profile').then(module => ({ default: module.Profile })));

// Global Loading fallback
const PageLoader = () => (
  <div className="flex-1 h-full w-full flex items-center justify-center p-12">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <PlayerProvider>
            <Router>
              <Routes>
                {/* Public Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected App Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <AppShell>
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route index element={<Home />} />
                          <Route path="search" element={<Search />} />
                          <Route path="library" element={<Library />} />
                          <Route path="playlist/:id" element={<PlaylistView />} />
                          <Route path="album/:id" element={<AlbumView />} />
                          <Route path="artist/:id" element={<ArtistView />} />
                          <Route path="liked" element={<Library />} /> {/* Route to Library with activeTab liked */}
                          <Route path="playlists" element={<Library />} /> {/* Route to Library with activeTab playlists */}
                          <Route path="profile" element={<Profile />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </AppShell>
                  </ProtectedRoute>
                } />
                
                {/* Catch-all for any other top level route to AppShell to let nested routing handle it */}
                <Route path="/*" element={
                  <ProtectedRoute>
                    <AppShell>
                      <Suspense fallback={<PageLoader />}>
                        <Routes>
                          <Route path="search" element={<Search />} />
                          <Route path="library" element={<Library />} />
                          <Route path="playlist/:id" element={<PlaylistView />} />
                          <Route path="album/:id" element={<AlbumView />} />
                          <Route path="artist/:id" element={<ArtistView />} />
                          <Route path="liked" element={<Library />} />
                          <Route path="playlists" element={<Library />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </Suspense>
                    </AppShell>
                  </ProtectedRoute>
                } />

              </Routes>
            </Router>
          </PlayerProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
