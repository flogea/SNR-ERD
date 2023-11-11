import React, { useId, useState } from 'react';

import styles from './Input.module.scss';

function Input({ text, value }: { text?: string; value?: string }) {
  const id = useId();
  const [inpvalue, setValue] = useState<number>(+value!);

  return (
    <div className={styles.input}>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      <input id={id} className={styles.inp} type="number" value={inpvalue} />
    </div>
  );
}

export default Input;
