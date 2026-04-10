<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import type { BlogCollectionItem } from '@nuxt/content'

const { data: blogs } = await useAsyncData(() => queryCollection('blog').order("date", "DESC").all())
const tags: (string | string[]) = Array.from(new Set((blogs.value ?? []).map(item => item.tag).flat()));
const blogDatesMap: Map<string, BlogCollectionItem[]> = new Map();
if(blogs.value){
    // 年月日でblogをマッピングする
    for(const blog of blogs.value){
        if(!blogDatesMap.has(blog.date)) {
            blogDatesMap.set(blog.date, []);
        }
        blogDatesMap.get(blog.date)!.push(blog);
    }
} else{
    console.log('Blogs Not Found')
}

// useSeoMeta({
//     title: top.value?.title,
//     description: top.value?.description
// })

// カレンダー
// 描画が完了すると呼ばれるようだ
// 次月前月移動すると全てのセルを再作成するわけではないようなので、dayCellDidMountコールバックは使い物にならない。なので、こちら（datesSet）で処理する
const blogCal = useTemplateRef<typeof FullCalendar>('blogCal');
const onDatesSet = (arg: any) => {
    if(!blogCal.value || blogDatesMap.size === 0){
        console.log('FullCalendar or Blogs Not Found')
        return;
    }
 
    const startStr = myDateFmt(arg.start, 'YYYY-MM-DD');
    const endStr = myDateFmt(arg.end, 'YYYY-MM-DD');
    const calEl = (blogCal.value.$el as HTMLElement); // CompositionAPIで$elを使ってよいか不明

    overrule(calEl);

    // ブログのある日付の色を変える
    for(const blogDate of [...blogDatesMap.keys()]){
        if(blogDate >= startStr && blogDate < endStr) {
            const dayEl = calEl.querySelector<HTMLElement>(`.fc-daygrid-body [data-date="${blogDate}"]`);
            if(dayEl){
                dayEl.style.backgroundColor = "aqua";
            }
        }
    }
}
// 日付クリックでブログページへ遷移する
// 特定日付のFullCalendarイベント取得は自力でコーディングするしかない（filter？）ようなので、FullCalendarイベントを使う意味がない
// 結局、blogsを使えば良い
const onDateClick = async (arg: DateClickArg) => {
    if(!blogCal.value || blogDatesMap.size === 0){
        console.log('FullCalendar or Blogs Not Found')
        return;
    }
    const clkDateStr = myDateFmt(arg.date, 'YYYY-MM-DD')

    // ブログページへ遷移する
    const targets = blogDatesMap.get(clkDateStr);
    if(targets) {
        await navigateTo(targets[0]!.path); // 同じ日付の記事が複数あったら、常に先頭へ遷移
    }
};
// カレンダーの今日カラーを無効化する
const overrule = (calEl: HTMLElement) => {
    // fc-day-todayを取り除く
    const dayCell = calEl.querySelector<HTMLElement>('.fc-daygrid-body .fc-day-today');
    if(dayCell) {
        dayCell.classList.remove('fc-day-today');
    }
}
const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: jaLocale,
    timeZone: 'Asia/Tokyo',
    headerToolbar: {
        start: 'prev',
        center: 'title',
        end: 'next',
    },
    showNonCurrentDates: false,
    dayCellContent: function(arg: any) {
        return arg.date.getDate(); // 数字（1, 2, ...）のみ
    },
    contentHeight: 'auto',
    dateClick: onDateClick,
    datesSet: onDatesSet,
}

// タグ管理、現在タグ
const curTag = ref<string>();
const onTag = (ev: Event, all?: boolean) => {
    if(all) {
        curTag.value = '';
    } else {
        curTag.value = (<HTMLElement>ev.target)?.textContent;
    }
}
</script>

<template>
    <div class="hero my-hero is-large" style="background-image: url('/img/IMG_0056.jpeg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <p class="title is-4">本サイトについて</p>
                <p class="subtitle is-6">本サイトはつれづれとおぼえがきサイトです </p>
            </div>
        </div>
    </div>
    <section class="section" v-if="blogs">
        <div class="container">
            <div class="columns">
                <div class="column is-2">
                    <div class="tags">
                        <span class="tag is-hoverable" @click="onTag($event, true)">すべて</span>
                        <span v-for="tag of tags" class="tag is-hoverable" @click="onTag">{{ tag }}</span>
                    </div>
                </div>
                <div class="column is-two-thirds">
                    <ListArticle :tagBlog="curTag" :firstNum="5"/>
                </div>
            </div>
            <div class="columns is-centered">
                <div class="column is-one-third">
                    <FullCalendar :options="calendarOptions" ref="blogCal" />
                </div>
            </div>
        </div>
    </section>
</template>

<style>
.my-hero {
    background-size: cover;
    background-position: center;
}
</style>