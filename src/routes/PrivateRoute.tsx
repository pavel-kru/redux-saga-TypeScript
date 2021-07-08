import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  path: string;
  isAuth?: boolean;
  newcomponent: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ newcomponent: Component, isAuth, path, ...rest }) => (
  <>{isAuth ? <Route {...rest} render={props => Component} /> : <Redirect to={path} />} </>
);
export default PrivateRoute;
