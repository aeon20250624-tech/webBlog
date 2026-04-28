---
title: ReactJS、ことはじめ
description: ReactJS覚書
navigation: true
draft: false
date: 2025-10-27
tag:
  - javascript
  - react
---
[Reactの流儀](https://ja.react.dev/learn/thinking-in-react)  
&nbsp;  
ステップ 1：UI をコンポーネントの階層に分割する  
```
 React におけるコンポーネントとは、マークアップを返す JavaScript 関数です。
 React のコンポーネント名は常に大文字で始める必要があり、HTML タグは小文字でなければなりません。
 JSX は HTML より構文が厳格です。
 コンポーネントは複数の JSX タグを return することはできません。
 空の <>...</> ラッパのような共通の親要素で囲む必要があります。
 function AboutPage() {
 return (
 <>

                    <h1>About</h1>
 <p>Hello there.<br />How do you do?</p>
 </>
 );
 }
```
ステップ 2: React で静的なバージョンを作成する  
```
子コンポーネントにはprops
```
ステップ 3：UI の状態を最小限かつ完全に表現する方法を見つける  
```
stateすべきものを見つける
時間が経っても変わらないものですか？ 
===>そうであれば、state ではありません。
親から props 経由で渡されるものですか？
===>そうであれば、state ではありません。
既存の state や props に基づいて計算可能なデータですか？
===>そうであれば、それは絶対に state ではありません！
```
ステップ 4：state を保持すべき場所を特定する  
```
state を所有するコンポーネントを特定する
stateに基づいて何かをレンダーするすべてのコンポーネントを特定する。
階層内でそれらすべての上に位置する、最も近い共通の親コンポーネントを見つける。
state がどこにあるべきかを決定する：
多くの場合、state をその共通の親に直接置くことができる。
state を、その共通の親のさらに上にあるコンポーネントに置くこともできる。
state を所有するのに適切なコンポーネントが見つからない場合は、state
を保持するためだけの新しいコンポーネントを作成し、共通の親コンポーネントの階層の上のどこかに追加する。
```
ステップ 5：逆方向のデータフローを追加する  
```
Reactでは単方向データフロー、つまり親から子コンポーネントへと階層を下る形でのみデータが渡される。
propsとstateにより階層構造の下方向に向かって流れ適切に表示が行われるが、
ユーザの入力に従ってstateを変更する時には、逆方向へのデータの流れをサポートする必要がある

    例えば子コンポーネントのonChangeXXXXなどで値を親へ渡すには、onChangeXXXXイベントハンドラを、親から子コンポーネントへ渡す
イベントハンドラに渡す関数は、渡すべきなのであって、呼び出すべきではありません。
例えば：

関数を渡す（正しい）
<button onClick={handleClick}>
関数を呼び出す（誤り）
<button onClick={handleClick()}>
微妙に違いますね。最初の例では、handleClick 関数が onClick
イベントハンドラとして渡されています。
これは、React
にこの関数を覚えておいて、ユーザがボタンをクリックしたときにのみコールするように指示します。
2 つ目の例では、handleClick() の末尾に ()
があるため、クリックを必要とせずレンダーの際にすぐに関数を実行します。
これは、JSX の { と }の中の JavaScript はすぐに実行されるためです。
インラインでコードを書くときにも、以下のように同様の落とし穴が別の形で現れます。 関数を渡す（正しい）
<button onClick={() =>
alert('...')}>

関数を呼び出す（間違い） 
<button
onClick={alert('...')}> 
上記のインラインコードを渡すと、クリックしたときではなく、コンポーネントがレンダーされるたびに実行されます。
イベントハンドラをインラインで定義したい場合は、以下のように無名関数でラップしてください。
<button onClick={() => alert('You clicked
me!')}> これで、レンダーごとに中のコードが実行されるのではなく、後で呼び出されるべき関数を作成したことになります。 どちらの場合であっても、渡したいのは関数です。 <button
onClick={handleClick}> は handleClick 関数を渡します。 <button onClick={() => alert('...')}> は、() =>
alert('...') という関数を渡します。 
```
リアクティブ  
```
useState

C言語のstatic変数に近い動作（関数が何度走っても一度しか初期化されない）
setXXXXはレンダーをトリガします。
つまりsetXXXXを実行したコンポーネントを再描画する
ただし、子コンポーネントはkeyが指定されていないと描画されないことがある？？？
import { useState } from 'react';
export default function Counter() { const [count, setCount] = useState(0);
function handleClick() { setCount(count + 1); } return ( <button onClick={handleClick}> You
pressed me {count} times </button> ); } 
```
コンポーネントpropsのkey  
```
 export default function ProfilePage({ userId }) {
   return (
     <Profile
       userId={userId}
       key={userId}
     />
   );
 }

 function Profile({ userId }) {
   // This and any other state below will reset on key change automatically
   const [comment, setComment] = useState('');
   // ...
 }

コンポーネントのkeyとして渡されたprops（userId）が変更されるたびに、
 ReactはDOMを再作成し、Profile コンポーネントと
 そのすべての子コンポーネントの state をリセットする
 ＜＜＜注意＞＞＞
    https://qiita.com/yokoto/items/ee3ed0b3ca905b9016d3
 コンポーネントの props が変更されると再レンダリングが発生する
 これは事実ではありません。
 keyも必要
 keyに配列などオブジェクトも可。
    ただし、指定する場合はtoString()で文字列化結果が変化するのを要確認
    また、自分自身も再描画しないと、子コンポーネントへのprops自体が変更値にならない。
```
useMemo、useCallbackなどでキャッシュ化  
```
重たい計算処理など再計算を避ける（vuejs-computedに近い？）
再描画抑止とは異なる？
イミュータブルなロジック（関数化？）
```
useEffect
```
useEffectのeffectは副作用 (side effect)のことである。
なので、外部通信を行う場合、これを使う。
エフェクトは通常、Reactのコードから「踏み出して」、何らかの外部システムと同期するために使用されるものだ
レンダーコードとは、コンポーネントのトップレベルにあるものです。
ここは、propsやstateを受け取り、それらを変換し、画面に表示したいJSXを返す場所です。
レンダーコードは純粋でなければなりません。
数学の式のように結果を計算するだけで、他のことは行わないようにする必要があります。
レンダリングの後にトリガーされるフック。
レンダー自体によって引き起こされる副作用を指定するためのものです。
状態操作を行うと、別のレンダリングがトリガーされ、
パフォーマンスの問題につながる可能性があり
    コンポーネントがレンダーされるたびに、Reactは画面（DOM）を更新し、その後、依存配列に従ってuseEffect内のコードを実行するので。
 useEffect(() => { // 毎回のレンダー後に実行される }); useEffect(() => { //
    マウント時（コンポーネント出現時）のみ実行される }, []); useEffect(() => { // マウント時と、a か b の値が前回のレンダーより変わった場合に実行される },
    [a, b]); 
```
[更新用関数](https://ja.react.dev/reference/react/useState#updating-state-based-on-the-previous-state)  
```
export default function Counter() {
 const [age, setAge] = useState(42);

 function increment() {
 setAge(age + 1);
 }

 return (
 <>
 <h1>Your age: {age}</h1>
 <button onClick={() => {
 increment();
 increment();
 increment();
 }}>+3</button>
 <button onClick={() => {
 increment();
 }}>+1</button>
 </>
 );
 }
 「+3」ボタンを押下しても42から45にはならない。
 
                    increment();increment();increment();は
  setAge(age + 1)を3回呼び出す。
  上記は
  setAge(42 + 1);setAge(42 + 1);setAge(42 + 1)
  と同じだから。
```
[ペンディング中だからか？？？](https://ja.react.dev/learn/queueing-a-series-of-state-updates#react-batches-state-updates)  
[スナップショット](https://ja.react.dev/learn/state-as-a-snapshot#rendering-takes-a-snapshot-in-time)  
以下のようにsetAgeに更新用関数を渡すと意図した通り、ひとつ前のsetAgeで更新された値が使われる。  
```
    setAge(age + 1); ===> setAge((age) => age + 1);
```
Reactは更新用関数をキューに入れます。そして、次のレンダー中に、同じ順番で更新用関数を呼び出します。  
[または更新後の値を別の変数に代入](https://ja.react.dev/reference/react/useState#ive-updated-the-state-but-logging-gives-me-the-old-value)してそれをsetAgeに渡す  
&nbsp;  
状態管理
```
ReduxまたはReact Context
vueのstoreようなものか？
```
トラブルシューティング  
html要素のreadonlyを指定したときは、readOnly={true} のようにする  
ほかでもないか、ReactAPIレファレンスのコンポーネントなどを参照する  
[Reactレファレンス](https://ja.react.dev/reference/react-dom/components/input#my-text-input-doesnt-update-when-i-type-into-it)  
htmlのclass属性はclassNameと記述  
&nbsp;  
JSXの基本  
```
リターンできるのは単一のルート要素

                    フラグメント<></>で挟んで単一にすることも可能
 すべてのタグは閉じる
 <br></br>

                    ほぼキャメルケースで記述（先頭を除いて単語の切れ目を大文字にする）
 aria-* と data-*は例外
 JSX は JavaScript に変換され、中に書かれた属性は
                        JavaScript オブジェクトのキーになる
 class は予約語なので、React では className
 styleに指定するcssプロパティも
 background-color
 backgroundColor
 波かっこ（{}）
 javascriptを記述
 alt="Gregorio Y. Zara"
 ではなく
 const description = 'Gregorio Y. Zara';
 alt={description}
 style属性にもオブジェクト渡しが使える
 style={{
 backgroundColor: 'black',
 color: 'pink'
 }}
 false、null、undefiend
 
                React は、JSX ツリーの「穴」と見なし、何もレンダーしません。
```
コンポーネントプロパティ
```
children
vuejsのスロットに近い？

親（Profile）がレンダリングコンテンツ（Avatar）を渡して、子（Card）がレンダリング位置や周囲のデザインを決定する。
 <Card>
   <Avatar />
 </Card>
 このように JSX タグ内でコンテンツをネストした場合、親側のコンポーネントはその中身を children という props
                として受け取ります。
 例えば以下の Card コンポーネントは、<Avatar /> がセットされた children プロパティを受け取って、ラッパ div
                要素の内部にそれをレンダーしています。
 function Card({ children }) {
   return (
     <div className="card">
       {children}
     </div>
   );
 }
 export default function Profile() {
   return (
     <Card>
       <Avatar
         size={100}
         person={{ 
           name: 'Katsuko Saruhashi',
           imageId: 'YfeOqp2'
         }}
       />
     </Card>
   );
 }
```
