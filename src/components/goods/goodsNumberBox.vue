<template>
	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numBox" />
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from "../../lib/mui/js/mui.js"
	export default {
		mounted() {
			mui("mui-numbox").numbox()
		},
		methods: {
			countChanged() {
				this.$emit("getCount", parseInt(this.$refs.numBox.value))
			}
		},
		props: [
			"max"
		],

		watch: {
			//监听传过来的属性max,当max传过来时 看mui文档为numbox设置最大最小值等
			max: function (newValue, oldValue) {
				mui(".mui-numbox").numbox().setOption('max', newValue)
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>