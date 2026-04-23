---
title: puppeteer、clickできない、クリック反応しない
description: ページの説明
navigation: true
draft: false
date: 2022-12-15
tag:
  - javascript
  - vue
---
初めてPuppeteerを使うことになって  
少々はまったので覚書として記したい。  
&nbsp;  
puppeteerから  
const btn = page.$(セレクタ)  
で要素取得して  
await btn.click()などとやっても反応しない  
もしくはローカルでは期待通りに動くのにawsなどデプロイ時テストに失敗するという時は  
btn.evaluate(b => b.click())  
として、ブラウザ内部から実行するのが良いようだ。  
&nbsp;  
いろいろ調べてみると  
ブラウザの表示範囲から外れてると  
Puppeteerからクリックしても反応しないようだったので  
===> scrollIntoViewを使ってみる  
===> puppeteer.launchオプションでブラウザサイズを変えてみる  
などやってみたが、ローカルでは動くがデプロイ時のテストで失敗した。  
&nbsp;  
結局、前述のとおり、ブラウザ内部からclickするのが最善だと思う。  
まぁ、vueを使ってるなら、vue test utilsで十分だと思うんですけど、、、  