import Header from 'components/Header'
import Home from 'components/Home'
import WatchScreen from 'components/VideoID'
import SearchPage from 'components/Search'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/watch'>
            <WatchScreen />
          </Route>
          <Route path='/results'>
            <SearchPage />
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
