import React from 'react';

import styles from './DataBlock.module.scss';

function DataBlock({ name, oid, value }: { name: string; oid: string; value: string }) {
  return <div className={styles.block}>{value}</div>;
}

export default DataBlock;
