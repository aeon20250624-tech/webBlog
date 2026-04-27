---
title: CORS Access-Control-Allow-Originはレスポンスヘッダーなのだ
description: javascript、CORSの対策
navigation: true
draft: false
date: 2021-11-27
tag:
  - javascript
---
よくある対策で  
リクエストヘッダーにAccess-Control-Allow-Originを含めるって  
あるけど、  
これは間違いだ。  
公式サイト見るとわかるが、  
これはレスポンスヘッダーだ。  
[CORS](https://developer.mozilla.org/ja/docs/Glossary/CORS)  
&nbsp;  
リクエストヘッダに含めても動作していたとしていたら  
サーバー側が気をきかせて、設定してるだけ。  
CORSで許されるヘッダーは  
サーバー側のレスポンスヘッダーにあるAccess-Control-Allow-Headers  
にリストアップされる。  
なので、余計なヘッダーがあるとCORSエラーは回避できなくなる。  
結局のところ、CORS対策でリクエスト側がやることは  
許されるヘッダーだけを  
許されるメソッドでリクエストしているかだけを気をつけるのだ。  
認証系のクッキーがどうとかになるとまた違う対策が必要みたいだが。  
&nbsp;  
ちなみにaxiosではロクなエラー詳細を返してくれないので  
例外が起きてerror.responseが空、  
間違いなくサーバー側はなにかレスポンスを返してる  
であれば  
まずCORSエラーを疑うと良い。  
&nbsp;  
またまたちなみにだが、  
awsのCloudWatchログではCORSのOPTIONSリクエストは記録されない。  
なので、ログには全く記録されずリクエストが届いていないように見える、  
curlではリクエストが問題ない  
であればCORSを疑おう。  