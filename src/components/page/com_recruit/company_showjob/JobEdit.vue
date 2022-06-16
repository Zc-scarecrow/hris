<template>
    <div>

                <div class="form-box">
                    <el-form ref="form_recruit" :model="form_recruit" label-width="80px" :rules="rules">
                        <el-form-item label="招聘要求" prop="companyNeed">
                            <el-input v-model="form_recruit.companyNeed" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="岗位信息" prop="postInformation">
                            <el-input v-model="form_recruit.postInformation"></el-input>
                        </el-form-item>
                        <el-form-item label="职业描述" prop="jobDescription">
                            <el-input v-model="form_recruit.jobDescription"></el-input>
                        </el-form-item>
                        <el-form-item label='公司名称' prop="companyName">
                            <el-input v-model="form_recruit.companyName"></el-input>
                        </el-form-item>
                        <el-form-item label="公司介绍" prop="companyIntroduce">
                            <el-input type="textarea" v-model="form_recruit.companyIntroduce" :autosize="{minRows:3,maxRows:7}"> </el-input>
                        </el-form-item>
                        <el-form-item label="薪资待遇" prop="salary">
                            <el-input v-model="form_recruit.salary"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="telephone">
                            <el-input v-model="form_recruit.telephone"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">确认修改</el-button>
                            <el-button @click="cancelbt">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs';
    export default {
        name: 'JobEdit',

        data() {

            var checkrequire = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('招聘要求不能为空'));
                }else {
                    return callback()
                }
            };
            var checkinfomation = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('岗位信息不能为空'));
                }else {
                    return callback()
                }
            };
            var checkdescribation = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('职业描述不能为空'));
                }else {
                    return callback()
                }
            };
            var checkcom_name = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('公司名称不能为空'));
                }else {
                    return callback()
                }
            };
            var checksalary = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('薪资待遇不能为空'));
                }else {
                    return callback()
                }
            };
            var checkintroduce = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('公司介绍不能为空'));
                }else {
                    return callback()
                }
            };
            var checkphone_num = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('联系方式不能为空'));
                } else {
                    return callback()
                }
            };

            return {

                rules: {
                    companyNeed: [
                        { validator: checkrequire, trigger: 'blur' }
                    ],
                    postInformation: [
                        { validator: checkinfomation, trigger: 'blur' }
                    ],
                    jobDescription: [
                        { validator: checkdescribation, trigger: 'blur' }
                    ],
                    companyName: [
                        { validator: checkcom_name, trigger: 'blur' }
                    ],
                    companyIntroduce: [
                        { validator: checkintroduce, trigger: 'blur' }
                    ],
                    salary: [
                        { validator: checksalary, trigger: 'blur' }
                    ],
                    telephone: [
                        { validator: checkphone_num, trigger: 'blur' }
                    ]
                },

                form_recruit: {},
            };
        },

        mounted(){
            this.load_data()
        },
        watch :{
            '$route': function (to, form_recruit) {
                this.load_data();
            }
        },

        methods: {
            onSubmit() {
                let form_recruit = this.form_recruit
                this.$refs.form_recruit.validate((valid) => {
                    if (valid) {
                        axios.post('http://121.41.47.200:8080/comrecruit/updT?id=' + form_recruit.id,
                            qs.stringify(form_recruit)  //序列化字符串
                        ).then(res => {
                            if (res.status == 200) {
                                console.log("成功")
                                this.cancelbt()
                            }
                        }).catch(error => {
                            this.$message({
                                showClose: true,
                                message: '网络错误，无法修改，请刷新重试',
                                type: 'error'
                            });
                        })
                    }
                })
            },
            load_data(){
                //this.form_recruit=[]
                this.form_recruit=this.$route.query
                console.log(JSON.stringify(this.form_recruit)+'form')
            },
            cancelbt(){
                this.$router.back();
            },
            handclose(done){
                this.$router.back();
            }

        }

    };
</script>

<style scoped>

</style>
