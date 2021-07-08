import React from 'react';
import styles from './Input.module.scss';

const Input: React.FC<any> = (props) => {
  let inputStyle = `${styles.Input} ${props.className} ${props.error === 1 ? styles.errorInput : null}`;

  return (
    <>
      <div className={inputStyle}>
        <input onChange={props.onChange} {...props} />
        <label htmlFor={props.id}>{props.label}</label>
      </div>
      {props.error === 1 && <p className={styles.error}>Enter a valid {props.id}</p>}
    </>
  );
};

export default React.memo(Input);
