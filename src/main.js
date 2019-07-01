// 入口文件
import Vue from "vue"
import app from "./App.vue"

//导入路由模块
import VueRouter from "vue-router"
//按需导入header组件
import {Header,Swipe,SwipeItem} from "mint-ui"


//挂载 VueRouter
Vue.use(VueRouter)

//导入VueResource
import VueResource from "vue-resource"

Vue.use(VueResource)
//配置全局根目录
// Vue.http.options.root = 'http://www.liulongbin.top:3005';


//导入router.js
import router from "./router"

//定义全局时间过滤器
import moment from "moment"

Vue.filter("dataFormat",function(dataStr,pattern="YYYY-MM-DD HH:MM:SS"){
   return moment(dataStr).format(pattern)
})
//导入需要的css样式
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"

Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

let vm = new Vue({
    el:"#app",
    render:c=>c(app),
    router:router
})