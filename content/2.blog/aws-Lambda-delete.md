---
title: git bash上でxargsやaws cliを使ってLambda関数 一括削除 まとめて削除
description: ページの説明
navigation: true
draft: false
date: 2022-12-17
tag:
  - aws
---
awsREST-APIの開発ビルド、デプロイを繰り返していると  
Lambda関数のストレージ制限に引っかかって  
デプロイ失敗するようになってしまった。  
&nbsp;  
なぜだかわからないが、Lambda関数がバージョン管理するようになっていて  
3xxいくつまでバージョンが進んでいて何年も前のモノも残っていた。  
&nbsp;  
しょうがいないから  
awsコンソールから削除しようとしたら、まとめて削除ができそうにない。  
検索してみたら、aws-cli、xargs、jqを使って削除しているサイトがあったので  
それを参考に作成して、git-bashから実行したらawsからエラー報告がくる。  
&nbsp;  
\> failed to satisfy constraint: Member must satisfy regular expression pattern  
&nbsp;  
echoを使って確認しても問題ないのだけど、xargsに-pオプションを付けてみたら  
なんかxargsが起動したコマンドのfunction名にゴミが付随していた。  
このゴミのせいでaws-cliがエラーを起こしているようだった。  
&nbsp;  
ダメな例）  
xargs -I {} aws lambda delete-function --function-name {}  
うまくいった例）  
xargs -I {} sh -c 'aws lambda delete-function --function-name {}'  
&nbsp;  
としたら動作した。  
使い方が悪いのか、git-bashのバグなのかよくわからない、、、  
&nbsp;  
bash、xargsはgitForWindowsのモノだ  