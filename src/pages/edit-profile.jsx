import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

//  This component is the same as in your "add_react_to_html" immersive
const AccountPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isPasskeyEligible, setIsPasskeyEligible] = useState(true);
  const [showEditPasskey, setShowEditPasskey] = useState(true);
  const [error, setError] = useState('');
  const [isPasskeySetUp, setIsPasskeySetUp] = useState(false);

  useEffect(() => {
    setFullName('John Doe');
    setEmail('john.doe@example.com');
    setMobileNumber('+1 555-123-4567');
  }, []);

  const handleSave = () => {
    let hasErrors = false;
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      hasErrors = true;
    } else if (fullName.trim().length < 2) {
        setError("Full name must be at least 2 characters long");
        hasErrors = true;
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email.trim()) {
      setError('Please enter your email address.');
      hasErrors = true;
    } else if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      hasErrors = true;
    }

    if (password && password.length < 8) {
        setError("Password must be at least 8 characters long");
        hasErrors = true;
    }

    if (!mobileNumber.trim()) {
      setError('Please enter your mobile number.');
      hasErrors = true;
    }

    if (!hasErrors) {
        // send this data to an API.  Use prepared statements or parameterized queries to prevent SQL injection.  NEVER directly embed user input in a query.
        console.log('Saving account information:', {
          fullName,
          email,
          mobileNumber,
          password, //  DO NOT log the actual password.  Only send a hashed version to the server(security).
          rememberMe,
        });
        setPassword('');
        setError('');
    }
  };

    const handleEditPasskey = () => {
        console.log("Editing passkey");
        alert('Passkey edit mode activated (Simulated)');
    }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Your Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Manage your account settings
          </p>
        </div>

        {isPasskeyEligible && showEditPasskey && isPasskeySetUp && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Passkey for John</AlertTitle>
            <AlertDescription>
              You can sign in faster using a passkey. <Button variant="link" onClick={handleEditPasskey}>Edit</Button>
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Login & security</CardTitle>
            <CardDescription>
              Edit name, email, mobile number, and password
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  className="dark:border-gray-700"
                />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              onClick={handleSave}
            >
              Save changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};



const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Profile</CardTitle>
          <CardDescription>Welcome to your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name:</Label>
            <p className="text-gray-700 dark:text-gray-300">John Doe</p>
          </div>
          <div className="space-y-2">
            <Label>Email:</Label>
            <p className="text-gray-700 dark:text-gray-300">john.doe@example.com</p>
          </div>
          <div className="space-y-2">
            <Label>Role:</Label>
            <p className="text-gray-700 dark:text-gray-300">User</p>
          </div>
        </CardContent>
        <CardFooter>
          {/* use a button to call function onClick */}
          <Button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={renderAccountPage}
          >
            Edit Profile
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Function to render the AAccountPage component.
function renderAccountPage() {
    const rootElement = document.getElementById('root');
    if (rootElement) {
        ReactDOM.render(<AccountPage />, rootElement);
    } else {
        console.error('Root element with id "root" not found.  Cannot render the React component.');
    }
}



//   you would have a main App component that renders
//  different pages based on the route.  //  For simplicity, we are just rendering the ProfilePage component here.
const App = () => {
    return (
        <ProfilePage />
    )
}

export default App;
