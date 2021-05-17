
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alluser from './pages/Alluser';
import Adduser from './pages/Adduser';
import Header from './componnets/Header/Header';
  
function App() {
  return (

  

    <Router>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/allUser' component={Alluser} />
        <Route path='/addUser' component={Adduser} />
        {/* <Route path='/addUser' component={Adduser} /> */}
        {/* <Route path='/annual' component={AnnualReport} />
        <Route path='/team' component={Teams} />
        <Route path='/blogs' component={Blogs} />
        <Route path='/sign-up' component={SignUp} /> */}
      </Switch>
    </Router>
  );
}
  
export default App;

