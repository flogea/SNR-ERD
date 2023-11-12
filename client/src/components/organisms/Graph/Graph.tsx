import React, { useEffect, useState } from 'react';

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import styles from './Graph.module.scss';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

function Graph({ text }: { text: string }) {
  const [data, setData] = useState<Array<Object>>([]);

  useEffect(() => {
    async function getData(db: any) {
      const sensorData = collection(db, `${text}`);
      const sensorSnapshot = await getDocs(sensorData);
      const Measurements = sensorSnapshot.docs.map((doc) => doc.data());
      setData(Measurements.slice(-10));
      return Measurements;
    }
    getData(db);
  }, []);

  return (
    <div className={styles.graph}>
      <div className={styles.leftSide}>{text}</div>
      <LineChart width={300} height={200} data={data}>
        <Line type="monotone" dataKey={text} stroke="#A48CC1" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </div>
  );
}

export default Graph;
