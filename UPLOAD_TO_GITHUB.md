# GitHubへのアップロード方法

このZIPはフォルダ構造を崩さずにGitHubへ入れるための版です。

## 重要
ZIPを解凍したら、**中身をそのままリポジトリのルートへアップロード**してください。

GitHubのCode画面で最終的に次の構造になっていればOKです。

```text
NovelGame/
├─ index.html
├─ package.json
├─ vite.config.js
├─ src/
│  ├─ main.js
│  ├─ style.css
│  ├─ engine/
│  │  └─ NovelEngine.js
│  └─ data/
│     └─ scenario.js
└─ .github/
   └─ workflows/
      └─ deploy-pages.yml
```

`.github` や `src` の中身をルートに出さないでください。

既存ファイルと同名のファイルがある場合は、今回のZIPのファイルで置き換えてください。
