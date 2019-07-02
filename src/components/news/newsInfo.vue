<template>
    <div class="container">
        <h1 class="title">{{newsInfo.title}}</h1>
        <p class="subtitle">
            <span>{{newsInfo.add_time| dataFormat}}</span>
            <span>点击数：{{newsInfo.click}}</span>
        </p>

        <hr>
        <div id="content" v-html="newsInfo.content"></div>
        <div id="commnets">
            <comments :id="this.id"></comments>
        </div>
    </div>
</template>

<script>
import Toast from "mint-ui"
import comment from "../comment/comments.vue"
export default {
    data() {
        return {
            //将url传过来的id值挂载到 data上
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        getNewsInfo(){
            this.$http.get("http://www.liulongbin.top:3005/api/getnew/"+this.id).then(result=>{
                if(result.body.status===0){
                    this.newsInfo = result.body.message[0]
                }
                else{
                    // Toast("获取新闻失败")
                }
            })
        }
    },
    components:{
        "comments":comment
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 0 5px;
    .title{
        font-size: 16px;
        color: red;
        text-align: center
    }
    .subtitle{
        color: blue;
        display: flex;
        justify-content: space-between
    }
}
</style>
