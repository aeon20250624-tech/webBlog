---
title: iPhone USBテザリング windows11
description: iPhoneを使ってwindows11をネットにつなぐ
navigation: true
draft: false
date: 2022-01-26
tag:
  - iPhone
---
iPnone8使ってテザリングするのにUSBで繋いだ方が安定するし速いらしいのだが苦労した。  
&nbsp;  
まず、windows側でiTunesをインストールする必要がある。  
これがwindows storeにはないと言われてしまう。まぁ、直接リンクがあってwindows10用があったのでこいつを入れた。  
リブートしてiPhone8をUSBでwindowsPCとつなぐと  
windows11のせいのか不明なのだがデバイスマネージャーでビックリマークになる。  
なので、wifiか有線イーサ使うなどして、ビックリマーク付きデバイスをアップデートする。  
デバイス削除---->ハードウェア変更のスキャンする。  
これでデバイスマネージャーでネットワークアダプター---->Apple Mobile Device Ethernetが表示されるようにする。  
この後はiPhoneのテザリングをon/off、USBを抜き差しを繰り返す。  
これでやっと使えた。  
面倒くさいなぁ。  
&nbsp;  
2025/7/18追記  
iPhoneもSE3を使ってるし、  
最初のテザリング作業もうろ覚えなのだけれど、  
iTunesのアップデートを行ってはダメです。  
&nbsp;  
今、使っているiTunes  
![iTUNES](/img/iTunes.jpg){.article-image}  
またまた、うろ覚えなのだけれど、  
iTunes起動したら、アップデートを促すメッセージが出ることがあって  
ハイハイと素直に応じたら、テザリングできなくなったような記憶がある。  
このバージョンもどこから手に入れたのか不明なのだけれど、、、  
まぁ、古いやつを使ってます。  
&nbsp;  
肝は  
\>**これでデバイスマネージャーでネットワークアダプター---->Apple Mobile Device Ethernetが表示されるようにする。**  
これです。  
これが出てくれば、windowsの「設定」の「ネットワークとインターネット」で「イーサネット」が表示され、テザリング成功となるはず。  