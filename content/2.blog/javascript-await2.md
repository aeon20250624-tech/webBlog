---
title: async、await、その２
description: javascript、async、await
navigation: true
draft: false
date: 2019-12-04
tag:
  - javascript
---
async、awaitでファンクション階層を包む話だけど、  
[ここにしっかり書いてあった](https://azu.github.io/promises-book/#await-in-async-function)  
\>Async Function内でawait式を使って処理を待っている間も、関数の外側では通常とおり処理が進みます  
やっぱりJavaScriptでは非同期処理を同期処理にすることはできないようで、、、  
&nbsp;  
async、awaitを検索すると以下のような表現がよくあるんだけど、  
大マチガイなので、真に受けないように  
&nbsp;  
\>Promiseを返す関数をawaitで呼び出すと、次の処理には移らず、  
\>Promiseに格納した実値（resolve・rejectで返される値）が確定するまで待っていてくれる。  
&nbsp;  
あくまで非同期処理は非同期処理だ！！  
同期処理っぽく記述できるだけで  
待ちゃぁしねえよっと！！  
awaitつけた関数以降のasyncラップされたコードをすっ飛ばすだけ！！  
すっ飛ばしてどうなるかと言うと、async/awaitの包みがなくなったところへ実行順序が移る  
すっ飛ばされたコードはawait付きの関数がresolveされた瞬間から実行再開される  