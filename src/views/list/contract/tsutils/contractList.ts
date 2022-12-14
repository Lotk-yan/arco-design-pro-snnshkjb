import axios from 'axios';
import { FileItem } from '@arco-design/web-vue';
import { FileStatus } from '@arco-design/web-vue/es/upload/interfaces';

export interface mainListRecord {
  comId?: number;
  comName?: string;
  conRole?: string;
}

export interface moneyListRecord {
  modelId?: number;
  col1?: string;
  payTime?: string;
  percent?: number;
  col3?: string;
  col4?: string;
  payAcount?: number;
  col5?: string;
  isPaid: number;
}

export interface ItemListRecord {
  conId?: number;
  itemType?: number;
  itemInfo?: string;
}

export interface ContractPro {
  conId: string;
  conName: string;
  conType?: number;
  startDate: string;
  endDate: string;
  signDate: string;
  conStatus?: number;
  totalPrice?: number;
  mainList?: mainListRecord[];
  moneyList?: moneyListRecord[];
  itemList?: ItemListRecord[];
  children: Array<any>;
  recentYearList: Array<any>;
  remark: string;
  pictures: Array<any>;
}

export interface ContractRecord {
  id?: number;
  conId: string;
  conName: string;
}

export interface ConTypeSelect {
  conType: number;
  typeName: string;
}
export interface ConStatusSelect {
  conStatus: number;
  statusName: string;
}
export interface ModelSelect {
  id: number;
  modelName: string;
}

export interface FileRecord {
  uid: string;
  status?: FileStatus;
  file?: File;
  percent?: number;
  response?: any;
  url?: string;
  name?: string;
}

export function queryContractList(data: ContractRecord) {
  return axios.post('/contract/query', data);
}

export function queryTypeSelect() {
  return axios.post('/contractType/query');
}

export function queryStatusSelect() {
  return axios.post('/contractStatus/query');
}

export function queryModelSelect() {
  return axios.post('/model/query');
}

export function queryItemSelect() {
  return axios.post('/itemType/query');
}

export function inertContract(data: ContractPro) {
  return axios.post('/contract/insert', data);
}

export function deleteByIdSync({ id: number }) {
  return axios.post('/contract/deleteById', { id: number });
}

export function selectInfoByConId({ id: number }) {
  return axios.post('/contract/selectInfoById', { id: number });
}

export function updateContractByConId(data: ContractPro) {
  return axios.post('/contract/updateById', data);
}

export function getFileById({ id: number }) {
  return axios.post(
    '/file/queryFileById',
    { id: number },
    { responseType: 'blob' }
  );
}

export function getFileByUrl({ url: string }) {
  // return axios.get(
  //     `/file/queryFileByUrl?url=`,{
  //         responseType: 'blob',
  //     }
  // ) ;
  return axios.post(
    `/file/queryFileByUrl`,
    { url: string },
    {
      responseType: 'blob',
    }
  );
}
