import React from 'react';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import Kmeans from './components/Kmeans/Kmeans';
import './css/App.css';
import DashBoard from './components/DashBoard';
import Chat from './components/Chat';
import NuageDeMot from './components/NuageDeMot';

function NavBar() {
  const [isNavbarVisible, setNavbarVisibility] = useState(true);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  };

  return (
  <div>
    <div className={`navbar ${isNavbarVisible ? 'visible' : 'hidden'}`}>
      <ul className='navbar-link'>
        <li>
          <Link to="/">Home</Link>
        </li>   
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/kmeans">Classification - Analyse</Link>
        </li>
        <li>
          <Link to="/chat">PolyChat</Link>
        </li>
        <li>
          <Link to="/cloud">Cloud</Link>
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
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/cloud" element={<NuageDeMot />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
