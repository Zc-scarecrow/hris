<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form_recruit" :model="form_recruit" label-width="80px" :rules="rules">
                    <el-form-item label="招聘要求" prop="company_need">
                        <el-input v-model="form_recruit.company_need" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位信息" prop="post_information">
                        <el-input v-model="form_recruit.post_information"></el-input>
                    </el-form-item>
                    <el-form-item label="职业描述" prop="job_description">
                        <el-input v-model="form_recruit.job_description"></el-input>
                    </el-form-item>
                    <el-form-item label='公司名称' prop="company_name">
                        <el-input v-model="form_recruit.company_name"></el-input>
                    </el-form-item>
                    <el-form-item label="公司介绍" prop="company_introduce">
                    <el-input type="textarea" v-model="form_recruit.company_introduce" :autosize="{minRows:2,maxRows:7}"> </el-input>
                    </el-form-item>
                    <el-form-item label="薪资待遇" prop="salary">
                        <el-input v-model="form_recruit.salary"></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式" prop="telephone">
                        <el-input v-model="form_recruit.telephone"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">发布</el-button>
                        <el-button @click="cancle">取消</el-button>
                        <el-button v-on:click="reset">重置</el-button>
                        <el-button v-on:click="test()">刷新</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import { Loading } from 'element-ui';

    export default {
        name: 'AddJobMessage',
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
                }else {
                    return callback()
                }
            };
            return {

                fullscreenLoading: false,

                form_recruit: {
                    company_need:'',
                    post_information:'',
                    job_description:'',
                    company_name:'',
                    company_introduce:'',
                    salary:'',
                    telephone:'',
                    id:'',
                    ci_id:'2'
                },
                rules: {
                    company_need: [
                        { validator: checkrequire, trigger: 'blur' }
                    ],
                    post_information: [
                        { validator: checkinfomation, trigger: 'blur' }
                    ],
                    job_description: [
                        { validator: checkdescribation, trigger: 'blur' }
                    ],
                    company_name: [
                        { validator: checkcom_name, trigger: 'blur' }
                    ],
                    company_introduce: [
                        { validator: checkintroduce, trigger: 'blur' }
                    ],
                    salary: [
                        { validator: checksalary, trigger: 'blur' }
                    ],
                    telephone: [
                        { validator: checkphone_num, trigger: 'blur' }
                    ]
                }
            };
        },
        mounted(){

        },
        created(){
            this.test()
        },
        methods:{
            update(){
                location.reload()
            },
            onSubmit(){
                //let data = JSON.stringify(this.form_add)
                //console.log(data);


                let form_recruit = this.form_recruit
                let params =new URLSearchParams()
                params.append("companyNeed",form_recruit.company_need)
                params.append("postInformation",form_recruit.post_information)
                params.append("jobDescription",form_recruit.job_description)
                params.append("companyName",form_recruit.company_name)
                params.append("companyIntroduce",form_recruit.company_introduce)
                params.append("salary",form_recruit.salary)
                params.append("telephone",form_recruit.telephone)
                params.append("id",form_recruit.id)
                params.append("ci_id",form_recruit.ci_id)

                this.$refs.form_recruit.validate((valid) => {
                    if (valid) {
                        this.test()
                        axios.post('http://121.41.47.200:8080/comrecruit/saveT', params
                        ).then(res => {
                            if (res.status === 200) {
                                console.log(res.data)
                                this.$alert('招聘信息发布成功', '', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                        this.fullscreenLoading = true
                                        //this.update()
                                        this.reset()
                                        setTimeout(() => {
                                            this.fullscreenLoading = false;
                                        }, 300);
                                        this.$message({
                                            type: 'info',
                                            message: `action: ${ action }`
                                        });
                                    }
                                })
                            }
                            }).catch(error=>{
                            this.$message({
                                showClose: true,
                                message: '网络错误，信息发布失败',
                                type: 'error'
                            });
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '验证失败，信息发布失败，请重新填写',
                            type: 'error'
                        });
                        return false
                    }})
            },
            reset:function(){
                this.$refs.form_recruit.resetFields();
                //let data = JSON.stringify(this.form_add)
                //console.log(data);

            },

            //分配岗位唯一ID
            async test(){
                    var m=0;
                    for (let i = 0; i <= 500; i++) {
                        await axios.get('http://121.41.47.200:8080/comrecruit/loadObjectByPramas?id=' + i, {
                            timeout: 10000//101.37.174.73:8901
                        }).then(res => {
                            if (res.data == '') {
                                this.form_recruit.id = i;
                                m = 1
                                console.log("成功修改" + this.form_recruit.ci_id);
                            }
                            //this.ci_id = res.data.ci_id
                        }).catch(error=>{
                            this.$message({
                                showClose: true,
                                message: '网络错误，无法分配正确的ID，请刷新重试',
                                type: 'error'
                            });
                            setTimeout(()=>{
                                this.reload();
                            },1000)
                        })
                        if (m == 1) break
                    }
            },
            cancle(){
                this.$router.replace('/job_message_show')
            }
        }
    }
</script>

<style scoped>

</style>
