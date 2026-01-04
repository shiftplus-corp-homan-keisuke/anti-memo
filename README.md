# Notion ライクメモアプリ

NestJS (バックエンド) と Next.js (フロントエンド) を使用した、Notion のようなリッチテキスト編集機能を持つメモアプリケーションです。
BlockNote をエディタとして採用し、DDD (ドメイン駆動設計) とクリーンアーキテクチャに基づいた堅牢なバックエンドで構築されています。

## 📂 プロジェクト構成

- **backend/**: [NestJS API サーバー](./backend/README.md)
  - REST API (OpenAPI/Swagger)
  - DDD / クリーンアーキテクチャ
  - TypeORM + PostgreSQL
- **frontend/**: [Next.js クライアント](./frontend/README.md)
  - BlockNote エディタ統合
  - shadcn/ui + Tailwind CSS
  - Orval (API クライアント生成)
- **docker-compose.yml**: 開発環境用インフラ (PostgreSQL, Backend)

## 🚀 起動方法

### 1. バックエンドとデータベースの起動

Docker Compose を使用して、PostgreSQL データベースとバックエンド API サーバーを起動します。

```bash
docker-compose up -d
```

- バックエンド API: http://localhost:3101
- Swagger UI: http://localhost:3101/api

### 2. フロントエンドの起動

フロントエンドディレクトリに移動し、開発サーバーを起動します。

```bash
cd frontend
npm install
npm run dev
```

- フロントエンド: http://localhost:3100

## 🛠️ 機能

- **ページ管理**: 階層構造を持つページの作成、削除、タイトル編集
- **リッチテキスト編集**:
  - 見出し、リスト、チェックリスト
  - 引用、コードブロック
  - リアルタイム保存 (Auto-save)
- **スラッシュコマンド**: `/` でブロックメニューを呼び出し

## 🚀 デプロイ

### 1. クラウドプラットフォームへのデプロイ（推奨）

**フロントエンド (Next.js)**

- [Vercel](https://vercel.com) へのデプロイが最も簡単です。
- リポジトリを連携し、Framework Preset に `Next.js` を選択します。
- 環境変数 `NEXT_PUBLIC_API_URL` にバックエンドの URL を設定します。

**バックエンド (NestJS) & データベース**

- [Railway](https://railway.app) や [Render](https://render.com) が推奨されます。
- **Railway**: GitHub リポジトリを連携するだけで、PostgreSQL データベースと NestJS サーバーを自動的に構築・デプロイできます。
- 環境変数 (`DATABASE_URL`, `CORS_ORIGIN` 等) を適切に設定してください。

### 2. Docker によるセルフホスティング

本番環境用の `docker-compose.prod.yml` を作成し、マルチステージビルドを利用した Dockerfile を使用することを推奨します。

```bash
# 例: 本番ビルドを実行して起動
docker-compose -f docker-compose.prod.yml up -d --build
```

## 📝 ライセンス

MIT
