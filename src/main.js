// 入口文件
import Vue from "vue"
import app from "./App.vue"

//导入路由模块
import VueRouter from "vue-router"
// //按需导入header组件
// import {Header,Swipe,SwipeItem,Button,Lazyload} from "mint-ui"

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//挂载 VueRouter
Vue.use(VueRouter)

//导入VueResource
import VueResource from "vue-resource"

Vue.use(VueResource)

//导入Vuex
import Vuex from "vuex"

Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem("car") || '[]')
var store = new Vuex.Store({
   state: {
      car: car
   },
   mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
      //商品详情中加入购物车
      addToCar(state, goodsinfo) {

         //默认没有加入购物车
         var flag = false;

         //1. 加购物车前，先看购物车有没有这个商品，有的话更新数量
         state.car.forEach(item => {
            if (item.id == goodsinfo.id) {
               item.count += parseInt(goodsinfo.count);
               flag = true;
            }
         });
         //2. 没有的话，加入购物车
         if (flag == false) {
            state.car.push(goodsinfo);
         }

         //3. 当购物车更新完毕后，把购物车存储到本地的localStorage中
         localStorage.setItem("car", JSON.stringify(state.car))
      },
      updateGoods(state, goodsinfo) {
         state.car.some(item => {
            item.count = parseInt(goodsinfo.count)
            return true
         })

         localStorage.setItem("car", JSON.stringify(state.car))

      },
      removeFromCar(state, id) {
         state.car.some((item, i) => {
            if (item.id == id) {
               state.car.splice(i, 1); //从购物车中删除指定商品
               return true;
            }
         });
         //3. 当购物车更新完毕后，把购物车存储到本地的localStorage中
         localStorage.setItem('car', JSON.stringify(state.car));
      },
      updateGoodsSelected(state, info) {
         state.car.some(item => {
            if (item.id == info.id) {
               item.selected = info.selected
            }
            localStorage.setItem('car', JSON.stringify(state.car));

         })
      }

   },
   getters: {
      getAllCount(state) {
         var c = 0
         state.car.forEach(item => {
            c += item.count
         })
         return c
      },
      getGoodsCount(state) {
         var o = {}
         state.car.forEach(item => {
            o[item.id] = item.count
         })
         return o
      },
      getGoodsSelected(state) {
         var o = {}
         state.car.forEach(item => {
            o[item.id] = item.selected
         })
         return o
      },
      getGoodsTotal(state) {
         var o = {
            count: 0,
            tPrice: 0
         }
         state.car.forEach(item => {
            if (item.selected) {
               o.count = item.count
               o.tPrice += item.price * item.count
            }
         })
         return o
      }
   }
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)
//配置全局根目录
// Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局配置表单数据组织 格式
Vue.http.options.emulateJSON = true;


//导入router.js
import router from "./router"

//定义全局时间过滤器
import moment from "moment"

Vue.filter("dataFormat", function (dataStr, pattern = "YYYY-MM-DD HH:MM:SS") {
   return moment(dataStr).format(pattern)
})
//导入需要的css样式
import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"

// Vue.component(Header.name,Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload)

let vm = new Vue({
   el: "#app",
   render: c => c(app),
   router: router,
   store: store
})