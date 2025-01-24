import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

// Sections
import Contestants from './sections/Contestants';
import News from './sections/News';
import VoterRegistration from './sections/VoterRegistration';
import ContestantRegistration from './sections/ContestantRegistration';
import ManageElection from './sections/ManageElection';
import SystemInformation from './sections/SystemInformation';
import Results from './sections/Results';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector(state => state.user.data);
  
  return user ? children : <Navigate to="/auth/login" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const user = useSelector(state => state.user.data);

  return user ? <Navigate to="/" /> : children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/auth">
          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
        </Route>

        {/* News Route (Public) */}
        <Route path="/news" element={<News />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/voter/registration"
          element={
            <ProtectedRoute>
              <VoterRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contestants"
          element={
            <ProtectedRoute>
              <Contestants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contestant/registration"
          element={
            <ProtectedRoute>
              <ContestantRegistration />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage/election"
          element={
            <ProtectedRoute>
              <ManageElection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/information"
          element={
            <ProtectedRoute>
              <SystemInformation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* Catch all route - 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;