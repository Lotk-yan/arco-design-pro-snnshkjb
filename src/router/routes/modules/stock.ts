import { DEFAULT_LAYOUT } from '@/router/constants';
import { AppRouteRecordRaw } from '../types';

const ASSET: AppRouteRecordRaw = {
  path: '/stock',
  name: 'stock',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.stock',
    requiresAuth: true,
    icon: 'icon-list',
    order: 9,
  },
  children: [
    {
      path: 'inventory', // The midline path complies with SEO specifications
      name: 'Inventory',
      component: () => import('@/views/stock/inventory/index.vue'),
      meta: {
        locale: 'menu.stock.inventory',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'order', // The midline path complies with SEO specifications
    //   name: 'Order',
    //   component: () => import('@/views/asset/order/index.vue'),
    //   meta: {
    //     locale: 'menu.asset.order',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    // {
    //   path: 'orderInfo', // The midline path complies with SEO specifications
    //   name: 'OrderInfo',
    //   component: () => import('@/views/asset/orderInfo/index.vue'),
    //   meta: {
    //     locale: 'menu.asset.orderInfo',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};

export default ASSET;
