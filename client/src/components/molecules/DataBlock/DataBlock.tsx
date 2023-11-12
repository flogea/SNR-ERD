import React from 'react';

import styles from './DataBlock.module.scss';

function DataBlock({
  name,
  oid,
  value,
  text,
}: {
  name: string;
  oid: string;
  value: string;
  text: string;
}) {
  return (
    <div className={styles.block}>
      <label htmlFor="">{text}</label>
      {value}
    </div>
  );
}

export default DataBlock;
