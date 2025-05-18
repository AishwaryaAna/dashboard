// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import './App.css';
import LeetCodeTracker from "./leetcode";
import StudentList from "./components/StudentList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leetcodeTracker" element={<LeetCodeTracker/>} />
        <Route path="/students" element={<StudentList/>} />
    
        



      </Routes>
    </div>
  );
}

export default App;

