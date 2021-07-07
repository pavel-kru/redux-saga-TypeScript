import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { RouteComponentProps } from '@reach/router';


interface PrivateRouteProps extends RouteProps{
  path: string;
  isAuth?: boolean;
  newcomponent: () => React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ newcomponent: Component, isAuth, path, ...rest }) => (
  <>{isAuth ? <Route {...rest} render={props => <Component {...props} />} /> : <Redirect to={path} />}</>
);
export default PrivateRoute;
