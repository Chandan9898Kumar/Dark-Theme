import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavLinks from './NavBar/NavLink';

const HomePage = lazy(() => import('./Pages/Home'));
const AccountPage = lazy(() => import('./Pages/Account'));
const ServicePage = lazy(() => import('./Pages/Services'));
function App() {
  return (
    <Suspense fallback="Loading ...">
      <BrowserRouter future={{ v7_startTransition: true }}>
        <NavLinks />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/service" element={<ServicePage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
