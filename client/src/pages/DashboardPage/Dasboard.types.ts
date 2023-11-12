export interface IReceiveddata {
  name: string;
  oid: string;
  value: string;
}

export interface IPin extends IReceiveddata {
  title: string;
}

export interface IControllerData {
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
  do1: IReceiveddata;
  do2: IReceiveddata;
}
