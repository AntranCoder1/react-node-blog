import React from 'react';
import Home from './pages/home/Home';
import TopBar from './components/topbar/TopBar';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Setting from './pages/setting/Setting';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const user = false;
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={user ? Home : Register} />
        <Route exact path="/login" component={user ? Home : Login} />
        <Route exact path="/write" component={user ? Write : Register} />
        <Route exact path="/setting" component={user ? Setting : Register} />
        <Route exact path="/post/:postId" component={Single} />
      </Switch>
    </Router>
  );
}

export default App;
