// 入口文件
import Vue from "vue"
import app from "./App.vue"

//按需导入header组件
import {Header} from "mint-ui"
import "./lib/mui/css/mui.css"

Vue.component(Header.name,Header)
let vm = new Vue({
    el:"#app",
    render:c=>c(app)
})