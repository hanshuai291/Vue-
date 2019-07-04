<template>
    <div class="goodslist">
        <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.sell_price}}</span>
                    <span class="old">￥{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageIndex: 1,
                goodslist: []
            }
        },
        created() {
            this.getGoodslist()
        },
        methods: {
            getGoodslist() {
                this.$http.get("http://www.liulongbin.top:3005/api/getgoods?pageindex=" + this.pageIndex)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.goodslist = this.goodslist.concat(result.body.message)
                        }
                    })
            },
            getMore() {
                this.pageIndex++;
                this.getGoodslist();
            },
            getDetail(id) {
                this.$router.push({
                    path: "/home/goodsDetail/" + id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .goodslist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 7px;

        .goodsitem {
            margin: 3px 0;
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;

            img {
                width: 100%
            }

            h1 {
                font-size: 16px
            }

            .info {

                background-color: #eee;

                p {
                    margin: 0px;
                    padding: 5px
                }

                .price {
                    .now {
                        color: red;
                        font-size: 16px;
                        font-style: bold;

                    }

                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px
                    }
                }

                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }
        }
    }
</style>