---
title: jest 特定のファイルだけ実行したい 特定のテストだけ実行したい
description: ページの説明
navigation: true
draft: false
date: 2022-11-10
tag:
  - javascript
  - vue
---
わざわざ書く必要もない気もしたが  
探してもすぐには設定がわからなかったので。  
&nbsp;  
**npx jest --testMatch [ "**" ] -t=ZZZZxxxx test/pages/AAAA/index.test.js**  
&nbsp;  
とコマンドを打ちこむと良いようだ。  
--testMatchオプションはほとんどの場合は必要ないようだが  
jest.config.jsのtestMatchが ['\<rootDir\>/test/components/**/*(*.)@(spec|test).[jt]s?(x)']  
とかになっていると  
上記のようにjest.config.jsの設定を無効化しないと  
test/pages/AAAA/index.test.jsが見つからないといってテスト実行できない。  
&nbsp;  
jest.config.jsを書き換える方法もあるが  
また戻す必要がある場合はコマンドから直接指定したい。  
&nbsp;  
-t=ZZZZxxxx  
こいつでテスト名と部分一致で実行してくれるようだ。  
test('ZZZZxxxxテスト１', async done => {})  
it('ZZZZxxxxテスト１', async done => {})  
とかの最初の引数。  