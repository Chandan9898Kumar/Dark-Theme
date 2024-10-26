import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavLinks from './NavBar/NavLink';
import ToDoMenuDrawer, { Country, country, CountryAddress, CountryId } from './Pages/Country';
const HomePage = lazy(() => import('./Pages/Home'));
const AccountPage = lazy(() => import('./Pages/Account'));
const ServicePage = lazy(() => import('./Pages/Services'));
const AccountInformationPage = lazy(() => import('./Pages/AccountInformation'));

function App() {
  return (
    <Suspense fallback="Loading ...">
      <BrowserRouter future={{ v7_startTransition: true }}>
        <NavLinks />
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* This AccountPage is Dynamic routing */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:id" element={<AccountInformationPage />} />
          <Route path="/service" element={<ServicePage />} />

          {/* This ToDoMenuDrawer is Nested Routing */}
          <Route path="/country" element={<ToDoMenuDrawer />}>
            <Route index element={<Country />} />
            <Route path="ids" element={<CountryId />} />
            <Route path="address" element={<CountryAddress />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

const Error = () => {
  return (
    <div>
      <h1>NOT FOUND</h1>
    </div>
  );
};
