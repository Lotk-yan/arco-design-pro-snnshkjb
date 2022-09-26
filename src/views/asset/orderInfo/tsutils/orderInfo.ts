import axios from 'axios';

export interface propertySecondType {
  id: number;
  name: string;
}

export interface firstSecond {
  id: number;
  name: string;
  children: propertySecondType[];
}

export function queryTypeList() {
  return axios.post('/infoType/queryList');
}

export function queryOrderInfoList() {
  return axios.post('/orderInfoPro/queryList');
}
