---
title: プログラミング、覚えかき
description: ページの説明
navigation: true
draft: false
date: 2025-07-16
tag:
  - javascript
  - vue
---
**vscode覚えかき**  
1.プロジェクトの場所（OSファイルシステム上のパス）が不明な時  
&nbsp;  
エクスプローラビューの適当なファイル（プロジェクトルートが良いかな）を右クリック===>パスのコピー  
&nbsp;  
エクスプローラビューの適当なファイル（プロジェクトルートが良いかな）を開く  
ctrl + sfhit + pでコマンドパレットを開く  
copy relative  
copy path  
&nbsp;  
2.過去のプロジェクト（以前に開いたことがあるプロジェクト）  
ファイル===>ユーザー設定===>プロファイル  
&nbsp;  
&nbsp;  
**javascript/typescript覚えかき**  
0.tpescript実行環境（web）  
https://www.typescriptlang.org/ja/play/?#example/mapped-types  
&nbsp;  
1.require、CJS（CommonJS）、ESM（ECMAScript Module）  
https://azukiazusa.dev/blog/vite-require/  
単純にrequireをimportにするだけでおｋな場合もある？  
https://qiita.com/TakeshiNickOsanai/items/7899a60044d71aa8d899  
CJS、ESMの違い  
https://nodejs.org/en/learn/getting-started/differences-between-nodejs-and-the-browser  
CommonJS公式  
&nbsp;  
2.require指定のライブラリをブラウザで使う  
 https://ja.stackoverflow.com/questions/31268/%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%A7-npm%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%9F%E3%81%84%E3%81%8C-require-%E3%81%8C%E4%BD%BF%E3%81%88%E3%81%AA%E3%81%84  
&nbsp;  
3.素のjavascriptライブラリ（npm）ブラウザから使う  
https://qiita.com/kanta_matsu/items/b7b2a65f6cdfd328e2e7  
エラ－（Cannot use import statement outside a module）の解決方法 ===> ビルドが必要  
または、<script type="module" ,,,,>でも良いかも知れない  
&nbsp;  
===>https://kinsta.com/jp/knowledgebase/cannot-use-import-statement-outside-module/  
&nbsp;  
4.ブラウザ上でのイメージ操作  
https://www.jsdelivr.com/package/npm/sharp  
sharpもブラウザ環境で使える？  
&nbsp;  
https://www.npmjs.com/package/imtool  
npm imtool  
https://github.com/mat-sz/imtool  
https://demo.mat.dev/imtool/  
デモ版  
&nbsp;  
結局、以下のどれかか？
- css（transform:rotate、transform:scale）で行う、2016には対応済
- Web animation APIを使う、2020/8には対応済
- Canvas API)を使う、2015/8には対応済
- imtool（npm）を使う、CanvasAPIと同じ（内部で使っているので）


https://qiita.com/kouta222/items/0469ce8b7f3e0807349d  
Blob、ファイルアップロード、ファイルダウンロード  
&nbsp;  
5.ブラウザ、過去のリリース時期  
MDN「ブラウザーの互換性」でカーソルをバージョン番号にホバーさせると年月が出てくる  
&nbsp;  
6.脆弱性  
6.1セッション乗っ取り  
CookieでセッションIDをやり取りするのがよさそうだ。  
（サーバーからSet-CookieでSecure、HttpOnly属性をつける）  
ドメインを超えてCookieは読まれないのか？  
===>ブラウザが勝手に送るクッキー（以前サーバーがSet-Cookieヘッダーで送信したクッキー）の場合、ドメインを超えて送信されることはないようだ  
===>javascript（document.cookie）で設定されたクッキーは？  
===>domain、path属性を使うのか？  
&nbsp;  
7.クロスドメイン関連技術  
JSONP、CORS、postMessage  
&nbsp;  
8.サードパーティクッキー  
**グーグルprivacysandbox.google.com「サードパーティCookie」から類推**  
1. あるサイト（サイトA）のscriptタグ、ifarmeタグ、imgタグに広告配信サーバー（別ドメイン）へアクセスするsrc属性を設定し、そのレスポンスにSet-cookieヘッダーに生成したIDを含め、広告もレスポンスする。
1. 別のサイト（サイトB）を訪れた時にも同じ配信サーバーをアクセスするタグを設定しサイトAで使ったIDが送信されることで、このユーザーのトラッキングが可能になり、レスポンスの広告表示でトラッキング情報を活用する。
1. この広告配信サーバーへの発火タグはjavascriptで動的に生成することで、他の情報も付加できそうだ。


8.referer  
referer SSR SAPで検索  
&nbsp;  
9.jwt  
以前はjsonwebtokenが主流だったが、  
typescript環境ではjoseが主流になりつつある。  
https://zenn.dev/manase/scraps/3976b695175b7a  
SignJWT、jwtVerify  
&nbsp;  
100.オプショナルチェーン（Optional chaining）、null合体演算子 Nullish coalescing operator  
?.  
??  
&nbsp;  
101.typescriptでの、keyof、typeof  
typeは既存の型や複雑な型に新しい名前を付けるために使う。（型エイリアス ）  
typeofはjavascriptと違って型名ではなく、型を返す。  
すなわち  
例１）  
type AAA= {  
  aaa: number;  
  bbb: string;  
};  
&nbsp;  
例２）  
const ccc= {  
  aaa: 0,  
  bbb: ''  
};  
type AAA = typeof ccc;  
&nbsp;  
例１、例２のAAAはまったく同じ。  
&nbsp;  
102.keyof  
オブジェクト型に対して使う。  
キー名（プロパティ名）を文字列リテラルのユニオン型として取得する。  
const bbb = {  
  aaa: '',  
  ccc: 123,  
};  
type BBB = keyof typeof bbb; // BBBは 'aaa' | 'ccc'  
&nbsp;  
103.インデックスシグニチャ  
let obj: {  
  [K: string]: number;  
};  
let obj: Record<string, number>;  
&nbsp;  
104.Mapped types  
type SystemSupportLanguage = "en" | "fr" | "it" | "es";  
これをインデックス型で使うとキーの制約として使用することができます。  
type Butterfly = {  
  [key in SystemSupportLanguage]: string;  
};  
&nbsp;  
let obj  = {  
  t: "text",  
  x: 0,  
  y: 10,  
};  
type key2 = (typeof obj)[keyof typeof obj];  
これは  
type key2 = string | numberと同じ  
&nbsp;  
105.tsc、tsconfig.json  
tscを使う時に対象ファイルを指定するとtsconfig.jsonは無視される？  
型チェックされないようだ  