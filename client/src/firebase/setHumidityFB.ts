import { doc, setDoc } from 'firebase/firestore';
import { getHumidity } from '../api/getDataFromSNP';
import { db } from './firebase';

export function HumidityFB() {
  getHumidity()
    .then(async (res) => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      try {
        await setDoc(
          doc(db, `humidity`, `${hours}:${minutes}:${seconds}`),
          {
            name: `${hours}:${minutes}:${seconds}`,
            oid: res.humidity.oid,
            humidity: res.humidity.value,
          },
          { merge: true },
        );
      } catch (error) {
        console.error('Error on adding humidity value', error);
      }
    })
    .catch((err) => console.log(err));
}
