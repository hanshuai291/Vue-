<template>
    <div class="container">
        <div class="shoplist">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner" v-for="(item,i) in shoplist" :key="item.id">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">￥{{item.sell_price}}</span>
                                <numBox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numBox>
                                <a href="" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buy">

            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner buy1">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选件商品<span class="red">{{ $store.getters.getGoodsTotal.count}}</span> ，总价￥<span
                                    class="red">{{$store.getters.getGoodsTotal.tPrice}}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import numBox from "../shopcar/shopCarNumBox.vue"
    export default {
        data() {
            return {
                shoplist: []
            }
        },
        created() {
            this.getShops()
        },
        methods: {

            getShops() {
                //获取store中所有商品id 并用，拼接为字符串
                var idArr = []
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                });
                if (idArr.length <= 0) {
                    return
                }
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getshopcarlist/" + idArr.join(",")).then(
                    result => {
                        if (result.body.status === 0) {
                            this.shoplist = result.body.message
                        }
                    })
            },
            remove(id, index) {
                this.shoplist.splice(index, 1)
                this.$store.commit("removeFromCar", id)
            },
            selectedChanged(id, val) {
                this.$store.commit("updateGoodsSelected", {
                    id,
                    selected: val
                })
            }
        },
        components: {
            numBox
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background-color: #eee;
        overflow: hidden;

        .shoplist {
            .mui-card-content-inner {
                display: flex;
                align-items: center
            }

            img {
                width: 60px;
                height: 60px;
            }

            h1 {
                font-size: 14px;
            }

            .info {
                .price {
                    color: red;
                    font-weight: bold
                }
            }
        }

        .buy1 {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
</style>