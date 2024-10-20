import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
import { BrowserRouter, Router, useSearchParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
}

export default App;
