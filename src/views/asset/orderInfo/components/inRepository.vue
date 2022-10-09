<template>
  <div class="container">
    <a-form ref="inRepositoryForm" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="10">
        <a-card class="general-card">
          <a-row :gutter="80">
            <a-col :span="8" :offset="2">
              <a-form-item
                label="一级类目"
                field="firstTypeName"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.firstTypeName" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="2">
              <a-form-item
                label="二级类目"
                field="secondTypeName"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.secondTypeName" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8" :offset="2">
              <a-form-item
                label="资源名称"
                field="name"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.name" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="2">
              <a-form-item
                label="单位"
                field="unitName"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.unitName" disabled />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8" :offset="2">
              <a-form-item
                label="订单数量"
                field="amount"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.amount" disabled />
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="2">
              <a-form-item
                label="入库数量"
                field="inAmount"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.inAmount" />
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="80">
            <a-col :span="18" :offset="2">
              <a-form-item
                label="备注"
                field="remark"
                :rules="[
                  {
                    required: false,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-textarea v-model="formData.remark" />
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
  import { inR } from '../tsutils/orderInfo';

  /**
   * 初始化入库单
   */
  const generateInRepositoryFormData = async (requestData) => {
    formData.id = requestData.id;
    formData.amount = requestData.amount;
    formData.firstTypeName = requestData.firstTypeName;
    formData.secondTypeName = requestData.secondTypeName;
    formData.name = requestData.name;
    formData.unitName = requestData.unitName;
  };

  const formData = reactive({
    id: undefined,
    firstTypeName: '',
    secondTypeName: '',
    name: '',
    unitName: '',
    amount: undefined,
    inAmount: undefined,
    remark: '',
  });

  const inRepositoryForm = ref<FormInstance>();
  const reset = () => {
    inRepositoryForm.value?.resetFields();
  };
  const emits = defineEmits(['fetchData']);
  const inRCommit = async () => {
    const res = await inRepositoryForm.value?.validate();
    if (!res) {
      const params = formData;
      const { data } = await inR(params);
      emits('fetchData');
      reset();
    }
  };

  defineExpose({
    generateInRepositoryFormData,
    reset,
    inRCommit,
  });
</script>

<script lang="ts">
  export default {
    name: 'InRepository',
  };
</script>

<style scoped></style>
