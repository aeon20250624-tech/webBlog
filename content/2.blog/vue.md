---
title: vue覚書
description: ページの説明
navigation: true
draft: false
date: 2025-09-05
tag:
  - javascript
  - vue
---
**ソースコード 解説（chivivue）**  
https://book.chibivue.land/ja/00-introduction/030-vue-core-components.html  
&nbsp;  
https://book.chibivue.land/ja/10-minimum-example/015-package-architecture.html  
DI、久々に聞いた、こういうことだったのか。  
&nbsp;  
https://book.chibivue.land/ja/10-minimum-example/035-try-implementing-a-minimum-reactivity-system.html  
ReactiveEffectはObserverパターン  
[chibivueリアクティブ実装](https://drive.google.com/file/d/1XHEu7Qealj2JJdHv7mdaNcTQ4gfnjmLE/view?usp=sharing)  
&nbsp;   
**DevTools**  
https://github.com/vuejs/devtools/discussions/654  
&nbsp;  
**省略形**  
v-bind===>:  
v-on===>@  
&nbsp;  
**スロット**  
![slot](/img/スロット１.jpg){.article-image}  
&nbsp;  
![namedslot](/img/スロット２.名前付き.jpg){.article-image}  
&nbsp;  
![slotwithscope](/img/スロット３.スコープ付き.jpg){.article-image}  
&nbsp;  
![namedslotwithscope](/img/スロット３.名前スコープ付き.jpg){.article-image}  
&nbsp;  
![render-slot](/img/レンダー関数.スロット$slot.jpg){.article-image}  
親で指定されたheaderスロットが子コンポーネント（blog-post）のrenderプロパティへレンダー関数として渡されている。  
createElementはvnodeを生成する  
&nbsp;  
**仮想DOM、レンダー関数、レンダラー**  
仮想DOM、virtual DOM、vnodeの集合体？、このvnodeの生成にレンダー関数h()を使う  
```
const vnode = {
  type: 'div',
  props: {
    id: 'hello'
  },
  children: [
    /* 多くの vnode */
  ]
}
```
&nbsp;  
Here, vnode is a plain JavaScript object (a "virtual node") representing a <div> element.  
It contains all the information that we need to create the actual element.  
It also contains more children vnodes, which makes it the root of a virtual DOM tree.  
&nbsp;  
レンダー関数、render functions  
仮想DOMを生成する関数  
vueテンプレート（ほとんどの場合SFC）はレンダー関数に変換される。（ほとんどの場合ビルド時に）  
Vue templates are compiled into render functions: functions that return virtual DOM trees.  
&nbsp;  
レンダー関数、render functions、h()の使用法  
```
import { h } from 'vue'
const vnode = h(
  'div', // type
  { id: 'foo', class: 'bar' }, // props
  [
    /* children */
  ]
)
// 完全なシグネチャー
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode
type Children = string | number | boolean | VNode | null | Children[]
type Slot = () => Children
type Slots = { [name: string]: Slot }
```
結果、vnodeは以下のようになる。
```
const vnode = h('div', { id: 'foo' }, [])
vnode.type // 'div'
vnode.props // { id: 'foo' }
vnode.children // []
vnode.key // null
```
&nbsp;  
レンダラー、runtime renderer、realなDOMの生成  
A runtime renderer can walk a virtual DOM tree and construct a real DOM tree from it.  
This process is called mount.  
&nbsp;  
If we have two copies of virtual DOM trees,  
the renderer can also walk and compare the two trees, figuring out the differences,  
and apply those changes to the actual DOM.  
This process is called patch, also known as "diffing" or "reconciliation".  
&nbsp;  
mount、マウント、runtime rendererが行う、actual DOMの生成  
The runtime renderer invokes the render functions, walks the returned virtual DOM tree,  
and creates actual DOM nodes based on it.  
&nbsp;  
**vuejs、出だし**  
コンポーネント定義、コンポーネントオプション  
ルートコンポネントの場合、createAppの引数になる（Appも出力する、続くmountでレンダリング開始）。   
setup  
初期化（リアクティブ変数など）  
レンダー関数（renderオプションと同じ）をreturn  
render  
レンダー関数  
h関数コールツリー  
それぞれh関数を呼び出して、vnodeツリー作成  
props  
コンポーネントに渡される値  
```
props: {
    title: String,
    likes: Number,
    author: {
    type: String,
    required: true
    },
}
```
vuejs出だし  
1.app = createApp(),runtime-dom/index.ts  
createRenderer,createAppAPI,_createApp  
2.app.mount2(selector) :: selector:string ==> '#appid'  
el = querySelector(selector)  
app.mount1( el ) // 引数はコンテナー（'id=app'html要素）だけ  
3.app.mount1  
レンダラー（render）呼び出し  
レンダラー（render）は作成済  
runtime-dom/index.tsでcreateRenderer()がコール済なので  
レンダラー（render、createRenderer()で作成済）  
ルートコンポーネントのレンダリング、入口  
引数はルートコンポーネントのオプションとmount1の引数（コンテナー）  
&nbsp;  
引数のコンポーネントオプションでcreateVNode呼び出し  
patchコール  
&nbsp;  
createVNode  
h関数から呼ばれる  
VNode作成  
```
interface VNode<HostNode = any> {
type: VNodeTypes
props: VNodeProps | null
children: VNodeNormalizedChildren
el: HostNode | undefined
component: ComponentInternalInstance | null
}
type VNodeTypes = string | typeof Text | object
```
objectの場合、このVNode.typeはコンポーネントオプション  
&nbsp;  
patch  
最初は必ずVNode.typeがobjectなのでmountComponentをコール  
VNode.typeにはコンポーネントオプションが入っている  
```
{ setup: () => {,,,,,} }
```
&nbsp;  
mountComponent  
Componentインスタンスを生成、VNode.componentセーブ  
createComponentInstance  
コンポーネントオプションのsetupをコール  
戻り値のレンダー関数（h関数）コール関数をsetupリアクティブオブザーバーへ  
&nbsp;  
setupリアクティブオブザーバー  
引数はレンダー関数（h関数）コール関数  
リアクティブオブザーバー生成（ReactiveEffect）  
最初のupdate()  
リアクティブオブザーバーのrun実行  
最初のvnode生成（ componentUpdateFnのnormalizeVNode(render()) ）  
このvnodeでpatch実行  
&nbsp;  
**コンポーネント対応**  
コンポーネント指向に改造  
0.interface VNodeのtypeの型にobjectを追加（コンポーネント）  
1.h関数の引数（type)、createVnode（type)の引数にコンポーネントを指定可能にする。  
2.レンダラー（patch以下でレンダリング）がコンポーネントを受け付けるようにする  
3.また、レンダラー先頭でcreateVnode呼び出し  
4.mountComponentでコンポーネントをインスタンス化して、それをvnodeへ保持 ===> {,,,, componento: ComponentInternalInstance }  
5,コンポーネントのsetup呼び出し  
&nbsp;  
**コンポーザブル （composable）**  
\<script setup\> か setup() フックの中で呼び出さなければいけません。  
また、コンテキスト内で同期的に呼び出す必要があります。  
Composables should only be called in \<script setup\> or the setup() hook.  
They should also be called synchronously in these contexts.  
&nbsp;  
なので、パラメータを変えて何度も呼び出したい、onMountedで使いたい、  
このような時は「リアクティブな状態を受け取る 」ことで対処する。  
===>watch系を使う。  
https://vuejs.org/guide/reusability/composables.html#accepting-reactive-state  
