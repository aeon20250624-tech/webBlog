<script setup lang="ts">
const { data: blogs } = await useAsyncData("articles", () => queryCollection("blog").limit(5).order("date", "DESC").all());
</script>
<template>
    <div class="content">
        <template v-for="blog in blogs" :key="blog.path">
            <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src="https://bulma.io/assets/images/placeholders/128x128.png" alt="Image" />
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                efficitur sit amet massa fringilla egestas. Nullam condimentum luctus
                                turpis.
                            </p>
                    </div>
                </div>
            </article>
            </div>
        </template>
    </div>
</template>
