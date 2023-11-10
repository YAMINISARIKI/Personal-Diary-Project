import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/signup', { username, password });
      console.log(response.data);
      alert("Successfully Created Account !")
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{backgroundImage:`url('/login3.jpg')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}>
      <br/><br/><br/><br/><br/>
      <Link to='/'><button className='signupback'> Back to Mainpage</button></Link>
      <h1 className='cap1'>Let's get started !</h1>
      <form onSubmit={handleSignup}>
        <b><label>UserName : </label></b>
        <input type="text" placeholder="username" className='signupbox' value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>
        <b><label>Password  :  </label></b>
        <input type="password" placeholder="Password" className='signupbox' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/><br/>
        <button type="submit" className='signupbutton'><b>Signup</b></button><br/>
      </form>
    </div>
  );
};

export default Signup;
