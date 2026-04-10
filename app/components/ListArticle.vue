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
// Frontmatterがあることが前提
// 記事中の&nbsp;は削除
const getBlogContents= (src: string, length: number): string => {
    return src.split('---')[2]?.replace('&nbsp;', '').slice(0, length) ?? '';
}

// 記事最初のイメージを取得
// Frontmatterがあることが前提
const getBlogFirstImage= (src: string): string | undefined => {
    // 記事本文
    const article = src.split('---')[2];
    // (/img/ZZZZ.jpg)
    let imagePath: string | undefined = article?.split(/\n!\[.*\]/)?.[1]?.match(/^\(.*\)/)?.[0];
    imagePath = imagePath?.slice(1, imagePath.length -1)

    return imagePath;
}
</script>

<template>
    <div class="content">
        <template v-for="blog in blogs" :key="blog.path">
            <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img :src="getBlogFirstImage(blog.rawbody) ?? '/img/IMG_0056.jpeg'" alt="Image" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                            <div class="level level-is-shrinkable">
                                <div class="level-left">
                                    <NuxtLink :to="blog.path"><strong>{{ blog.title }}</strong></NuxtLink>
                                </div>
                                <div class="level-right">
                                    <small>{{ myDateFmt(blog?.date) }}</small>
                                </div>
                            </div>
                            <p>
                                {{ getBlogContents(blog.rawbody, 70) + '...' }}
                            </p>
                    </div>
                </div>
            </article>
            </div>
        </template>
    </div>
</template>

<style scoped>
.level-is-shrinkable .level-left,
.level-is-shrinkable .level-item,
.level-is-shrinkable .level-right {
  flex-shrink: 1;
}
</style>
