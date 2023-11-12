const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const snmp = require('net-snmp');
var cors = require('cors');

const app = express();
const port = 5000;
const controllerAddress = '87.251.176.36';
const oids = {
  oid_temp: '1.3.6.1.4.1.40418.2.2.4.1.0',
  oid_hum: '1.3.6.1.4.1.40418.2.2.4.4',
};
const options = {
  port: 62161,
  retries: 1,
  timeout: 5000,
  transport: 'udp4',
  trapPort: 162,
  idBitsSize: 16,
};

let XMLArray = [];
const resData = {};
const temperature = {};
const humidity = {};

app.use(cors());
app.use(express.json());

app.get('/api/getData', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.send([resData]);
});

app.get('/api/getData/temperature', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  getParamsFromSNP({ oid: oids.oid_temp, name: 'temperature', data: temperature });
  res.send(temperature);
});

app.get('/api/getData/humidity', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  getParamsFromSNP({ oid: oids.oid_hum, name: 'humidity', data: humidity });
  res.send(humidity);
});

app.post('/api/setData/newTemp', (req, res) => {
  try {
    const { oid, newTemp } = req.body;
    setParamsToSNP(oid, newTemp);
    Object.entries(oids).map((oid, index) => {
      getParamsFromSNP({ oid: oid[1], name: oid[0], data: resData });
    });
    res.status(200).send([resData]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/setData/setPin', (req, res) => {
  try {
    const { oid, status } = req.body;
    console.log(oid, status);
    setPin(oid, status);
    Object.entries(oids).map((oid, index) => {
      getParamsFromSNP({ oid: oid[1], name: oid[0], data: resData });
    });
    res.status(200).send([resData]);
  } catch (error) {
    console.log(error);
    res.status(500).send('Ошибка сервера');
  }
});

// set new paramt to SNP
async function setParamsToSNP(oid, newTemp) {
  const session = snmp.createSession(controllerAddress, 'public', options);

  const varbind = [
    {
      oid: oid,
      type: snmp.ObjectType.Integer,
      value: Number(newTemp),
    },
  ];

  await session.set(varbind, (error, varbinds) => {
    if (error) {
      console.error('Ошибка отправки POST запроса:', error);
    } else {
      console.log('POST запрос успешно отправлен:', varbinds);
    }
    session.close();
  });
}

// set Pin
async function setPin(oid, status) {
  const session = snmp.createSession(controllerAddress, 'public', options);

  const varbind = [
    {
      oid: oid,
      type: snmp.ObjectType.Integer,
      value: Number(status),
    },
  ];

  console.log(varbind);

  await session.set(varbind, (error, varbinds) => {
    if (error) {
      console.error('Ошибка отправки POST запроса:', error);
    } else {
      console.log('POST запрос успешно отправлен:', varbinds);
    }
    session.close();
  });
}

// get data from SNP
function getParamsFromSNP({ oid, name, data }) {
  const session = snmp.createSession(controllerAddress, 'public', options);

  session.get([oid], (error, varbinds) => {
    if (error) {
      console.error(error, oid.toString());
    } else {
      for (let i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError(varbinds[i])) {
          console.error(snmp.varbindError(varbinds[i]));
        } else {
          const reseivedData = varbinds[0]?.value?.toString();

          data[name] = { name: name, oid: oid, value: reseivedData };
        }
      }
    }
    session.close();
  });
}

// Parsing XML
const xmlString = fs.readFileSync('./1.xml', 'utf8');

xml2js.parseString(xmlString, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    XMLArray = result.SnmpSimulatorData.Instances[0].Instance;
  }
});

XMLArray.map((block, index) => {
  const oid = block['$'].oid.slice(1);
  if (oid != '0.0') {
    const blockName = block['$'].name;
    oids[blockName] = `${oid}`;
  }
});

Object.entries(oids).map((oid, index) => {
  getParamsFromSNP({ oid: oid[1], name: oid[0], data: resData });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
