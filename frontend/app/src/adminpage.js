import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Adminpage(){
    const [accounts,setAccounts] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:2000/getaccount')
        .then((response)=>{
            setAccounts(response.data.accountdata);
        })
    },[]);

    const DeleteUser = (id) =>{
        axios.delete('http://localhost:2000/deleteuser/'+id)
        .then(res=>{console.log(res)
                alert("data deleted successfully")
                window.location.reload()    
    
        })
        .catch(err=>{console.log(err)})
    }

    return(
        <div >
            <br/>
            <Link to="/"><button style={{height:25,width:100,}}>LogOut</button></Link>
            <h1>User Acounts</h1>
            <br/><br/>
           <center> <table align="center" border={1} style={{height:100,width:700,fontSize:23}}>
                <thead>
                    <tr>
                    <th>s.no</th>
                    <th>UserName</th>
                    <th>Password</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {accounts.map((ele,index)=>{
        return(
            <tr key={index}>
                <td><center>{index+1}</center></td>
                <td><center>{ele.username}</center></td>
                <td><center>{ele.password}</center></td>
                <td><center><button style={{backgroundColor:'#EB1D36',height:30,width:100,fontSize:20}} onClick={()=>DeleteUser(ele._id)}>Delete</button></center></td>
            </tr>
        )
    })}
                </tbody>
            </table>
            </center>
        </div>
    )
}
export default Adminpage;