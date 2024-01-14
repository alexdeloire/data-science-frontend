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
          <Link to="/chat">Chat</Link>
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
          <Route path="/chat" element={<ModelChat />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
