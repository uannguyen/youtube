import Header from './components/Header/Header'
import Home from './components/Home/index'
import Sidebar from './components/Sidebar/Sidebar'
import WatchScreen from './components/VideoID/index'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Sidebar /> */}
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/watch/:id'>
            <WatchScreen />
          </Route>
          <Route>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
