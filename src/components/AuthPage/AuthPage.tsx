import React from 'react';

import Img from '../../assets/2-800x430.jpg';
import styles from './AuthPage.module.scss';

const AuthPage: React.FC = () => {
  return (
    <div className={styles.AuthCont}>
      <img src={Img} alt='Logo' />
    </div>
  );
};

export default AuthPage;
