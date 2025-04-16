import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'This field is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'This field is required';
    else if (password.length < 4) newErrors.password = 'Password is too short';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    
    const validEmail = 'user@example.com'; // to be removed, Only for testing purposes
    const validPassword = 'password123'; // to be removed, Only for testing purposes

    if (email === validEmail && password === validPassword) {
      setSuccess({msg:'Successful Login!'});
      setErrors({});
      onLogin(); 
    } else {
      setErrors({ auth: 'Invalid email or password' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
      <h2>Login</h2>
      </div>
      {errors.auth && <p className="error">{errors.auth}</p>}
      {success.msg && <p className='success'>{success.msg}</p>}
      <div>
        <label>Email</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className='actions'>
      <button type="submit">Login</button>
      </div>
      
    </form>
  );
};

export default LoginForm;
