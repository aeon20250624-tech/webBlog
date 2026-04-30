---
title: FullCalendarをvueで使おうとすると、、、、
description: onMountedの時点では、useTemplateRefの戻り値がnullなのだ、、、
navigation: true
draft: false
date: 2026-04-30
tag:
  - javascript
  - vue
---
[vue公式のuseTemplateRef](https://ja.vuejs.org/api/composition-api-helpers.html#usetemplateref)の説明にあるように  
onMountedでテンプレート参照を使おうとすると、この時点ではまだnullで使えない。  
じゃぁ、いつ使えるのかというと、[datesSetハンドラー](https://fullcalendar.io/docs/datesSet)が呼び出された時点では使えるようになっている。  
もっと早い別のイベントハンドラーがあるかもしれないが、とりあえずこの時点では使える。  
なんでだろ？  
&nbsp;   
それとFullCalendarってスケジュール管理がメイン機能のようで、  
このサイトのような単純なカレンダーを表示させたいだけの場合はすごく使いづらい。  
ブログ日付とカレンダー表示をリンクさせて、日付クリックで該当の記事を表示させるだけ、だからね。  
表示上の大きさも今ぐらい（450px）が限界のようで、これ以上小さくしようとするとスクロールバーが出てくる、、、  
&nbsp;   
また、ドキュメントが非常に読みづらい、イベント説明がスケジュール管理上のイベントのことを指していたり、  
オプション、ハンドラー（プログラム上のイベントハンドラー）、メソッド、これらの一覧がない、、、、  
あっちこっちにバラバラと記述があるのだ、、、  
歴史的な理由からだろうか？  
