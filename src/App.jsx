import React from 'react';
import PlaylistSidebar from './Components/PlaylistSidebar';
import Welcome from './Components/Welcome';
import HomePage from './pages/HomePage';
import PlaylistPage from './pages/PlaylistPage';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, 
  Outlet,
} from 'react-router-dom';

// Define a layout that includes the sidebar
const Layout = () => (
  <div className="flex h-screen">
    {/* Sidebar */}
    <PlaylistSidebar />

    {/* Main Content */}
    <div className="flex-grow bg-gradient-to-b from-pink-200 via-black to-black">
      <Outlet /> {/* This is where nested routes will render */}
    </div>
  </div>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
