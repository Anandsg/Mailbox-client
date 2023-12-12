import React from 'react';
import Login from './components/auth/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Welcome from './components/pages/Welcome';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
