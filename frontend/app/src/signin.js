import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:2000/login', { username, password });
        localStorage.setItem('user_mail',response.data)
        if (response.status === 200) {
          window.location.replace('/addentry');
        }
      } catch (error) {
        alert("Please enter correct login Credentials !")
        console.error(error);
      }
    };

  return (
    <div style={{backgroundImage:`url('/login3.jpg')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}><br/><br/><br/><br/><br/>
      <Link to='/'><button className='signinback'>Back to Main Page</button></Link>
      <h1 className='cap1'>Welcome Back !</h1>
      <form onSubmit={handleLogin}>
      <b><label>UserName : </label></b>
        <input type="text" placeholder="username" className='signinbox' value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>
        <b><label>Password  :  </label></b>
        <input type="password" placeholder="Password" className='signinbox' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>
        <button  className='signinbutton' type="submit"><b>Login</b></button>
      </form>
    </div>
  );
};

export default Signin;
