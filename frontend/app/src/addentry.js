import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Addentry=()=>{
    const [addentrydata,setAddentrydata] = useState({
        'title':'',
        'content':'',
        'myfile':'',
        'email':''
    })
    const [preview, setPreview] = useState(null);

    const handlesubmit=async (e)=>{

        const mail = localStorage.getItem('user_mail')

        const data = {
            'title' : addentrydata.title,
            'content' : addentrydata.content,
            'email' : addentrydata.email
        }
        
        console.log(addentrydata.email)
        const formData = new FormData();
        formData.append('title',addentrydata.title)
        formData.append('content',addentrydata.content)
        formData.append('myfile',addentrydata.myfile)
        formData.append('email',mail)
        
        e.preventDefault()

        if (!addentrydata.title || !addentrydata.content || !addentrydata.myfile) {
            alert("Please fill all the fields");
            return;
        }
        axios.post('http://localhost:2000/adddata',formData).then((res)=>{
            console.log(res.body)
            if(res.status === 200){
                alert("success")
            }
            window.location.reload()
        })

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAddentrydata({ ...addentrydata, myfile: file });

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user_mail');
    };
    return(
        <div style={{backgroundImage:`url('/addpage.png')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}> 
        <br/>  
            <Link to='/signin' onClick={handleLogout}><button className="logout">Logout</button></Link>
            <Link to='/show'><button className="show">Show entries</button></Link><br/><br/>
            <form onSubmit={handlesubmit} >
                <input type="text" name="title" className='titlebox' placeholder="title" onChange={(e)=>setAddentrydata({...addentrydata , title:e.target.value})}/>
                <b><button type="submit" className="add">Add Entry</button></b><br/><br/>
                <textarea type="text" name="content" className="contentbox" placeholder="content" onChange={(e)=>setAddentrydata({...addentrydata , content:e.target.value})}/><br/>
                <input type="file" name="myfile" onChange={handleFileChange} /><br />
                <div>
                {preview && <img src={preview} alt="Preview" style={{ width: '200px', height: '200px' }} />}<br />
                </div>
                {/* <input type="submit" name="submit"/> */}
                
            </form>
        </div>
    )
}
export default Addentry;