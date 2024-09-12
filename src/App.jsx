import React from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Room from './Room';
import Session from './Session';
function App() {

  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room" element={<Room />} />
      <Route path="/session/:room" element={<Session />} />
    </Routes>
  </BrowserRouter>
   
  );
}

export default App
