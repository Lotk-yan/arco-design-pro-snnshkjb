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

export interface Unit {
  id?: number;
  name?: string;
}

export interface Machine {
  id?: number;
  firstType?: number;
  secondType?: number;
  name: string;
  specs: string;
  unit?: number;
  config: string;
}

export interface QueryModel {
  firstType?: number;
  secondType?: number;
  name?: string;
}

export function queryUnitAsSelect() {
  return axios.post('/unit/queryAsSelect');
}

export function queryTypeList() {
  return axios.post('/infoType/queryList');
}

export function insertMachine(data: Machine) {
  return axios.post('/machine/insert', data);
}

export function queryMachineList(data: QueryModel) {
  return axios.post('/machine/queryList', data);
}

export function queryMachineAsSelect(data: QueryModel) {
  return axios.post('/machine/queryMachineAsSelect', data);
}

export function deleteByMachineId(data: Machine) {
  return axios.post('/machine/deleteByMachineId', data);
}

export function updateMachineById(data: Machine) {
  return axios.post('/machine/updateByMachineId', data);
}
