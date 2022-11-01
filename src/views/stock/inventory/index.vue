<template>
  <div class="container">
    <Breadcrumb :items="['menu.stock', 'menu.stock.inventory']" />
    <a-card class="general-card" :title="$t('menu.stock.inventory')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="7">
                <a-form-item
                  field="con_name"
                  :label="$t('menu.asset.orderInfo.conName')"
                >
                  <a-input
                    v-model="formModel.conName"
                    :placeholder="$t('orderInfo.form.conName.placeholder')"
                  />
                </a-form-item>
                <a-form-item
                  field="order_name"
                  :label="$t('order.form.order_name')"
                >
                  <a-input
                    v-model="formModel.orderName"
                    :placeholder="$t('order.form.order_name.placeholder')"
                  />
                </a-form-item>
              </a-col>

              <a-col :span="7">
                <a-form-item
                  field="first_type"
                  :label="$t('order.form.first_type')"
                >
                  <a-select v-model="formModel.firstType" @change="getSecond">
                    <a-option
                      v-for="item in typeDate"
                      :key="item.name"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
                <a-form-item
                  field="second_type"
                  :label="$t('order.form.second_type')"
                >
                  <a-select v-model="formModel.secondType">
                    <a-option
                      v-for="item in secondDate"
                      :key="item.name"
                      :value="item.id"
                      >{{ item.name }}</a-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :span="7">
                <a-form-item
                  field="info_name"
                  :label="$t('orderInfo.form.order_infoName')"
                >
                  <a-input
                    v-model="formModel.infoName"
                    :placeholder="$t('order.form.order_infoName.placeholder')"
                  />
                </a-form-item>
                <a-form-item field="name" :label="$t('orderInfo.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('order.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>

              <a-divider style="height: 84px" direction="vertical" />
              <a-col :flex="'86px'" style="text-align: right">
                <a-space direction="vertical" :size="18">
                  <a-button type="primary" @click="fetchData">
                    <template #icon>
                      <icon-search />
                    </template>
                    {{ $t('searchTable.form.search') }}
                  </a-button>
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh />
                    </template>
                    {{ $t('searchTable.form.reset') }}
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
            <a-divider style="margin-top: 0" />
            <a-row style="margin-bottom: 16px">
              <a-col :span="16">
                <a-space>
                  <a-button type="primary" @click="openForm">
                    {{ $t('contract.operation.create') }}
                  </a-button>
                </a-space>
              </a-col>
            </a-row>
          </a-form>

          <a-table
            :columns="columns"
            :data="renderData"
            :scroll="scrollPercent"
          >
            <template #optional="renderData">
              <a-button size="mini" @click="queryInRecord(renderData.record)"
                >入库记录</a-button
              >
              <a-button size="mini" @click="queryOutRecord(renderData.record)"
                >出库记录</a-button
              >
              <a-popconfirm
                content="是否删除"
                @ok="deleteById(renderData.record)"
              >
                <a-button size="mini">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    Inventory,
    queryStockList,
  } from '@/views/stock/inventory/invUtils/inventory';

  const scrollPercent = {
    x: '160%',
    y: '100%',
  };
  /**
   * 初始化查询条件表单
   */
  const generateFormModel = () => {
    return {
      conName: '',
      orderName: '',
      firstType: undefined,
      secondType: undefined,
      infoName: '',
      name: '',
    };
  };

  const formModel = ref(generateFormModel());

  /**
   * 重置
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const columns = [
    {
      title: '资产名称',
      dataIndex: 'name',
    },
    {
      title: '一级类目',
      dataIndex: 'firstTypeName',
    },
    {
      title: '二级类目',
      dataIndex: 'secondTypeName',
    },
    {
      title: '单位',
      dataIndex: 'unitName',
    },
    {
      title: '单价/元',
      dataIndex: 'onePrice',
    },
    {
      title: '库存数量',
      dataIndex: 'invAmount',
    },
    {
      title: '其他配置',
      dataIndex: 'config',
    },
    {
      title: '规格',
      dataIndex: 'specs',
    },
    {
      title: '生产日期',
      dataIndex: 'makeDate',
    },
    {
      title: '报废日期',
      dataIndex: 'destroyDate',
    },
    {
      title: '购买日期',
      dataIndex: 'buyDate',
    },
    // {
    //     title: '合同名称',
    //     dataIndex: 'conName',
    // },
    // {
    //     title: '订单名称',
    //     dataIndex: 'orderName',
    // },
    // {
    //     title: '订单明细',
    //     dataIndex: 'infoName',
    // },
    {
      title: '操作',
      slotName: 'optional',
      width: 250,
      fixed: 'right',
    },
  ];

  /**
   * 调用后台接口的函数
   * */
  const renderData = ref<Inventory[]>([]);
  const fetchData = async () => {
    try {
      const { data } = await queryStockList(formModel.value);
      renderData.value = data;
    } catch (err) {}
  };
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'Inventory',
  };
</script>

<style scoped></style>
