---
title: nuxt3（javascript、typescript）での文字コード変換
description: ページの説明
navigation: true
draft: false
date: 2024-07-13
tag:
  - javascript
  - vue
---
いわゆるシフトJISだといくつかあるようだが、  
MS932をサポートしているものはiconv-liteしか見つけられなかった。  
厳密にはシフトJISとMS932は違うようなので、これを採用した。  
&nbsp;  
まぁ、昨今のweb開発でUTF-8以外で開発とかかなり稀だが、  
csvダウンロード／アップロードだとほぼシフトJIS系になる。  
ここで文字コード変換が必要になるのだが、  
使わせてもらって言うのもなんだが、  
<span class="article-red">ドキュメントがクソだ。</span>  
UTF-8からMS932へ変換したいだけなのに、  
公式ドキュメントのBasic APIを見るとdecode、encodeが出てくる。  
どっち使うんだ？？？  
とふつうは思うのだが、  
この公式ドキュメントには全く記述がない。  
&nbsp;  
結局、encodeを使うのが正解で、  
const str932 = iconv.encode('あいうえお', 'MS932');  
となる。  
str932には変換後の  
[0x82, 0xa0, 0x82, 0xa2, 0x82, 0xa4, 0x82, 0xa6, 0x82, 0xa8]  
が入っているのだが  
typescriptだとBuffer型になるため、こいつがnuxt3には入ってない。  
（標準ビルドでviteを使っているため？node特有のrequireなどもビルド結果に含めてもらえない）  
まぁ、BlobがBufferをそのまま受け入れてくれるので  
new Blob([str932], {'type' : 'text/plain' });して  
このあとはURL.createObjectURLしてAリンク作成してそのリンクのクリックを呼ぶと  
ブラウザがBlobの内容をダウンロードしてcsvファイルにくれる。  
&nbsp;  
ここまでたどり着くのに1時間以上要した。  
npmでBufferだけ入れてみたり、あっちこっちサンプルを探しまくった。  
&nbsp;  
いろいろやって判明したのは  
iconvというコマンドツールが元々あった？  
このiconvがデフォルトでUTF-8になっている。  
なのでiconv-liteも  
UTF-8<===>シフトJIS、JIS、EUC  
これが基本。  
なのでUTF-8を介さない以下のようなことはできない？  
EUC<===>シフトJIS  
まぁ、これは問題ないけど、  
<span class="article-red">MS932への変換
UTF-8===>MS932
これはencode
MS932===>UTF-8
これはdecodeになるわけです!!!!!
世界はUTF-8を中心に回ってるためです。
UTF-8以外の文字コードは暗号化されたデータと同じ扱いです。
</span>
なのでドキュメントもそれが当たり前となるわけで  
これに気付けない人は時間を無駄にして大いに疲れるのです。  