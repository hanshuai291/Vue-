<template>
    <div class="photoinfo">
        <h3>{{photoThing.title}}</h3>
        <div class="subtitle">
            <span>{{photoThing.add_time | dataFormat}}</span>
            <span>点击数：{{photoThing.click}}</span>
        </div>
        <hr>
        <!-- 缩略图区域 -->

        <!--     
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div> -->

        <div class="suoluetu">
            <vue-preview :slides="list"></vue-preview>
        </div>

        <div class="content" v-html="photoThing.content">
        </div>

        <!-- 评论区 -->
        <comments :id="id"></comments>
    </div>

</template>

<script>
    import comments from "../comment/comments.vue"
    export default {
        data() {
            return {
                id: this.$route.params.id,
                photoThing: {},
                list: []
            }
        },
        created() {
            this.getphotoInfo()
            this.getThumbs()
        },
        methods: {
            getphotoInfo() {
                this.$http.get("http://www.liulongbin.top:3005/api/getimageInfo/" + this.id)
                    .then(result => {
                        if (result.body.status === 0) {
                            this.photoThing = result.body.message[0]
                        }
                    })
            },

            getThumbs() {
                this.$http.get("http://www.liulongbin.top:3005/api/getthumimages/" + this.id).then(result => {
                    if (result.body.status === 0) {
                        /*
                        缩略图：
                         注意： img标签上的class不能去掉
                         注意： 每个 图片数据对象中，必须有 w 和 h 属性
                        */
                        // 循环每个图片数据，补全图片的宽和高
                        result.body.message.forEach(item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src;
                            item.alt = 'picture1'
                            item.title = 'Image Caption 1'
                            //msrc：小图像,到时候让后端传个小图像过来
                        });
                        // 把完整的数据保存到 list 中
                        this.list = result.body.message;
                    }
                });
            }
        },
        components: {
            "comments": comments
        }
    }
</script>
<style lang="scss">
    .photoinfo {
        padding: 3px;

        h3 {
            color: #26a2ff;
            font-size: 15px;
            text-align: center;
            margin: 15px 0
        }

        .subtitle {
            display: flex;
            justify-content: space-between;
            font-size: 13px
        }

        .content {
            font-size: 13px;
            line-height: 20px
        }

        .suoluetu {
            img {
                width: 60px;
                height: 80px;
                margin: 5px;
                box-shadow: 0 0 8px #999;
            }
        }
    }
</style>