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
//导入router.js
import router from "./router"
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