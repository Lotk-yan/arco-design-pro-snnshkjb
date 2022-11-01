<template>
  <div class="container">
    <a-form ref="contract" layout="vertical" :model="formData">
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
                <a-input v-model="formData.conId" />
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
                  @change="changeSelect(j, i)"
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
                  :custom-request="customRequest"
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
                  :custom-request="customRequest"
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
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    ContractRecord,
    getFileByUrl,
    inertContract,
  } from '@/views/list/contract/tsutils/contractList';
  import { queryConAsSelect } from '@/views/asset/order/tsutils/order';
  import { FileItem } from '@arco-design/web-vue/es/upload/interfaces';
  import debug from '@/utils/env';

  /**
   * 查询合同下拉框
   * */
  const contractSelect = ref<ContractRecord[]>([]);
  const generateConSelect = async () => {
    try {
      const { data } = await queryConAsSelect();
      contractSelect.value = data;
    } catch (err) {}
  };

  /**
   * 初始化签约主体
   */
  const generateFormData = () => {
    return {
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
    };
  };
  const formData = ref(generateFormData());

  /**
   * 文件上传
   * */
  const fileList = ref<FileItem[]>([]);
  const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
    fileList.value = [fileItem];
    // formData.value.fileList=fileList.value
  };

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
   * 分割线
   * */

  /**
   * 后台加载pdf word excel 等文件流
   * */
  const previewAAA = (file) => {
    const responseData = JSON.parse(file.response);
    // file.url = responseData.data   file 一旦有了url  会导致浏览器直接跳转，而浏览器不允许访问本地文件
    // console.log(responseData.data)
    /**
     * 后台拉取二进制数据，解析成文件，然后使用浏览器预览
     * */
    const params = {
      url: responseData.data,
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

    // console.log(111111)
  };
  const uploaded = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    const otherFilesaaa: any = formData.value.otherFiles;
    otherFilesaaa.push(reJson.data);
  };

  const picUploaded = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    const pic: any = formData.value.pictures;
    pic.push(reJson.data);
  };

  const removePic = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    for (let m = 0; m < formData.value.pictures.length; m += 1) {
      if (reJson.data == formData.value.pictures[m]) {
        formData.value.pictures.splice(m, 1);
      }
    }
    return true;
  };

  const removeFile = (file) => {
    const re = file.response;
    const reJson = JSON.parse(re);
    for (let m = 0; m < formData.value.otherFiles.length; m += 1) {
      if (reJson.data == formData.value.otherFiles[m]) {
        formData.value.otherFiles.splice(m, 1);
      }
    }
    return true;
  };

  /**
   * 检测form值pay
   */
  const emits = defineEmits(['fetchData', 'colseCreateForm']);
  const contract = ref<FormInstance>();
  const onNextClick = async () => {
    const res = await contract.value?.validate();
    if (!res) {
      const params = formData.value;
      const { data } = await inertContract(params);
      // 关闭新增表单
      emits('colseCreateForm');
      // 重置新增表单
      reset();
      // 重新查询
      emits('fetchData');
    } else {
    }
  };

  const reset = () => {
    contract.value?.resetFields();
    formData.value.mainList = [{ comId: undefined, comName: '', conRole: '' }];
    formData.value.moneyList = [
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
    formData.value.itemList = [
      { conId: undefined, itemType: undefined, itemInfo: '' },
    ];
  };

  const props = defineProps({
    typeSelectData: Array,
    statusSelectData: Array,
    modelSelectData: Array,
    companySelectData: Array,
    itemTypeSelectData: Array,
  });

  /**
   * 这个写法返回promise  暂不知如何解析
   */
  // const initCompany = (value) =>{
  //   debugger
  //       const params = {
  //         comName:value
  //       }
  //       const data = queryCompanySelect(params)
  //   // companySelectData.value = data
  //
  // }

  /**
   * 当签约主体下拉改变时，给form赋值   此处对应功能为 当下拉框中没有该公司时，支持直接创建，暂时放弃此功能
   * */
  const changeSelect = async (j, i) => {
    const vv: any = props.companySelectData;
    for (let m = 0; m < vv!.length; m += 1) {
      if (vv![m].id === i.comId) {
        // formData.value.mainList[j].comId = companySelectData.value[m].id;
        formData.value.mainList[j].comName = vv![m].comName;
      }
    }
  };

  const addMain = () => {
    const mainRecord = { comId: undefined, comName: '', conRole: '' };
    if (formData.value.mainList != null) {
      formData.value.mainList.push(mainRecord);
    }
  };
  const delMain = (j) => {
    if (formData.value.mainList != null && formData.value.mainList.length > 1) {
      formData.value.mainList.splice(j, 1);
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
    if (formData.value.moneyList != null) {
      formData.value.moneyList.push(moneyRecord);
    }
  };
  const delMoney = (j) => {
    if (
      formData.value.moneyList != null &&
      formData.value.moneyList.length > 1
    ) {
      formData.value.moneyList.splice(j, 1);
    }
  };

  const addItem = () => {
    const itemRecord = { conId: undefined, itemType: undefined, itemInfo: '' };
    if (formData.value.itemList != null) {
      formData.value.itemList.push(itemRecord);
    }
  };
  const delItem = (j) => {
    if (formData.value.itemList != null && formData.value.itemList.length > 1) {
      formData.value.itemList.splice(j, 1);
    }
  };

  // initModel()
  // initStatus()
  // initType()
  // initCompany("")

  defineExpose({
    formData,
    generateFormData,
    onNextClick,
    reset,
    generateConSelect,
    previewAAA,
    uploaded,
    picUploaded,
    removePic,
    removeFile,
  });
</script>

<script lang="ts">
  export default {
    name: 'ContractForm',
    data() {
      return {
        // mainList :[{ mainName: "", mainRole: "" }],
        // moneyList :[{
        //   modelId:null,col1:"",payTime:null,percent:"",col3:"%",col4:"人民币",payAcount:null,col5:"元整"
        // }],
      };
    },
    methods: {
      // addMain(){
      //   const mainRecord = { mainName: "", mainRole: "" }
      //   this.mainList.push(mainRecord)
      // },
      // delMain(j){
      //   if (this.mainList.length>1){
      //     this.mainList.splice(j,1)
      //   }
      // },
      // addMoney(){
      //   const moneyRecord = {
      //     modelId:null,col1:"",payTime:null,percent:"",col3:"",col4:"",payAcount:null,col5:""
      //   }
      //   this.moneyList.push(moneyRecord)
      // },
      // delMoney(j){
      //   if (this.moneyList.length>1){
      //     this.moneyList.splice(j,1)
      //   }
      // },
    },
  };
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    text-align: right;
    background: var(--color-bg-2);
  }
</style>
