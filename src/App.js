import Header from './components/Header/header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'
import './style/index.scss'

function App() {
  return (
    <Router>
    <div className="App">
      <Route path='/' exact component={Header} />
    </div>
    </Router>
  );
}

export default App;
