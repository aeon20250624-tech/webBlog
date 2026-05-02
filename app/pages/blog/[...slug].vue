<script setup lang="ts">
import type { BlogCollectionItem, CollectionQueryGroup } from '@nuxt/content';

const route = useRoute();
const { data: article } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
);

useSeoMeta({
    title: article.value?.title,
    description: article.value?.description,
})

// 同じタグのついた記事一覧を作成する。
// タグが一つの場合
// blogs = await queryCollection("blog").where('tag', 'LIKE', `%${tag}%`).order("date", "DESC").all();
// タグなしで全部取得して、自力でfilterした方がコードがすっきりする気がする。どちらも全記事をオンメモリで処理するし。
let blogs: BlogCollectionItem[] | undefined;
if(article.value) {
    const blogsRaw = queryCollection("blog");
    if(article.value.tag.length > 0) {
        // １つ以上のタグが指定されているので、ORで連結する
        blogsRaw.orWhere(query => {
            let tmp: CollectionQueryGroup<BlogCollectionItem> | undefined;
            for (const tag of article.value!.tag) {
                tmp = (tmp ?? query).where('tag', 'LIKE', `%${tag}%`);
            }
            return tmp!;
        });
    }
    blogs =await blogsRaw.order("date", "ASC").all();
}
</script>

<template>
    <div class="hero my-hero is-large" style="background-image: url('/img/IMG_0092.jpeg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <template v-if="article">
                    <h1 class="title is-4">{{ article.title }}</h1>
                </template>
            </div>
        </div>
    </div>
    <section class="section" v-if="article">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <div class="tags" v-if="article">
                        <span v-for="tag of article.tag" class="tag">{{ tag }}</span>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <small>{{ myDateFmt(article.date) }}</small>
                    </div>
                </div>
            </div>

            <div class="columns">
                <!-- 同じタグの記事一覧 -->
                <div class="column is-3">
                    <template v-for="blog of blogs">
                        <template v-if="(blog.date !== article.date) || (blog.title !== article.title)">
                            <NuxtLink :to="blog.path">
                                <div class="card">
                                    <div class="card-content">
                                        <p class="title is-6 mb-1">{{ blog.date }}</p>
                                        <p>{{ blog.title }}</p>
                                    </div>
                                </div>
                            </NuxtLink>
                        </template>
                    </template>
                </div>
                <!-- 記事本文 -->
                <div class="column is-two-thirds">
                    <div class="content">
                        <ContentRenderer :value="article" unwrap="p"/>
                    </div>
                </div>
            </div>
        </div>
    </section>                            
    <div v-else>
        <h1>記事が見つかりませんでした</h1>
        <p>{{ route.path }}</p>
    </div>
</template>

<style>
.article-image {
    height: 20em;
}
.article-red {
    color: red;
    font-size: xx-large;
    white-space: pre;
}
</style>
