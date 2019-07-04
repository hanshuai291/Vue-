<template>
  <div>

    <!-- 轮播图区域 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
    <!-- 菜单图标 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="../images/menu1.png" alt="">
          <div class="mui-media-body">News</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../images/menu2.png" alt="">
          <div class="mui-media-body">Pictures</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../images/menu3.png" alt="">
          <div class="mui-media-body">Shops</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../images/menu4.png" alt="">
          <div class="mui-media-body">Comments</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../images/menu5.png" alt="">
          <div class="mui-media-body">Videos</div>
        </a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../images/menu6.png" alt="">
          <div class="mui-media-body">About Us</div>
        </a></li>
    </ul>
  </div>
</template>

<script>
  import {
    Toast
  } from "mint-ui";
  import swiper from "../swiper/swiper.vue"
  export default {
    data() {
      return {
        lunbotuList: [] // 保存轮播图的数组
      };
    },
    created() {
      this.getLunbotu();
    },
    methods: {
      getLunbotu() {
        // 获取轮播图数据的方法
        this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(result => {
          // console.log(result.body);
          if (result.body.status === 0) {
            // 成功了
            this.lunbotuList = result.body.message;
          } else {
            // 失败的
            Toast("加载轮播图失败。。。");
          }
        });
      }
    },
    components: {
      swiper
    }
  };
</script>

<style lang="scss" scoped>
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;

    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>