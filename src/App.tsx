import React from 'react';
import AuthPage from "./pages/AuthPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";



const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route  path="/" element={<AuthPage />} />
          <Route  path="/main" element={<MainPage/>} />
        </Routes>
      </Router>
  );
};

export default App;

