import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Truck, Check, User, MapPin, ShoppingBag } from 'lucide-react';
import withLayout from '../../layouts/HOC/withLayout';
import './Delivery.css';

// Sample delivery options data - in a real app, this would come from your backend
const deliveryOptions = {
  standard: {
    title: "Standard Delivery",
    price: 0,
    icon: <Truck className="text-gray-500" />,
    deliveryDays: [
      { date: "May 15, 2025", day: "Thursday", slots: ["Morning", "Afternoon"] },
      { date: "May 16, 2025", day: "Friday", slots: ["Morning", "Afternoon", "Evening"] },
      { date: "May 17, 2025", day: "Saturday", slots: ["Morning", "Afternoon"] },
    ]
  },
  express: {
    title: "Express Delivery",
    price: 9.99,
    icon: <Clock className="text-blue-500" />,
    deliveryDays: [
      { date: "May 13, 2025", day: "Tuesday", slots: ["Afternoon", "Evening"] },
      { date: "May 14, 2025", day: "Wednesday", slots: ["Morning", "Afternoon", "Evening"] },
    ]
  }
};

// Sample cart items - in a real app, this would come from your cart state or API
const cartItems = [
  { id: 1, name: "Wireless Earbuds", price: 89.99, quantity: 1, image: "/api/placeholder/80/80" },
  { id: 2, name: "Smart Watch", price: 199.99, quantity: 1, image: "/api/placeholder/80/80" },
  { id: 3, name: "Portable Charger", price: 29.99, quantity: 2, image: "/api/placeholder/80/80" }
];

const DeliveryPage = () => {
  const [deliveryType, setDeliveryType] = useState("standard");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOptions[deliveryType].price;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    // Initialize page functionality
    if (window.app && typeof window.app.initDeliveryPage === 'function') {
      window.app.initDeliveryPage();
    } else {
      // Fallback initialization
      initBoxInteractions();
    }

    return () => {
      clearTimeout(timer);
      // Cleanup if needed
    };
  }, []);

  // Fallback function if vanilla JS isn't available
  const initBoxInteractions = () => {
    const boxes = document.querySelectorAll('.delivery-option');
    boxes.forEach(box => {
      box.addEventListener('mouseenter', () => box.classList.add('option-hover'));
      box.addEventListener('mouseleave', () => box.classList.remove('option-hover'));
    });
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select both a delivery date and time slot");
      return;
    }
    
    // In a real app, you would save the selection to your state/context and navigate
    console.log({
      deliveryType,
      selectedDate,
      selectedTimeSlot,
      cost: deliveryOptions[deliveryType].price
    });
    
    alert("Proceeding to checkout with your selected delivery options!");
    // Navigate to checkout page
    // history.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="delivery-container page" id="delivery-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading delivery options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="delivery-container page" id="delivery-page">
      <div className="checkout-steps">
        <div className="step completed">
          <div className="step-number">1</div>
          <div className="step-label">Cart</div>
        </div>
        <div className="step-divider"></div>
        <div className="step active">
          <div className="step-number">2</div>
          <div className="step-label">Delivery</div>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-number">3</div>
          <div className="step-label">Payment</div>
        </div>
        <div className="step-divider"></div>
        <div className="step">
          <div className="step-number">4</div>
          <div className="step-label">Confirmation</div>
        </div>
      </div>
      
      <h1>Select Delivery Options</h1>
      
      <div className="delivery-content">
        <div className="delivery-main">
          {/* Delivery Address Summary */}
          <div className="delivery-section delivery-address">
            <div className="section-header">
              <h2>Delivery Address</h2>
              <Link to="/addresses" className="change-link">Change</Link>
            </div>
            <div className="address-details">
              <div className="address-icon">
                <MapPin size={20} />
              </div>
              <div className="address-info">
                <p className="address-name">John Doe</p>
                <p className="address-line">123 Main Street, Apt 4B</p>
                <p className="address-line">New York, NY 10001</p>
                <p className="address-line">United States</p>
                <p className="address-phone">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>

          {/* Delivery Type Selection */}
          <div className="delivery-section delivery-options">
            <h2>Delivery Method</h2>
            <div className="delivery-types">
              <div 
                className={`delivery-option ${deliveryType === "standard" ? "selected" : ""}`}
                onClick={() => setDeliveryType("standard")}
              >
                <div className="option-icon">
                  <Truck size={20} />
                </div>
                <div className="option-details">
                  <h3>Standard Delivery</h3>
                  <p>Delivery within 3-5 days</p>
                </div>
                <div className="option-price">
                  <span>Free</span>
                </div>
                {deliveryType === "standard" && (
                  <div className="option-check">
                    <Check size={16} />
                  </div>
                )}
              </div>
              
              <div 
                className={`delivery-option ${deliveryType === "express" ? "selected" : ""}`}
                onClick={() => setDeliveryType("express")}
              >
                <div className="option-icon">
                  <Clock size={20} />
                </div>
                <div className="option-details">
                  <h3>Express Delivery</h3>
                  <p>Get it within 1-2 days</p>
                </div>
                <div className="option-price">
                  <span>${deliveryOptions.express.price.toFixed(2)}</span>
                </div>
                {deliveryType === "express" && (
                  <div className="option-check">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Date Selection */}
          <div className="delivery-section delivery-dates">
            <h2>Delivery Date</h2>
            <div className="date-options">
              {deliveryOptions[deliveryType].deliveryDays.map((dayOption, index) => (
                <div 
                  key={index}
                  className={`date-option ${selectedDate === dayOption.date ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedDate(dayOption.date);
                    setSelectedTimeSlot(null); // Reset time slot when date changes
                  }}
                >
                  <div className="date-icon">
                    <Calendar size={16} />
                  </div>
                  <div className="date-details">
                    <h3>{dayOption.day}</h3>
                    <p>{dayOption.date}</p>
                  </div>
                  {selectedDate === dayOption.date && (
                    <div className="date-check">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Time Slot Selection */}
          {selectedDate && (
            <div className="delivery-section delivery-slots">
              <h2>Time Slot</h2>
              <div className="time-options">
                {deliveryOptions[deliveryType].deliveryDays
                  .find(day => day.date === selectedDate)
                  ?.slots.map((slot, index) => (
                    <div 
                      key={index}
                      className={`time-option ${selectedTimeSlot === slot ? "selected" : ""}`}
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      <p>{slot}</p>
                      {selectedTimeSlot === slot && (
                        <div className="time-check">
                          <Check size={16} />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="delivery-sidebar">
          {/* Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-meta">
                      <p className="item-quantity">Qty: {item.quantity}</p>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="delivery-info">
              {selectedDate && selectedTimeSlot ? (
                <div className="selected-delivery">
                  <h3>Selected Delivery:</h3>
                  <p>{deliveryOptions[deliveryType].title}</p>
                  <p>{selectedDate} - {selectedTimeSlot}</p>
                </div>
              ) : (
                <div className="delivery-prompt">
                  <p>Please select a delivery date and time slot</p>
                </div>
              )}
            </div>
            
            <button 
              className="continue-button"
              onClick={handleContinue}
              disabled={!selectedDate || !selectedTimeSlot}
            >
              Continue to Payment
            </button>
            
            <Link to="/cart" className="back-link">
              Return to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withLayout(DeliveryPage);