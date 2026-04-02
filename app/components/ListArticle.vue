<script setup lang="ts">
import dayjs from 'dayjs'
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const { data: articles } = await useAsyncData("articles", () => queryCollection("blog").order("id", "DESC").all());
</script>
<template>
  <main>
    <ul v-if="articles" class="list">
      <li v-for="article in articles" :key="article.path" class="list_item">
        <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
        <span class="date">{{ dayjs(article?.date).tz('Asia/Tokyo').format('YYYY年MM月DD日') }}</span>
      </li>
    </ul>
  </main>
</template>
<style scoped>
.list {
  display: grid;
  gap: 0.5rem;
}
.date {
  font-size: 0.8rem;
  color: #555;
  margin-left: 0.75rem;
}
.list_item {
  display: flex;
  align-items: center;
  gap: 8px;
  .list_item_tag {
    font-size: 0.75rem;
    border-radius: 4px;
    border: 1px solid #000;
    padding: 2px 4px;
  }
}
</style>
