import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Map from './components/Map';
import ModelChat from './components/ModelChat';
import Summary from './components/Summary';
import './App.css';

function NavBar() {
  return (
    <nav>
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
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/PolyChatA" element={<ModelChat model="PolyChatA" />} />
          <Route path="/PolyChatI" element={<ModelChat model="PolyChatI" />} />
          <Route path="/PolyChatU" element={<ModelChat model="PolyChatU" />} />
          <Route path="/PolyChatR" element={<ModelChat model="PolyChatR" />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
