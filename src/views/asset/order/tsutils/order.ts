import axios from 'axios';
import {
  ContractPro,
  ContractRecord,
} from '@/views/list/contract/tsutils/contractList';

export interface ConSelect {
  id: number;
  conId: string;
  conName: string;
}

export interface Order {
  id?: number;
  orderId: string;
  orderName: string;
  orderDate: string;
  conId?: number;
  createTime?: string;
}

export interface queryOrder {
  orderId: string;
  orderName: string;
}

export function queryConAsSelect() {
  return axios.post('/contract/queryAsSelect');
}

export function inertOrder(data: Order) {
  return axios.post('/order/insert', data);
}

export function queryOrderProList(data: queryOrder) {
  return axios.post('/orderPro/queryList', data);
}

export function updateOrderById(data: Order) {
  return axios.post('/order/updateById', data);
}

export function deleteOrderById({ id: number }) {
  return axios.post('/order/delete', { id: number });
}
