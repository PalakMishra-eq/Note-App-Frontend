import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AllNotesPage from './pages/AllNotesPage';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import NoteCreation from './pages/NoteCreation';
import NoteDetailPage from './pages/NoteDetailPage';
import Signup from './pages/Signup';
import VerifyOtpPage from './pages/verifyOtpPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-note" element={<NoteCreation />} />
        <Route path="/all-notes" element={<AllNotesPage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
