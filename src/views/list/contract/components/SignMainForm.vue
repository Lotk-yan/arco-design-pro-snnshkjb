<template>
    <div v-for="(i,j) in list" :key="j">
        <a-row gutter="80">
            <a-col span="8"><a-input/></a-col>
            <a-col span="8"><a-input/></a-col>
            <a-col span="1">
                <a-button @click="addMain">
                    <icon-plus />
                </a-button>
            </a-col>
            <a-col span="1">
                <a-button @click="delMain">
                    <icon-delete />
                </a-button>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "SignMainForm",
        methods: {
            addMain(){
                this.list.push()
            }
        }
    }
</script>

<style scoped>

</style>