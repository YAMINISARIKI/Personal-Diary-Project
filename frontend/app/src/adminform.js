import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Adminform = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      if(username ==="Yamini" && password==="Yamini@123")
      {
        alert("Successfully logged in")
        window.location.replace('/admin');
      }
      else{
        alert("It is only for Admin ! Please enter credentials correctly !")
      }
    };

  return (
    <div style={{backgroundImage:`url('/adminpage.png')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}>
         <br/><br/><br/>
       <b><h1 style={{fontFamily:'bradley hand itc',fontSize:'55px'}}>Admin Login</h1></b> 
        <br/><br/><br/><br/><br/>

       <center>
        <div style={{height:'250px' , width:'500px' , backgroundColor:'#FFFBF5' , borderRadius:'10px'}}>
            <br/><br/>
      <form onSubmit={handleLogin}>
      <b><label>UserName : </label></b>
        <input type="text" placeholder="username" className='signinbox' value={username} onChange={(e) => setUsername(e.target.value)}/><br/><br/>
        <b><label>Password  :  </label></b>
        <input type="password" placeholder="Password" className='signinbox' value={password} onChange={(e) => setPassword(e.target.value)}/><br/><br/>
        <button type="submit" style={{height:30,width:300,backgroundColor:'palevioletred',borderRadius:5,fontSize:18}}><b>Login</b></button>
      </form>
      <br></br>
      <Link to='/'><b>Back</b></Link>
      </div>
      </center> 

    </div>
  );
};

export default Adminform;
