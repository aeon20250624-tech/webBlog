<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('top').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})

import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  locale: jaLocale,
  headerToolbar: {
    start: '',
    center: 'title',
    end: 'today prev,next',
  },
  contentHeight: 'auto',
}
</script>

<template>
  <ContentRenderer v-if="home" :value="home" unwrap="p" class="has-text-centered" />
  <div v-else>Site Error</div>
  <div class="columns is-centered">
    <div class="column is-two-thirds">
      <ListArticle v-if="home" />
    </div>
  </div>

  <div class="columns is-centered">
    <div class="column is-two-thirds">
      <FullCalendar :options="calendarOptions" v-if="home" />
    </div>
  </div>
</template>

<style>
.top-image {
  width: 80%;
}
</style>
