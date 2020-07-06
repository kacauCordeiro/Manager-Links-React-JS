import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import {initAccount} from './actions/AccountActions'
import SignIn from './screens/Signin';
import SignUp from './screens/Signup';
import ManagerLinks from './screens/Manage/Links';
import CreateLinks from './screens/Manage/Links/Create';
import EditLinks from './screens/Manage/Links/Edit';
import Home from './screens/Home';
import { connect } from "react-redux";

const  App = ({initAccount}) => {


  useEffect(()=> {
    initAccount();
  },[initAccount]);

  return (
    <BrowserRouter>
    <div>
      <nav>
      <ul className="list-group list-group-horizontal">
      <li className="list-group-item">
          <Link to="/">Home</Link>
        </li>
        <li className="list-group-item">
          <Link to="/sign-in">Sign-in</Link>
        </li>
        <li className="list-group-item">
          <Link to="/sign-up">Sign-up</Link>
        </li>
        <li className="list-group-item">
          <Link to="/manage/links/create">Create Link</Link>
        </li>
        <li className="list-group-item">
          <Link to="/manage/links/edit">Edit Link</Link>
        </li>
        <li className="list-group-item">
          <Link to="/manage/links/">Links</Link>
        </li>
        
      </ul>
      </nav>
      </div>
      <Switch>
        <Route path="/sign-in">
          <SignIn/>
        </Route>
        <Route path="/sign-up">
          <SignUp/>
        </Route>
        <Route path="/manage/links/">
          <ManagerLinks/>
        </Route>
        <Route path="/manage/links/create">
         <CreateLinks/>
        </Route>
        <Route path="/manage/links/edit/">
          <EditLinks/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </BrowserRouter>
    

  );
};

const mapStateToProps = (state) => {
  return {account: state.account.account};
};

export default connect(mapStateToProps, {initAccount})(App);
