"use client";

import React from 'react';

import LoginPage from './(pages)/login/page';
import { useRouter } from 'next/navigation';

export default function App() {
  const router = useRouter();
  return (
    router.push('/lottery')
  );
}
