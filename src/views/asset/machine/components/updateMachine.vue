<template>
  <div class="container">
    <a-form ref="updateMachineForm" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="10">
        <a-card class="general-card">
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
                <a-select v-model="formData.secondType">
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
                <a-input v-model="formData.name" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="单位"
                field="unit"
                :rules="[
                  {
                    required: true,
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
          </a-row>
          <a-row gutter="80">
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
                <a-textarea v-model="formData.config" />
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
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { propertySecondType } from '@/views/asset/orderInfo/tsutils/orderInfo';
  import { updateMachineById } from '../machineutils/machine';

  const formData = reactive({
    id: undefined,
    firstType: undefined,
    secondType: undefined,
    name: '',
    specs: '',
    unit: undefined,
    config: '',
  });

  const updateMachineForm = ref<FormInstance>();
  const emits = defineEmits(['fetchData']);

  const updateFormData = (requestData) => {
    formData.id = requestData.id;
    formData.firstType = requestData.firstType;
    formData.secondType = requestData.secondType;
    formData.name = requestData.name;
    formData.specs = requestData.specs;
    formData.unit = requestData.unit;
    formData.config = requestData.config;
    initSecond(requestData.firstType);
  };

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

  const reset = () => {
    updateMachineForm.value?.resetFields();
  };

  const commitUpdateForm = async () => {
    const res = await updateMachineForm.value?.validate();
    if (!res) {
      const params = formData;
      const { data } = await updateMachineById(params);
      emits('fetchData');
      reset();
    }
  };

  const props = defineProps({
    typeDate: Object,
    companySelectData: Array,
    unitSelectData: Array,
    orderData: Array,
  });

  defineExpose({
    commitUpdateForm,
    updateFormData,
    reset,
  });
</script>

<script lang="ts">
  export default {
    name: 'UpdateMachine',
  };
</script>

<style scoped></style>
