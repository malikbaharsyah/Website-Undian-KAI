"use client";

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
