<template>
    <div>
        <el-collapse-transition>
            <div v-show="show3">
                <el-row :gutter="30" class="mainrow">
                    <el-col :span="24" >
                        <el-row class="demo-autocomplete" align="center" >
                            <el-col :span="9" style="padding: 10px">
                                <el-card shadow="hover" class="mgb20" style="height:252px;">
                                    <div class="user-info" align="center">
                                        <img src="./img.jpg" class="user-avator" alt/>
                                    </div>
                                    <div class="user-info-list" align="center" style="margin-top: 30px">
                                        <!--企业： -->
                                        <span>{{companyName}}</span>
                                    </div>
                                </el-card>
                            </el-col>
                            <el-col :span="5" style="padding: 10px">
                                <el-card shadow="hover" style="height:150px;" align="center" >
                                    <div style="width: 250px;height: 3px;background-color: #528CFF;margin-bottom: 8px"></div>
                                    <div><span style="font-size: 150%">招聘岗位数量</span></div>
                                    <div  class="card-number-top" style="margin-top: 30px"><span style="font-size: 150%">{{jobnumber}}</span></div>
                                </el-card>
                            </el-col>
                            <el-col :span="5" style="padding: 10px">
                                <el-card shadow="hover" style="height:150px;" align="center" >
                                    <div style="width: 250px;height: 3px;background-color: #00CC88;margin-bottom: 8px"></div>
                                    <div><span style="font-size: 150%">今日投递人数</span></div>
                                    <div  class="card-number-top" style="margin-top: 30px"><span style="font-size: 150%;">数量</span></div>
                                </el-card>
                            </el-col>
                            <el-col :span="5" style="padding: 10px">
                                <el-card shadow="hover" style="height:150px;" align="center">
                                    <div style="width: 250px;height: 3px;background-color: #F0B887;margin-bottom: 8px"></div>
                                    <div><span style="font-size: 150%">待审核人数</span></div>
                                    <div  class="card-number-top" style="margin-top: 30px"><span style="font-size: 150%;">数量</span></div>
                                </el-card>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>
        <el-button @click="load">加载(测试)</el-button>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import axios from 'axios';
    export default {
        name: 'Com_Home',
        components: {
            Schart
        },
        mounted(){
            this.show3=true
        },
        data(){
            return{
                show3:false,
                options3: {
                    type: 'pie',
                    title: {
                        text: '服装品类销售饼状图'
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['T恤', '牛仔裤', '连衣裙', '毛衣', '七分裤', '短裙', '羽绒服'],
                    datasets: [
                        {
                            data: [334, 278, 190, 235, 260, 200, 141]
                        }
                    ]
                },

                companyName:'',
                jobnumber:'',
            }
        },
        created() {

        },
        methods:{
            load(){
                //获取岗位数量
                axios.get('http://121.41.47.200:8080/comrecruit/getTotalByPramas?ci_id=2').then(res=>{
                    if(res.status==200){
                        this.jobnumber=res.data
                    }
                })
                //根据企业id获取公司名称
                axios.get('http://121.41.47.200:8080/cominfor/loadObjectByPramas?id=2',).then(res=>{
                    if(res.status==200){
                        this.companyName=res.data.companyName
                    }
                })
            }
        }
    };
</script>

<style scoped>
    .user-avator {
        width: 20%;
        height: 20%;
        border-radius: 50%;
    }
    .schart-box {
        display: inline-block;

    }
    .schart {
        width: 100%;
        height: 100%;

    }
    .card-number-top{
        margin-top: 25px
    }
</style>
