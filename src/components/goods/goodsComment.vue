<template>
    <div>
        <commentBox :id="$route.params.id"></commentBox>
    </div>
</template>

<script>
    import commentBox from "../comment/comments.vue"
    export default {
        components: {
            commentBox
        }
    }
</script>
<style lang="scss" scoped>

</style>