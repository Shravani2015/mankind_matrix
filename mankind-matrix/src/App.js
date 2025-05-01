import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import ProfilePage from './components/ProfilePage/ProfilePage';
import AccountPage from './components/ProfilePage/accountpage.js'; // Import the new Account component
import EditProfile from './components/ProfilePage/edit-profile.js';
import ManageAddressesPage from './components/ProfilePage/manageaddress.js';
import './App.css';

// Main application component
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Separate component for content to use hooks that require router context
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  // Initialize the app when component mounts
  useEffect(() => {
    // Create a custom event listener to update cart count from vanilla JS
    const updateCartCountHandler = (e) => {
      if (e.detail && typeof e.detail.count === 'number') {
        setCartCount(e.detail.count);
      }
    };
    
    document.addEventListener('cartUpdated', updateCartCountHandler);

    // Initialize the vanilla JS app logic
    const initApp = async () => {
      try {
        // Dynamically import the original App class
        const AppModule = await import('./components/main.js');
        
        // Only create a new app instance if one doesn't exist
        if (!window.app) {
          window.app = new AppModule.default();
          setIsAppInitialized(true);
          
          // Dispatch initial cart count
          const event = new CustomEvent('cartUpdated', {
            detail: { count: window.app.cart ? window.app.cart.getItemCount() : 0 }
          });
          document.dispatchEvent(event);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    initApp();

    // Create a function to handle hash changes that will be called by the vanilla JS
    window.handleRouteChange = (target) => {
      if (target === 'home') {
        navigate('/');
      } else {
        navigate(`/${target}`);
      }
    };

    // Clean up event listener
    return () => {
      document.removeEventListener('cartUpdated', updateCartCountHandler);
    };
  }, [navigate]);

  // Effect to sync React Router with vanilla JS routing
  useEffect(() => {
    if (window.app && isAppInitialized) {
      const currentPath = location.pathname.substring(1) || 'home';
      
      // Call the navigateTo method from vanilla JS app
      if (typeof window.app.navigateTo === 'function') {
        window.app.navigateTo(currentPath);
      }
    }
  }, [location, isAppInitialized]);

  return (
    <div className="App">
      <Header cartCount={cartCount} />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/account" element={<AccountPage />} /> {/* Added new Account route */}
          <Route path="/addresses" element={<ManageAddressesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="App-footer">
        <p>&copy; {new Date().getFullYear()} Mankind Matrix - Connecting Humanity</p>
      </footer>

      {/* Toast container for notifications */}
      <div id="toast-container" className="toast-container"></div>
    </div>
  );
}

// Home component
function Home() {
  return (
    <div className="home-container page" id="home-page">
      <h1>Welcome to Mankind Matrix</h1>
      <p className="intro-text">
        Connect with like-minded individuals around the globe. Share ideas, collaborate on projects,
        and expand your network in our digital community.
      </p>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Global Connections</h3>
          <p>Connect with people from diverse backgrounds and cultures.</p>
        </div>
        <div className="feature-card">
          <h3>Idea Exchange</h3>
          <p>Share your thoughts and learn from others in a supportive environment.</p>
        </div>
        <div className="feature-card">
          <h3>Collaborative Projects</h3>
          <p>Find partners for your next big idea or join existing initiatives.</p>
        </div>
      </div>
      <div id="product-grid" className="product-grid"></div>
    </div>
  );
}

// Addresses Page component
function AddressesPage() {
  return (
    <div className="addresses-container page" id="addresses-page">
      <h1>Manage Addresses</h1>
      
      <div id="address-list-container" className="address-list-container">
        <div id="address-list" className="address-list">
          {/* This will be populated by the AddressManager from vanilla JS */}
        </div>
        <button id="add-address-btn" className="add-address-btn">Add New Address</button>
      </div>
      
      <div id="address-form-container" className="address-form-container hidden">
        <h2>Add/Edit Address</h2>
        <form id="address-form" className="address-form">
          <div className="form-row">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required />
          </div>
          
          <div className="form-row">
            <label htmlFor="street">Street Address</label>
            <input type="text" id="street" required />
          </div>
          
          <div className="form-row">
            <label htmlFor="city">City</label>
            <input type="text" id="city" required />
          </div>
          
          <div className="form-row double">
            <div className="form-col">
              <label htmlFor="state">State/Province</label>
              <input type="text" id="state" required />
            </div>
            
            <div className="form-col">
              <label htmlFor="zipcode">ZIP/Postal Code</label>
              <input type="text" id="zipcode" required />
            </div>
          </div>
          
          <div className="form-row">
            <label htmlFor="country">Country</label>
            <select id="country" required>
              <option value="">Select a country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="China">China</option>
              <option value="India">India</option>
            </select>
          </div>
          
          <div className="form-row checkbox">
            <input type="checkbox" id="default-address" />
            <label htmlFor="default-address">Set as default address</label>
          </div>
          
          <div className="form-buttons">
            <button type="button" id="cancel-btn" className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save Address</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Cart Page component
function CartPage() {
  return (
    <div className="cart-container page" id="cart-page">
      <h1>Your Cart</h1>
      <div id="cart-items" className="cart-items">
        {/* Cart items will be populated by vanilla JS */}
      </div>
      <div className="cart-summary">
        <div className="cart-total-container">
          Total: <span id="cart-total">$0.00</span>
        </div>
        <button id="checkout-btn" className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

// Checkout Page component
function CheckoutPage() {
  return (
    <div className="checkout-container page" id="checkout-page">
      <h1>Checkout</h1>
      <div id="checkout-form" className="checkout-form">
        <div className="checkout-section">
          <h2>Shipping Address</h2>
          <select id="shipping-address" className="address-select">
            {/* Will be populated by vanilla JS */}
          </select>
        </div>
        
        <div className="checkout-section">
          <h2>Billing Address</h2>
          <select id="billing-address" className="address-select">
            {/* Will be populated by vanilla JS */}
          </select>
        </div>
        
        <div className="checkout-section">
          <h2>Payment Method</h2>
          <select id="payment-method" className="payment-select">
            <option value="">-- Select Payment Method --</option>
            <option value="credit">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>
        
        <div className="checkout-section">
          <h2>Order Summary</h2>
          <div id="order-summary" className="order-summary">
            {/* Will be populated by vanilla JS */}
          </div>
        </div>
        
        <button id="place-order-btn" className="place-order-btn">Place Order</button>
      </div>
      
      <div id="order-success" className="order-success hidden">
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your order. You will be redirected to the home page in a few seconds.</p>
      </div>
    </div>
  );
}

// 404 Not Found component
function NotFound() {
  return (
    <div className="not-found page" id="not-found-page">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
    </div>
  );
}

export default App;