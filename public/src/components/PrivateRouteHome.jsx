import React from 'react' ;
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRouteHome = ({ component, isAuthenticated, path, ...props
}) => (
  <Route {...props} exact path={path} render={() => (
    isAuthenticated ? (
      <Redirect to='/create-trip'/>
    ) : (
      <Redirect to='/login'/>
    )
    )}
  />
)

export default PrivateRouteHome;


