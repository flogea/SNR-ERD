import { useLayoutEffect, useState } from 'react';
import { getAllData } from '../../api/getDataFromSNP';
import { DataBlock } from '../../components/molecules';
import { Input } from '../../components/atoms';

import { Graph, Pin } from '../../components/organisms';

import { IControllerData } from './Dasboard.types';
import { setTemperatureFB } from '../../firebase/setTemperatureFB';
import { HumidityFB } from '../../firebase/setHumidityFB';

import styles from './Dashboard.module.scss';
import { ErrorPage } from '../ErrorPage';

function DashboardPage() {
  const [receivedData, setReceivedData] = useState([]);
  const [controllerData, setControllerData] = useState<IControllerData>({
    controllerName: '',
    version: '',
    temperature: {
      name: '',
      oid: '',
      value: '',
    },
    humidity: {
      name: '',
      oid: '',
      value: '',
    },
    normalTemp: {
      name: '',
      oid: '',
      value: '',
    },
    criticalTemp: {
      name: '',
      oid: '',
      value: '',
    },
    di1: {
      name: '',
      oid: '',
      value: '',
    },
    di2: {
      name: '',
      oid: '',
      value: '',
    },
    di3: {
      name: '',
      oid: '',
      value: '',
    },
    dia: {
      name: '',
      oid: '',
      value: '',
    },
    do1: {
      name: '',
      oid: '',
      value: '',
    },
    do2: {
      name: '',
      oid: '',
      value: '',
    },
  });

  useLayoutEffect(() => {
    getAllData().then((res) => {
      setReceivedData(res);
      if (Object.keys(res[0]).length !== 0) {
        setControllerData((prevState) => ({
          ...prevState,
          controllerName: res[0]['.1.3.6.1.2.1.1.5.0'].value,
          version: res[0]['.1.3.6.1.2.1.1.5.0'].value,
          temperature: res[0]['erd2temperature.0'],
          humidity: res[0]['erd2humidity.0'],
          normalTemp: res[0]['erd2temperatureNormal.0'],
          criticalTemp: res[0]['erd2temperatureCritical.0'],
          di1: res[0]['erd2di1state.0'],
          di2: res[0]['erd2di2state.0'],
          di3: res[0]['erd2di3state.0'],
          dia: res[0]['erd2diAstate.0'],
          do1: res[0]['erd2do1state.0'],
          do2: res[0]['erd2do2state.0'],
        }));
      }
    });
  }, []);

  setInterval(async () => {
    setTemperatureFB();
    HumidityFB();
  }, 3600000);

  return (
    <>
      {receivedData.length !== 0 ? (
        <div className={styles.dashboard}>
          <div className={styles.title}>
            <div className={styles.name}>{controllerData.controllerName}</div>
            <div className={styles.version}>12.7 sw</div>
          </div>
          <div className={styles.sensorData}>
            <DataBlock {...controllerData.temperature} text="temperature" />
            <DataBlock {...controllerData.humidity} text="humidity" />
            <div className={styles.critical}>
              <Input
                text="critical temperature"
                value={Number(controllerData.criticalTemp.value)}
                oid={controllerData.criticalTemp.oid.slice(0, -2)}
              />
              <Input
                text="normal temperature"
                value={Number(controllerData.normalTemp.value)}
                oid={controllerData.normalTemp.oid.slice(0, -2)}
              />
            </div>
          </div>
          <div className={styles.graphs}>
            <Graph text="temperature" />
            <Graph text="humidity" />
          </div>
          <div className={styles.divider}></div>
          <div className={styles.form}>
            <Pin {...controllerData.di1} title="DI1" />
            <Pin {...controllerData.di2} title="DI2" />
            <Pin {...controllerData.di3} title="DI3" />
            <Pin {...controllerData.dia} title="DIA" />
            <Pin {...controllerData.do1} title="Do1" />
            <Pin {...controllerData.do2} title="Do2" />
          </div>
        </div>
      ) : (
        <ErrorPage text="Server error, sorry" code="<500/>" />
      )}
    </>
  );
}

export default DashboardPage;
