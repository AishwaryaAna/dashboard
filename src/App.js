// App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import './App.css';
import LeetCode from "./leetcode";
import StudentList from "./components/StudentList";
import About from './about';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Redirect root ("/") to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/leetcode" element={<LeetCode />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;


