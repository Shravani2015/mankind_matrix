// main.js - Main application entry point
import AddressManager from './ProfilePage/manageaddress.js';

class App {
  constructor() {
    this.initializeModules();
    this.setupNavigationEvents();
  }

  initializeModules() {
    // Initialize the AddressManager module
    this.addressManager = new AddressManager();
    this.addressManager.init();

    // Initialize other modules
    this.initializeCart();
    this.initializeProductCatalog();
    this.initializeCheckout();
  }

  setupNavigationEvents() {
    // Handle navigation menu clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');
        this.navigateTo(target);
      });
    });

    // Check if we have a hash in the URL and navigate accordingly
    if (window.location.hash) {
      const target = window.location.hash.substring(1);
      this.navigateTo(target);
    } else {
      // Default to home page
      this.navigateTo('home');
    }
  }

  navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
      p.classList.add('hidden');
    });

    // Show the targeted page
    const targetPage = document.getElementById(`${page}-page`);
    if (targetPage) {
      targetPage.classList.remove('hidden');
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === page) {
          link.classList.add('active');
        }
      });

      // Update URL hash
      window.location.hash = page;

      // Special actions for specific pages
      if (page === 'addresses') {
        this.addressManager.renderAddresses();
      } else if (page === 'checkout') {
        this.updateCheckoutAddresses();
      }
    }
  }

  initializeCart() {
    // Initialize cart functionality
    this.cart = {
      items: JSON.parse(localStorage.getItem('cart')) || [],
      
      addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          this.items.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
          });
        }
        
        this.saveCart();
        this.updateCartUI();
      },
      
      removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
      },
      
      updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
          item.quantity = quantity;
          if (item.quantity <= 0) {
            this.removeItem(productId);
          } else {
            this.saveCart();
            this.updateCartUI();
          }
        }
      },
      
      getTotal() {
        return this.items.reduce((total, item) => {
          return total + (item.price * item.quantity);
        }, 0);
      },
      
      getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
      },
      
      clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartUI();
      },
      
      saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
      },
      
      updateCartUI() {
        // Update cart item count in header
        document.getElementById('cart-count').textContent = this.getItemCount();
        
        // Update cart items list
        const cartItemsList = document.getElementById('cart-items');
        if (cartItemsList) {
          cartItemsList.innerHTML = '';
          
          if (this.items.length === 0) {
            cartItemsList.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
          } else {
            this.items.forEach(item => {
              const cartItem = document.createElement('div');
              cartItem.className = 'cart-item';
              cartItem.innerHTML = `
                <div class="cart-item-image">
                  <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                  <h4>${item.name}</h4>
                  <p>$${item.price.toFixed(2)}</p>
                  <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                  </div>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
              `;
              cartItemsList.appendChild(cartItem);
            });
            
            // Add event listeners
            document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
              btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.items.find(item => item.id === id);
                if (item) {
                  this.updateQuantity(id, item.quantity - 1);
                }
              });
            });
            
            document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
              btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const item = this.items.find(item => item.id === id);
                if (item) {
                  this.updateQuantity(id, item.quantity + 1);
                }
              });
            });
            
            document.querySelectorAll('.quantity-input').forEach(input => {
              input.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const quantity = parseInt(e.target.value);
                if (!isNaN(quantity)) {
                  this.updateQuantity(id, quantity);
                }
              });
            });
            
            document.querySelectorAll('.remove-item').forEach(btn => {
              btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.removeItem(id);
              });
            });
          }
          
          // Update cart total
          const cartTotal = document.getElementById('cart-total');
          if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
          }
        }
      }
    };
    
    // Initialize cart UI
    this.cart.updateCartUI();
  }

  initializeProductCatalog() {
    // Sample product data - in a real app, this would come from an API
    const products = [
      {
        id: 'prod1',
        name: 'Premium Wireless Headphones',
        price: 149.99,
        description: 'High-quality wireless headphones with noise cancellation.',
        image: 'images/headphones.jpg'
      },
      {
        id: 'prod2',
        name: 'Smartphone Case',
        price: 24.99,
        description: 'Durable case with shock absorption technology.',
        image: 'images/case.jpg'
      },
      {
        id: 'prod3',
        name: 'Bluetooth Speaker',
        price: 79.99,
        description: 'Portable speaker with 12-hour battery life.',
        image: 'images/speaker.jpg'
      },
      {
        id: 'prod4',
        name: 'Fitness Tracker',
        price: 89.99,
        description: 'Waterproof fitness tracker with heart rate monitor.',
        image: 'images/tracker.jpg'
      }
    ];
    
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
      productGrid.innerHTML = '';
      
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
        productGrid.appendChild(productCard);
      });
      
      // Add event listeners for "Add to Cart" buttons
      document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const productId = e.target.getAttribute('data-id');
          const product = products.find(p => p.id === productId);
          
          if (product) {
            this.cart.addItem(product);
            
            // Show confirmation toast
            this.showToast(`${product.name} added to cart!`);
          }
        });
      });
    }
  }

  initializeCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (this.cart.items.length > 0) {
          this.navigateTo('checkout');
        } else {
          this.showToast('Your cart is empty!', 'error');
        }
      });
    }
    
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', () => {
        this.processOrder();
      });
    }
  }

  updateCheckoutAddresses() {
    const shippingAddressSelect = document.getElementById('shipping-address');
    const billingAddressSelect = document.getElementById('billing-address');
    
    if (!shippingAddressSelect || !billingAddressSelect) return;
    
    // Clear existing options
    shippingAddressSelect.innerHTML = '';
    billingAddressSelect.innerHTML = '';
    
    const addresses = this.addressManager.getAllAddresses();
    const defaultAddress = this.addressManager.getDefaultAddress();
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select Address --';
    shippingAddressSelect.appendChild(defaultOption.cloneNode(true));
    billingAddressSelect.appendChild(defaultOption);
    
    // Add addresses
    addresses.forEach((address, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${address.name} - ${address.street}, ${address.city}`;
      
      if (address.isDefault) {
        option.selected = true;
      }
      
      shippingAddressSelect.appendChild(option.cloneNode(true));
      billingAddressSelect.appendChild(option);
    });
    
    // Update order summary
    this.updateOrderSummary();
  }

  updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    if (!orderSummary) return;
    
    orderSummary.innerHTML = '';
    
    // Calculate subtotal
    const subtotal = this.cart.getTotal();
    const shipping = 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    // Create summary table
    const summaryTable = document.createElement('table');
    summaryTable.className = 'order-summary-table';
    summaryTable.innerHTML = `
      <tr>
        <th>Item</th>
        <th>Qty</th>
        <th>Price</th>
      </tr>
      ${this.cart.items.map(item => `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
      `).join('')}
      <tr class="summary-row">
        <td colspan="2">Subtotal</td>
        <td>$${subtotal.toFixed(2)}</td>
      </tr>
      <tr class="summary-row">
        <td colspan="2">Shipping</td>
        <td>$${shipping.toFixed(2)}</td>
      </tr>
      <tr class="summary-row">
        <td colspan="2">Tax</td>
        <td>$${tax.toFixed(2)}</td>
      </tr>
      <tr class="summary-row total">
        <td colspan="2">Total</td>
        <td>$${total.toFixed(2)}</td>
      </tr>
    `;
    
    orderSummary.appendChild(summaryTable);
  }

  processOrder() {
    const shippingAddressIndex = document.getElementById('shipping-address').value;
    const billingAddressIndex = document.getElementById('billing-address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    
    // Simple validation
    if (!shippingAddressIndex || !billingAddressIndex || !paymentMethod) {
      this.showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // In a real application, this would send order data to a server
    // For demo purposes, we'll just show a success message
    
    // Clear cart
    this.cart.clearCart();
    
    // Show success message
    document.getElementById('checkout-form').classList.add('hidden');
    document.getElementById('order-success').classList.remove('hidden');
    
    // After 5 seconds, redirect to home
    setTimeout(() => {
      this.navigateTo('home');
      document.getElementById('checkout-form').classList.remove('hidden');
      document.getElementById('order-success').classList.add('hidden');
    }, 5000);
  }

  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});