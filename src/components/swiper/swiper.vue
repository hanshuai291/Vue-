<template>

  <div>

    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img" alt="" :class="{'full':isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

</template>

<script>
  export default {
    props: ["lunbotuList", "isfull"]
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;
    text-align: center;

    .mint-swipe-item {
      img {
        //   width: 100%;
        height: 100%;
      }
    }
  }

  .full {
    width: 100%;
  }
</style>