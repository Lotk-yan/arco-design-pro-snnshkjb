<template>
  <div class="container">
    <a-form ref="order" layout="vertical" :model="formData">
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
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { inertOrder } from '@/views/asset/order/tsutils/order';

  const generateFormData = () => {
    return {
      orderId: '',
      orderName: '',
      orderDate: '',
      conId: undefined,
      conName: '',
    };
  };
  const formData = ref(generateFormData());

  const order = ref<FormInstance>();
  const reset = () => {
    order.value?.resetFields();
  };

  const emits = defineEmits(['fetchData', 'colseCreateForm']);
  const commitForm = async () => {
    const res = await order.value?.validate();
    if (!res) {
      const params = formData.value;
      const { data } = await inertOrder(params);
      emits('colseCreateForm');

      reset();
      emits('fetchData');
    } else {
    }
  };

  const props = defineProps({
    conSelectData: Array,
  });

  defineExpose({
    generateFormData,
    reset,
    commitForm,
  });
</script>

<script lang="ts">
  export default {
    name: 'CreateOrder',
  };
</script>

<style scoped></style>
