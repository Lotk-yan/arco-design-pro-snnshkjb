<template>
  <div class="container">
    <Breadcrumb :items="['menu.asset', 'menu.asset.machine']" />
    <a-card class="general-card" :title="$t('menu.asset.machine')">
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
              <a-button @click="updateForm(renderData.record)">??????</a-button>
              <!--              <a-button @click="openDelConfirm(renderData.record)">??????</a-button>-->
              <a-popconfirm
                content="????????????"
                @ok="deleteById(renderData.record)"
              >
                <a-button>??????</a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-modal
      v-model:visible="visible"
      :closable="false"
      :mask-closable="false"
      title="????????????"
      width="70%"
      height="50%"
    >
      <CreateMachine
        ref="createMachineForm"
        :type-date="typeDate"
        :company-select-data="companySelectData"
        :unit-select-data="unitSelectData"
        :order-data="orderData"
        @close-create-form="closeCreateForm"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleOk">??????</a-button>
        <a-button @click="handelCancel">??????</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model:visible="updateFormVisible"
      :closable="false"
      :mask-closable="false"
      title="????????????"
      width="70%"
      height="50%"
    >
      <UpdateMachine
        ref="updateMachineForm"
        :type-date="typeDate"
        :company-select-data="companySelectData"
        :unit-select-data="unitSelectData"
        :order-data="orderData"
        @close-create-form="closeUpdateForm"
        @fetch-data="fetchData"
      />

      <template #footer>
        <a-button @click="handleUpdateOk">??????</a-button>
        <a-button @click="handelUpdateCancel">??????</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CreateMachine from '@/views/asset/machine/components/createMachine.vue';
  import UpdateMachine from '@/views/asset/machine/components/updateMachine.vue';
  import {
    deleteByMachineId,
    firstSecond,
    Machine,
    propertySecondType,
    queryMachineList,
    queryTypeList,
    queryUnitAsSelect,
    Unit,
  } from './machineutils/machine';

  /**
   * ???????????????????????????
   */
  const generateFormModel = () => {
    return {
      firstType: undefined,
      secondType: undefined,
      name: '',
    };
  };

  const columns = [
    {
      title: '????????????',
      dataIndex: 'name',
    },
    {
      title: '????????????',
      dataIndex: 'firstTypeName',
    },
    {
      title: '????????????',
      dataIndex: 'secondTypeName',
    },
    {
      title: '??????',
      dataIndex: 'unitName',
    },
    {
      title: '??????',
      dataIndex: 'specs',
    },
    {
      title: '????????????',
      dataIndex: 'config',
    },
    {
      title: '??????',
      slotName: 'optional',
    },
  ];

  /**
   * ??????
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const formModel = ref(generateFormModel());
  const createMachineForm: any = ref(null);
  const updateMachineForm: any = ref(null);

  /**
   * ???????????????????????????
   * */
  const renderData = ref<Machine[]>([]);
  const fetchData = async () =>
    // params: PolicyParams = {current: 1, pageSize: 20}
    {
      try {
        const { data } = await queryMachineList(formModel.value);
        renderData.value = data;
        // return data
      } catch (err) {
        // you can report use errorHandler or other
      }
    };

  /**
   * ??????????????????
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
   * ??????????????????
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
   * ????????????
   * */
  const unitSelectData = ref<Unit[]>([]);
  const initUnit = async () => {
    try {
      const { data } = await queryUnitAsSelect();
      unitSelectData.value = data;
    } catch (err) {}
  };

  /**
   * ????????????
   * */
  const deleteById = async (renderData) => {
    try {
      const { data } = await deleteByMachineId(renderData);

      if (data === 1) {
        await fetchData();
      }
    } catch (err) {}
  };

  /**
   * ????????????form??????
   * */
  const visible = ref(false);
  const openForm = () => {
    visible.value = true;
  };
  const closeCreateForm = () => {
    visible.value = false;
  };

  const handleOk = () => {
    createMachineForm.value.commitForm();
  };

  const handelCancel = () => {
    visible.value = false;
    const res = createMachineForm.value.reset();
  };

  /**
   * ??????????????????
   * */
  const updateFormVisible = ref(false);
  const updateForm = (renderData) => {
    updateFormVisible.value = true;
    updateMachineForm.value.updateFormData(renderData);
  };
  const closeUpdateForm = () => {
    updateFormVisible.value = false;
  };
  const handleUpdateOk = () => {
    updateMachineForm.value.commitUpdateForm();
    updateFormVisible.value = false;
  };
  const handelUpdateCancel = () => {
    updateFormVisible.value = false;
    updateMachineForm.value.reset();
  };

  getInfoType();
  initUnit();
  fetchData();
</script>

<script lang="ts">
  export default {
    name: 'Machine',
  };
</script>

<style scoped></style>
