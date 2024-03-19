import logo from './logo.svg';
import './App.css';

import Login from './Components/Authentication/Login'; 
import Signup from './Components/Authentication/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Record/Home.js'
import Update from './Components/Record/update'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
      <Route exact path='/'  element={<Home  key="home" />}  />

       
          <Route exact path='/login'  element={<Login  key="login" />}  />
          <Route exact path='/signup'  element={<Signup  key="signup" />} />
          <Route exact path='/update/:id'  element={<Update  key="update" />} />

    


      </Routes>


    </BrowserRouter>
  );
}

export default App;
