const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const snmp = require('net-snmp');

const app = express();
const port = 5000;

let XMLArray = [];
const resData = {};

app.get('/getData', (req, res) => {
  res.send(resData);
});

const options = {
  port: 62161,
  retries: 1,
  timeout: 5000,
  transport: 'udp4',
  trapPort: 162,
  idBitsSize: 16,
};

const controllerAddress = '87.251.176.36';

const oids = {
  oid_temp: '1.3.6.1.4.1.40418.2.2.4.1.0',
  oid_hum: '1.3.6.1.4.1.40418.2.2.4.4',
};

// get data from SNP
const getParamsFromSNP = ({ oid, name }) => {
  const session = snmp.createSession(controllerAddress, 'public', options);

  session.get([oid], (error, varbinds) => {
    if (error) {
      console.error(error, oid.toString());
    } else {
      for (let i = 0; i < varbinds.length; i++) {
        if (snmp.isVarbindError(varbinds[i])) {
          console.error(snmp.varbindError(varbinds[i]));
        } else {
          console.log(varbinds);
          const reseivedData = varbinds[0].value.toString();

          resData[name] = { oid: oid, value: reseivedData };
        }
      }
    }
    session.close();
  });
};

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
    const blockName = block['$'].valueType;
    oids[`${blockName}_${index}`] = `${oid}`;
  }
});

Object.entries(oids).map((oid, index) => {
  getParamsFromSNP({ oid: oid[1], name: oid[0] });
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
