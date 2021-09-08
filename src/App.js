import Header from './components/Header/Header'
import Home from './components/Home/index'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Header />
            <Home />
          </Route>
          <Route>
            <Redirect  to='/' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
