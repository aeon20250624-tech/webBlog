---
title: vueやらjestやらVeeValidateについて
description: ページの説明
navigation: true
draft: false
date: 2021-01-21
tag:
  - javascript
  - vue
---
こちらのコードに落ち度があったのかもしれないが、  
イロイロ気を付けたほうが良い点を上げておこうと思う。  
ググってもみつかなかったし。  
&nbsp;  
**VeeValidate**  
ValidationProviderのnameがバッティングしないようにしないとイロイロ不具合が多い  
対象の入力項目が変な動作したり、  
ValidationObserverのinvalidが正しく機能しなかったりする。  
nameをユニークにする必要があるならドキュメントに書いておいてほしい  
&nbsp;  
**以下はjestだとかvue test utilsを使ったテストのはなし**  
**ValidationObserver**  
asyncDataがjest環境では動作しないので、  
代わりにwrapper = mount(xxxx)でマウントしてwrapper.setDataでデータを読み込ませてしまうと  
ValidationObserverのinvalidが正しく機能しない  
mountのmocksオプションを使ってなにかのイベントで読み込ませるとうまくいくことがある  
&nbsp;  
**jest.spyOn**  
テスト対象コードのイベントハンドラの記述は  
@click="saveData"ではなく@click="saveData()"としたほうが良い  
でないとjest.spyOnしてexpect(spy).toHaveBeenCalled()でチェックしようとしてもできないことがある  
&nbsp;  
**vueのレンダリング**  
createdやmountedの時にaxios.get、postで読み込んだデータをvueにレンダリングさせるには  
await mountして、 await flushPromises()、jest.runAllTimers()などを実行するとうまくいくことがある  