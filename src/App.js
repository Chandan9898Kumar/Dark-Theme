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
const AccountPage = lazyWithRetry(() => import(/* webpackPrefetch: true */ './Pages/Account'));
const ServicePage = lazyWithRetry(() => import('./Pages/Services'));
const AccountInformationPage = lazyWithRetry(() => import('./Pages/AccountInformation'));
const TabHome = lazy(() => import(/* webpackPreload: true */'./Pages/Tab/TabHome'));
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

/*                         prefetch 
The prefetch browser hint can be used to fetch resources that may be needed some time soon, but not immediately on the initial load.
This can be the case on subsequent requests or page navigation that a user is likely to make.
A prefetched resource is fetched when the browser is idle and has calculated that it's got enough bandwidth, after which it caches the prefetched resource.
When the client actually needs the resource, it can easily get it from cache instead of having to make a request to the server.

                              Implementation
We can prefetch a resource by explicitly adding it to the head of the html document.

1. <link rel="prefetch" href="./about.bundle.js" />

*/

// If you're using Webpack, you can prefetch it dynamically by using the  webpackPrefetch: true  magic comment.
// 2. const About = lazy(() => import(/* webpackPrefetch: true */ "./about"));

/**                        preload 
  
The preload browser hint can be used to fetch resources that are critical to the current navigation,
such as fonts or images are instantly (not longer than 3 seconds after the initial load) visible on a landing page.

With prefetch, the browser would only actually prefetch the resource if the conditions were good enough to not negatively affect the user experience.
Unlike a prefetch, a preloaded resource gets fetched no matter what.

                          Implementation
We can preload a resource by explicitly adding it to the head of the html document.

1. <link rel="preload" href="./search-flyout.bundle.js" />
 */

// If you're using Webpack, you can preload it dynamically by using the /* webpackPreload: true */ magic comment.

// const SearchFlyout = lazy(() =>
//   import(/* webpackPreload: true */ "./SearchFlyout")
// );
