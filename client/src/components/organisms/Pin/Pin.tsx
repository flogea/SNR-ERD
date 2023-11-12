import { useState } from 'react';

import styles from './Pin.module.scss';
import { Button } from '../../atoms';

import { IPin } from '../../../pages/DashboardPage/Dasboard.types';
import { setPin } from '../../../api/setDatatoController';

function Pin({ title, oid, name, value }: IPin) {
  const [pinValue, setValue] = useState<number>(+value);
  let data;

  const handleChangePin = () => {
    setValue(Number(!+pinValue));
    setPin(oid.slice(0, -2), Number(!+pinValue))
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (title !== 'Do2' && title !== 'Do1') {
    data =
      pinValue === 2
        ? { text: 'HIGH', color: '#BC4141', disabled: true }
        : { text: 'LOW', color: '#429B40', disabled: true };
  } else {
    data =
      pinValue === 1
        ? { text: 'HIGH', color: '#BC4141', disabled: false, onClick: handleChangePin }
        : { text: 'LOW', color: '#429B40', disabled: false, onClick: handleChangePin };
  }

  return (
    <div className={styles.pin}>
      <label htmlFor="">{title}</label> <Button {...data} />
    </div>
  );
}

export default Pin;
