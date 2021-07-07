import React from 'react';
import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = props => {
  return (
    <Fragment>
      <MainHeader isAuth={props.isAuth} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
