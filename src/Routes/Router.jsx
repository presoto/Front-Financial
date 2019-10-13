import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Dashboard from '../Pages/Dashboard/Dashboard';
import Transaction from './../Pages/Transaction/Transaction';

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard/:id" component={Dashboard}/>
        <Route exact path="/transaction/:param" component={Transaction}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;