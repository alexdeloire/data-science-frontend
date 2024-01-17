import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import Kmeans from './components/Kmeans';
import ModelChat from './components/ModelChat';
import Summary from './components/Summary';
import './App.css';
import DashBoard from './components/DashBoard';

function NavBar() {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    console.log('toggleNavbar');
    setNavbarVisibility(!isNavbarVisible);
  };

  return (
  <div>
    <div className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/summary">Summary</Link>
        </li>        
        <li>
          <Link to="/PolyChatA">PolyChatA</Link>
        </li>
        <li>
          <Link to="/PolyChatI">PolyChatI</Link>
        </li>
        <li>
          <Link to="/PolyChatU">PolyChatU</Link>
        </li>
        <li>
          <Link to="/PolyChatR">PolyChatR</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/kmeans">Kmeans</Link>
        </li>
      </ul>
    </div>
    <div className="hamburger" onClick={()=>toggleNavbar()}>
    ☰
  </div>
</div>
  );
}

function App() {
  return (
    // eslint-disable-next-line no-undef
    <div className={`main-container`}>
      <NavBar />
      <div>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/kmeans" element={<Kmeans />} />
            <Route path="/PolyChatA" element={<ModelChat model="PolyChatA" />} />
            <Route path="/PolyChatI" element={<ModelChat model="PolyChatI" />} />
            <Route path="/PolyChatU" element={<ModelChat model="PolyChatU" />} />
            <Route path="/PolyChatR" element={<ModelChat model="PolyChatR" />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
