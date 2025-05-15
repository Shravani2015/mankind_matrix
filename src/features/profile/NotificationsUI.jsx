import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaCheck, FaTrash, FaCheckDouble, FaRegClock } from 'react-icons/fa';

function NotificationsUI() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      message: "Welcome to Mankind Matrix!", 
      read: false, 
      time: "Just now", 
      type: "welcome" 
    },
    { 
      id: 2, 
      message: "New products added to our collection", 
      read: false, 
      time: "2 hours ago",
      type: "product" 
    },
    { 
      id: 3, 
      message: "Your order #12345 has been shipped", 
      read: true, 
      time: "Yesterday",
      type: "order" 
    },
    { 
      id: 4, 
      message: "Special discount: 20% off all items this weekend", 
      read: false, 
      time: "2 days ago",
      type: "promo" 
    }
  ]);
  
  const notificationPanelRef = useRef(null);
  
  // Handle click outside to close panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle notifications panel
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  // Mark individual notification as read
  const markAsRead = (id, event) => {
    event.stopPropagation(); // Prevent notification click from triggering
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  // Remove notification
  const removeNotification = (id, event) => {
    event.stopPropagation(); // Prevent notification click from triggering
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  // Get notification background color based on type
  const getNotificationTypeColor = (type) => {
    switch(type) {
      case 'welcome':
        return 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))';
      case 'product':
        return 'linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05))';
      case 'order':
        return 'linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))';
      case 'promo':
        return 'linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05))';
      default:
        return 'linear-gradient(135deg, rgba(158, 158, 158, 0.1), rgba(158, 158, 158, 0.05))';
    }
  };
  
  return (
    <div className="notification-wrapper" ref={notificationPanelRef}>
      {/* Notification Bell Icon */}
      <div 
        className={`notification-button ${unreadCount > 0 ? 'notification-pulse' : ''}`} 
        onClick={toggleNotifications}
        style={{ position: 'relative' }}
      >
        <FaBell style={{ fontSize: '1.2rem' }} />
        {unreadCount > 0 && (
          <span className="cart-count" style={{ 
            fontSize: '0.7rem', 
            width: '18px', 
            height: '18px' 
          }}>
            {unreadCount}
          </span>
        )}
      </div>
      
      {/* Notification Panel */}
      {isOpen && (
        <div className={`notification-panel ${isOpen ? 'active' : ''}`} style={{
          borderRadius: '12px',
          overflow: 'hidden',
          maxHeight: '500px',
          width: '320px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid #eee', 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              color: '#333',
              fontWeight: '600' 
            }}>
              Notifications
            </h3>
            
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#e91e63',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: '500'
                }}
              >
                <FaCheckDouble style={{ fontSize: '0.9rem' }} />
                Mark all read
              </button>
            )}
          </div>
          
          {/* Notifications List */}
          <div style={{ 
            overflowY: 'auto',
            flex: '1',
            maxHeight: '350px',
            padding: '0',
            backgroundColor: '#fff'
          }}>
            {notifications.length > 0 ? (
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0 
              }}>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id}
                    style={{
                      padding: '15px 20px',
                      borderBottom: '1px solid #f0f0f0',
                      background: notification.read ? '#fff' : getNotificationTypeColor(notification.type),
                      cursor: 'default',
                      color: '#333',
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ 
                          margin: '0 0 6px 0', 
                          fontSize: '0.9rem',
                          fontWeight: notification.read ? '400' : '500'
                        }}>
                          {notification.message}
                        </p>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          fontSize: '0.75rem',
                          color: '#888'
                        }}>
                          <FaRegClock style={{ fontSize: '0.7rem' }} />
                          <span>{notification.time}</span>
                        </div>
                      </div>
                      
                      {/* Action buttons */}
                      <div style={{ 
                        display: 'flex',
                        alignItems: 'center', 
                        gap: '8px',
                        marginLeft: '10px'
                      }}>
                        {!notification.read && (
                          <button
                            onClick={(e) => markAsRead(notification.id, e)}
                            style={{
                              background: 'rgba(76, 175, 80, 0.1)',
                              border: 'none',
                              borderRadius: '50%',
                              width: '28px',
                              height: '28px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              color: '#4CAF50',
                              fontSize: '0.7rem'
                            }}
                            title="Mark as read"
                          >
                            <FaCheck />
                          </button>
                        )}
                        <button
                          onClick={(e) => removeNotification(notification.id, e)}
                          style={{
                            background: 'rgba(244, 67, 54, 0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#F44336',
                            fontSize: '0.7rem'
                          }}
                          title="Remove notification"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div style={{ 
                padding: '30px 20px', 
                textAlign: 'center', 
                color: '#888' 
              }}>
                <p style={{ margin: 0 }}>No notifications</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div style={{ 
            padding: '10px 20px', 
            borderTop: '1px solid #eee',
            backgroundColor: '#f9f9f9',
            textAlign: 'center',
            fontSize: '0.8rem',
            color: '#888'
          }}>
            <a 
              href="#settings" 
              style={{ 
                color: '#e91e63', 
                textDecoration: 'none',
                fontWeight: '500' 
              }}
            >
              Notification Settings
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsUI;