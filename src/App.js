import React from 'react'
import { ContextProvider } from './reducer'
import Inter from './locale/intl'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Login from './pages/Login/longin.jsx'
import Main from './pages/Main'
import NotFount from './pages/NotFount'
const App = () => {
  return (
    <ContextProvider>
      <Inter>
        <BrowserRouter >
          <Switch>
            <Redirect exact from='/' to='/login' />
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route component={NotFount} />
          </Switch>
        </BrowserRouter>
      </Inter>
    </ContextProvider>

  );
}
export default App;



