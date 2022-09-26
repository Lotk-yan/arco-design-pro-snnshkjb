<template>
  <div class="container">
    <a-form ref="updateOrder" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="10">
        <a-card class="general-card">
          <!--                    <template #title> 基础信息 </template>-->
          <a-row :gutter="80">
            <a-col :span="8" :offset="2">
              <a-form-item
                label="订单编号"
                field="orderId"
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
                <a-input v-model="formData.orderId" />
              </a-form-item>
            </a-col>
            <a-col :span="8" :offset="2">
              <a-form-item
                label="订单名称"
                field="orderName"
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
                <a-input v-model="formData.orderName" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8" :offset="2">
              <a-form-item label="订单时间" field="orderDate" :rules="[{}]"
                ><a-date-picker v-model="formData.orderDate"
              /></a-form-item>
            </a-col>
            <a-col :span="8" :offset="2">
              <a-form-item label="绑定合同" field="conId" :rules="[{}]">
                <a-select v-model="formData.conId">
                  <a-option
                    v-for="item in conSelectData"
                    :key="item.conName"
                    :value="item.id"
                    >{{ item.conName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, defineExpose, reactive } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { updateOrderById } from '@/views/asset/order/tsutils/order';

  const formData = reactive({
    id: undefined,
    orderId: '',
    orderName: '',
    orderDate: '',
    conId: undefined,
  });

  const updateOrder = ref<FormInstance>();
  const emits = defineEmits(['fetchData']);
  const update = async () => {
    const res = await updateOrder.value?.validate();
    if (!res) {
      const params = formData;
      const { data } = await updateOrderById(params);
      emits('fetchData');
      reset();
    }
  };

  const reset = () => {
    updateOrder.value?.resetFields();
  };

  const updateFormData = (requestData) => {
    formData.orderId = requestData.orderId;
    formData.id = requestData.id;
    formData.orderName = requestData.orderName;
    formData.orderDate = requestData.orderDate;
    formData.conId = requestData.conId;
  };

  const props = defineProps({
    conSelectData: Array,
  });

  defineExpose({
    updateFormData, // 初始化
    reset,
    update,
  });
</script>

<script lang="ts">
  export default {
    name: 'UpdateOrder',
  };
</script>

<style scoped></style>
