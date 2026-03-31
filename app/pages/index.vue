<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('top').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <ContentRenderer v-if="home" :value="home" unwrap="p" class="has-text-centered" />
  <div v-else>Site Error</div>
</template>

<style>
.top-image {
  width: 80%;
}
</style>
