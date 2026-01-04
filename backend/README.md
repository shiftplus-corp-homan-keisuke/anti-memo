# Notion ライクメモアプリ (バックエンド)

NestJS を使用し、DDD (ドメイン駆動設計) とクリーンアーキテクチャの原則に基づいて構築された、Notion ライクなメモアプリケーションのバックエンド API です。

## 🚀 技術スタック

- **フレームワーク**: [NestJS](https://nestjs.com/)
- **データベース**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **API ドキュメント**: [OpenAPI (Swagger)](https://swagger.io/)
- **環境構築**: [Docker](https://www.docker.com/) & Docker Compose

## 🏗️ アーキテクチャ

このプロジェクトは、関心の分離とテスタビリティを高めるために、以下のレイヤー構造を採用しています：

- **Domain Layer** (`src/domain`): ビジネスロジックの中核。エンティティ、リポジトリインターフェースを含みます。外部依存を持ちません。
- **Application Layer** (`src/application`): ユースケースの実装。ドメインオブジェクトを使用してアプリケーション固有の操作を行います。
- **Infrastructure Layer** (`src/infrastructure`): データベースアクセスなどの技術的詳細の実装。TypeORM リポジトリや外部サービス連携を含みます。
- **Presentation Layer** (`src/presentation`): API エンドポイント (Controller) の定義。HTTP リクエストを受け取り、ユースケースを実行します。

## 🛠️ プロジェクトのセットアップ

### 前提条件

- Node.js (v20以上推奨)
- Docker および Docker Compose

### インストール

```bash
npm install
```

### データベースの起動

開発用データベース (PostgreSQL) を Docker で起動します：

```bash
docker-compose up -d postgres
```

### アプリケーションの実行

```bash
# 開発モード (ホットリロード有効)
npm run start:dev

# 本番モード
npm run start:prod
```

サーバーは `http://localhost:3101` で起動します。

## 📚 API ドキュメント

アプリケーション起動後、以下の URL で Swagger UI にアクセスできます：

[http://localhost:3101/api](http://localhost:3101/api)

Orval などのコード生成ツール用の JSON 定義は以下で取得できます：
`http://localhost:3101/api-json`

## ✅ テスト

```bash
# 単体テスト
npm run test

# E2E テスト
npm run test:e2e

# テストカバレッジ
npm run test:cov
```
