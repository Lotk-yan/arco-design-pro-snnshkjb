<template>
  <div class="container">
    <a-form ref="orderInfo" layout="vertical" :model="formData">
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
                field="machineId"
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
  import { ref } from 'vue';
  import {
    insertOrderInfo,
    propertySecondType,
  } from '@/views/asset/orderInfo/tsutils/orderInfo';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    Machine,
    queryMachineAsSelect,
  } from '@/views/asset/machine/machineutils/machine';

  /**
   * 初始化订单明细
   */
  const generateFormData = () => {
    return {
      orderId: undefined,
      infoName: '',
      firstType: undefined,
      secondType: undefined,
      machineId: undefined,
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
      config: '',
    };
  };
  const formData = ref(generateFormData());

  /**
   * 二级目录
   * */
  const secondDate = ref<propertySecondType[]>([]);
  const getSecond = (value) => {
    formData.value.secondType = undefined;
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
  const getMachine = async (value) => {
    formData.value.machineId = undefined;
    const params = {
      firstType: formData.value.firstType,
      secondType: formData.value.secondType,
    };
    const { data } = await queryMachineAsSelect(params);
    machineData.value = data;
  };

  const initUnit = (value) => {
    for (let i = 0; i < machineData.value.length; i += 1) {
      if (value === machineData.value[i].id) {
        formData.value.specs = machineData.value[i].specs;
        formData.value.unit = machineData.value[i].unit;
        formData.value.name = machineData.value[i].name;
        formData.value.config = machineData.value[i].config;
      }
    }
  };

  const changeTotalPrice = () => {
    if (
      formData.value.onePrice != null &&
      formData.value.onePrice != '' &&
      formData.value.amount != null &&
      formData.value.amount != ''
    ) {
      formData.value.oneTotalPrice =
        formData.value.onePrice * formData.value.amount;
    } else {
      formData.value.oneTotalPrice = 0;
    }
  };

  const emits = defineEmits(['fetchData', 'closeCreateForm']);
  const orderInfo = ref<FormInstance>();

  const reset = () => {
    orderInfo.value?.resetFields();
  };

  const commitForm = async () => {
    const res = await orderInfo.value?.validate();
    if (!res) {
      const params = formData.value;
      const { data } = await insertOrderInfo(params);
      emits('closeCreateForm');
      reset();
      emits('fetchData');
    } else {
    }
  };

  const props = defineProps({
    typeDate: Object,
    companySelectData: Array,
    unitSelectData: Array,
    orderData: Array,
  });

  defineExpose({
    commitForm,
    reset,
  });
</script>

<script lang="ts">
  export default {
    name: 'CreateOrderInfo',
  };
</script>

<style scoped></style>
