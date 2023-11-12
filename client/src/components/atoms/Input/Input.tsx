import { useId, useLayoutEffect, useState } from 'react';

import styles from './Input.module.scss';
import { setNewTemp } from '../../../api/setDatatoController';

function Input({ text, oid, value }: { text: string; oid: string; value: number }) {
  const id = useId();
  const [inpValue, setInputValue] = useState<number>(value);

  console.log(oid);

  useLayoutEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleDebouncedChange = (newTemp: number) => {
    setNewTemp(oid, newTemp)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
    setTimeout(() => {
      handleDebouncedChange(e.target.value);
    }, 1000);
  };

  return (
    <div className={styles.input}>
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
      <input
        id={id}
        className={styles.inp}
        type="number"
        value={inpValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;
