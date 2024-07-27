import React from 'react'
import Register from './Register'
import Login from './Login'
import './App.css';
import {BrowserRouter,Routes,Route}  from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
        <Routes>
                  <Route path='/' element={<Register/>} ></Route>
                  <Route path='/login' element={<Login/>} ></Route>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
