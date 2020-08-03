import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from '../Components/Login/Login';
import SingIn from '../Components/SingIn/SingIn';
import Feed from '../Components/Feed/Feed';


// import { Container } from './styles';

function Router() {
  return  (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" >
                <Login />
            </Route>

            <Route exact path="/login" >
                <SingIn />
            </Route>

            <Route exact path="/create" >
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