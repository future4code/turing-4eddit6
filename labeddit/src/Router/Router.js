import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login';
import Signup from '../Components/Signup/Signup';
import Feed from '../Components/Feed/Feed';

function Router() {
  return  (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" >
                <Signup />
            </Route>

            <Route exact path="/login" >
                <Login />
            </Route>

            <Route exact path="/feed" >
                <Feed />
            </Route>

            <Route exact path="/post" >
                <Feed />
            </Route>

            <Route path="/" >
                <h3>Eita Giovana, o forninho caiu (404)</h3>
            </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default Router;