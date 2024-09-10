import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./screens/login";
import Home from "./screens/home";
import Profile from "./screens/profile";
import Requests from "./screens/requests";
import CcRequest from './screens/ccRequest';
import './App.css';
import Teams from './components/teams';

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

const PrivateRoute = ({ element: Element }) => {
  return isAuthenticated() ? <Element /> : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/requests" element={<PrivateRoute element={Requests} />} />
        <Route path="/ccRequest" element={<PrivateRoute element={CcRequest} />} />
      </Routes>
    </Router>
  );
}

export default App;
