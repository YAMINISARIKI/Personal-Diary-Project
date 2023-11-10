import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Showentry = () => {
    const [entries, setEntries] = useState([]);
    const mail = localStorage.getItem('user_mail');
    console.log(mail);
    useEffect(() => {
        axios.post(`http://localhost:2000/getentries`,{email:mail})
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);


    const handleDelete = (id) => {
        axios.delete('http://localhost:2000/deleteEntry/'+id)
        .then(res=>{console.log(res)
            alert("data deleted successfully")
            window.location.reload()    

    })
    .catch(err=>{console.log(err)})
    };


    return (
        <div style={{backgroundImage:`url('/showpage2.png')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:735,width:1440}}>
            <br/>
            <br/>
            <Link to='/addentry'><button className='showback'>Back to Home</button></Link>
            <div style={{backgroundColor:'white',height:500,width:1150,margin:'20px 0px 0px 150px'}} className='divi'>
            {entries.map(entry => (
                <div key={entry._id} >
                    
                    <h3>{entry.title}</h3>
                    <p>{entry.content}</p>
                    {entry.imagepath && <div><img src={`http://localhost:2000/uploads/${entry.imagepath}`} alt={entry.title} style={{ width: '100px', height: '100px' }} /><br /></div>}
                    <button onClick={() => handleDelete(entry._id)} className='delete'>Delete</button>
                    <Link to={`/edit/${entry._id}`}><button className='edit'>Edit</button></Link> 
                </div>
            ))}
            </div>
        </div>
    );
};

export default Showentry;

