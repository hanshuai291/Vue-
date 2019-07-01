<template>
  <div class="content">
    <!-- 顶部的 header区域 -->
	<mt-header fixed title="饿了么"></mt-header>
	<!-- 中间的router-view区域 -->
	<transition>
		<router-view></router-view>
	</transition>

    		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">外卖</span>
			</router-link>
			<router-link class="mui-tab-item" to="/discover">
				<span class="mui-icon mui-icon-eye"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item" to="/bill">
				<span class="mui-icon mui-icon-extra mui-icon-extra-order"></span>
				<span class="mui-tab-label">订单</span>
			</router-link>
			<router-link class="mui-tab-item" to="/me">
				<span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.content{
  padding-top: 40px;
  overflow-x: hidden;
  padding-bottom: 50px
}
.v-enter{
	opacity: 0;
	transform: translateX(100%)
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}

.v-enter-active,
.v-levate-atcive{
	transition: all .5s ease
}
</style>
