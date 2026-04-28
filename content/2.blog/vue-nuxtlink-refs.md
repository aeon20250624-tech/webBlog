---
title: nuxt-linkクリックイベントでの$refs
description: nuxt-linkイベントハンドラでrefsを使うのは無理？
navigation: true
draft: false
date: 2020-03-25
tag:
  - javascript
  - vue
---
nuxt-linkクリックイベントを拾って処理メソッド内から、  
$refsを使って子コンポーネントを参照しようとしてももう子コンポーネントはdestoryされてしまっているようだ。  
どうしても$refsを使いたい場合は、nuxt-linkにevent=""としてnuxt-link自体のクリックは無効にして  
自前のクリックイベントメソッドから$router.pushなどで自力で遷移するようにすれば$refsが使える。  