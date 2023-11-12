import React from 'react';

import styles from './Pin.module.scss';
import { Button } from '../../atoms';

import { IPin } from '../../../pages/DashboardPage/Dasboard.types';

function Pin({ title, name, value }: IPin) {
  const data =
    +value === 2
      ? { text: 'HIGH', color: '#BC4141', disabled: true }
      : { text: 'LOW', color: '#429B40', disabled: true };
  return (
    <div className={styles.pin}>
      <label htmlFor="">{title}</label> <Button {...data} />
    </div>
  );
}

export default Pin;
