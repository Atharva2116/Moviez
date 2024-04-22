// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';


import Login from './component/Login.js'
import Home from "./component/Home.js"
import Plan from "./component/Plan.js"
import Wishlist from "./component/Wishlist.js"
import Errorpage from "./component/Errorpage.js"



import "bootstrap"
// import Plan from './component/Plan';
// import Wishlist from './component/Wishlist';

// Define your plans array here
const plans = [
  { id: 1, name: 'Basic', price: '$9.99', description: 'Access to unlimited movies and TV shows on one device.' },
  { id: 2, name: 'Standard', price: '$13.99', description: 'Access to unlimited movies and TV shows on two devices simultaneously.' },
  { id: 3, name: 'Premium', price: '$16.99', description: 'Access to unlimited movies and TV shows on four devices simultaneously. HD and Ultra HD available.' }
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Pass the plans array as a prop to the Plan component */}
        <Route path="/plan" element={<Plan plans={plans} />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
