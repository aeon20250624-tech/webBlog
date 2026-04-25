---
title: vue3のtransition
description: ページの説明
navigation: true
draft: false
date: 2025-06-30
tag:
  - vue
  - javascript
---
vue2の時に、transitionを使おうとして、よく理解できなくて使えなかった。  
なので、これも覚書として、残す。  
&nbsp;  
vue3公式ドキュメントサイトのトランジション にサンプルがあるので  
それをベースに、ボタン押下でメッセージ表示===>数秒後にメッセージ消去orボタン押下ですぐメッセージ消去  
というコードを作成した。  
動作確認は公式ドキュメントサイトの「 Playground で試す 」で行った。  
ここからいろいろなイベントで吹き出しメッセージ（保存しました！！のような）もすぐ作成できるだろう。  
まぁこの程度は、コンポーネントでいろいろ公開されているかもしれないが、  
数年前に探したときは、帯に短し襷に長し、でなにかと使いにくそうだった、、、、  
```
<script setup>
import { ref, nextTick } from 'vue'

const show = ref(false);
const showTransition = ref(false);

const onShow = () => {
  show.value = true;
  showTransition.value = true;
  nextTick(() => {
    showTransition.value = false;
  });
}

const onHide = () => {
  show.value = false;
}
</script>

<template>
  <div><button @click="onShow">Show</button></div>
  <div v-if="show">
    <Transition>
      <p v-if="showTransition">hello</p>
    </Transition>
  </div>
  <div><button @click="onHide">Hide immediately</button></div>
</template>

<style>
.v-leave-active {
  transition: opacity 0s 2s;
}

.v-leave-to {
  opacity: 0;
}
</style>
```
上記コードでは、表示後2秒後にメッセージ削除としているが、  
nextTickを使っているので場合によっては2秒以上かかるかもしれないが、  
ほとんどのケースで問題にならない気がする。  
&nbsp;  
コピペする場合はA0（ノーブレークスペース）から20（スペース）へ変換する必要があるかもしれない、、、  
&nbsp;  
2025/0715  
上記のコードは、吹き出しメッセージそのものの横に閉じるボタンをつけて  
即座にメッセージ消去したいときはうまくいかない気がする、、、、  
自分でそう書いていた、、、、  
[cssのopacity0](vee-validate-css)  