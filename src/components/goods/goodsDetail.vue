<template>
    <div class="container">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>

        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{goodsInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="class">
                        市场价：<del>￥{{goodsInfo.market_price}}</del> &nbsp;&nbsp;<span
                            class="now_price">￥{{goodsInfo.sell_price}}</span>
                    </p>
                    <p>购买数量 <number-box @getCount="getSelectedCount" :max="goodsInfo.stock_quantity"></number-box>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="toShopCar()">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsInfo.goods_no}}</p>
                    <p>库存情况：{{goodsInfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsInfo.add_time |dataFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComt(id)">商品评论</mt-button>

            </div>
        </div>
    </div>
</template>

<script>
    import swiper from "../swiper/swiper.vue"
    import numberBox from "../goods/goodsNumberBox.vue"
    export default {
        data() {
            return {
                id: this.$route.params.id,
                lunbotu: [],
                goodsInfo: [],
                ballFlag: false,
                selectedCount: 1
            }
        },
        created() {
            this.getLunbo()
            this.getGoodsInfo()
        },
        methods: {
            getLunbo() {
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        result.body.message.forEach(item => {
                            item.img = item.src
                        });
                        this.lunbotu = result.body.message
                    }
                })
            },
            getGoodsInfo(id) {
                this.$http.get("http://www.liulongbin.top:3005/api/goods/getinfo/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        this.goodsInfo = result.body.message[0]
                    }
                })
            },
            goDesc(id) {
                this.$router.push({
                    path: "/home/goodsdesc/" + this.id
                })
            },
            goComt(id) {
                this.$router.push({
                    path: "/home/goodscomment/" + this.id
                })
            },
            toShopCar() {
                this.ballFlag = !this.ballFlag;
                var shopCarInfo = {

                    "id": this.id,
                    "count": this.selectedCount,
                    "price": this.goodsInfo.sell_price,
                    "selected": true
                }
                this.$store.commit("addToCar", shopCarInfo);
            },
            beforeEnter(el) {
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done) {
                el.offsetWidth;

                // 小球动画优化思路：
                // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
                // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
                // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
                // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
                // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

                // 获取小球的 在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取 徽标 在页面中的位置
                const badgePosition = document
                    .getElementById("badge") //badge: 底部购物车数量的位置
                    .getBoundingClientRect();

                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`; //最终要移到的坐标位置
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"; //要实现的动画效果
                done();
            },
            afterEnter(el) {
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count) {
                this.selectedCount = count;
                console.log(this.selectedCount)
            }
        },
        components: {
            swiper,
            numberBox,
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background-color: #ddd;
        overflow: hidden;

        .now_price {
            color: red;
            font-size: 16px;
            font-weight: bold;
        }

        .mui-card-footer {
            display: block;

            button {
                margin: 20px 0;
            }
        }

        .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            top: 390px;
            left: 140px;
        }
    }
</style>