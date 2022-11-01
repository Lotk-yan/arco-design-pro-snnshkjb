import axios from 'axios';

export interface InterfaceQueryRecord {
  conName: string;
  orderName: string;
  firstType?: number;
  secondType?: number;
  infoName: string;
  name: string;
}

export interface Inventory {
  id: number;
  orderId: number;
  infoName: string;
  firstType: number;
  secondType: number;
  name: string;
  makeDate: string;
  destroyDate: string;
  buyDate: string;
  specs: string;
  makeCompanyId: number;
  makeCompany: string;
  supplierCompanyId: number;
  supplierCompany: string;
  unit: number;
  unitName: string;
  amount: number;
  onePrice: number;
  oneTotalPrice: number;
  infoRecord: string;
  machineId: number;
  invAmount: number;
  inventoryRemark: string;
  machineName: string;
  config: string;
  infoId: number;
  inAmount: number;
  currentAmount: number;
  inTime: string;
  type: string;
  remark: string;
}

export function queryStockList(data: InterfaceQueryRecord) {
  return axios.post('/inventory/queryList', data);
}
