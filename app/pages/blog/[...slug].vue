<script setup lang="ts">
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
const route = useRoute();
const { data } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first(),
);
</script>

<template>
  <main class="article">
    <article v-if="data">
      <p class="date">{{ dayjs(data.date).tz('Asia/Tokyo').format('YYYY年MM月DD日') }}</p>
      <ContentRenderer :value="data" />
    </article>
    <div v-else>
      <h1>記事が見つかりませんでした</h1>
      <p>{{ route.path }}</p>
    </div>
  </main>
</template>

<style>
.article-image {
  width: 60%;
}
.date {
  text-align: right;
  color: #555;
}
</style>
