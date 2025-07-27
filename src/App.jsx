import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSearch from './pages/HomeSearch';
import EventResults from './pages/EventResults';

export default function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomeSearch />} />
          <Route path="/results" element={<EventResults />} />
        </Routes>
      </div>
    </Router>
  )
}