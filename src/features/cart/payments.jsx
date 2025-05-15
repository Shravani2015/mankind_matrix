
import { useState } from 'react';
import { CreditCard, Wallet, ChevronRight, CheckCircle, ArrowLeft, DollarSign, Building } from 'lucide-react';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [sameAsDelivery, setSameAsDelivery] = useState(true);
  
  // Mock data for demonstration purposes
  const deliveryData = {
    address: {
      street: "123 Main St",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States"
    },
    email: "user@example.com",
    phone: "(555) 123-4567"
  };

  // Mock order summary
  const orderSummary = {
    subtotal: 129.99,
    shipping: 5.99,
    tax: 10.40,
    total: 146.38
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContinue = () => {
    alert('Proceeding to confirmation page');
  };
  
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };
  
  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardDetails(prev => ({ ...prev, cardNumber: formattedValue }));
  };
  
  return (
    <div className="bg-gray-50 p-4">
      {/* Navigation */}
      <div className="bg-white shadow p-4 mb-6 rounded-lg">
        <div className="flex items-center mb-4">
          <a href="#" className="text-gray-500 hover:text-gray-700 flex items-center">
            <ArrowLeft size={20} />
            <span className="ml-2">Back to Delivery</span>
          </a>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle size={16} />
            </div>
            <span className="text-sm mt-1">Cart</span>
          </div>
          <div className="h-1 bg-green-500 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">
              <CheckCircle size={16} />
            </div>
            <span className="text-sm mt-1">Delivery</span>
          </div>
          <div className="h-1 bg-green-500 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <span className="font-bold">3</span>
            </div>
            <span className="text-sm mt-1 font-medium">Payment</span>
          </div>
          <div className="h-1 bg-gray-300 flex-1 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
              <span className="font-bold">4</span>
            </div>
            <span className="text-sm mt-1">Confirmation</span>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment Options */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
          
          {/* Payment Method Selection */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium mb-4">Select Payment Method</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div 
                className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'creditCard' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('creditCard')}
              >
                <CreditCard className={paymentMethod === 'creditCard' ? 'text-blue-500' : 'text-gray-400'} />
                <span className="ml-2 font-medium">Credit / Debit Card</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'bank' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('bank')}
              >
                <Building className={paymentMethod === 'bank' ? 'text-blue-500' : 'text-gray-400'} />
                <span className="ml-2 font-medium">Online Banking</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'appleWallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('appleWallet')}
              >
                <Wallet className={paymentMethod === 'appleWallet' ? 'text-blue-500' : 'text-gray-400'} />
                <span className="ml-2 font-medium">Apple Wallet</span>
              </div>
              
              <div 
                className={`border rounded-lg p-4 flex items-center cursor-pointer ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <DollarSign className={paymentMethod === 'paypal' ? 'text-blue-500' : 'text-gray-400'} />
                <span className="ml-2 font-medium">PayPal</span>
              </div>
            </div>
          </div>
          
          {/* Credit Card Details */}
          {paymentMethod === 'creditCard' && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium mb-4">Card Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                  <input
                    type="text"
                    name="cardName"
                    value={cardDetails.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      maxLength="5"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="password"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="4"
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Bank Selection */}
          {paymentMethod === 'bank' && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium mb-4">Select Your Bank</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Bank of America', 'Chase', 'Wells Fargo', 'Citibank'].map((bank) => (
                  <div key={bank} className="border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-500">
                    <span className="font-medium">{bank}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Apple Wallet */}
          {paymentMethod === 'appleWallet' && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium mb-4">Apple Wallet</h2>
              <div className="flex justify-center p-4">
                <button className="bg-black text-white px-4 py-2 rounded-lg">
                  Pay with Apple Pay
                </button>
              </div>
            </div>
          )}
          
          {/* PayPal */}
          {paymentMethod === 'paypal' && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <h2 className="text-lg font-medium mb-4">PayPal</h2>
              <div className="flex justify-center p-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Continue with PayPal
                </button>
              </div>
            </div>
          )}
          
          {/* Billing Address */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="text-lg font-medium mb-4">Billing Address</h2>
            
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sameAsDelivery}
                  onChange={() => setSameAsDelivery(!sameAsDelivery)}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-700">Same as delivery address</span>
              </label>
            </div>
            
            {sameAsDelivery ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{deliveryData.address.street}</p>
                <p>{deliveryData.address.city}, {deliveryData.address.state} {deliveryData.address.zipCode}</p>
                <p>{deliveryData.address.country}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
                  <input type="text" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span>${orderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Shipping</span>
                <span>${orderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>${orderSummary.tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between mb-6">
              <span className="font-bold">Total</span>
              <span className="font-bold text-xl">${orderSummary.total.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleContinue}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center font-medium"
            >
              Continue to Confirmation
              <ChevronRight size={16} className="ml-1" />
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-gray-500 text-sm">
                By completing this order, you agree to our 
                <a href="#" className="text-blue-500 hover:underline ml-1">Terms and Conditions</a>.
              </p>
            </div>
            
            {/* Delivery Information */}
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-2">Delivery Information</h3>
              <div className="text-sm text-gray-600">
                <p className="mb-1">{deliveryData.address.street}</p>
                <p className="mb-1">{deliveryData.address.city}, {deliveryData.address.state} {deliveryData.address.zipCode}</p>
                <p className="mb-1">{deliveryData.address.country}</p>
                <p className="mb-1">{deliveryData.email}</p>
                <p>{deliveryData.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
