import VueRouter from 'vue-router'

//导入tabbar组件
import home from "./components/tabbar/home.vue"
import discover from "./components/tabbar/discover.vue"
import bill from "./components/tabbar/bill.vue"
import me from "./components/tabbar/me.vue"
import newsList from "./components/news/newsList.vue"
import newsInfo from "./components/news/newsInfo.vue"
import photolist from "./components/photo/photolist.vue"
import photoinfo from "./components/photo/photoinfo.vue"
// 3. 创建路由对象
var router = new VueRouter({
  routes: [  //匹配对应的路由规则
    //默认路由重定向至 home界面
    {path:"/",redirect:home},
    {path:"/home/newslist",component:newsList},
    {path:"/home",component:home},
    {path:"/discover",component:discover},
    {path:"/bill",component:bill},
    {path:"/me",component:me},
    {path:"/home/newsinfo/:id",component:newsInfo},
    {path:"/home/photolist",component:photolist},
    {path:"/home/photoinfo/:id",component:photoinfo}
  ],
  linkActiveClass:"mui-active" //实现覆盖路由样式
})

// 把路由对象暴露出去
export default router