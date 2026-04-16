---
title: vee-validate(V4系)のuseField、cssのtransitionでopacity
description: ページの説明
navigation: true
draft: false
date: 2024-06-26
tag:
  - javascript
  - vue
  - css
---
vee-validateを使い始めて、  
useFiledはバリデーションつきrefなのか？  
と気づいて実装を進めたところ、致命的なミスに気付いた。  
&nbsp;  
なんとダイナミックに個数を増やせないのだ。  
まぁ、正確には上限を10個にすることができれば  
\<script setup\>
中に作ってしまえば良いのだが、  
入力フィールドの横にプラス／マイナスボタンで増減しようとすると破綻する。  
useFiled自体がボタンクリックなどのイベントに呼応して呼べないのだ（警告がワラワラと出てくる）。  
まぁ、警告無視してもパット見、問題なさそうだが、、、これではビジネスユースでは難しいだろう。  
&nbsp;  
結局、useFieldArrayを使うしかないようだ。  
こいつにpush、insert、removeがあるからだ。  
あとはuseFieldArrayと\<Field standalone="true"\>とでなんとか対処した。  
standaloneオプションは\<Form\>を使わずに\<Field\>を使う機能のようだ。  
あとは公式ページのuseFieldArrayドキュメント冒頭にサンプルがある。  
&nbsp;  
cssのtransitionだが  
よくありがちな10秒ぐらいでメッセージが消えるというアレをtransitionで実装しようとしたところ、  
opacity:0を指定して指定秒数で消えるようにはなった。  
だが、完全に消えるまでに、メッセージ後端にバツ印ボタンをクリックすると即座に消える機能を付加しようとすると、  
イベントが起きない。  
知ってる人からすると当たり前だろ、と思うかもしれないが、なぜイベントが起きないのか理解できなかった。  
つまりイベントに関してはtransition指定がない時と同じでもうその要素のイベントは起きない。  
指定秒数で消えるだけで、opacity:0なのだ！！  