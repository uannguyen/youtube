import Header from './components/Header/header'
import Home from './components/Home/index'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import React from 'react'

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Home />
      {/* <Route path='/home' exact component={Home} /> */}
    </div>
    </Router>
  );
}

export default App;
