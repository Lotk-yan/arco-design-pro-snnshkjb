<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.contract']" />
    <a-card class="general-card" :title="$t('menu.list.contract')">
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
                <a-form-item field="con_id" :label="$t('contract.form.con_id')">
                  <a-input
                    v-model="formModel.conId"
                    :placeholder="$t('contract.form.con_id.placeholder')"
                  />
                </a-form-item>
                <a-form-item
                  field="con_name"
                  :label="$t('contract.form.con_name')"
                >
                  <a-input
                    v-model="formModel.conName"
                    :placeholder="$t('contract.form.con_name.placeholder')"
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
                    <!--                    <template #icon>-->
                    <!--                      <icon-plus/>-->
                    <!--                    </template>-->
                    {{ $t('contract.operation.create') }}
                  </a-button>
                  <!--                  <a-upload action="/">-->
                  <!--                    <template #upload-button>-->
                  <!--                      <a-button>-->
                  <!--                        {{ $t('order.operation.import') }}-->
                  <!--                      </a-button>-->
                  <!--                    </template>-->
                  <!--                  </a-upload>-->
                </a-space>
              </a-col>
              <!--              <a-col :span="8" style="text-align: right">-->
              <!--                <a-button>-->
              <!--                  <template #icon>-->
              <!--                    <icon-download/>-->
              <!--                  </template>-->
              <!--                  {{ $t('order.operation.download') }}-->
              <!--                </a-button>-->
              <!--              </a-col>-->
            </a-row>
          </a-form>

          <!--          <a-table>-->
          <!--            <template v-for="(item,index) in tableHead">-->
          <!--              <a-table-column :prop="item.column_name" :lable="item.column_comment"></a-table-column>-->
          <!--            </template>-->
          <!--          </a-table>-->

          <!--            <a-table :columns="columns" :data="renderData">-->
          <!--                <template #columns>-->
          <!--                    <a-table-column title="??????" data-index="conName"></a-table-column>-->
          <!--                    <a-table-column title="??????" data-index="conId"></a-table-column>-->
          <!--                    <a-table-column title="Salary" data-index="salary"></a-table-column>-->
          <!--                    <a-table-column title="Salary" data-index="salary"></a-table-column>-->
          <!--                    <a-table-column title="??????" data-index="tags">-->
          <!--                        <template #cell="{ record }">-->
          <!--                            <a-button @click="$modal.info({ title:'??????', content:renderData.conName })">??????</a-button>-->
          <!--                            <a-button @click="$modal.info({ title:'Name', content:renderData.conId })">??????</a-button>-->
          <!--                        </template>-->
          <!--                    </a-table-column>-->
          <!--                </template>-->
          <!--            </a-table>-->
          <a-table :columns="columns" :data="renderData">
            <template #optional="renderData">
              <a-button @click="openEditForm(renderData.record)">??????</a-button>
              <a-button @click="deleteById(renderData.record)">??????</a-button>
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
      <!--        @ok="handleOk"-->
      <!--        @cancel="handelCancel"-->
      <contractForm
        ref="contract"
        :type-select-data="typeSelectData"
        :status-select-data="statusSelectData"
        :model-select-data="modelSelectData"
        :company-select-data="companySelectData"
        :item-type-select-data="itemTypeSelectData"
        @fetchData="fetchData"
        @colseCreateForm="colseCreateForm"
      />

      <template #footer>
        <a-button @click="handleOk">??????</a-button>
        <a-button @click="handelCancel">??????</a-button>
      </template>
    </a-modal>

    <a-modal
      v-model:visible="updateVisible"
      :closable="false"
      :mask-closable="false"
      title="????????????"
      width="70%"
      height="50%"
    >
      <!--        @ok="handleOk"-->
      <!--        @cancel="handelCancel"-->
      <updateForm
        ref="updateCon"
        :type-select-data="typeSelectData"
        :status-select-data="statusSelectData"
        :model-select-data="modelSelectData"
        :company-select-data="companySelectData"
        :item-type-select-data="itemTypeSelectData"
        @fetchData="fetchData"
      />

      <template #footer>
        <a-button @click="handleUpdate">??????</a-button>
        <a-button @click="handelUpdateCancel">??????</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    queryContractList,
    ContractRecord,
    deleteByIdSync,
    ConTypeSelect,
    queryTypeSelect,
    ConStatusSelect,
    queryStatusSelect,
    ModelSelect,
    queryModelSelect,
    ItemListRecord,
    queryItemSelect,
  } from '@/views/list/contract/tsutils/contractList';
  import contractForm from '@/views/list/contract/components/contractForm.vue';
  import UpdateForm from '@/views/list/contract/components/updateForm.vue';
  import {
    companyRecord,
    queryCompanySelect,
  } from '@/views/list/company/tsutils/companyList';

  /**
   * ???????????????????????????
   */
  const generateFormModel = () => {
    return {
      conId: '',
      conName: '',
    };
  };

  const formModel = ref(generateFormModel());

  const columns = [
    {
      title: '??????',
      dataIndex: 'conName',
    },
    {
      title: '??????',
      dataIndex: 'conId',
    },
    {
      title: '??????',
      dataIndex: 'typeName',
    },
    {
      title: '????????????',
      dataIndex: 'startDate',
    },
    {
      title: '????????????',
      dataIndex: 'endDate',
    },
    {
      title: '????????????',
      dataIndex: 'signDate',
    },
    {
      title: '??????',
      dataIndex: 'statusName',
    },
    {
      title: '??????',
      dataIndex: 'totalPrice',
    },
    {
      title: '??????',
      slotName: 'optional',
    },
  ];

  const visible = ref(false);
  const updateVisible = ref(false);

  /**
   * ????????????form??????
   * */
  const openForm = () => {
    contract.value.generateConSelect();
    visible.value = true;
  };

  /**
   * ????????????form??????
   * */
  const updateCon: any = ref(null);
  const openEditForm = (renderData) => {
    // ?????? ??????????????????
    updateVisible.value = true;
    updateCon.value.generateUpdateFormData(renderData);
    // updateCon.value.formData.value = renderData
  };

  const handelUpdateCancel = () => {
    updateCon.value.reset();
    // ?????????????????????
    // updateCon.value.generateUpdateFormData();
    updateVisible.value = false;
  };
  const handleUpdate = () => {
    updateCon.value.update();
    updateVisible.value = false;
  };

  /**
   * ???????????????????????????
   * */
  const renderData = ref<ContractRecord[]>([]);
  const fetchData = async () =>
    // params: PolicyParams = {current: 1, pageSize: 20}
    {
      try {
        const { data } = await queryContractList(formModel.value);
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
      const { data } = await deleteByIdSync(params);
      if (data === 1) {
        await fetchData();
      }
    } catch (err) {}
  };

  const contract: any = ref(null);
  const handleOk = () => {
    const res = contract.value.onNextClick();
  };
  const colseCreateForm = () => {
    visible.value = false;
  };

  // ??????form
  const handelCancel = () => {
    const res = contract.value.reset();
    visible.value = false;
  };

  /**
   * ????????????
   */
  fetchData();

  /**
   * ??????
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };

  /**
   * ??????????????????
   */
  const typeSelectData = ref<ConTypeSelect[]>([]);
  const initType = async () => {
    try {
      const { data } = await queryTypeSelect();
      typeSelectData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  /**
   * ??????????????????
   */
  const statusSelectData = ref<ConStatusSelect[]>([]);
  const initStatus = async () => {
    try {
      const { data } = await queryStatusSelect();
      statusSelectData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  /**
   * ????????????
   */
  const modelSelectData = ref<ModelSelect[]>([]);
  const initModel = async () => {
    try {
      const { data } = await queryModelSelect();
      modelSelectData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };
  const itemTypeSelectData = ref<ItemListRecord[]>([]);
  const initItem = async () => {
    try {
      const { data } = await queryItemSelect();
      itemTypeSelectData.value = data;
    } catch (err) {}
  };
  /**
   * ??????????????????  ??????
   */
  const companySelectData = ref<companyRecord[]>([]);
  const initCompany = async (comName: string) => {
    // ????????????????????????????????????????????????
    // for (let i =0;i<formData.value.mainList.length;i++){
    //   if (comName!=null && )
    // }

    try {
      const params = {
        // comName
      };
      const { data } = await queryCompanySelect(params);
      companySelectData.value = data;

      // const company = { id: undefined, comName, conRole:"" }
    } catch (err) {}
  };
  initItem();
  initModel();
  initStatus();
  initType();
  initCompany('');
</script>

<script lang="ts">
  export default {
    name: 'Contract',
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }

  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
