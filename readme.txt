パッケージ管理はyarn
// 2026/03/18、もう削除して、Nuxt-Contentをインストール
// expressをインストールして簡易サーバー
//	yarn run start

リモートリポジトリ
https://github.com/aeon20250624-tech/webBlog.git
Freeサーバー
https://webblog-pk0c.onrender.com

NuxtJS
Nuxt Content
これらでブログを作成
https://blog.ashcolor.jp/blog/programming/nuxt-blog

bulmaインストールでnuxt-bulma-slimをつかおうとしたらエラーになった（node-sass必須のようだが、node-sassはdeprecatedなのでこいつはダメだ）
@nuxtjs/bulmaもdeprecatedなので、
bulma自体をyarnインストールして、node_module配下のbulma.cssを直接参照する(nuxt.config内で)