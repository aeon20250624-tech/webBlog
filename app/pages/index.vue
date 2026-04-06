<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import type { BlogCollectionItem } from '@nuxt/content'

const { data: home } = await useAsyncData(() => queryCollection('top').path('/').first())
const { data: blogs } = await useAsyncData(() => queryCollection('blog').order("date", "DESC").all())
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
// console.log('Blogs', blogDatesMap)

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description
})

// カレンダー
const onCellMount = (arg: any) => {
    // 次月前月移動では全てのセルを作成するわけではないようだ、、、、以下のログにはdayCellDidMountコールバックされない日付がある。
    // console.log('AAAAA', {other: arg.isOther, date: arg.date.toLocaleDateString('ja-JP'), className: arg.el.className});

    // ブログのある日時のうち、blogdaysに日付だけを取得
    // const blogdays: number[] = [];
    // for(const blog of blogs.value ?? []){
    //     blogdays.push((new Date(blog.date)).getDate());
    // }
    // blogdaysには日付だけが入ったので、ブログのある日付の色を変える、とりあえず年月は無視
    // if(!arg.isOther && blogdays.includes(arg.date.getDate())){
    //     arg.el.style.backgroundColor = "seashell";
    // }
}
// カレンダー描画が完了すると呼ばれるようだ
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
// 特定日付のFullCalendarイベント取得は自力でコーディングするしかないようなので、FullCalendarイベントを使う意味がない
// 結局、filterするなら、blogsを使えば良い
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
// ブログのある年月日をイベントとして登録
// const makeEvents = () => {
//     if(!blogs.value){
//         console.log('blogs Not Found')
//         return;
//     }
//     type AAAAA = {
//         date: string;
//         url: string;
//         display: string;
//     };
//     const events: AAAAA[] = [];
//     for(const blog of blogs.value){
//         if(blog.date) {
//             events.push(
//                 {
//                     date: blog.date,    // TODO dateだけでよいか？ endは設定なし？
//                     url: blog.path,
//                     display: 'none',
//                 }
//             );
//         }
//     }
//     return events;
// }

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
            <FullCalendar :options="calendarOptions" ref="blogCal" v-if="home && blogs" />
        </div>
    </div>
</template>

<style>
.top-image {
    width: 80%;
}
.fc .fc-day-today {
    background-color: transparent !important;
}
</style>