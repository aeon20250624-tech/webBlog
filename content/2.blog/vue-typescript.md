---
title: vueでtypescript？あるいはOptional Chaining（短絡評価）
description: javascriptの便利な機能
navigation: true
draft: false
date: 2022-05-09
tag:
  - javascript
  - vue
---
vue-sfcのtemplate部で  
Optional Chaining  
が使えるようになっている（確認したのはvue3）。  
例えばスタッフ名を表示する場合、以下のようなコードではstaffがundefinedの時、レンダリングが中断してしまう。  
```
{{ staff.name }}  
```
なので、以下のように記述すると全体がundefinedと評価されるので、レンダリングが中断することなく完結する。  
```
{{ staff?.name }}  
```
&nbsp;  
vueでいつからtypescriptが使えるようになったのか知らないのだけど  
ちょっと考えればすぐ気が付くのに  
気づけなかった。  
あるいはjavascriptのES20XXの機能なのかもしれないが大変ありがたい。  
&nbsp;  
上述のstaffを取得するのにaxiosなどで非同期で得ようすると  
vueリアクティブで表示することになるのだけれど、  
ここで最初のレンダリング時にはまだaxiosから結果を取得していないので  
なにも対策を取らないとstaffはundefinedなわけで  
そうするとレンダリング中断は問題なくても、vueからwarinig表示が出てしまい、まぁ、スッキリしない結果となってしまう。  
なので、今まではstaffにはあらかじめ空オブジェクトで初期化していた。  
これが必要なくなるのだ！！！  
当然、axios結果取得でもstaffがundefinedだった場合でも問題ない！！  
つまりどれがオプションでどれが必須なのか気にする必要もない！！！  
&nbsp;  
ありがたい。  
&nbsp;  
vue3ではv-modelも強化され、子コンポーネントでのprops変更不可問題も緩和されているようで  
使いやすくなって来つつある。  
最近はやり？のAtomic Designもやりやすくなるはずだ  
まだcssどうすんねん？とは思いますが、、、、  
