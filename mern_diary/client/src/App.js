import React, { useState } from 'react'
import './App.css'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Diary from './pages/Diary'
import About from './pages/About'
import Page from './pages/Page'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Register from './pages/Register'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Navbar from './components/NavBar'
import {UserProvider} from './context/Context'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// export const UserContext = React.createContext([]);

const App = () => {
  const [user, setUser] = useState()
  // const user = []
  return (
    <UserProvider value={[user, setUser]}>
    <Router>
      <Route path='/:page' component={Navbar} />
      <div className="App">
        <Switch>
          <Route path='/' exact><Welcome /></Route>
          <Route path='/login' component={Login} />
          <Route path='/Register' component={Register} />
          <Route path='/home' ><Home /></Route>
          <Route path='/about'><About /></Route>
          <Route path='/diary' exact><Diary /></Route>
          <Route path='/diary/add'><Add /></Route>
          <Route path='/diary/:id' exact><Page /></Route>
          <Route path="/diary/edit/:id"><Edit /></Route>
          <Route ><PageNotFound /></Route>
        </Switch>
      </div>
    </Router>
    </UserProvider>

  )
}

export default App
