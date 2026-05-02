<script setup lang="ts">
import type { BlogCollectionItem } from '@nuxt/content'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import jaLocale from '@fullcalendar/core/locales/ja'
import interactionPlugin, { type DateClickArg } from '@fullcalendar/interaction'
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ja } from "date-fns/locale"

// ストア
const currentCalDay = useDaysStore();
const storeTag = useTagStore();

// ブログ記事など
const { data: blogs } = await useAsyncData(() => queryCollection('blog').order("date", "DESC").all());
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

// DatePicker
const dtPicker = useTemplateRef<typeof VueDatePicker>('datepicker');
type PickerVal = {
  month: number;
  year: number;
};
const pickerVal = ref<PickerVal>();
const opendtPicker = () => {
    if(dtPicker.value) {
        dtPicker.value.openMenu();
    } else {
        console.log('datePicker Not Found.');
    }
};
const onDtPickerClose = () => {
    if(!pickerVal.value) {
        return;
    }
    if(blogCal.value) {
        // 選択「年月」をブログカレンダーに設定する
        const days = myDateFmt(`${pickerVal.value.year}-${pickerVal.value.month+1}-01`, 'YYYY-MM-DD');
        blogCal.value.getApi().gotoDate( days );
    } else {
        console.log('FullCalendar Not Found.');
    }
};

// カレンダー
const blogCal = useTemplateRef<typeof FullCalendar>('blogCal');
let curDay = ref<string | undefined>();
// 描画が完了すると呼ばれるようだ
// 次月前月移動すると全てのセルを再作成するわけではないようなので、dayCellDidMountコールバックは使い物にならない。なので、こちら（datesSet）で処理する
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

    // 現表示の「年月」をDatPicker、ストアに設定する
    pickerVal.value = {year: arg.start.getFullYear(), month: arg.start.getMonth()};
    currentCalDay.update( startStr );
}
// 日付クリックでカレンダーの下にタイトルを表示する。
// そのタイトルをクリックすることで街頭記事へ遷移する
const onDateClick = async (arg: DateClickArg) => {
    if(!blogCal.value || blogDatesMap.size === 0){
        console.log('FullCalendar or Blogs Not Found')
        return;
    }
    curDay.value = myDateFmt(arg.date, 'YYYY-MM-DD');
};
// カレンダーの今日カラーを無効化する
const overrule = (calEl: HTMLElement) => {
    // fc-day-todayを取り除く
    const dayCell = calEl.querySelector<HTMLElement>('.fc-daygrid-body .fc-day-today');
    if(dayCell) {
        dayCell.classList.remove('fc-day-today');
    }

    // ヘッダー「年月」部のクリックイベント
    // TODO dayHeaderDidMountコールバックへ移動する
    var titleEl = calEl.querySelector<HTMLElement>('.fc-toolbar-title');
    if (titleEl) {
        titleEl.style.cursor = 'pointer';
        titleEl.onclick = function() {
            opendtPicker();
        };
    }
}
const calendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: jaLocale,
    timeZone: 'Asia/Tokyo',
    initialDate: currentCalDay.days,
    headerToolbar: {
        start: 'prev',
        center: 'title',
        end: 'next',
    },
    showNonCurrentDates: false,
    dayCellContent: function(arg: any) {
        return arg.date.getDate(); // 数字（1, 2, ...）のみ
    },
    dateClick: onDateClick,
    datesSet: onDatesSet,
    // TODO remまたはemで設定するようにする
    contentHeight: 450,
}

// タグ管理、現在タグ
const tags: (string | string[]) = Array.from(new Set((blogs.value ?? []).map(item => item.tag).flat()));
const { tag: curTag } = storeToRefs(storeTag);
const onTag = (ev: Event, all?: boolean) => {
    if(all) {
        storeTag.update('');
    } else {
        storeTag.update((<HTMLElement>ev.target)?.textContent);
    }
}

useSeoMeta({
    title: 'トップページ',
    description: 'ブログ一覧',
})
</script>

<template>
    <client-only>
        <div class="hero my-hero is-large" style="background-image: url('/img/IMG_0056.jpeg')">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title is-4">本サイトについて</h1>
                    <p class="subtitle is-6">本サイトはつれづれとおぼえがきサイトです </p>
                </div>
            </div>
        </div>
        <section class="section" v-if="blogs">
            <div class="container">
                <div class="columns">
                    <div class="column is-3">
                        <div class="tags">
                            <span class="tag is-hoverable" @click="onTag($event, true)">すべて</span>
                            <span v-for="tag of tags" class="tag is-hoverable" @click="onTag">{{ tag }}</span>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <VueDatePicker
                                    auto-apply month-picker :locale="ja" :formats="{ input: 'yyyy-MM-dd' }" v-model="pickerVal"
                                    :ui="{ input: 'my-dp-input' }"
                                    :input-attrs="{ hideInputIcon: true, clearable: false }"
                                    @closed="onDtPickerClose" ref="datepicker"
                                />
                            </div>
                        </div>
                        <div class="columns is-centered">
                            <div class="column">
                                <div class="container-fc">
                                    <FullCalendar :options="calendarOptions" ref="blogCal" />
                                </div>
                            </div>
                        </div>
                        <div class="box" v-for="blog of blogDatesMap.get(curDay ?? '')">
                            <NuxtLink :to="blog.path"><p>{{ blog.title }}</p></NuxtLink>
                        </div>
                    </div>
                    <div class="column is-two-thirds">
                        <ListArticle :tagBlog="curTag" :firstNum="5"/>
                    </div>
                </div>
            </div>
        </section>
    </client-only>
</template>

<style scoped>
.container-fc {
    width: 16rem;
}
</style>