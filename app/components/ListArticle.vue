<script setup lang="ts">
// 初期画面
let { data } = await useAsyncData("blogsAll", () => queryCollection("blog").limit(5).order("date", "DESC").all());
const blogs = toRef(data);

// タグが指定された時の処理
const { tagBlog: tag } = defineProps({tagBlog: String});
watch(() => tag, async (tag) => {
    blogs.value = await queryCollection("blog").where('tag', 'LIKE', `%${tag}%`).order("date", "DESC").all();
})

// 記事本文だけを抽出
// 記事中の&nbsp;は削除
const getBlogContents= (src: string) => {
    return src.split('---')[2]?.slice(0, 50).replace('&nbsp;', '');
}
</script>

<template>
    <div class="content">
        <template v-for="blog in blogs" :key="blog.path">
            <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img :src="blog.image" alt="Image" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                            <div class="level">
                                <div class="level-left">
                                    <NuxtLink :to="blog.path"><strong>{{ blog.title }}</strong></NuxtLink>
                                </div>
                                <div class="level-right">
                                    <small>{{ myDateFmt(blog?.date) }}</small>
                                </div>
                            </div>
                            <p>
                                {{ getBlogContents(blog.rawbody) }}
                            </p>
                    </div>
                </div>
            </article>
            </div>
        </template>
    </div>
</template>
