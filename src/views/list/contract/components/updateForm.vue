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
                                    :rules="[{
                        required:true,
                        message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                                    :validate-trigger="['change','input']"
                            >
                                <a-input v-model="formData.conId"></a-input>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                                    label="合同名称"
                                    field="conName"
                                    :rules="[{
                        required:true,
                        message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                            >
                                <a-input v-model="formData.conName"/>
                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                                    label="合同类型"
                                    field="conType"
                                    :rules="[{
                        required:true,
                      }]"
                            >

                                <a-select
                                        v-model = "formData.conType"
                                        :placeholder="$t('groupForm.placeholder.video.encoding.resolution')"

                                >
                                    <a-option v-for="item in typeSelectData" :key="item.key" :value="item.conType">{{item.typeName}}</a-option>
                                </a-select>

                            </a-form-item>
                        </a-col>
                    </a-row>


                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item
                                    label="开始时间"
                                    field="startDate"
                                    :rules="[{
                        required:true,
                        // message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                            ><a-date-picker v-model="formData.startDate"/></a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                                    label="结束时间"
                                    field="endDate"
                                    :rules="[{
                        required:true,
                        // message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                            ><a-date-picker v-model="formData.endDate"/></a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                                    label="签订时间"
                                    field="signDate"
                                    :rules="[{
                        required:true,
                        // message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                            ><a-date-picker v-model="formData.signDate"/></a-form-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="80">
                        <a-col :span="8">
                            <a-form-item
                                    label="状态"
                                    field="conStatus"
                                    :rules="[{
                        required:true,
                      }]"
                            >

                                <a-select
                                        v-model = "formData.conStatus"
                                        :placeholder="$t('groupForm.placeholder.video.encoding.resolution')"

                                >
                                    <a-option  v-for="item in statusSelectData" :key="item.statusName" :value="item.conStatus">{{item.statusName}}</a-option>
                                </a-select>

                            </a-form-item>
                        </a-col>
                        <a-col :span="8">
                            <a-form-item
                                    label="总价"
                                    field="totalPrice"
                                    :rules="[{
                        required:true,
                        // message: $t('stepForm.form.error.advertisingSource.required'),
                      }]"
                            ><a-input v-model="formData.totalPrice"/></a-form-item>
                        </a-col>

                    </a-row>
                </a-card>
                <a-card class="general-card">
                    <template #title>相对签约方主体</template>
                    <a-row :gutter="80" style="padding-bottom: 20px">
                        <a-col :span="8">
                            主体
                        </a-col>
                        <a-col :span="8">
                            角色
                        </a-col>
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
                                        :filter-option=true
                                        :allow-search= true
                                        :placeholder="$t('groupForm.placeholder.video.encoding.resolution')"
                                        @change="changeSelect(j)"
                                >
                                    <a-option  v-for="item in companySelectData" :key="item.id" :value="item.id">{{item.comName}}</a-option>
                                </a-select>
                            </a-col>
                            <a-col :span="8"><a-input v-model="i.conRole"/></a-col>
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
                        <a-col :span="6">
                            模板
                        </a-col>
                        <a-col :span="5">
                            付款日期
                        </a-col>
                        <a-col :span="3">
                            付款比例
                        </a-col>
                        <a-col :span="3">
                            已支付
                        </a-col>
                        <a-col :span="3">
                            金额
                        </a-col>
                        <a-col :span="3">
                            操作
                        </a-col>
                    </a-row>

                    <div v-for="(i, j) in formData.moneyList" :key="j">
                        <a-row :gutter="20" style="padding-bottom: 5px">
                            <a-col :span="6">
                                <a-select
                                        v-model = "i.modelId"
                                        :placeholder="$t('groupForm.placeholder.video.encoding.resolution')"

                                >
                                    <a-option  v-for="item in modelSelectData" :key="item.modelName" :value="item.id">{{item.modelName}}</a-option>
                                </a-select>
                            </a-col>
                            <a-col :span="5"><a-date-picker v-model="i.payTime" /></a-col>
                            <a-col :span="3"><a-input v-model="i.percent"/></a-col>
                            <a-col :span="3">
                                <a-select v-model="i.isPaid">
                                    <a-option :key=0 :value=0>是</a-option>
                                    <a-option :key=1 :value=1>否</a-option>
                                </a-select>
                            </a-col>
                            <a-col :span="3"><a-input v-model="i.payAcount"/></a-col>
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
                        <a-col :span="6">
                            细则分类
                        </a-col>
                        <a-col :span="14">
                            详情
                        </a-col>
                        <a-col :span="3">
                            操作
                        </a-col>
                    </a-row>
                    <div v-for="(i, j) in formData.itemList" :key="j">
                        <a-row :gutter="20" style="padding-bottom: 5px">
                            <a-col :span="6">
                                <a-select
                                        v-model = "i.itemType"
                                        :placeholder="$t('groupForm.placeholder.video.encoding.resolution')"

                                >
                                    <a-option  v-for="item in itemTypeSelectData" :key="item.itemType" :value="item.itemType">{{item.typeName}}</a-option>
                                </a-select>
                            </a-col>
                            <a-col :span="14">
                                <a-textarea v-model="i.itemInfo" :auto-size="{minRows:1}" placeholder="请填写备注说明，可换行输入。"/>
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
                            <a-form-item label="子合同" field="video.acquisition.frameRate"><a-input/></a-form-item>
                        </a-col>

                        <a-col :span="8">
                            <a-form-item label="往年合同" field="video.acquisition.frameRate"><a-input/></a-form-item>
                        </a-col>
                    </a-row>
                </a-card>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts" setup>

    import {ref,defineExpose,reactive} from "vue";
    import {
        selectInfoByConId, updateContractByConId
    } from "@/views/list/contract/tsutils/contractList";
    import {FormInstance} from "@arco-design/web-vue/es/form";

    /**
     * 初始化签约主体
     */
    const generateUpdateFormData = async (requestData) => {

        try {
            const params = {
                id:requestData.id
            }
            /**
             * 根据合同id查询 合同下签约主体和付费明细
             */
            const {data} = await selectInfoByConId(params)
            formData.id = requestData.id;
            formData.conId = requestData.conId;
            formData.conName = requestData.conName;
            formData.conType = requestData.conType;
            formData.startDate = requestData.startDate;
            formData.endDate = requestData.endDate;
            formData.signDate = requestData.signDate;
            formData.conStatus = requestData.conStatus;
            formData.totalPrice = requestData.totalPrice;
            if (data.mainList.length>0){
                formData.mainList = data.mainList;
            }
            if (data.moneyList.length>0){
                formData.moneyList = data.moneyList;
            }
            if (data.itemList.length>0){
                formData.itemList = data.itemList;
            }
        }
        catch (err) {

        }

    };

    const formData = reactive({
        id:undefined,
        conId: '',
        conName: '',
        conType: undefined,
        startDate: '',
        endDate: '',
        signDate: '',
        conStatus: undefined,
        totalPrice: undefined,
        mainList:[{ comId: undefined, comName: "", conRole:"" }],
        moneyList:[{ modelId:undefined,col1:"",payTime:undefined,percent:undefined,col3:"%",col4:"人民币",payAcount:undefined,col5:"元整",isPaid:1}],
        itemList:[{conId:undefined,itemType:undefined,itemInfo:""}],
    })

    const updateCon = ref<FormInstance>();
    const reset =()=> {
        updateCon.value?.resetFields()
        formData.mainList = [{ comId: undefined, comName: "", conRole:"" }];
        formData.moneyList = [{ modelId:undefined,col1:"",payTime:undefined,percent:undefined,col3:"%",col4:"人民币",payAcount:undefined,col5:"元整",isPaid:1}];
        formData.itemList = [{conId:undefined,itemType:undefined,itemInfo:""}];
    }

    defineProps({
        typeSelectData: Array,
        statusSelectData: Array,
        modelSelectData: Array,
        companySelectData: Array,
        itemTypeSelectData: Array,
    })

    const emits = defineEmits(["fetchData"])
    const update = async ()=>{
        const res = await updateCon.value?.validate();
        if (!res) {
            const params = formData;
            const {data} = await updateContractByConId(params)
            emits("fetchData")
            reset()
        }
    }

    const addMain = () => {
        const mainRecord = {comId: undefined, comName: "", conRole: ""}
        if (formData.mainList != null) {
            formData.mainList.push(mainRecord)
        }
    }
    const delMain = (j) => {
        if (formData.mainList != null && formData.mainList.length > 1) {
            formData.mainList.splice(j, 1)
        }
    }

    const addMoney = () => {
        const moneyRecord = {
            modelId: undefined,
            col1: "",
            payTime: undefined,
            percent: undefined,
            col3: "%",
            col4: "人民币",
            payAcount: undefined,
            col5: "元整",
            isPaid:1
        }
        if (formData.moneyList != null) {
            formData.moneyList.push(moneyRecord)
        }
    }
    const delMoney = (j) => {
        if (formData.moneyList != null && formData.moneyList.length > 1) {
            formData.moneyList.splice(j, 1)
        }
    }
    const addItem = () => {
        const itemRecord = {conId:undefined,itemType:undefined,itemInfo:""}
        if (formData.itemList != null) {
            formData.itemList.push(itemRecord)
        }
    }
    const delItem = (j) => {
        if (formData.itemList != null && formData.itemList.length > 1) {
            formData.itemList.splice(j, 1)
        }
    }

    defineExpose({
        generateUpdateFormData, // 初始化
        update,
        reset,
    })

</script>

<script lang="ts">
    export default {
        name: "UpdateForm"
    }
</script>

<style scoped>

</style>