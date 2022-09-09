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
                <a-form-item
                        field="con_id"
                        :label="$t('contract.form.con_id')"
                >
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

              <a-divider style="height: 84px" direction="vertical"/>
              <a-col :flex="'86px'" style="text-align: right">
                <a-space direction="vertical" :size="18">
                  <a-button type="primary" @click="fetchData">
                    <template #icon>
                      <icon-search/>
                    </template>
                    {{ $t('searchTable.form.search') }}
                  </a-button>
                  <a-button @click="reset">
                    <template #icon>
                      <icon-refresh/>
                    </template>
                    {{ $t('searchTable.form.reset') }}
                  </a-button>
                </a-space>
              </a-col>

            </a-row>
            <a-divider style="margin-top: 0"/>
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
<!--                    <a-table-column title="名称" data-index="conName"></a-table-column>-->
<!--                    <a-table-column title="编号" data-index="conId"></a-table-column>-->
<!--                    <a-table-column title="Salary" data-index="salary"></a-table-column>-->
<!--                    <a-table-column title="Salary" data-index="salary"></a-table-column>-->
<!--                    <a-table-column title="操作" data-index="tags">-->
<!--                        <template #cell="{ record }">-->
<!--                            <a-button @click="$modal.info({ title:'名称', content:renderData.conName })">编辑</a-button>-->
<!--                            <a-button @click="$modal.info({ title:'Name', content:renderData.conId })">删除</a-button>-->
<!--                        </template>-->
<!--                    </a-table-column>-->
<!--                </template>-->
<!--            </a-table>-->
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
            :closable=false
            :mask-closable=false
            title="新增合同"
            width="70%"
            height = "50%"

    >
<!--        @ok="handleOk"-->
<!--        @cancel="handelCancel"-->
      <contractForm ref="contract"
                    :type-select-data = "typeSelectData"
                    :status-select-data = "statusSelectData"
                    :model-select-data = "modelSelectData"
                    :company-select-data = "companySelectData"
                    :item-type-select-data = "itemTypeSelectData"
                    @fetchData = "fetchData"
                    @colseCreateForm = "colseCreateForm"
      />

        <template v-slot:footer>
            <a-button @click="handleOk">确定</a-button>
            <a-button @click="handelCancel">取消</a-button>
        </template>
    </a-modal>

      <a-modal
              v-model:visible="updateVisible"
              :closable=false
              :mask-closable=false
              title="编辑合同"
              width="70%"
              height = "50%"

      >
          <!--        @ok="handleOk"-->
          <!--        @cancel="handelCancel"-->
          <updateForm ref="updateCon"
                      :type-select-data = "typeSelectData"
                      :status-select-data = "statusSelectData"
                      :model-select-data = "modelSelectData"
                      :company-select-data = "companySelectData"
                      :item-type-select-data = "itemTypeSelectData"
                      @fetchData = "fetchData"
          />

          <template v-slot:footer>
              <a-button @click="handleUpdate">确定</a-button>
              <a-button @click="handelUpdateCancel">取消</a-button>
          </template>
      </a-modal>

  </div>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';
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
      queryItemSelect
  } from '@/views/list/contract/tsutils/contractList';
  import contractForm from "@/views/list/contract/components/contractForm.vue";
  import UpdateForm from "@/views/list/contract/components/updateForm.vue";
  import {companyRecord, queryCompanySelect} from "@/views/list/company/tsutils/companyList";

  /**
   * 初始化查询条件表单
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
          title: '名称',
          dataIndex: 'conName',
      },
      {
          title: '编号',
          dataIndex: 'conId',
      },
      {
          title: '类型',
          dataIndex: 'typeName',
      },
      {
          title: '开始时间',
          dataIndex: 'startDate',
      },
      {
          title: '结束时间',
          dataIndex: 'endDate',
      },
      {
          title: '签订时间',
          dataIndex: 'signDate',
      },
      {
          title: '状态',
          dataIndex: 'statusName',
      },
      {
          title: '总价',
          dataIndex: 'totalPrice',
      },
      {
          title: '操作',
          slotName: 'optional'
      }
  ];

  const visible = ref(false);
  const updateVisible = ref(false);

  /**
   * 打开新增form表单
   * */
  const openForm = () => {
    visible.value = true;
  };

  /**
   * 打开编辑form表单
   * */
  const updateCon : any = ref(null)
  const openEditForm = (renderData) => {

      // 此为 当前行的内容
      updateVisible.value = true;
      updateCon.value.generateUpdateFormData(renderData)
      // updateCon.value.formData.value = renderData
  };

  const handelUpdateCancel = () =>{
      updateCon.value.reset();
      updateCon.value.generateUpdateFormData()
      updateVisible.value = false;
  }
  const handleUpdate = () =>{
      updateCon.value.update();
      updateVisible.value = false;
  }

  /**
   * 调用后台接口的函数
   * */
  const renderData = ref<ContractRecord[]>([]);
  const fetchData = async (
          // params: PolicyParams = {current: 1, pageSize: 20}
  ) => {

    try {
      const {data} = await queryContractList(formModel.value);
      renderData.value = data;
      // return data
    }
    catch (err) {
      // you can report use errorHandler or other
    }
  };

  const deleteById = async (renderData)=>{
    try {
        const params = {
            id:renderData.id
        }
        const {data} = await deleteByIdSync(params)
        if (data===1){
            await fetchData();
        }
    }
    catch (err) {

    }
  }

  const contract: any = ref(null)
  const handleOk = () =>{

      const res = contract.value.onNextClick()
  }
  const colseCreateForm = ()=>{
      visible.value = false;
  }

  // 清空form
  const handelCancel = () =>{

      const res = contract.value.reset()
      visible.value = false;
  }


  /**
   * 调用函数
   */
  fetchData()

  /**
   * 重置
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };



  /**
   * 合同类型下拉
   */
  const typeSelectData = ref<ConTypeSelect[]>([]);
  const initType = async () =>{
      try {
          const {data} = await queryTypeSelect();
          typeSelectData.value = data;
      } catch (err) {
          // you can report use errorHandler or other
      }

  }
  /**
   * 合同状态下拉
   */
  const statusSelectData = ref<ConStatusSelect[]>([]);
  const initStatus= async () =>{
      try {
          const {data} = await queryStatusSelect();
          statusSelectData.value = data;
      } catch (err) {
          // you can report use errorHandler or other

      }

  }
  /**
   * 模板下拉
   */
  const modelSelectData = ref<ModelSelect[]>([]);
  const initModel= async () =>{
      try {
          const {data} = await queryModelSelect();
          modelSelectData.value = data;
      } catch (err) {
          // you can report use errorHandler or other

      }
  }
  const itemTypeSelectData = ref<ItemListRecord[]>([]);
  const initItem = async () =>{
      try {
          const {data} = await queryItemSelect();
          itemTypeSelectData.value = data;
      } catch (err) {

      }
  }
  /**
   * 签约主体下拉  异步
   */
  const companySelectData = ref<companyRecord[]>([]);
  const initCompany = async (comName: string) =>{

      // 保证已选择的下拉框的数据不被覆盖
      // for (let i =0;i<formData.value.mainList.length;i++){
      //   if (comName!=null && )
      // }

      try {
          const params = {
              // comName
          }
          const {data} = await queryCompanySelect(params);
          companySelectData.value = data;

          // const company = { id: undefined, comName, conRole:"" }

      }catch (err) {

      }
  }
  initItem();
  initModel();
  initStatus()
  initType();
  initCompany("");


</script>

<script lang="ts">
  export default {
      name : 'Contract',

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
