import React from 'react' ;
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

const PrivateRoute = ({ component, isAuthenticated, path, ...props
}) => (
  <Route {...props} exact path={path} render={() => (
    isAuthenticated ? (
      React.createElement(component, {...props})
    ) : (
      <Redirect to='/login'/>
    )
    )}
  />
)

export default PrivateRoute;


