import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userName: string;
  passWord: string;
}

export interface LoginRes {
  token: string;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/user/login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/user/info');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}
