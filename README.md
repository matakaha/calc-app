# calc-app

[![PR Checks](https://github.com/matakaha/calc-app/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/matakaha/calc-app/actions/workflows/pr-checks.yml)
[![Deploy](https://github.com/matakaha/calc-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/matakaha/calc-app/actions/workflows/deploy.yml)

React + Vite で構築された電卓アプリです。Azure Static Web Apps にデプロイされます。

## CI/CD パイプライン

### PR チェック（`pr-checks.yml`）

`main` ブランチへの Pull Request 時に以下をシリアルに実行します:

1. **Code Scanning (CodeQL)** — ソースコードの脆弱性を検証
2. **Dependency Review** — 依存関係の脆弱性を検証（high 以上で失敗）

### デプロイ（`deploy.yml`）

`main` ブランチへのマージ時に以下をシリアルに実行します:

1. **E2E テスト (Playwright)** — `tests/` 配下のエンドツーエンドテストを実行
2. **Azure Static Web Apps デプロイ** — OIDC 認証でログインし、SWA にデプロイ

### 実行履歴（過去10回分の確認）

各ワークフローの実行履歴は以下のリンクから確認できます:

| ワークフロー | 最新ステータス | 実行履歴 |
|---|---|---|
| PR Checks | [![PR Checks](https://github.com/matakaha/calc-app/actions/workflows/pr-checks.yml/badge.svg)](https://github.com/matakaha/calc-app/actions/workflows/pr-checks.yml) | [過去の実行一覧を表示](https://github.com/matakaha/calc-app/actions/workflows/pr-checks.yml?query=branch%3Amain) |
| Deploy | [![Deploy](https://github.com/matakaha/calc-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/matakaha/calc-app/actions/workflows/deploy.yml) | [過去の実行一覧を表示](https://github.com/matakaha/calc-app/actions/workflows/deploy.yml?query=branch%3Amain) |

> **Tip**: 実行履歴ページでは、各実行のステータス（成功/失敗）、所要時間、トリガーとなったコミットを確認できます。デフォルトで直近の実行が一覧表示されます。