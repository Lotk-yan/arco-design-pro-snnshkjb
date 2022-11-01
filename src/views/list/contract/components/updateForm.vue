<template>
  <div class="container">
    <a-form ref="updateCon" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="10">
        <a-card class="general-card">
          <template #title> 基础信息 </template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="合同编号"
                field="conId"
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
                <a-input v-model="formData.conId"></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="合同名称"
                field="conName"
                :rules="[
                  {
                    required: true,
                    message: $t(
                      'stepForm.form.error.advertisingSource.required'
                    ),
                  },
                ]"
              >
                <a-input v-model="formData.conName" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="合同类型"
                field="conType"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <a-select
                  v-model="formData.conType"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in typeSelectData"
                    :key="item.key"
                    :value="item.conType"
                    >{{ item.typeName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="开始时间"
                field="startDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.startDate"
              /></a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="结束时间"
                field="endDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.endDate"
              /></a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="签订时间"
                field="signDate"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-date-picker v-model="formData.signDate"
              /></a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="状态"
                field="conStatus"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <a-select
                  v-model="formData.conStatus"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in statusSelectData"
                    :key="item.statusName"
                    :value="item.conStatus"
                    >{{ item.statusName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="总价"
                field="totalPrice"
                :rules="[
                  {
                    required: true,
                    // message: $t('stepForm.form.error.advertisingSource.required'),
                  },
                ]"
                ><a-input v-model="formData.totalPrice"
              /></a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title>相对签约方主体</template>
          <a-row :gutter="80" style="padding-bottom: 20px">
            <a-col :span="8"> 主体 </a-col>
            <a-col :span="8"> 角色 </a-col>
          </a-row>

          <div v-for="(i, j) in formData.mainList" :key="j">
            <a-row :gutter="80" style="padding-bottom: 5px">
              <!--              <a-col :span="8"><a-input v-model="i.mainName"/></a-col>-->
              <a-col :span="8">
                <!--                :allow-create = true  暂时不允许在这里新增，新增需要输入太多-->
                <!--                 filter-option 不显示当前已选择的项目-->
                <!--                 @search="initCompany" 暂不支持远程搜索-->
                <a-select
                  v-model="i.comId"
                  :filter-option="true"
                  :allow-search="true"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                  @change="changeSelect(j)"
                >
                  <a-option
                    v-for="item in companySelectData"
                    :key="item.id"
                    :value="item.id"
                    >{{ item.comName }}</a-option
                  >
                </a-select>
              </a-col>
              <a-col :span="8"><a-input v-model="i.conRole" /></a-col>
              <a-col :span="1">
                <a-button @click="addMain">
                  <icon-plus />
                </a-button>
              </a-col>
              <a-col :span="1">
                <a-button @click="delMain(j)">
                  <icon-delete />
                </a-button>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card class="general-card">
          <template #title>付款明细</template>
          <a-row :gutter="20" style="padding-bottom: 20px">
            <a-col :span="6"> 模板 </a-col>
            <a-col :span="5"> 付款日期 </a-col>
            <a-col :span="3"> 付款比例 </a-col>
            <a-col :span="3"> 已支付 </a-col>
            <a-col :span="3"> 金额 </a-col>
            <a-col :span="3"> 操作 </a-col>
          </a-row>

          <div v-for="(i, j) in formData.moneyList" :key="j">
            <a-row :gutter="20" style="padding-bottom: 5px">
              <a-col :span="6">
                <a-select
                  v-model="i.modelId"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in modelSelectData"
                    :key="item.modelName"
                    :value="item.id"
                    >{{ item.modelName }}</a-option
                  >
                </a-select>
              </a-col>
              <a-col :span="5"><a-date-picker v-model="i.payTime" /></a-col>
              <a-col :span="3"><a-input v-model="i.percent" /></a-col>
              <a-col :span="3">
                <a-select v-model="i.isPaid">
                  <a-option :key="0" :value="0">是</a-option>
                  <a-option :key="1" :value="1">否</a-option>
                </a-select>
              </a-col>
              <a-col :span="3"><a-input v-model="i.payAcount" /></a-col>
              <a-col :span="2">
                <a-button @click="addMoney">
                  <icon-plus />
                </a-button>
              </a-col>
              <a-col :span="2">
                <a-button @click="delMoney(j)">
                  <icon-delete />
                </a-button>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card class="general-card">
          <template #title>重要细则</template>
          <a-row :gutter="20" style="padding-bottom: 20px">
            <a-col :span="6"> 细则分类 </a-col>
            <a-col :span="14"> 详情 </a-col>
            <a-col :span="3"> 操作 </a-col>
          </a-row>
          <div v-for="(i, j) in formData.itemList" :key="j">
            <a-row :gutter="20" style="padding-bottom: 5px">
              <a-col :span="6">
                <a-select
                  v-model="i.itemType"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                >
                  <a-option
                    v-for="item in itemTypeSelectData"
                    :key="item.itemType"
                    :value="item.itemType"
                    >{{ item.typeName }}</a-option
                  >
                </a-select>
              </a-col>
              <a-col :span="14">
                <a-textarea
                  v-model="i.itemInfo"
                  :auto-size="{ minRows: 1 }"
                  placeholder="请填写备注说明，可换行输入。"
                />
              </a-col>
              <a-col :span="2">
                <a-button @click="addItem">
                  <icon-plus />
                </a-button>
              </a-col>
              <a-col :span="2">
                <a-button @click="delItem(j)">
                  <icon-delete />
                </a-button>
              </a-col>
            </a-row>
          </div>
        </a-card>

        <a-card class="general-card">
          <template #title>关联合同</template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item label="子合同" field="children">
                <a-select
                  v-model="formData.children"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                  multiple
                >
                  <a-option
                    v-for="item in contractSelect"
                    :key="item.conName"
                    :value="item.id"
                    >{{ item.conName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="往年合同" field="recentYearList">
                <a-select
                  v-model="formData.recentYearList"
                  :placeholder="
                    $t('groupForm.placeholder.video.encoding.resolution')
                  "
                  multiple
                >
                  <a-option
                    v-for="item in contractSelect"
                    :key="item.conName"
                    :value="item.id"
                    >{{ item.conName }}</a-option
                  >
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-card class="general-card">
          <template #title>备注</template>
          <a-row :gutter="80">
            <a-col :span="24">
              <a-form-item label="备注" field="remark">
                <a-textarea v-model="formData.remark"></a-textarea>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>

        <a-card class="general-card">
          <template #title>附件</template>
          <a-row :gutter="80">
            <a-col :span="12">
              <a-form-item label="图片" field="pictures">
                <!--                <a-upload-->
                <!--                        :custom-request="customRequest"-->
                <!--                        :default-file-list="formData.pictureList"-->
                <!--                        list-type="picture-card"-->
                <!--                        action="http://localhost:8080/file/fileUpload"-->
                <!--                        image-preview-->
                <!--                />-->
                <a-upload
                  v-if="abc"
                  :custom-request="customRequest"
                  :default-file-list="pictureList2"
                  :on-before-remove="removePic"
                  list-type="picture-card"
                  image-preview
                  @success="picUploaded"
                ></a-upload>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="文件" field="otherFiles">
                <!--                <a-upload-->
                <!--                        :default-file-list="formData.fileList"-->
                <!--                        action="http://localhost:8080/file/upload"-->
                <!--                        accept=".jpg,.png,.jpeg,.pdf,.doc"-->
                <!--                        @change="uploadChange"-->
                <!--                        :show-link="false"-->
                <!--                        @preview="previewAAA"-->
                <!--                />-->
                <a-upload
                  v-if="abc"
                  :custom-request="customRequest"
                  :default-file-list="fileList2"
                  :show-link="false"
                  :on-before-remove="removeFile"
                  accept=".doc,.docx,.xls,.xlsx,.pdf"
                  @success="uploaded"
                  @preview="previewAAA"
                ></a-upload>
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
  import {
    ContractRecord,
    FileRecord,
    getFileByUrl,
    selectInfoByConId,
    updateContractByConId,
  } from '@/views/list/contract/tsutils/contractList';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    queryConAsSelecExcept,
    queryConAsSelect,
  } from '@/views/asset/order/tsutils/order';
  import { FileItem } from '@arco-design/web-vue';

  const abc = ref(true);

  const pictureList2: any = ref([
    // {
    //     uid:"-1",
    //     name:"ice.pdf",
    //     url:"http://localhost:8080/files//2022-10-27//552936f4-206d-4b35-8c21-cb4e5d85a000.png"
    // },
    // {
    //     uid:"-1",
    //     name:"ice.pdf",
    //     url:"http://localhost:8080/files//2022-10-27//552936f4-206d-4b35-8c21-cb4e5d85a000.png"
    // }
  ]);
  const fileList2: any = ref([]);
  /**
   * 初始化签约主体
   */
  const generateUpdateFormData = async (requestData) => {
    // 文件赋值
    abc.value = false;

    // 初始化子合同和往年合同的中文匹配
    try {
      const params = {
        id: requestData.id,
      };
      const { data } = await queryConAsSelecExcept(params);
      contractSelect.value = data;
    } catch (err) {}

    try {
      const params = {
        id: requestData.id,
      };
      /**
       * 根据合同id查询 合同下签约主体和付费明细
       */
      const { data } = await selectInfoByConId(params);
      // abc.value = false;
      formData.id = requestData.id;
      formData.conId = requestData.conId;
      formData.conName = requestData.conName;
      formData.conType = requestData.conType;
      formData.startDate = requestData.startDate;
      formData.endDate = requestData.endDate;
      formData.signDate = requestData.signDate;
      formData.conStatus = requestData.conStatus;
      formData.totalPrice = requestData.totalPrice;
      formData.remark = requestData.remark;
      if (data.mainList.length > 0) {
        formData.mainList = data.mainList;
      }
      if (data.moneyList.length > 0) {
        formData.moneyList = data.moneyList;
      }
      if (data.itemList.length > 0) {
        formData.itemList = data.itemList;
      }
      if (data.children.length > 0) {
        formData.children = data.children;
      }
      if (data.recentYearList.length > 0) {
        formData.recentYearList = data.recentYearList;
      }
      if (data.pictureList.length > 0) {
        // formData.pictures = data.pictureList
        for (let m = 0; m < data.pictureList.length; m += 1) {
          const file = { uid: '', name: '', url: '', response: { data: '' } };
          // const file = FileItem
          file.name = data.pictureList[m].oldName;
          // 将图片转换为前端可以打开的url
          file.response.data = data.pictureList[m].url;
          file.url = data.pictureList[m].url;
          file.url = file.url.replace('D:\\', 'http://localhost:8080/');
          file.uid = data.pictureList[m].id;
          // file.response
          pictureList2.value.push(file);

          const pic: any = formData.pictures;
          pic.push(data.pictureList[m].url);
        }
      }

      if (data.fileList.length > 0) {
        for (let m = 0; m < data.fileList.length; m += 1) {
          const file = { uid: '', name: '', url: '', response: { data: '' } };
          file.name = data.fileList[m].oldName;
          // 文件不需要转成预览的url
          file.response.data = data.fileList[m].url;
          file.url = data.fileList[m].url;
          // file.url = file.url.replace("D:\\","http://localhost:8080/")
          file.uid = data.fileList[m].id;

          fileList2.value.push(file);
          const otherFilesaaa: any = formData.otherFiles;
          otherFilesaaa.push(data.fileList[m].url);
        }
        // formData.otherFiles = data.otherFiles
      }
      abc.value = true;
    } catch (err) {
      console.log(err);
    }
  };

  const uploaded = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    file.url = reJson.data;
    // file.url = file.url.replace("D:\\","http://localhost:8080/")
    const otherFilesaaa: any = formData.otherFiles;
    otherFilesaaa.push(reJson.data);
  };

  const picUploaded = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    const pic: any = formData.pictures;
    pic.push(reJson.data);
  };

  const removePic = (file) => {
    const re = file.response;
    try {
      const reJson = JSON.parse(re);
      for (let m = 0; m < formData.pictures.length; m += 1) {
        if (reJson.data == formData.pictures[m]) {
          formData.pictures.splice(m, 1);
        }
      }
    } catch (e) {
      for (let m = 0; m < formData.pictures.length; m += 1) {
        if (re.data == formData.pictures[m]) {
          formData.pictures.splice(m, 1);
        }
      }
    }

    return true;
  };

  const removeFile = (file) => {
    const re = file.response;
    try {
      const reJson = JSON.parse(re);
      for (let m = 0; m < formData.otherFiles.length; m += 1) {
        if (reJson.data == formData.otherFiles[m]) {
          formData.otherFiles.splice(m, 1);
        }
      }
    } catch (err) {
      for (let m = 0; m < formData.otherFiles.length; m += 1) {
        if (re.data == formData.otherFiles[m]) {
          formData.otherFiles.splice(m, 1);
        }
      }
    }

    return true;
  };

  const formData = reactive({
    id: undefined,
    conId: '',
    conName: '',
    conType: undefined,
    startDate: '',
    endDate: '',
    signDate: '',
    conStatus: undefined,
    totalPrice: undefined,
    mainList: [{ comId: undefined, comName: '', conRole: '' }],
    moneyList: [
      {
        modelId: undefined,
        col1: '',
        payTime: undefined,
        percent: undefined,
        col3: '%',
        col4: '人民币',
        payAcount: undefined,
        col5: '元整',
        isPaid: 1,
      },
    ],
    itemList: [{ conId: undefined, itemType: undefined, itemInfo: '' }],
    children: [],
    recentYearList: [],
    remark: '',
    pictures: [],
    otherFiles: [],
  });

  // const fileList = [
  //     {
  //         uid:'-1',
  //         name: 'ice.pdf',
  //         url :'D:\\\\files\\\\2022-10-25\\\\ce6fdd74-c7dc-4960-99df-93976694d605.pdf'
  //     }
  // ]
  //

  const customRequest = (option) => {
    const xhr = new XMLHttpRequest();
    const { onProgress, onError, onSuccess, fileItem, name } = option;
    if (xhr.upload) {
      xhr.upload.onprogress = function (event) {
        let percent;
        if (event.total > 0) {
          percent = event.loaded / event.total;
        }
        onProgress(percent, event);
      };
    }
    xhr.onerror = function error(e) {
      onError(e);
    };
    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        return onError(xhr.responseText);
      }
      return onSuccess(xhr.response);
    };

    const formData = new FormData();
    formData.append(name || 'file', fileItem.file);
    xhr.open('post', 'http://localhost:8080/file/fileUpload', true);
    xhr.send(formData);

    return {
      abort() {
        xhr.abort();
      },
    };
  };

  /**
   * 后台加载pdf word excel 等文件流
   * */
  const previewAAA = (file) => {
    // const responseData = JSON.parse(file.response)
    // file.url = responseData.data   file 一旦有了url  会导致浏览器直接跳转，而浏览器不允许访问本地文件
    // console.log(responseData.data)
    /**
     * 后台拉取二进制数据，解析成文件，然后使用浏览器预览
     * */
    const params = {
      url: file.url,
    };

    getFileByUrl(params)
      .then((resp) => {
        const blob = new Blob([resp.data]); // 处理文档流
        const fileName = file.name;
        const down = document.createElement('a');
        down.download = fileName;
        down.style.display = 'none'; // 隐藏,没必要展示出来
        down.href = URL.createObjectURL(blob);
        document.body.appendChild(down);
        down.click();
        URL.revokeObjectURL(down.href); // 释放URL 对象
        document.body.removeChild(down); // 下载完成移除
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const updateCon = ref<FormInstance>();
  const reset = () => {
    updateCon.value?.resetFields();
    formData.mainList = [{ comId: undefined, comName: '', conRole: '' }];
    formData.moneyList = [
      {
        modelId: undefined,
        col1: '',
        payTime: undefined,
        percent: undefined,
        col3: '%',
        col4: '人民币',
        payAcount: undefined,
        col5: '元整',
        isPaid: 1,
      },
    ];
    formData.itemList = [
      { conId: undefined, itemType: undefined, itemInfo: '' },
    ];
    formData.pictures = [];
    formData.otherFiles = [];
    formData.recentYearList = [];
    formData.children = [];
    pictureList2.value.length = 0;
    fileList2.value.length = 0;
  };

  defineProps({
    typeSelectData: Array,
    statusSelectData: Array,
    modelSelectData: Array,
    companySelectData: Array,
    itemTypeSelectData: Array,
  });

  const emits = defineEmits(['fetchData']);
  const update = async () => {
    const res = await updateCon.value?.validate();
    if (!res) {
      const params = formData;
      const { data } = await updateContractByConId(params);
      emits('fetchData');
      reset();
    }
  };

  const addMain = () => {
    const mainRecord = { comId: undefined, comName: '', conRole: '' };
    if (formData.mainList != null) {
      formData.mainList.push(mainRecord);
    }
  };
  const delMain = (j) => {
    if (formData.mainList != null && formData.mainList.length > 1) {
      formData.mainList.splice(j, 1);
    }
  };

  const addMoney = () => {
    const moneyRecord = {
      modelId: undefined,
      col1: '',
      payTime: undefined,
      percent: undefined,
      col3: '%',
      col4: '人民币',
      payAcount: undefined,
      col5: '元整',
      isPaid: 1,
    };
    if (formData.moneyList != null) {
      formData.moneyList.push(moneyRecord);
    }
  };
  const delMoney = (j) => {
    if (formData.moneyList != null && formData.moneyList.length > 1) {
      formData.moneyList.splice(j, 1);
    }
  };
  const addItem = () => {
    const itemRecord = { conId: undefined, itemType: undefined, itemInfo: '' };
    if (formData.itemList != null) {
      formData.itemList.push(itemRecord);
    }
  };
  const delItem = (j) => {
    if (formData.itemList != null && formData.itemList.length > 1) {
      formData.itemList.splice(j, 1);
    }
  };

  /**
   * 查询合同下拉框(不能包含自身)
   * */
  const contractSelect = ref<ContractRecord[]>([]);

  defineExpose({
    generateUpdateFormData, // 初始化
    update,
    reset,
    uploaded,
    picUploaded,
    removePic,
    removeFile,
  });
</script>

<script lang="ts">
  export default {
    name: 'UpdateForm',
  };
</script>

<style scoped></style>
