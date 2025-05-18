// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard';
import Login from './login';
import './App.css';
import LeetCodeTracker from "./leetcode";
import StudentList from "./components/StudentList";
import LeetCode from './leetcode';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/leetcode" element={<LeetCode/>} />
        <Route path="/students" element={<StudentList/>} />
    
        



      </Routes>
    </div>
  );
}

export default App;

