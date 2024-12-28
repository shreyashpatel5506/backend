import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three'; // Import THREE explicitly
import BIRDS from 'vanta/dist/vanta.birds.min';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './component/Navbar';
import About from './component/About';
import Home from './component/Home'; 
import NoteState from './context/notes/notestate';
import Alert from './component/Alert';
import Login from './component/login'; 
import Signup from './component/signup'; 

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 1500);
  };

  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && myRef.current) {
      setVantaEffect(
        BIRDS({
          el: myRef.current,
          THREE: THREE,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {/* Background container with fixed position */}
      <div
        ref={myRef}
        style={{
          position: 'fixed', // Fix the background during scroll
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      ></div>
      
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/home" element={<Home showAlert={showAlert} />} />
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
