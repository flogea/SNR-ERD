import React from 'react';

import styles from './Button.module.scss';

interface IButton {
  text?: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
}

function Button({ text, onClick, color, disabled }: IButton) {
  return (
    <div>
      <button
        className={styles.btn}
        style={{ color: `${color}` }}
        onClick={onClick}
        disabled={disabled}>
        {text}
      </button>
    </div>
  );
}

export default Button;
