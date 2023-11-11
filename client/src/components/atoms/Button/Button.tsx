import React from 'react';

import styles from './Button.module.scss';

interface IButton {
  text?: string;
  onClick?: () => void;
}

function Button({ text, onClick }: IButton) {
  return (
    <div>
      <button className={styles.btn} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button;
