import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/com_home'//com_home  dashboard
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/addjob',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/com_recruit/company_addjob/AddJobMessage.vue'),
                    meta: { title: '添加招聘信息' }
                },
                {
                    path: '/com_message',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/company_introduce/ChangeAndShowCompanyMessage.vue'),
                    meta: { title: '添加信息' }
                },
                {
                    path: '/job_message_show',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/com_recruit/company_showjob/ShowJobMessage.vue'),
                    meta: { title: '招聘信息汇总' }
                },
                {
                    path: '/com_home',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/company_main/Com_Home.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/addmorecom',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/company_introduce/AddMoreCompany.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/editjob',
                    component: () => import(/* webpackChunkName: "donate" */ '../components/page/com_recruit/company_showjob/JobEdit.vue'),
                    meta: { title: '职位详细' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
