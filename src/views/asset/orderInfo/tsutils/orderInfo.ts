import axios from 'axios';

export interface OrderInfo {
  id?: number;
  conId?: number;
  infoName: string;
  firstType?: number;
  secondType?: number;
  machineId?: number;
  name: string;
  makeDate: string;
  destroyDate: string;
  buyDate: string;
  specs: string;
  makeCompanyId?: number;
  makeCompany: string;
  supplierCompanyId?: number;
  supplierCompany: string;
  unit?: number;
  amount?: number;
  onePrice?: number;
  oneTotalPrice?: number;
  remark: string;
}

export interface propertySecondType {
  id: number;
  name: string;
}

export interface firstSecond {
  id: number;
  name: string;
  children: propertySecondType[];
}

export interface QueryOrderInfo {
  conName?: string;
  orderName: string;
  firstType?: number;
  secondType?: number;
  infoName?: string;
  name: string;
}

export interface Unit {
  id?: number;
  name?: string;
}

export interface InRecord {
  id?: number;
  firstTypeName: string;
  secondTypeName: string;
  name: string;
  unitName: string;
  amount?: number;
  inAmount?: number;
  remark: string;
}

export interface InRecordPro {
  id: number;
  name: string;
  amount: number;
  invAmount: number;
  currentAmount: number;
  type: string;
  inTime: string;
  creator: string;
  remark: string;
}

export function queryTypeList() {
  return axios.post('/infoType/queryList');
}

export function queryOrderInfoList(data: QueryOrderInfo) {
  return axios.post('/orderInfoPro/queryList', data);
}

export function insertOrderInfo(data: OrderInfo) {
  return axios.post('/orderInfo/insert', data);
}

export function updateOrderInfoById(data: OrderInfo) {
  return axios.post('/orderInfo/update', data);
}

export function queryUnitAsSelect() {
  return axios.post('/unit/queryAsSelect');
}

export function queryOrderAsSelect() {
  return axios.post('/order/queryOrderAsSelect');
}

export function deleteOrderInfoById({ id: number }) {
  return axios.post('/orderInfo/delete', { id: number });
}

export function inR(data: InRecord) {
  return axios.post('/inR/buyIn', data);
}

export function queryInRecordByInfoId({ id: number }) {
  return axios.post('/inR/queryByInfoId', { id: number });
}
