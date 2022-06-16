<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>企业信息添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container_com_mess" >
            <div class="form-box2">
                    <el-form ref="form" :model="form" label-width="auto"  :rules="rules">
                        <div class="grid-content bg-purple" align="center">
                            <el-row :gutter="20" class="mainrow">
                                <el-col :span="24" >
                                    <el-row class="demo-autocomplete" align="center" >
                                        <el-col :span="8" v-if="addcom_Infor">
                                            <div class="grid-content bg-purple" >
                                                <el-upload
                                                    class="upload-demo1"
                                                    drag
                                                    action=""
                                                    :on-preview="handlePreview"
                                                    :on-remove="handleRemove"
                                                    :before-remove="beforeRemove"
                                                    :on-change="handleChange"
                                                    :auto-upload="false"
                                                    multiple
                                                    :limit="1"
                                                    :on-exceed="handleExceed"
                                            >
                                                <i class="el-icon-upload"></i>
                                                <div class="el-upload__text">请上传企业封面或LOGO <em>点击上传</em></div>
                                                <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5mb</div>-->
                                            </el-upload>
                                            </div>
                                        </el-col>
                                        <el-col :span="8" v-if="addcom_Infor">
                                            <div class="grid-content bg-purple" >
                                                <el-upload
                                                        class="upload-demo2"
                                                        drag
                                                        action=""
                                                        :auto-upload="false"
                                                        :before-remove="beforeRemove"
                                                        multiple
                                                        :on-exceed="handleExceed"
                                                >
                                                    <i class="el-icon-upload"></i>
                                                    <div class="el-upload__text">请上传企业营业许可证 <em>点击上传</em></div>
                                                    <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5mb</div>-->
                                                </el-upload>
                                            </div>
                                        </el-col>
                                        <el-col :span="8" v-if="addcom_Infor">
                                            <div class="grid-content bg-purple" >
                                                <el-upload
                                                        class="upload-demo2"
                                                        drag
                                                        action=""
                                                        :auto-upload="false"
                                                        :before-remove="beforeRemove"
                                                        multiple
                                                        :on-exceed="handleExceed"
                                                >
                                                    <i class="el-icon-upload"></i>
                                                    <div class="el-upload__text">请上传企业详细介绍图 <em>点击上传</em></div>
                                                    <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5mb</div>-->
                                                </el-upload>
                                            </div>
                                        </el-col>
                                        <el-col :span="24" v-if="showcom_Info">
                                            <div class="grid-content bg-purple" align="center" style="height:54% ">
                                                <el-carousel indicator-position="outside" style="width:840px" height="360px">
                                                    <el-carousel-item v-for="item in 4" :key="item">
                                                        <h3>{{ item }}</h3>
                                                    </el-carousel-item>
                                                </el-carousel>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row class="demo-autocomplete">
                                        <el-col :span="24" align="center">
                                            <el-form-item label="企业名称" prop="company_name" style="width: 500px;margin-top: 10px;" v-if="addcom_Infor">
                                                <el-input v-model="form.company_name" autocomplete="off" class="company_name" size="medium" ></el-input>
                                            </el-form-item>
                                            <span v-if="showcom_Info">{{company_name}}</span>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="grid-content bg-purple">
                            <el-row :gutter="20" style="" class="mainrow">
                                <el-col :span="22" style="">
                                    <el-row class="demo-autocomplete">
                                        <el-col :span="12" align="center">
                                            <el-form-item label="人事负责人" prop="personnel_name" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.personnel_name"  v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px" >{{personnel_name}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12" align="center">
                                            <el-form-item label="企业法人" prop="business_name" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.business_name" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{business_name}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="demo-autocomplete" >
                                        <el-col :span="12" align="center">
                                            <el-form-item label="企业地址" prop="address" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.address" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{address}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="demo-autocomplete"  >
                                        <el-col :span="12" align="center">
                                            <el-form-item label="企业介绍" prop="company_introduce" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.company_introduce" style="width: 850px;font-size: 15px" type="textarea" :autosize="{minRows:3,maxRows:4}" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{company_introduce}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="grid-content bg-purple">
                            <el-row :gutter="20" style="" class="mainrow">
                                <el-col :span="22" style="">
                                    <el-row class="demo-autocomplete">
                                        <el-col :span="12" align="center">
                                            <el-form-item label="企业邮箱" prop="company_mailbox" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.company_mailbox" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{company_mailbox}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12" align="center">
                                            <el-form-item label="联系方式" prop="telephone" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.telephone" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{telephone}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row class="demo-autocomplete" >
                                        <el-col :span="12" align="center">
                                            <el-form-item label="企业类型" prop="company_type" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.company_type" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px">{{company_type}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12" align="center">
                                            <el-form-item label="所属行业" prop="industry" style="width: 500px;margin-top: 15px">
                                                <el-input v-model="form.industry" v-if="addcom_Infor"></el-input>
                                                <el-descriptions title="" v-if="showcom_Info" >
                                                    <el-descriptions-item label="" contentStyle="font-size:15px;height:32px;vertical-align: center;line-height:32px" class="12" label-style="font-size:18px;height:32px;vertical-align: center;line-height:32px" >{{industry}}</el-descriptions-item>
                                                </el-descriptions>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </div>
                        <el-form-item align="center">
                            <div v-if="showcom_Info">
                                <el-button type="primary" @click="showcom_Info =false ; addcom_Infor=true;changeinfo()" v-if="showcom_Info" style="align-content: center">修改</el-button>
                                <!--<el-button type="primary" @click="load()" v-if="showcom_Info" style="align-content: center">加载</el-button>-->
                            </div>
                            <div v-if="addcom_Infor">
                                <el-button type="primary" @click="onSubmit()" >确定</el-button>
                                <el-button style="margin-left: 150px;margin-right: 140px" @click="showcom_Info = true ; addcom_Infor=false" >取消</el-button>
                                <el-button type="info" @click="reset()" style="margin-right: 150px"  >重置</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import qs from 'qs';
    //import {addCompanyInformation} from '@/api';
    export default {
        name: 'ChangeAndShowCompanyMessage',
        data(){
            var checkcom_name = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业名称不能为空'));
                }else {
                    return callback()
                }
            };
            var checkper_name = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('人事负责人不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkbus_name = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业法人不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkaddress = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业地址不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkintroduce= (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业介绍不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkmailbox= (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业邮箱不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkphone_num = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('联系方式不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checktype = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('企业类型不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            var checkindustry = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('所属行业不能为空'));
                }else{
                    return callback()   //没有会使this.$refs[formName].validate有问题
                }
            };
            return{
                showcom_Info:true,//true
                addcom_Infor:false,//false


                company_name: '',
                personnel_name: '',
                business_name: '',
                address: '',
                company_introduce: '',
                company_mailbox: '',
                telephone: '',
                company_type: '',
                industry: '',


                form: {
                    id:'2',
                    company_account:'1',
                    company_name: '',
                    personnel_name: '',
                    business_name: '',
                    address: '',
                    company_introduce: '',
                    company_mailbox: '',
                    telephone: '',
                    company_type: '',
                    industry: ''
                },


                fileList:{
                    //name:'',
                    //url:''
                },


                rules: {
                    company_name: [
                        { validator: checkcom_name, trigger: 'blur' }
                    ],
                    personnel_name: [
                        { validator: checkper_name, trigger: 'blur' }
                    ],
                    business_name: [
                        { validator: checkbus_name, trigger: 'blur' }
                    ],
                    address: [
                        { validator: checkaddress, trigger: 'blur' }
                    ],
                    company_introduce: [
                        { validator: checkintroduce, trigger: 'blur' }
                    ],
                    company_mailbox: [
                        { validator: checkmailbox, trigger: 'blur' }
                    ],
                    telephone: [
                        { validator: checkphone_num, trigger: 'blur' }
                    ],
                    company_type: [
                        { validator: checktype, trigger: 'blur' }
                    ],
                    industry: [
                        { validator: checkindustry, trigger: 'blur' }
                    ]
                }
            }

        },
        mounted(){
            this.load()  //页面加载执行函数方法
            if(window.name == ""){
                console.log("首次被加载");
                // 在首次进入页面时我们给window.name设置一个固定值(isRefresh)
                window.name = "isRefresh";
            }else if(window.name == "isRefresh"){
                console.log("页面被刷新");
            }
            let form=this.form
            if(!form){
                console.log("111")
            }
        },
        methods:{
            //onchance触发获取文件列表
            handleChange(file, fileList) {
                this.fileList = fileList;
                //console.log(fileList)
                //this.$nextTick(function(){
                //    this.upload()  //输出：修改后的值
                //});
            },

            //上传图片数据
            upload(){
                let fd = new FormData();
                //fd.append("name",this.name);
                this.fileList.forEach(item=>{
                    fd.append("cominforFile",item.raw);
                    console.log(item.raw+'测试数据')
                    //console.log(item.raw)
                })

                axios.post('http://101.37.174.73:8901/cominfor/upload',fd).then(res=>{
                    if (res.data.code === 200) {
                        //console.log(res);
                        this.$message('上传成功')
                    }
                }).catch(error=>{
                    this.$message('图片上传失败')
                })

            },

            //提交数据
            onSubmit(){
                /*let data = JSON.stringify(this.form)
                console.log(data);*/
                this.upload()
                let form = this.form
                //let params = form
                let params = new URLSearchParams()

                params.append("id",form.id)
                params.append("companyAccount",form.company_account)
                params.append("companyName",form.company_name)
                params.append("personnelName",form.personnel_name)
                params.append("businessName",form.business_name)
                params.append("address",form.address)
                params.append("companyIntroduce",form.company_introduce)
                params.append("companyMailbox",form.company_mailbox)
                params.append("telephone",form.telephone)
                params.append("companyType",form.company_type)
                params.append("industry",form.industry)

                this.$refs.form.validate((valid) => {
                    if (valid) {
                        axios.post('http://121.41.47.200:8080/cominfor/updT?id='+form.id,
                            qs.stringify(form)  //序列化字符串
                        ).then(res=>{
                            if(res.status==200){
                                console.log("成功")
                                this.showcom_Info=true
                                this.addcom_Infor=false
                            }
                            else if (res=="error" || res.status!=200){
                                this.$message.error('网络错误，请刷新重试');
                            };
                        }).catch(error=>{
                            this.$message('网络错误，信息上传失败')
                        })
                    } else {
                        this.$message('请填写完整的信息')
                        return false
                    }
                })
            },


            //测试，读取载入数据
            load() {
                // get请求
                let form = this.form
                axios.get('http://121.41.47.200:8080/cominfor/loadTById?id='+form.id, {//101.37.174.73:8901
                }).then(res => {

                    console.log(res);

                    this.company_name = res.data.companyName
                    this.personnel_name = res.data.personnelName
                    this.business_name = res.data.businessName
                    this.address = res.data.address
                    this.company_introduce = res.data.companyIntroduce
                    this.company_mailbox = res.data.companyMailbox
                    this.telephone = res.data.telephone
                    this.company_type = res.data.companyType
                    this.industry = res.data.industry
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: '网络错误，无法加载数据，请刷新重试',
                        type: 'error'
                    });
                })



            },


            //修改企业信息

            changeinfo(){

                let form = this.form
                axios.get('http://121.41.47.200:8080/cominfor/loadTById?id='+form.id,{//101.37.174.73:8901
                    "Accept":"*/*",
                }).then(res=>{
                        this.form.company_name=res.data.companyName
                        this.form.personnel_name=res.data.personnelName
                        this.form.business_name=res.data.businessName
                        this.form.address=res.data.address
                        this.form.company_introduce=res.data.companyIntroduce
                        this.form.company_mailbox=res.data.companyMailbox
                        this.form.telephone=res.data.telephone
                        this.form.company_type=res.data.companyType
                        this.form.industry=res.data.industry
                    }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: '数据加载失败，请刷新重试',
                        type: 'error'
                    });
                })
            },


            //重置表单信息
            reset(){
                this.$refs.form.resetFields();

                //let data = JSON.stringify(this.form_add)
                //console.log(data);
            },


            //图片相关操作
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
        }
    };
</script>

<style scoped>


    .upload-demo1{

        margin-top: 10px;
        border: none
    }
    .upload-demo2 {

        margin-top: 10px;
        border: 0px;
    }


.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    /*background: #d3dce6;*/
    background: white;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
    .el-row{
        padding: 5px;
        height: 100%;

    }
    .mainrow{
        margin-bottom: 20px;

    }
    .el-form-item__label{
        width: 500px;
        margin-left: 100px;
        margin-top: 15px
    }
    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 350px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }



</style>
