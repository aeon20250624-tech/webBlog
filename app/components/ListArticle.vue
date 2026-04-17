<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content';

const { tagBlog: tag, firstNum } = defineProps({
    tagBlog: String,
    firstNum: {type: Number, required: true}
});
const blogs = ref<BlogCollectionItem[]>();

const getBlogs = async () => {
    if(typeof tag !== 'string') {
        // 初期画面
        blogs.value = await queryCollection("blog").order("date", "DESC").limit(firstNum).all();
    } else {
        // タグが指定された時の処理
        blogs.value = await queryCollection("blog").where('tag', 'LIKE', `%${tag}%`).order("date", "DESC").all();
    }
}
watch(() => tag, async (tag) => {
    getBlogs();
}, { immediate: true })


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
                    <figure class="image is-128x128">
                        <img :src="getBlogFirstImage(blog.rawbody) ?? '/img/IMG_0056.jpeg'" alt="Image"/>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                            <div class="level level-is-shrinkable">
                                <div class="level-left">
                                    <div class="level-item">
                                        <NuxtLink :to="blog.path"><strong>{{ blog.title }}</strong></NuxtLink>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <div class="level-item">
                                        <small>{{ myDateFmt(blog?.date) }}</small>
                                    </div>
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

.image img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>
