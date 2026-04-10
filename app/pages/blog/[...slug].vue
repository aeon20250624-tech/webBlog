<script setup lang="ts">
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
);
</script>

<template>
    <main class="article">
        <article v-if="data">
            <h2 class="title">{{ data.title }}</h2>
            <p class="date">{{ myDateFmt(data.date) }}</p>
            <div class="content">
                <ContentRenderer :value="data" unwrap="p"/>
            </div>
        </article>
        <div v-else>
            <h1>記事が見つかりませんでした</h1>
            <p>{{ route.path }}</p>
        </div>
    </main>
</template>

<style scoped>
.title{
    background-image:url("/img/IMG_0092.jpeg");
    background-size:100% 100%;
    text-align: center;
    height: 30vh;
    line-height: 30vh;
}
</style>
<style>
.article-image {
    width: 60%;
}
.date {
    text-align: right;
    color: #555;
}
</style>
