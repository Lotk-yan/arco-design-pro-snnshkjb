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
                  field="order_id"
                  :label="$t('order.form.order_id')"
                >
                  <a-input
                    v-model="formModel.orderId"
                    :placeholder="$t('order.form.order_id.placeholder')"
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
                  field="order_id"
                  :label="$t('order.form.order_infoName')"
                >
                  <a-input
                    v-model="formModel.orderInfoName"
                    :placeholder="$t('order.form.order_infoName.placeholder')"
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

          <a-table :columns="columns" :data="renderData">
            <template #optional="renderData">
              <a-button @click="openEditForm(renderData.record)">编辑</a-button>
              <a-button @click="deleteById(renderData.record)">删除</a-button>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    firstSecond,
    propertySecondType,
    queryTypeList,
  } from '@/views/asset/orderInfo/tsutils/orderInfo';

  /**
   * 初始化查询条件表单
   */
  const generateFormModel = () => {
    return {
      orderId: '',
      orderName: '',
      firstType: undefined,
      secondType: undefined,
      orderInfoName: '',
    };
  };
  /**
   * 重置
   */
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const formModel = ref(generateFormModel());

  /**
   * 获取一级类目
   * */
  // const typeDate = ref<firstSecond[]>([])
  const typeDate = ref<firstSecond[]>([]);
  const getInfoType = async () => {
    try {
      const { data } = await queryTypeList();
      typeDate.value = data;
      console.log(typeDate.value);
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
        console.log(secondDate.value);
      }
    }
  };

  getInfoType();
</script>

<script lang="ts">
  export default {
    name: 'OrderIfo',
  };
</script>

<style scoped></style>
