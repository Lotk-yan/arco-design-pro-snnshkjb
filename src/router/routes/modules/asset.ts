import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const ASSET: AppRouteRecordRaw = {
  path: '/order',
  name: 'asset',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.asset',
    requiresAuth: true,
    icon: 'icon-list',
    order: 8,
  },
  children: [
    {
      path: 'order', // The midline path complies with SEO specifications
      name: 'Order',
      component: () => import('@/views/asset/order/index.vue'),
      meta: {
        locale: 'menu.asset.order',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'orderInfo', // The midline path complies with SEO specifications
      name: 'OrderInfo',
      component: () => import('@/views/asset/orderInfo/index.vue'),
      meta: {
        locale: 'menu.asset.orderInfo',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //     path: 'search-table', // The midline path complies with SEO specifications
    //     name: 'SearchTable',
    //     component: () => import('@/views/list/search-table/index.vue'),
    //     meta: {
    //         locale: 'menu.list.searchTable',
    //         requiresAuth: true,
    //         roles: ['*'],
    //     },
    // },
    // {
    //     path: 'card',
    //     name: 'Card',
    //     component: () => import('@/views/list/card/index.vue'),
    //     meta: {
    //         locale: 'menu.list.cardList',
    //         requiresAuth: true,
    //         roles: ['*'],
    //     },
    // },
  ],
};

export default ASSET;
