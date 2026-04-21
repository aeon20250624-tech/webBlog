---
title: vue HTML要素(checkbox)の表示非表示 v-modelは使わないと、、、
description: ページの説明
navigation: true
draft: false
date: 2019-12-04
tag:
  - javascript
  - vue
---
いくつかにグループ化したchekbox集団があって、こいつらにv-modelを使っていなかった。  
初期状態はすべてcheckなしだったし、必要な時にjqueryでchekck付きをかき集めてたから。  
んで、グループ毎に表示非表示をやっていたんだが、  
つまり表示したいcheckbox集団（配列）をv-forで一括して表示、  
非表示にする場合checkbox集団（配列）から該当グループを削除、ってやっていた  
cssでdisplay:noneとかv-showとかv-ifを使わずに。  
ところが間にあるグループを非表示にすると、  
削除したはずのグループのchek状態が他へまだ表示状態のグループへずれて設定されてしまうことに気が付いた。  
&nbsp;  
結局、v-modelでcheckboxをバインディングさせるとうまくいったが  
なるべくv-modelを使え！！ってこった  
と言うオチでした  