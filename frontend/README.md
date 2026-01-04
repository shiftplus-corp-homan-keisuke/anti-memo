# Notion ライクメモアプリ (フロントエンド)

Next.js と BlockNote を使用して構築された、Notion のようなリッチテキスト編集機能を持つメモアプリケーションのフロントエンドです。

## 🚀 技術スタック

- **フレームワーク**: [Next.js 16](https://nextjs.org) (App Router)
- **エディタ**: [BlockNote](https://www.blocknotejs.org/) (Notion-style block editor)
- **UI コンポーネント**: [shadcn/ui](https://ui.shadcn.com/)
- **スタイリング**: [Tailwind CSS v4](https://tailwindcss.com/)
- **API クライアント**: [Orval](https://orval.dev/) + [TanStack Query](https://tanstack.com/query/latest)
- **アイコン**: [Lucide React](https://lucide.dev/)

## 🛠️ 開発環境のセットアップ

### 前提条件

バックエンドサーバーが `http://localhost:3101` で稼働している必要があります。

### インストールと起動

依存関係をインストールし、開発サーバーを起動します：

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3100](http://localhost:3100) を開いて確認してください。

## 📁 プロジェクト構造

- `src/app`: Next.js App Router ページ
- `src/components`: UI コンポーネントおよび機能コンポーネント
  - `page-editor.tsx`: BlockNote エディタ統合部分
  - `page-sidebar.tsx`: サイドバーナビゲーション
- `src/lib/api`: Orval によって生成された API クライアントコード
- `src/hooks`: カスタムフック

## 🔄 API コード生成

バックエンドの OpenAPI 仕様から API クライアントを自動生成する場合：

```bash
npm run generate:api
```

※ `package.json` にスクリプトが追加されている前提ですが、現状は `npx orval` 等で実行します。
