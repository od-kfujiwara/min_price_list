# 開発ガイドライン

## 🛠 開発セットアップ

### 初回環境構築
```bash
# リポジトリクローン
git clone <repository-url>
cd min_price_list

# 依存関係インストール  
npm install

# 開発サーバー起動
npm run dev
```

## 🔀 開発フロー

### ブランチ戦略（必須）
1. **メインブランチ**: `main`（直接コミット禁止）
2. **作業ブランチ**: `dev-*`（必須プレフィックス）
3. **1機能1ブランチ**: 機能単位でブランチ分割

### 標準ワークフロー
```bash
# 1. 最新のmainブランチから開始
git checkout main
git pull origin main

# 2. 新しい機能ブランチ作成
git checkout -b dev-feature-name

# 3. 開発・テスト
# コードを実装...

# 4. こまめにコミット
git add .
git commit -m "具体的な変更内容"

# 5. リモートにプッシュ
git push -u origin dev-feature-name

# 6. Pull Request作成
# GitHub UI でPR作成

# 7. レビュー・マージ
# レビュー後、mainにマージ
```

## 📝 コミットメッセージ規約

### 形式
```
種類: 簡潔な説明

詳細な説明（必要に応じて）

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 種類
- `feat`: 新機能
- `fix`: バグ修正  
- `style`: デザイン・CSS変更
- `refactor`: リファクタリング
- `docs`: ドキュメント
- `test`: テスト追加・修正

### 例
```bash
git commit -m "feat: 都市選択タブに沖縄を追加

- LocationTabsコンポーネントに沖縄を追加
- prices.tsvに沖縄のサンプルデータを追加
- 既存機能への影響なし

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

## 🎨 コーディング規約

### TypeScript/React
- **関数コンポーネント**: 関数宣言形式
- **Props型定義**: インターフェース必須
- **JSDoc**: 複雑な関数は必須
- **日本語コメント**: プロジェクト方針

```typescript
/**
 * 価格データを表示するコンポーネント
 */
interface PriceCellProps {
  /** 表示する日付 */
  day: number;
  /** 価格情報 */
  price?: number;
}

const PriceCell: React.FC<PriceCellProps> = ({ day, price }) => {
  // 実装...
};
```

### CSS
- **クラス命名**: BEM風（例: `calendar-cell__price`）
- **レスポンシブ**: モバイルファースト
- **アニメーション**: `transition`活用
- **色彩**: 既存パレット準拠

## 🧪 テスト・品質管理

### コード品質チェック
```bash
# TypeScript型チェック
npx tsc --noEmit

# ビルド確認
npm run build

# プレビュー確認  
npm run preview
```

### 手動テスト項目
- [ ] 各都市タブの切り替え
- [ ] 月タブの切り替え
- [ ] 価格データの表示
- [ ] 最安値ハイライト
- [ ] レスポンシブ動作
- [ ] ホバーエフェクト

### ブラウザ確認
- Chrome（開発推奨）
- Firefox  
- Safari
- Edge

## 📁 ファイル構成ルール

### 新規コンポーネント
```
src/components/
├── NewComponent.tsx      # コンポーネント本体
└── NewComponent.css      # 専用スタイル（必要時）
```

### ファイル命名
- **コンポーネント**: PascalCase（例: `PriceCell.tsx`）
- **ユーティリティ**: camelCase（例: `dataParser.ts`）
- **データファイル**: kebab-case（例: `hotel-prices.tsv`）

## 🔧 データ管理

### TSVデータ形式
```tsv
date	location	price	hotel
2025-06-01	東京	8500	ホテル東京スカイ
2025-06-01	大阪	7200	ホテル大阪ベイ
```

### 新規データ追加
1. `src/data/prices.tsv`を編集
2. 日付は`YYYY-MM-DD`形式
3. タブ区切り厳守
4. 価格は数値のみ

### 新都市追加
1. `src/App.tsx`の`locations`配列に追加
2. TSVデータに対応する都市データを追加
3. テスト確認

## 🎯 パフォーマンスガイドライン

### 最適化ポイント
- **画像**: 使用時は最適化必須
- **大量データ**: 仮想化検討
- **アニメーション**: CSS transform/opacity優先
- **メモリ**: 不要なstate削除

### 避けるべき実装
- 不必要なuseEffect
- 過度なDOM操作
- 重いinline関数
- メモリリーク

## 🚀 Pull Request ガイドライン

### PR作成前
- [ ] 手動テスト実施
- [ ] コンフリクト解消
- [ ] コミットメッセージ確認
- [ ] 不要なファイル除外

### PR説明テンプレート
```markdown
## 概要
この変更の目的と内容

## 変更内容
- 具体的な変更点1
- 具体的な変更点2

## テスト
- [ ] 手動テスト実施済み
- [ ] ブラウザ動作確認済み

## スクリーンショット
（必要に応じて）
```

### レビューポイント
- 機能の動作確認
- コード品質
- パフォーマンス影響
- デザイン一貫性

---

## 📞 質問・サポート

- **技術的質問**: GitHub Issues
- **緊急対応**: プロジェクト担当者連絡
- **提案・改善**: Pull Request welcome

**最終更新**: 2025年6月24日