import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavLinks from './NavBar/NavLink';
import ToDoMenuDrawer, { Country, CountryPlace, CountryAddress, CountryId } from './Pages/Country';

const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error(error);
      return window.location.reload();
    }
  });

const HomePage = lazyWithRetry(() => import('./Pages/Home'));
const AccountPage = lazyWithRetry(() => import('./Pages/Account'));
const ServicePage = lazyWithRetry(() => import('./Pages/Services'));
const AccountInformationPage = lazyWithRetry(() => import('./Pages/AccountInformation'));
const TabHome = lazy(() => import('./Pages/Tab/TabHome'));
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <NavLinks />
      <Suspense fallback="Loading ...">
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* This AccountPage is Dynamic routing */}
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:id" element={<AccountInformationPage />} />
          <Route path="/service" element={<ServicePage />} />

          {/* This ToDoMenuDrawer is Nested Routing */}
          <Route path="/country" element={<ToDoMenuDrawer />}>
            <Route index element={<Country />} />
            <Route path="place" element={<CountryPlace />} />
            <Route path="address" element={<CountryAddress />} />
            <Route path=":id" element={<CountryId />} />
          </Route>

          <Route path="/tab" element={<TabHome />} />

          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

const Error = () => {
  return (
    <div style={{ color: 'red' }}>
      <h1>NOT FOUND</h1>
    </div>
  );
};


/**
// {
//   "compilerOptions": {
//     "baseUrl": "src",
//     "paths": {
//       "@": ["./src"]
//     }
//   }
// }
 */