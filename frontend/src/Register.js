import React, { useState } from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom'

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [emailError, setEmailError] = useState('');
  // const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  // const validateCompany = (phone) => {
  //   const phoneRegex = /^[0-9]{10}$/;
  //   if (!phoneRegex.test(phone)) {
  //     setPhoneError('Phone number must be 10 digits');
  //     return false;
  //   }
  //   setPhoneError('');
  //   return true;
  // };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long, contain at least one number, one uppercase letter, and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail(email);
    // const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      const data1={ name:'aaaa', email:'aaaa@gmail.com', password:'aaaa@123',company:'aaaa' }
      // console.log("user entered data:"+data1)
      await axios.post('http://localhost:5000/register', { data1});
      console.log("user entered data:"+{data1})
      alert('Registration successful');
    } catch (error) {
      alert('Registration failed:  ', error);
    }
  };

  return (
    <div className='container'>
    <h5>Register</h5>
   
    <form className='box' onSubmit={handleSubmit}>
      <div className='group'>
        <input className="bar"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Name</label>
      </div>
      <div  className='group'>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => validateEmail(email)}
          required
        />
        <label>Email</label>
        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
      </div>
      <div  className='group'>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => validatePassword(password)}
          required
        />
        <label>Password</label>
        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      </div>
      <div  className='group'>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          // onBlur={() => validatePhone(phone)}
          
        />
        <label>Company</label>
        {/* {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>} */}
      </div>
      
      <button className='btn' type="submit">Register</button>
      <Link to='/login' className='btn' type="submit">LOGIN</Link>
    </form>
    </div>
  );
}

export default Register;
