<template>
	<div class="content">
		<!-- 顶部的 header区域 -->
		<mt-header fixed title="饿了么">
			<span @click="goBack" slot="left" v-show="flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
		<!-- 中间的router-view区域 -->
		<transition>
			<router-view></router-view>
		</transition>

		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">外卖</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/discover">
				<span class="mui-icon mui-icon-eye"></span>
				<span class="mui-tab-label">发现</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/bill">
				<span class="mui-icon mui-icon-extra mui-icon-extra-order"><span class="mui-badge" id="badge">

						{{$store.getters.getAllCount}}</span></span>
				<span class="mui-tab-label">订单</span>
			</router-link>
			<router-link class="mui-tab-item1" to="/me">
				<span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				flag: false
			}
		},
		created() {
			this.flag = this.$route.path == "/home" ? false : true
		},
		methods: {
			goBack() {
				this.$router.go(-1)
			}
		},
		watch: {
			"$route.path": function (newVal) {
				if (newVal == "/home") {
					this.flag = false
				} else {
					this.flag = true
				}
			}
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		padding-top: 40px;
		overflow-x: hidden;
		padding-bottom: 50px
	}

	.v-enter {
		opacity: 0;
		transform: translateX(100%)
	}

	.v-leave-to {
		opacity: 0;
		transform: translateX(-100%);
		position: absolute;
	}

	.v-enter-active,
	.v-levate-atcive {
		transition: all .5s ease
	}

	.mui-bar-tab .mui-tab-item1.mui-active {
		color: #007aff;
	}

	.mui-bar-tab .mui-tab-item1 {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item1 .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item1 .mui-icon~.mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>