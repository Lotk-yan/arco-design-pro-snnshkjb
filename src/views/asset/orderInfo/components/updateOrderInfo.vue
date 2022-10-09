<template>
  <div class="container">
    <a-form ref="updateOrderInfo" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="10">
        <a-card class="general-card">
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="订单"
                field="orderId"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-select v-model="formData.orderId">
                  <a-option
                    v-for="item in orderData"
                    :key="item.orderName"
                    :value="item.id"
                    >{{ item.orderName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="采购明细"
                field="infoName"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.infoName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="一级目录"
                field="firstType"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-select v-model="formData.firstType" @change="getSecond">
                  <a-option
                    v-for="item in typeDate"
                    :key="item.name"
                    :value="item.id"
                    >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="二级目录"
                field="secondType"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-select v-model="formData.secondType" @change="getMachine">
                  <a-option
                    v-for="item in secondDate"
                    :key="item.name"
                    :value="item.id"
                    >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="资产名称"
                field="name"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
                :validate-trigger="['change', 'input']"
              >
                <a-select v-model="formData.machineId" @change="initUnit">
                  <a-option
                    v-for="item in machineData"
                    :key="item.name"
                    :value="item.id"
                    >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="生产时间"
                field="makeDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.makeDate"
              /></a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="报废时间"
                field="destroyDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.destroyDate"
              /></a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="购买时间"
                field="buyDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.buyDate"
              /></a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="生产厂家"
                field="makeCompanyId"
                :rules="[
                  {
                    required: false,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
              >
                <a-select
                  v-model="formData.makeCompanyId"
                  :filter-option="true"
                  :allow-search="true"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in companySelectData"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.comName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="供货厂家"
                field="supplierCompanyId"
                :rules="[
                  {
                    required: false,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
              >
                <a-select
                  v-model="formData.supplierCompanyId"
                  :filter-option="true"
                  :allow-search="true"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in companySelectData"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.comName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="规格"
                field="specs"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.specs" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="单位"
                field="unit"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-select
                  v-model="formData.unit"
                  :filter-option="true"
                  :allow-search="true"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                  disabled
                >
                  <a-option
                    v-for="item in unitSelectData"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.name }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="数量"
                field="amount"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.amount" @input="changeTotalPrice" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="单价"
                field="onePrice"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input
                  v-model="formData.onePrice"
                  @input="changeTotalPrice"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="总价"
                field="oneTotalPrice"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.oneTotalPrice" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="24">
              <a-form-item
                label="其他配置"
                field="config"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.config" disabled />
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    propertySecondType,
    updateOrderInfoById,
  } from '@/views/asset/orderInfo/tsutils/orderInfo';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    Machine,
    queryMachineAsSelect,
  } from '@/views/asset/machine/machineutils/machine';

  /**
   * 初始化订单明细
   */
  const generateUpdateInfoFormData = async (requestData) => {
    formData.id = requestData.id;
    formData.orderId = requestData.orderId;
    formData.infoName = requestData.infoName;
    formData.firstType = requestData.firstType;
    formData.secondType = requestData.secondType;
    formData.name = requestData.name;
    formData.makeDate = requestData.makeDate;
    formData.destroyDate = requestData.destroyDate;
    formData.buyDate = requestData.buyDate;
    formData.makeCompanyId = requestData.makeCompanyId;
    formData.makeCompany = requestData.makeCompany;
    formData.supplierCompanyId = requestData.supplierCompanyId;
    formData.supplierCompany = requestData.supplierCompany;
    formData.specs = requestData.specs;
    formData.unit = requestData.unit;
    formData.amount = requestData.amount;
    formData.onePrice = requestData.onePrice;
    formData.oneTotalPrice = requestData.oneTotalPrice;
    formData.remark = requestData.remark;
    formData.machineId = requestData.machineId;
    formData.config = requestData.config;

    const params = {
      firstType: formData.firstType,
      secondType: formData.secondType,
    };
    const { data } = await queryMachineAsSelect(params);
    machineData.value = data;

    initSecond(requestData.firstType);
  };
  // const formData = ref(generateFormData())

  const formData = reactive({
    id: undefined,
    orderId: undefined,
    infoName: '',
    firstType: undefined,
    secondType: undefined,
    name: '',
    makeDate: '',
    destroyDate: '',
    buyDate: '',
    makeCompanyId: undefined,
    makeCompany: '',
    supplierCompanyId: undefined,
    supplierCompany: '',
    specs: '',
    unit: undefined,
    amount: undefined,
    onePrice: undefined,
    oneTotalPrice: 0,
    remark: '',
    machineId: undefined,
    config: '',
  });

  const props = defineProps({
    typeDate: Object,
    companySelectData: Array,
    unitSelectData: Array,
    orderData: Array,
  });

  const secondDate = ref<propertySecondType[]>([]);
  const getSecond = (value) => {
    formData.secondType = undefined;
    for (let i = 0; i < props.typeDate?.length; i += 1) {
      // if (value === props.typeDate?[i].id) {
      //   secondDate.value = props?.typeDate?.value[i].children;
      // }
      if (value === props.typeDate?.[i].id) {
        secondDate.value = props.typeDate?.[i].children;
      }
    }
  };
  const initSecond = (value) => {
    for (let i = 0; i < props.typeDate?.length; i += 1) {
      // if (value === props.typeDate?[i].id) {
      //   secondDate.value = props?.typeDate?.value[i].children;
      // }
      if (value === props.typeDate?.[i].id) {
        secondDate.value = props.typeDate?.[i].children;
      }
    }
  };

  /**
   * 根据两级目录查询设备
   * */
  const machineData = ref<Machine[]>([]);
  const getMachine = async () => {
    formData.machineId = undefined;
    const params = {
      firstType: formData.firstType,
      secondType: formData.secondType,
    };
    const { data } = await queryMachineAsSelect(params);
    machineData.value = data;
  };

  const changeTotalPrice = () => {
    if (
      formData.onePrice != null &&
      formData.onePrice != '' &&
      formData.amount != null &&
      formData.amount != ''
    ) {
      formData.oneTotalPrice = formData.onePrice * formData.amount;
    } else {
      formData.oneTotalPrice = 0;
    }
  };

  const updateOrderInfo = ref<FormInstance>();

  const reset = () => {
    updateOrderInfo.value?.resetFields();
  };

  const emits = defineEmits(['fetchData']);
  const update = async () => {
    const res = await updateOrderInfo.value?.validate();
    if (!res) {
      const params = formData;
      const { data } = await updateOrderInfoById(params);
      emits('fetchData');
      reset();
    }
  };

  const initUnit = (value) => {
    for (let i = 0; i < machineData.value.length; i += 1) {
      if (value === machineData.value[i].id) {
        formData.specs = machineData.value[i].specs;
        formData.unit = machineData.value[i].unit;
        formData.name = machineData.value[i].name;
        formData.config = machineData.value[i].config;
      }
    }
  };

  defineExpose({
    generateUpdateInfoFormData,
    update,
    reset,
  });
</script>

<script lang="ts">
  export default {
    name: 'UpdateOrderInfo',
  };
</script>

<style scoped></style>
