<template>
  <div class="container">
    <a-table :columns="columns" :data="tableData"> </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    InRecordPro,
    queryInRecordByInfoId,
  } from '@/views/asset/orderInfo/tsutils/orderInfo';

  const columns = [
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '订单数量',
      dataIndex: 'amount',
    },
    {
      title: '入库数量',
      dataIndex: 'inAmount',
    },
    {
      title: '入库前数量',
      dataIndex: 'currentAmount',
    },
    {
      title: '操作类型',
      dataIndex: 'type',
    },
    {
      title: '入库时间',
      dataIndex: 'inTime',
    },
    {
      title: '入库人',
      dataIndex: 'creator',
    },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];

  const tableData = ref<InRecordPro[]>([]);
  const generateInRecordFormData = async (requestData) => {
    const params = {
      id: requestData.id,
    };
    const { data } = await queryInRecordByInfoId(params);
    tableData.value = data;
  };

  defineExpose({
    generateInRecordFormData,
  });
</script>

<script lang="ts">
  export default {
    name: 'InRecord',
  };
</script>

<style scoped></style>
