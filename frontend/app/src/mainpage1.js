import { Link } from "react-router-dom";
function Main1(){
    return(
        
        <div style={{backgroundImage:`url('/open2.jpg')`,backgroundSize:"cover", backgroundRepeat: 'no-repeat',height:'100vh',width:'100vw'}}>
            <br/><br/>
            <Link to="/adminform"><button style={{height:30,width:100,borderRadius:5,backgroundColor:'pink'}}>Admin</button></Link>
            <br/><br/><br/>
            <b><h1 className="a">Scribbles and Secrets Diary 🤫📔💭!<br/>"Where Memories Come Alive ......!"</h1></b>
            <Link to ="/signin" ><button className="mainbutton">Sign in</button></Link>
            <Link to = '/signup'><button className="mainbutton">Sign up</button></Link>
        </div>
       
    )
}
export default Main1;
