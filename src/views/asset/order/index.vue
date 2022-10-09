<template>
  <div class="container">
    <Breadcrumb :items="['menu.asset', 'menu.asset.order']" />
    <a-card class="general-card" :title="$t('menu.asset.order')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="order_id"
                  :label="$t('order.form.order_id')"
                >
                  <a-input
                    v-model="formModel.orderId"
                    :placeholder="$t('order.form.order_id.placeholder')"
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

          <a-table :columns="columns" :data="renderData">
            <template #optional="renderData">
              <a-button @click="openEditForm(renderData.record)">编辑</a-button>
              <a-button @click="deleteById(renderData.record)">删除</a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-modal
      v-model:visible="visible"
      :closable="false"
      :mask-closable="false"
      title="新增订单"
      width="70%"
      height="50%"
    >
      <createOrder
        ref="order"
        :con-select-data="conSelectData"
        @colse-create-form="colseCreateForm"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleOk">确定</a-button>
        <a-button @click="handelCancel">取消</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model:visible="updateVisible"
      :closable="false"
      :mask-closable="false"
      title="编辑订单"
      width="70%"
      height="50%"
    >
      <updateOrder
        ref="updateOrder"
        :con-select-data="conSelectData"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleUpdateOk">确定</a-button>
        <a-button @click="handelUpdateCancel">取消</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CreateOrder from '@/views/asset/order/components/createOrder.vue';
  import UpdateOrder from '@/views/asset/order/components/updateOrder.vue';

  import {
    ConSelect,
    deleteOrderById,
    Order,
    queryConAsSelect,
    queryOrderProList,
  } from '@/views/asset/order/tsutils/order';

  /**
   * 初始化查询条件表单
   */
  const generateFormModel = () => {
    return {
      orderId: '',
      orderName: '',
    };
  };

  /**
   * 重置
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const formModel = ref(generateFormModel());

  const order: any = ref(null);

  const columns = [
    {
      title: '订单id',
      dataIndex: 'orderId',
    },
    {
      title: '订单名称',
      dataIndex: 'orderName',
    },
    {
      title: '下单时间',
      dataIndex: 'orderDate',
    },
    {
      title: '绑定的合同',
      dataIndex: 'conName',
    },
    {
      title: '操作',
      slotName: 'optional',
    },
  ];

  /**
   * 打开新增form表单
   * */
  const visible = ref(false);
  const openForm = () => {
    visible.value = true;
  };

  const colseCreateForm = () => {
    visible.value = false;
  };

  /**
   * 确定保存
   * */
  const handleOk = () => {
    // visible.value = false;
    order.value.commitForm();
    // const res = order.value.reset();
  };

  /**
   * 关闭form表单
   * */
  const handelCancel = () => {
    visible.value = false;
    const res = order.value.reset();
  };

  /**
   * 合同下拉
   */
  const conSelectData = ref<ConSelect[]>([]);
  const initCon = async () => {
    try {
      const { data } = await queryConAsSelect();
      conSelectData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  /**
   * 调用后台接口的函数
   * */
  const renderData = ref<Order[]>([]);
  const fetchData = async () =>
    // params: PolicyParams = {current: 1, pageSize: 20}
    {
      try {
        const { data } = await queryOrderProList(formModel.value);
        renderData.value = data;
        // return data
      } catch (err) {
        // you can report use errorHandler or other
      }
    };

  const deleteById = async (renderData) => {
    try {
      const params = {
        id: renderData.id,
      };

      const { data } = await deleteOrderById(params);
      if (data === 1) {
        await fetchData();
      }
    } catch (err) {}
  };

  const updateVisible = ref(false);
  const updateOrder: any = ref(null);

  const handelUpdateCancel = () => {
    updateVisible.value = false;
    updateOrder.value.reset();
  };

  const handleUpdateOk = () => {
    updateOrder.value.update();
    updateVisible.value = false;
  };

  const openEditForm = (renderData) => {
    // 此为 当前行的内容
    updateVisible.value = true;
    updateOrder.value.updateFormData(renderData);
  };

  initCon();
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'Order',
  };
</script>

<style scoped></style>
