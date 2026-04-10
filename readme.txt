パッケージ管理はyarn

リモートリポジトリ
https://github.com/aeon20250624-tech/webBlog.git
Freeサーバー
https://webblog-pk0c.onrender.com

NuxtJS
Nuxt Content
これらでブログを作成
https://blog.ashcolor.jp/blog/programming/nuxt-blog

bulmaインストール関連
nuxt-bulma-slimをつかおうとしたらエラーになった（node-sass必須のようだが、node-sassはdeprecatedなのでこいつはダメだ）
@nuxtjs/bulmaもdeprecatedだ。
bulma自体をyarnインストールして、直接node_module配下のbulmaを参照しようとした。
yarn add sassしてnuxt.config内でcss: ['bulma']すると、The Sass if() syntax is deprecated という警告がconsoleに出てきてしまう。
なのでcss: ['bulma/css/bulma.min.css']としてcss参照にしたところ、コンソールに以下のエラーがでてしまう
http://localhost:3000/_nuxt/@fsC:/temp/GoogleBlogger/webBlog/node_modules/bulma/css/bulma.min.css net::ERR_ABORTED 404 (Not Found)
なので、css: ['~/assets/css/mybulma.css']として、mybulma.css中でnode_module配下のbulma.min.cssをimportした。

