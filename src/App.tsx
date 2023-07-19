import React from 'react';
import AuthPage from "./pages/AuthPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App: React.FC = () => {
    return (
      <Router>
        <Routes>
          <Route  path="/" element={<AuthPage />} />
          <Route  path="/main" element={<MainPage/>} />
        </Routes>
          <ToastContainer />
      </Router>
  );
};

export default App;

