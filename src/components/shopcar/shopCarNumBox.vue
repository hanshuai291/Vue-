<template>
    <div class="mui-numbox" data-numbox-min='1' style="height:25px">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numBox"
            readonly />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
    import mui from "../../lib/mui/js/mui.js"
    export default {
        mounted() {
            mui(".mui-numbox").numbox()
        },
        methods: {
            countChanged() {
                this.$store.commit("updateGoods", {
                    id: this.goodsid,
                    count: this.$refs.numBox.value
                })
            }
        },
        props: [
            "initcount", "goodsid"
        ]
    }
</script>

<style lang="scss" scoped>

</style>