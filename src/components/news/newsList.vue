<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <router-link :to="'/home/newsinfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>{{item.add_time | dataFormat}}</span>
                            <span>点击数：{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import Toast from "mint-ui"
    export default {
        data() {
            return {
                newsList: []
            }
        },
        created() {
            this.getNews()
        },
        methods: {
            getNews() {
                this.$http.get("http://www.liulongbin.top:3005/api/getnewslist").then(result => {
                    if (result.body.status === 0) {
                        this.newsList = result.body.message
                    } else {
                        Toast("获取新闻列表失败")
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-media-body {
        h1 {
            font-size: 14px
        }

        .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between
        }
    }
</style>