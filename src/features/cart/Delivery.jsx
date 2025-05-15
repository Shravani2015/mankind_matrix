import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, Truck, Check, User, MapPin, ShoppingBag } from 'lucide-react';
import withLayout from '../../layouts/HOC/withLayout';
import './Delivery.css';
import { useCart } from '../../context/CartContext'; // Import the useCart hook

const DeliveryPage = () => {
  const { cart } = useCart(); // Use the useCart hook to access cart state
  const [deliveryType, setDeliveryType] = useState("standard");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deliveryOptions, setDeliveryOptions] = useState({});
  const navigate = useNavigate();

  const taxRate = 0.10;
  const taxAmount = cart.total * taxRate;
  const deliveryFee = deliveryOptions[deliveryType]?.price || 0;
  const total = cart.total + taxAmount + deliveryFee;

  // Default delivery options if API fails
  const getDefaultDeliveryOptions = () => {
    const currentDate = new Date();
    
    // Standard delivery dates (starting from current date + 5 days / 120 hours)
    const standardDeliveryDays = [];
    for (let i = 0; i < 3; i++) {
      const deliveryDate = new Date(currentDate);
      deliveryDate.setHours(currentDate.getHours() + 120 + (i * 24)); // 5 days + additional days
      
      const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      const dayName = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
      
      standardDeliveryDays.push({
        date: formattedDate,
        day: dayName,
        slots: ["8AM - 12PM", "12PM - 4PM", "4PM - 9PM"]
      });
    }
    
    // Express delivery dates (starting from current date + 3 days / 72 hours)
    const expressDeliveryDays = [];
    for (let i = 0; i < 3; i++) {
      const deliveryDate = new Date(currentDate);
      deliveryDate.setHours(currentDate.getHours() + 72 + (i * 24)); // 3 days + additional days
      
      const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
      
      const dayName = deliveryDate.toLocaleDateString('en-US', { weekday: 'long' });
      
      expressDeliveryDays.push({
        date: formattedDate,
        day: dayName,
        slots: ["10AM - 2PM", "2PM - 6PM", "6PM - 9PM"]
      });
    }
    
    return {
      standard: {
        title: "Standard Delivery",
        price: 0,
        icon: <Truck className="text-gray-500" />,
        deliveryDays: standardDeliveryDays
      },
      express: {
        title: "Express Delivery",
        price: 9.99,
        icon: <Clock className="text-blue-500" />,
        deliveryDays: expressDeliveryDays
      }
    };
  };

  // Try to fetch delivery options from API, fallback to default options
  const fetchDeliveryOptions = async () => {
    try {
      // Attempt to fetch from API
      const response = await fetch('/api/delivery-options');
      
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('API returned error status: ' + response.status);
      }
      
      const data = await response.json();
      setDeliveryOptions(data);
    } catch (error) {
      console.log('API fetch failed, using default delivery options:', error);
      // If API call fails, use the default options
      const defaultOptions = getDefaultDeliveryOptions();
      setDeliveryOptions(defaultOptions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch delivery options (from API or generate them)
    fetchDeliveryOptions();

    // Initialize page functionality
    if (window.app && typeof window.app.initDeliveryPage === 'function') {
      window.app.initDeliveryPage();
    } else {
      // Fallback initialization
      initBoxInteractions();
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Reset selected date and time slot when delivery type changes
  useEffect(() => {
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  }, [deliveryType]);

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

    // In a real app, you would likely save delivery options along with the cart data
    console.log({
      deliveryType,
      selectedDate,
      selectedTimeSlot,
      cost: deliveryOptions[deliveryType].price,
      cartItems: cart.items
    });

    navigate('/payments');
    // Optionally, you could pass delivery details to the payments page via state
    // navigate('/payments', { state: { deliveryDetails: { deliveryType, selectedDate, selectedTimeSlot, cost: deliveryOptions[deliveryType].price } } });
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
                  <p>Delivery within 5 days</p>
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
                  <p>Get it within 3 days</p>
                </div>
                <div className="option-price">
                  <span>${deliveryOptions.express?.price.toFixed(2)}</span>
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
              {deliveryOptions[deliveryType]?.deliveryDays.map((dayOption, index) => (
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
                {deliveryOptions[deliveryType]?.deliveryDays
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

            <div className="cart-order">
              {cart.items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="placeholder-image">{item.name.charAt(0)}</div>
                    )}
                  </div>
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <div className="item-meta">
                      <p className="item-quantity">Qty: {item.quantity}</p>
                      <p className="item-price">{item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${taxAmount.toFixed(2)}</span>
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
                  <p>{deliveryOptions[deliveryType]?.title}</p>
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