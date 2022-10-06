import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from 'react';
const  App=()=> {
  const [alert,setAlert] = useState(null)
  const showAlert =(message,type)=>
  {
          setAlert({
               msg:message,
               type:type
          })

          setTimeout(()=>{
             setAlert(null);
          },1500)
  }
  return (
    <>
      <NoteState>
          <Router>
          <Navbar/>
          <Alert alert={alert}/>
          <div className="container">
              <Routes>

                    <Route exact path="/" element= {<Home showAlert={showAlert}/>} />
                    <Route exact path="/about" element= {<About />} />
                    <Route exact path="/login" element= {<Login showAlert={showAlert}/>} />
                    <Route exact path="/signup" element= {<SignUp showAlert={showAlert}/>} />

               </Routes>
          </div>
            
          </Router>

      </NoteState>
     
    </>
  );
}

export default App;
