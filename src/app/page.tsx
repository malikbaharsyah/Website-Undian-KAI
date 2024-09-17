"use client";

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/login/Login';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='login' element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
