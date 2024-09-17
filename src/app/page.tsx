"use client";

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import EventPage from '@/app/pages/events/EventPage';

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<EventPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
