<script setup lang="ts">
import type { BlogCollectionItem, CollectionQueryGroup } from '@nuxt/content';

const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
);

useSeoMeta({
    title: data.value?.title,
    description: data.value?.description,
})

// 同じタグのついた記事一覧を作成する。
// タグが一つの場合
// blogs = await queryCollection("blog").where('tag', 'LIKE', `%${tag}%`).order("date", "DESC").all();
// タグなしで全部取得して、自力でfilterした方がコードがすっきりする気がする。どちらも全記事をオンメモリで処理するし。
let blogs: BlogCollectionItem[] | undefined;
if(data.value) {
    const blogsRaw = queryCollection("blog");
    if(data.value.tag.length > 0) {
        // １つ以上のタグが指定されているので、ORで連結する
        blogsRaw.orWhere(query => {
            let tmp: CollectionQueryGroup<BlogCollectionItem> | undefined;
            for (const tag of data.value!.tag) {
                tmp = (tmp ?? query).where('tag', 'LIKE', `%${tag}%`);
            }
            return tmp!;
        });
    }
    blogs =await blogsRaw.order("date", "ASC").all();
    // console.log('########Articles', blogs);
}
</script>

<template>
    <div class="hero my-hero is-large" style="background-image: url('/img/IMG_0092.jpeg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <template v-if="data">
                    <h1 class="title is-4">{{ data.title }}</h1>
                </template>
            </div>
        </div>
    </div>
    <section class="section" v-if="data">
        <div class="container">
            <div class="level">
                <div class="level-left">
                    <div class="tags" v-if="data">
                        <span v-for="tag of data.tag" class="tag">{{ tag }}</span>
                    </div>
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <small>{{ myDateFmt(data.date) }}</small>
                    </div>
                </div>
            </div>

            <div class="columns">
                <div class="column is-2">
                    <div class="tags" v-if="blogs">
                         <template v-for="blog of blogs">
                            <template v-if="(blog.date === data.date) && (blog.title === data.title)">
                                <span class="tag is-info">{{ blog.date }}</span>
                            </template>
                            <template v-else>
                                <NuxtLink :to="blog.path"><span class="tag is-hoverable">{{ blog.date }}</span></NuxtLink>
                            </template>
                         </template>
                    </div>
                </div>
                <div class="column is-two-thirds">
                    <div class="content">
                        <ContentRenderer :value="data" unwrap="p"/>
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
