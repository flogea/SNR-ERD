import React, { useEffect, useLayoutEffect, useState } from 'react';
import { getAllData, getTemperature } from '../../api/getDataFromSNP';
import { DataBlock } from '../../components/molecules';
import { Button, Input } from '../../components/atoms';

import styles from './Dashboard.module.scss';

interface IReceiveddata {
  name: string;
  oid: string;
  value: string;
}

interface IControllerData {
  controllerName: string;
  version: string;
  temperature: IReceiveddata;
  humidity: IReceiveddata;
  normalTemp: IReceiveddata;
  criticalTemp: IReceiveddata;
  di1: IReceiveddata;
  di2: IReceiveddata;
  di3: IReceiveddata;
  dia: IReceiveddata;
}

function DashboardPage() {
  const [receivedData, setData] = useState<any>([]);
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
  });

  useLayoutEffect(() => {
    getAllData().then((res) => {
      setData(res[0]);
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
      }));
    });
  }, []);

  console.log(controllerData.temperature);

  return (
    <>
      {receivedData && (
        <div className={styles.dashboard}>
          <div className={styles.title}>
            <div className={styles.name}>{controllerData.controllerName}</div>
            <div className={styles.version}>12.7 sw</div>
          </div>
          <div className={styles.sensorData}>
            <DataBlock {...controllerData.temperature} />
            <DataBlock {...controllerData.humidity} />
            <div className={styles.critical}>
              <Input text="critical temperature" {...controllerData.criticalTemp} />
              <Input text="normal temperature" {...controllerData.normalTemp} />
            </div>
          </div>
          <div className={styles.graphs}></div>
          <div className={styles.form}></div>
          <Button />
        </div>
      )}
    </>
  );
}

export default DashboardPage;
