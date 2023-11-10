import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Main1 from './mainpage1';
// import Mainpage from './mainpage';
import './diaryapp.css'
import Signin from './signin';
import Signup from './signup';
import Addentry from './addentry';
import Showentry from './showentry';
import Editentry from './editentry';
import Adminpage from './adminpage';
import Adminform from './adminform';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Main1/>}/>
          <Route path='/login' element={<Mainpage/>}/> */}
          <Route path='/' element={<Main1/>}/>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/addentry' element={<Addentry/>}/>
          <Route path='/show' element={<Showentry/>}/>
          <Route path='/edit/:id' element={<Editentry/>}/>
          <Route path='/admin' element={<Adminpage/>}/>
          <Route path='/adminform' element={<Adminform/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
