import React, { useState, useEffect } from 'react';
import './CartNotification.css';

const CartNotification = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isVisible ? (
    <div className="cart-notification">
      {message}
    </div>
  ) : null;
};

export default CartNotification;