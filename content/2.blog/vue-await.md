---
title: vueでasync、await、axios
description: vueでのasync-awaitの動き
navigation: true
draft: false
date: 2019-11-30
tag:
  - vue
  - javascript
---
いやぁ、半年ぐらい悩んでたことが少し解決に近づいてきた。  
vueのcreatedライフサイクルフックとかクリックイベントで  
axiosを使ってjsonデータを取得する時、  
async、await使っても非同期処理で動いてしまって困ってたんだけども  
とにかくasync、awaitで上から下までファンクションすべてを囲ってしまうと  
同期処理っぽくなることがわかった。  
&nbsp;  
完全な同期処理ではなくてあくまでそれっぽくなるだけみたいだけども  
かなり見通し良く書けるようになった。  
&nbsp;  
今までCから始まってC++，VB、PHP、Javaをやって、  
最近一年ぐらいJavaScriptでやってるんたが、  
こんな変な言語初めてだ！！！  
thisの扱いやら今回の件と良い、融通無碍と言うか、  
もうちよっとどうにかならんか！！！  