<template>
  <div class="container">
    <Breadcrumb :items="['menu.asset', 'menu.asset.orderInfo']" />
    <a-card class="general-card" :title="$t('menu.asset.orderInfo')">
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
              <a-button size="mini" @click="updateForm(renderData.record)"
                >编辑</a-button
              >
              <!--              <a-button @click="openDelConfirm(renderData.record)">删除</a-button>-->
              <a-popconfirm
                content="是否删除"
                @ok="deleteById(renderData.record)"
              >
                <a-button size="mini">删除</a-button>
              </a-popconfirm>
              <a-button size="mini" @click="inProperty(renderData.record)"
                >入库</a-button
              >
              <a-button size="mini" @click="queryInRecord(renderData.record)"
                >入库记录</a-button
              >
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-modal
      v-model:visible="visible"
      :closable="false"
      :mask-closable="false"
      title="新增订单明细"
      width="70%"
      height="50%"
    >
      <CreateOrderInfo
        ref="orderInfo"
        :type-date="typeDate"
        :company-select-data="companySelectData"
        :unit-select-data="unitSelectData"
        :order-data="orderData"
        @close-create-form="closeCreateForm"
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
      title="编辑订单明细"
      width="70%"
      height="50%"
    >
      <UpdateOrderInfo
        ref="updateOrderInfo"
        :type-date="typeDate"
        :company-select-data="companySelectData"
        :unit-select-data="unitSelectData"
        :order-data="orderData"
        @close-create-form="closeCreateForm"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleUpdateOk">确定</a-button>
        <a-button @click="handelUpdateCancel">取消</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model:visible="inRepositoryVisible"
      :closable="false"
      :mask-closable="false"
      title="入库"
      width="70%"
      height="50%"
    >
      <InRepository
        ref="inRepositoryForm"
        :type-date="typeDate"
        :company-select-data="companySelectData"
        :unit-select-data="unitSelectData"
        :order-data="orderData"
        @close-create-form="closeCreateForm"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleInReOk">确定</a-button>
        <a-button @click="handelInReCancel">取消</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model:visible="inRecordVisible"
      :closable="false"
      :mask-closable="false"
      title="入库记录"
      width="70%"
      height="50%"
    >
      <InRecord ref="inRecordForm" @close-create-form="closeCreateForm" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    deleteOrderInfoById,
    firstSecond,
    OrderInfo,
    propertySecondType,
    queryOrderAsSelect,
    queryOrderInfoList,
    queryTypeList,
    queryUnitAsSelect,
    Unit,
  } from '@/views/asset/orderInfo/tsutils/orderInfo';
  import CreateOrderInfo from '@/views/asset/orderInfo/components/createOrderInfo.vue';
  import UpdateOrderInfo from '@/views/asset/orderInfo/components/updateOrderInfo.vue';
  import InRepository from '@/views/asset/orderInfo/components/inRepository.vue';
  import InRecord from '@/views/asset/orderInfo/components/inRecord.vue';
  import {
    companyRecord,
    queryCompanySelect,
  } from '@/views/list/company/tsutils/companyList';
  import { Order } from '../order/tsutils/order';

  const scrollPercent = {
    x: '160%',
    y: '100%',
  };
  /**
   * 初始化查询条件表单
   */
  const generateFormModel = () => {
    return {
      conName: undefined,
      orderName: '',
      firstType: undefined,
      secondType: undefined,
      infoName: '',
      name: '',
    };
  };
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
      title: '采购数量',
      dataIndex: 'amount',
    },
    {
      title: '总价/元',
      dataIndex: 'oneTotalPrice',
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
    {
      title: '合同名称',
      dataIndex: 'conName',
    },
    {
      title: '订单名称',
      dataIndex: 'orderName',
    },
    {
      title: '订单明细',
      dataIndex: 'infoName',
    },
    {
      title: '操作',
      slotName: 'optional',
      width: 250,
      fixed: 'right',
    },
  ];

  const formModel = ref(generateFormModel());
  const orderInfo: any = ref(null);

  /**
   * 调用后台接口的函数
   * */
  const renderData = ref<OrderInfo[]>([]);
  const fetchData = async () =>
    // params: PolicyParams = {current: 1, pageSize: 20}
    {
      try {
        const { data } = await queryOrderInfoList(formModel.value);
        renderData.value = data;
        // return data
      } catch (err) {
        // you can report use errorHandler or other
      }
    };

  /**
   * 获取一级类目
   * */
  // const typeDate = ref<firstSecond[]>([])
  const typeDate = ref<firstSecond[]>([]);
  const getInfoType = async () => {
    try {
      const { data } = await queryTypeList();
      typeDate.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  /**
   * 获取二级目录
   * */
  const secondDate = ref<propertySecondType[]>([]);
  const getSecond = (value) => {
    formModel.value.secondType = undefined;
    for (let i = 0; i < typeDate.value.length; i += 1) {
      if (value === typeDate.value[i].id) {
        secondDate.value = typeDate.value[i].children;
      }
    }
  };

  /**
   * 公司下拉
   * */
  const companySelectData = ref<companyRecord[]>([]);
  const initCompany = async (comName: string) => {
    try {
      const params = {
        // comName
      };
      const { data } = await queryCompanySelect(params);
      companySelectData.value = data;
    } catch (err) {}
  };

  /**
   * 单位下拉
   * */
  const unitSelectData = ref<Unit[]>([]);
  const initUnit = async () => {
    try {
      const { data } = await queryUnitAsSelect();
      unitSelectData.value = data;
    } catch (err) {}
  };

  /**
   * 订单下拉
   * */
  const orderData = ref<Order[]>([]);
  const initOrder = async () => {
    try {
      const { data } = await queryOrderAsSelect();
      orderData.value = data;
    } catch (err) {}
  };

  const deleteById = async (renderData) => {
    try {
      const params = {
        id: renderData.id,
      };
      const { data } = await deleteOrderInfoById(params);
      if (data === 1) {
        await fetchData();
      }
    } catch (err) {}
  };

  /**
   * 打开新增form表单
   * */
  const visible = ref(false);
  const openForm = () => {
    visible.value = true;
  };
  const closeCreateForm = () => {
    visible.value = false;
  };

  const handleOk = () => {
    orderInfo.value.commitForm();
  };

  const handelCancel = () => {
    visible.value = false;
    const res = orderInfo.value.reset();
  };

  /**
   * 打开编辑form表单
   * */
  const updateVisible = ref(false);
  const updateOrderInfo: any = ref(null);

  const updateForm = (renderData) => {
    updateVisible.value = true;
    updateOrderInfo.value.generateUpdateInfoFormData(renderData);
  };
  const handelUpdateCancel = () => {
    updateVisible.value = false;
    const res = updateOrderInfo.value.reset();
  };
  const handleUpdateOk = () => {
    updateOrderInfo.value.update();
    updateVisible.value = false;
  };

  /**
   * 打开入库单
   * */
  const inRepositoryVisible = ref(false);
  const inRepositoryForm: any = ref(null);
  const inProperty = (renderData) => {
    inRepositoryVisible.value = true;
    inRepositoryForm.value.generateInRepositoryFormData(renderData);
  };

  const handelInReCancel = () => {
    inRepositoryVisible.value = false;
    const res = inRepositoryForm.value.reset();
  };
  const handleInReOk = () => {
    inRepositoryForm.value.inRCommit();
    inRepositoryVisible.value = false;
  };

  /**
   * 打开入库记录
   * */
  const inRecordVisible = ref(false);
  const inRecordForm: any = ref(null);
  const queryInRecord = (renderData) => {
    inRecordForm.value.generateInRecordFormData(renderData);
    inRecordVisible.value = true;
  };

  getInfoType();
  initCompany('');
  initUnit();
  initOrder();
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'OrderIfo',
  };
</script>

<style scoped></style>
