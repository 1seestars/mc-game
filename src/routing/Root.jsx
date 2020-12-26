import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import CreateGame from '../components/CreateGame'
import JoinGame from '../components/JoinGame'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={CreateGame} />
        <Route path="/:id" component={JoinGame} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  </Provider>
)

export default Root
