import { doc, setDoc } from 'firebase/firestore';
import { getTemperature } from '../api/getDataFromSNP';
import { db } from './firebase';

export function setTemperatureFB() {
  getTemperature()
    .then(async (res) => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      try {
        await setDoc(
          doc(db, `temperature`, `${hours}:${minutes}:${seconds}`),
          {
            name: `${hours}:${minutes}:${seconds}`,
            oid: res.temperature.oid,
            temperature: res.temperature.value,
          },
          { merge: true },
        );
      } catch (error) {
        console.error('Error on adding temperature value', error);
      }
    })
    .catch((err) => console.log(err));
}
