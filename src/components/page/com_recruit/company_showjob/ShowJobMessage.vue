<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 招聘信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" >
            <el-row :gutter="30" class="mainrow">
                <el-col :span="24">
                    <el-row class="demo-autocomplete" align="center" >
                        <el-col :span="3" >
                            <el-button
                                    type="primary"
                                    icon="el-icon-circle-plus"
                                    class="handle-del mr10"
                                    @click="addJob"
                            >新增</el-button>
                        </el-col>
                        <el-col :span="3" >
                            <el-button type="primary" @click="loaddata()" >刷新</el-button>
                        </el-col>
                        <el-col :span="5" >
                                <el-input
                                        v-model="search"
                                        size="small"
                                        placeholder="输入关键字搜索"/>
                        </el-col>
                    </el-row>
                    <el-row class="demo-autocomplete" align="center" >
                        <el-col :span="24" >
                            <div class="grid-content bg-purple" >
                                <el-collapse-transition>
                                    <div v-show="show3">
                                        <div class="table">
                                        <el-table
                                                :data="JobTable.slice((currentPage-1)*pagesize,currentPage*pagesize).filter(data => !search || data.postInformation.toLowerCase().includes(search.toLowerCase()))"
                                                border
                                                class="JobTable"
                                                ref="multipleTable"
                                                v-loading="loading"
                                                :row-key="getKey"
                                                :expand-row-keys="expandKeys"
                                                @row-dblclick="dblclick"
                                                header-cell-class-name="table-header"
                                                :default-sort = "{prop: 'salary', order: 'descending'}"
                                                @selection-change="handleSelectionChange"
                                        >
                                            <el-table-column type="expand">
                                                <template slot-scope="props">
                                                    <el-form  label-position="left" inline class="demo-table-expand" style="border-radius: 20px">
                                                        <el-row>
                                                            <el-col :span="6">
                                                                <el-form-item label="公司：" >
                                                                    <span>{{ props.row.companyName }}</span>
                                                                </el-form-item>
                                                            </el-col>
                                                            <el-col :span="6">
                                                            <el-form-item label="工作岗位：">
                                                                <span>{{ props.row.postInformation }}</span>
                                                            </el-form-item>
                                                            </el-col>
                                                            <el-col :span="6">
                                                            <el-form-item label="薪资：">
                                                                <span>{{ props.row.salary }}</span>
                                                            </el-form-item>
                                                            </el-col>
                                                            <el-col :span="6">
                                                            <el-form-item label="电话：">
                                                                <span>{{ props.row.telephone }}</span>
                                                            </el-form-item>
                                                            </el-col>
                                                        </el-row>
                                                        <el-row>
                                                            <el-col :span="8">
                                                                <el-form-item label="职位描述：">
                                                                    <span>{{ props.row.jobDescription }}</span>
                                                                </el-form-item>
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <el-form-item label="招聘要求：">
                                                                    <span>{{ props.row.companyNeed }}</span>
                                                                </el-form-item>
                                                            </el-col>
                                                            <el-col :span="8">
                                                                <el-form-item label="公司介绍：">
                                                                    <span>{{ props.row.companyIntroduce }}</span>
                                                                </el-form-item>
                                                            </el-col>
                                                        </el-row>
                                                    </el-form>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="postInformation" label="工作岗位" align="center" width="230px"></el-table-column>
                                            <el-table-column prop="jobDescription" label="职位描述"  ></el-table-column>
                                            <el-table-column prop="salary" label="薪资" sortable align="center" width="230px"></el-table-column>
                                            <el-table-column prop="telephone" label="电话" align="center" width="160px"></el-table-column>
                                            <el-table-column prop="companyNeed" label="招聘要求" ></el-table-column>

                                            <el-table-column label="操作" width="200" align="center">

                                                <template slot-scope="scope">
                                                    <el-col :span="11">
                                                        <div style="background-color: #409EFF;border-radius: 5px">
                                                            <el-button
                                                                    type="text"
                                                                    icon="el-icon-edit"
                                                                    style="color: white"
                                                                    @click="handleEdit(scope.$index, scope.row)"
                                                            >详细</el-button>
                                                        </div>
                                                    </el-col>
                                                    <el-col :span="2"><div>&nbsp;</div></el-col>
                                                    <el-col :span="11">
                                                    <div style="background-color: #409EFF;border-radius: 5px">
                                                    <el-button
                                                            type="text"
                                                            icon="el-icon-delete"
                                                            class="red"
                                                            style="color: white"
                                                            @click="handleDelete(scope.$index, scope.row)"
                                                    >删除</el-button>
                                                    </div>
                                                    </el-col>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        </div>
                                    </div>
                                </el-collapse-transition>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <div class="yema">
                <el-pagination background
                               @size-change="handleSizeChange"
                               @current-change="handleCurrentChange"
                               :current-page="currentPage"
                               :page-size="pagesize"
                               :total="totalnum"
                               layout="total,jumper,prev, pager ,next"
                >
                </el-pagination>
            </div>
        </div>
        <!--<JobEdit ref="job"></JobEdit>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import JobEdit from './JobEdit.vue';
    export default {
        components: {JobEdit},
        name: 'ShowJobMessage',
        data(){
            return {
                search: '',
                loading:false,
                show3: false,
                currentPage:1, //起始页
                pagesize:5,//每一页的数据条数
                totalnum:0,//总数据条数

                JobTable: [{
                    companyName:null,
                    postInformation: null,
                    jobDescription: null,
                    salary:null,
                    telephone:null,
                    companyNeed:null,
                    companyIntroduce:null,
                    id:null,
                    ci_id:null
                }],

                //表格数据搜索，依据职位名称模糊搜索
                company_name_ser:'',

                //接受所需编辑数据，并传递到编辑子组件
                change_list:{},
                //接受单行里列表数据，供双击展开table事件
                expandKeys: [],
                //存放分页页数
                pagenum:[],
            }
        },
        mounted(){
            this.loading=true

        },
        created(){
            //this.loadtotalnum()
            //this.loaddata()
            this.loadpage_1()
        },


        methods:{


            //双击展开表格
            dblclick(row){
                var f=1
                for(let i=0;i<this.JobTable.length;i++){
                    if(row.id==this.expandKeys[i]){
                        f=0
                        this.expandKeys.splice(i,1)
                        break
                }
                    else{
                        f=1
                    }
                }
                /*
                if(f==0){
                    this.expandKeys.splice(n,1)
                }
                */
                if(f==1){
                    this.expandKeys.push(row.id)
                }
                /*
                    if(row.id==this.expandKeys[0]){
                        this.expandKeys=[];
                    }else {
                        this.expandKeys = []
                        this.expandKeys.push(row.id)
                    }
                */

            },

            getKey (row) {
                return row.id
            },

            addJob(){
                this.$router.replace('/addjob')
            },


            /*
            //加载总数数据条数
            loadtotalnum() {
                axios.get('http://101.37.174.73:8901/comrecruit/getTotalByPramas?ci_id=2' //+ this.ci_id
                ).then(res=>{
                    console.log(res.data)
                    this.totalnum=res.data
                })
            },
            */


            //加载第一页
            loadpage_1(){
                this.JobTable=[]
                axios.get('http://101.37.174.73:8901/comrecruit/listByPramas?page=1&limit=' + this.pagesize, { //101.37.174.73:8901
                }).then(res => {
                    this.totalnum=res.data.count
                    for (let i = 0; i < res.data.data.length; i++) {             //if(res.data[i].ci_id==2),多余
                        //JSON.stringify()
                        //this.loading=true
                        this.JobTable.push(res.data.data[i]);
                        //console.log(this.JobTable + '加载第一页')
                        this.$nextTick(() => {
                                this.show3 = true
                                this.loading=false
                            }
                        )
                    }
                    //setTimeout(() => {
                    //    this.loading = false;
                    //}, 200);
                    //this.JobTable = []
                    //this.JobTable=res.data;
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: '网络错误，无法加载表格数据，请刷新重试',
                        type: 'error'
                    });
                })
                this.pagenum.push(1)
            },
            //加载表格数据
            async loaddata(){
                var n=0
                let JobTable = this.JobTable
                //console.log(this.pagenum.length+'数量')
                for(let i=0;i<=this.pagenum.length;i++){
                    if(this.pagenum[i]==this.currentPage){
                        n=1
                        console.log('n=1')
                        break
                    }else{
                        n=2
                        console.log('n=2')
                    }
                }
                this.pagenum.push(this.currentPage)
                let pagenum = this.pagenum
                this.pagenum =  this.pagenum.filter((item,index,pagenum)=>{
                    return pagenum.indexOf(item,0) === index;
                });
                //console.log("去重后："+this.pagenum);

                var mmin,mmax,place
                for(let i=0;i<this.pagenum.length;i++) {
                    if (Math.abs(this.pagenum[i] - this.pagenum[i - 1]) == 1 || this.pagenum[i]==1)
                        mmin = this.pagenum[i];
                    else if (Math.abs(this.pagenum[i] - this.pagenum[i - 1]) > 1) {
                        mmax = this.pagenum[i];
                        place=i-1
                        break
                    }
                };
                console.log('小，大'+mmin,mmax,place)
                var newnum=mmin;
                for(let i=0;i<mmax-mmin-1;i++){
                    newnum += 1
                    //console.log('添加'+newnum,i)
                    this.pagenum.splice(place+i+1,0,newnum)
                    this.loadinone(newnum,this.pagesize)
                }
                //console.log(this.pagenum+'修改后的数组')
                if (n==2 || n==0) {

                    this.loadinone(this.currentPage,this.pagesize)

                    /*
                    await axios.get('http://101.37.174.73:8901/comrecruit/listByPramas?page=' + this.currentPage + '&limit=' + this.pagesize, { //101.37.174.73:8901
                    }).then(res => {

                        for (let i = 0; i < res.data.data.length; i++) {             //if(res.data[i].ci_id==2),多余
                            //JSON.stringify()
                            //this.loading=true
                            this.JobTable.push(res.data.data[i]);
                            console.log(this.JobTable + '测试')
                            this.$nextTick(() => {
                                    this.show3 = true
                                }
                            )
                        }
                        //setTimeout(() => {
                        //    this.loading = false;
                        //}, 200);
                        //this.JobTable = []
                        //this.JobTable=res.data;
                    }).catch(error => {
                        this.$message({
                            showClose: true,
                            message: '网络错误，无法加载表格数据，请刷新重试',
                            type: 'error'
                        });
                    })
                    */
                }


                /*
                let JobTable = this.JobTable
                axios.get('http://121.41.47.200:8080/comrecruit/loadAll?ci_id=2', { //101.37.174.73:8901
                }).then(res => {
                    this.JobTable = []
                    console.log(res)
                    for(let i=0;i<res.data.length;i++){             //if(res.data[i].ci_id==2),多余
                        //JSON.stringify()
                        this.loading=true
                        this.JobTable.push(res.data[i]);
                        this.$nextTick(()=>{
                                this.show3=true
                            }
                        )

                    }setTimeout(() => {
                        this.loading = false;
                    }, 380);
                    //this.JobTable = []
                    //this.JobTable=res.data;
                }).catch(error => {
                        this.$message({
                            showClose: true,
                            message: '网络错误，无法加载表格数据，请刷新重试',
                            type: 'error'
                        });
            })
            */
            },

            //加载单页数据函数方法
            loadinone(page,page_size){
                axios.get('http://101.37.174.73:8901/comrecruit/listByPramas?page=' + page + '&limit=' + page_size, { //101.37.174.73:8901
                }).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {             //if(res.data[i].ci_id==2),多余
                        //JSON.stringify()
                        //this.loading=true
                        this.JobTable.push(res.data.data[i]);
                        //console.log(this.JobTable + '测试')
                        this.$nextTick(() => {
                                this.show3 = true
                            }
                        )
                    }
                    //setTimeout(() => {
                    //    this.loading = false;
                    //}, 200);
                    //this.JobTable = []
                    //this.JobTable=res.data;
                }).catch(error => {
                    this.$message({
                        showClose: true,
                        message: '网络错误，无法加载表格数据，请刷新重试',
                        type: 'error'
                    });
                })

            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },

            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                        axios.get('http://121.41.47.200:8080/comrecruit/delete?id='+row.id,{
                        }).then(res => {
                            if(res.status==200){
                                this.$message.success('删除成功');
                                this.JobTable.splice(index, 1);
                            }
                        })
                    })
                   // .catch(() => {});
            },

            //编辑操作
            handleEdit(index, row){
                //this.change_list=[]
                //this.change_list=row
                //console.log(row)
                //console.log(this.change_list+'change_list')
                //this.$refs["job"].openedit();
                //this.$refs["job"].load_data();
                this.$router.push({path:'/editjob',query:row});
                //window.location.href ='/editjob'
            },

            handleSizeChange:function(pagesize){
                this.pagesize=pagesize;
                console.log(pagesize)
            },

            handleCurrentChange(val){//:function(currentPage)
                this.currentPage=val;
                //console.log(val)
                this.loaddata()
            },
        }
    };
</script>

<style scoped>
    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .bg-purple-dark {
        background: #99a9bf;
        background: white;
    }
    .bg-purple {
        /*background: #d3dce6;*/
        background: white;
    }
    .bg-purple-in{
        background: yellow;
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
    .JobTable {
        width: 100%;
        font-size: 14px;

    }
    .container{
        height: 100%;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        margin-left: 40px;
    }
    .table /deep/ .el-table .el-table__expanded-cell{
        background-color: #C0C4CC;

    }
    .table /deep/ .el-table .el-table__expanded-cell :hover{
        background-color: #C0C4CC;
        border-radius: 20px
    }
    .table /deep/ .el-table tr{
          background-color: #E4E7ED;
      }
    .table /deep/ .el-table tr:hover > td{
        background-color: #DCDFE6;
    }
    .el-table {
        border-radius: 20px;
    }
    .el-table tr > td{
        border-radius: 20px;
    }
</style>
