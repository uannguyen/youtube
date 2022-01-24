import Header from 'components/Header'
import Home from 'components/Home'
import WatchScreen from 'components/VideoID'
import SearchPage from 'components/Search'
import { BrowserRouter as Router, Route, Redirect, Switch, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/watch' component={WatchScreen} />
            <Route path='/results' component={SearchPage} />
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
