<script setup lang="ts">
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
    queryCollection('blog').path(route.path).first(),
);
</script>

<template>
    <div class="hero my-hero is-large" style="background-image: url('/img/IMG_0092.jpeg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <template v-if="data">
                    <p class="title is-4">{{ data.title }}</p>
                </template>
            </div>
        </div>
    </div>
    <section class="section" v-if="data">
        <div class="container">
            <div class="level">
                <div class="level-left">
                </div>
                <div class="level-right">
                    <div class="level-item">
                        <small>{{ myDateFmt(data.date) }}</small>
                    </div>
                </div>
            </div>
            <div class="content">
                <ContentRenderer :value="data" unwrap="p"/>
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
}
</style>
