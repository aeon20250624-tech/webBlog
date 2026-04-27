---
title: vee-validateをvue3で使う
description: 
navigation: true
draft: false
date: 2025-06-26
tag:
  - vue
  - javascript
---
ちょっと使いたいだけのなのに、  
ドキュメントが英語だったり  
ComponentsとCompositionAPI（コンポーサブル）とに分かれていて  
どっちが使いやすいのか、どういうメリット／デメリットがあるのかすぐにはよく分からない。  
&nbsp;  
どうもコンポーサブルのほうが自由度が高いようだし  
どちらというと公式ドキュメントもコンポーサブルを押しているようなので（Imperative vs Declarative）、  
こちらを使うことにした。  
どころがこちらもuserForm()だのuseField()だのあるし、  
さらにdefineField()なんてもあるので、どれを使うとよいのかハテとなった。  
なので、忘れないように、ここに覚え書きしようと思う。  
&nbsp;  
以下のコードは公式ドキュメントを以下のようにたどると出てくる。  
https://vee-validate.logaretm.com/v4/ ===> Get Started ===> Composition API ===> Custom inputs  
ここ（Building Custom inputs）編集可能サンプルの最初のサンプルソースを改変したものだ。  
変更箇所は  
- onMySubmit
- errors, validate, values, meta
- const onMySubmit = async (event)
- text
- validateOnValueUpdate: false


**App.vue**
```
<template>
  <form @submit="onMySubmit">
    <InputText name="firstName" />
    <InputText name="lastName" />
    <InputText name="email" type="email" />
    <InputText name="password" type="password" />
    <InputText name="passwordConfirm" type="password" />

    <button>Submit</button>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import InputText from './InputText.vue';

const { errors, validate, values, meta } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required().min(1),
    lastName: yup.string().required().min(2),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    passwordConfirm: yup
      .string()
      .required()
      .min(6)
      .oneOf([yup.ref('password')]),
  }),
});

const onMySubmit = async (event) => {
  event.preventDefault();
  await validate();
  console.log('onMySS meta', meta.value)
  console.log('onMySS errors', errors.value)
  console.log('onMySS values', Object.keys(values))
  console.log('onMySS values2', values)
};
</script>
```
**InputText.vue**
```
<template>
  <input v-model="value" :type="'text'" />
  <ul v-if="errors.length">
    <li v-for="error in errors">{{ error }}</li>
  </ul>
</template>

<script setup>
import { useField } from 'vee-validate';

const props = defineProps({
  name: String,
  type: String,
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errors } = useField(() => props.name, undefined, {validateOnValueUpdate: false});
</script>
```
これでSubmitボタンを押すまでバリデーションチェックは表示されないし（どうも裏でバリデーション自体は動いているようだけど）  
バリデーションが成功しても失敗してもonMySubmitが呼ばれる。  
InputText.vueのinput-typeを修正したのは、typeがemailだとブラウザのバリデーションチェックが動いてしまってやっかいだからだ。  
つまり、バリデーションチェックはvee-validateだけで行いたいのだ。  
&nbsp;  
これをベースに色々やればよさそうだが、入力項目が動的に増減する場合は、  
これではダメでuseFieldArray()を使う必要があるようだ。  
https://vee-validate.logaretm.com/v4/ ===> Get Started ===> Composition API ===> Nested Objects and Arrays ===> Field Arrays  
ここのサンプルがよさげだ。  
\<Field \/\>コンポーネントを使ったサンプルはuseFieldArray APIの説明にある。  
&nbsp;  
ちなみに編集可能なサンプルだが  
![USELESS-TOOL1](/img/o0856053915624085868.jpg){.article-image}  
この赤丸をクリックすると  
別ウィンドウが開くので、    
![USELESS-TOOL1](/img/o1748081615624085773.jpg){.article-image}  
開いた先のにこの赤丸をクリックすると  
実行環境の別ウィンドウが開くので、  
![USELESS-TOOL1](/img/o0638038915624090093.jpg){.article-image}  
赤丸を押下すると  
![USELESS-TOOL1](/img/o0628034515624094389.jpg){.article-image}  
こうなって、F12を押下してデバッグウィンドウを開けば、console.logも見れる。  
途中で自動ビルドが動かなくなったりすることがあるようだけど、  
stackblitz.comのコンソールウィンドウでnpm run devとたたけば復活する。  