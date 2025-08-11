#!/bin/bash

# EC2デプロイスクリプト
# Node.js環境でReactアプリをビルドしてデプロイする

# 環境変数の設定（デプロイ前に設定してください）
# export SERVER_IP="your-server-ip"
# export WEBROOT_PATH="/usr/share/nginx/html"
# export WEB_USER="nginx"

# デフォルト値を設定
SERVER_IP=${SERVER_IP:-"your-server-ip"}
WEBROOT_PATH=${WEBROOT_PATH:-"/usr/share/nginx/html"}
WEB_USER=${WEB_USER:-"nginx"}

echo "🚀 React Todo Appのデプロイを開始します..."

# 依存関係をインストール
echo "📦 依存関係をインストール中..."
npm install

# プロダクションビルドを作成
echo "🔨 プロダクションビルドを作成中..."
rm -rf build  # 既存のbuildディレクトリを削除
npm run build

# Nginx設定ファイルをコピー（オプション - 既存設定がある場合はスキップ）
if [ -f "nginx.conf" ] && [ ! -f "/etc/nginx/conf.d/react-todo-app.conf" ]; then
    echo "⚙️ Nginx設定をコピー中..."
    sudo cp nginx.conf /etc/nginx/conf.d/react-todo-app.conf
    echo "📝 注意: 既存のNginx設定があります。必要に応じて手動で設定を調整してください。"
fi

# buildディレクトリをNginxのwebrootにコピー
echo "📁 ビルドファイルをwebrootにコピー中..."
sudo rm -rf ${WEBROOT_PATH}/*
sudo cp -r build/* ${WEBROOT_PATH}/

# ファイル権限を設定
echo "🔧 ファイル権限を設定中..."
sudo chown -R ${WEB_USER}:${WEB_USER} ${WEBROOT_PATH}
sudo chmod -R 755 ${WEBROOT_PATH}

# Nginxを再起動（必要に応じて）
if command -v nginx > /dev/null; then
    echo "🔄 Nginxを再起動中..."
    sudo systemctl reload nginx
fi

echo "✅ デプロイ完了！"
echo "🌐 HTTPSでアクセス: https://${SERVER_IP}/"
echo "🌐 HTTPでアクセス: http://${SERVER_IP}/ (HTTPSにリダイレクトされます)"
echo "📝 注意: 既存のNginx設定と競合する可能性があります。"
echo "    必要に応じてNginx設定を手動で調整してください。"
echo "🕐 デプロイ時刻: $(date)"
echo "💡 ブラウザでCtrl+F5 (ハードリフレッシュ) を実行してキャッシュをクリアしてください"
