import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Page Components
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
// Import any other pages you might have, e.g.:
// import CreateListing from './pages/CreateListing';
// import Listing from './pages/Listing';
// import Search from './pages/Search';

// Import Common Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute'; // Component to protect routes

export default function App() {
  return (
    // BrowserRouter wraps the entire application to enable routing
    <BrowserRouter>
      {/* Header component renders on all pages managed by this router */}
      <Header />

      {/* Routes component defines the routing rules */}
      <Routes>
        {/* Publicly accessible routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Add other public routes like search or individual listing views if applicable */}
        {/* <Route path='/listing/:listingId' element={<Listing />} /> */}
        {/* <Route path='/search' element={<Search />} /> */}


        {/* Protected Routes */}
        {/* Use the PrivateRoute component as a layout wrapper */}
        {/* Any Route nested inside here will only be accessible if the user is authenticated */}
        <Route element={<PrivateRoute />}>
          {/* Profile page route - requires login */}
          <Route path="/profile" element={<Profile />} />
          {/* Add other routes that require login here, e.g.: */}
          {/* <Route path="/create-listing" element={<CreateListing />} /> */}
          {/* <Route path="/update-listing/:listingId" element={<UpdateListing />} /> */}
        </Route>

         {/* Optional: You could add a catch-all 404 Not Found route here */}
         {/* <Route path="*" element={<NotFound />} /> */}

      </Routes>

      {/* Optional: You could add a Footer component here if needed */}
      {/* <Footer /> */}
    </BrowserRouter>
  );
}