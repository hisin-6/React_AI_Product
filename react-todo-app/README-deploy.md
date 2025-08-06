# EC2デプロイガイド - React Todo App

## 前提条件
- EC2インスタンスが起動している
- Node.jsがインストール済み
- SSH経由でEC2にアクセス可能

## デプロイ手順

### 1. EC2にWebサーバーをインストール

#### Nginxを使用する場合:
```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

#### Apacheを使用する場合:
```bash
sudo apt update
sudo apt install apache2 -y
sudo systemctl start apache2
sudo systemctl enable apache2
```

### 2. プロジェクトをEC2にアップロード

####方法1: GitHubから直接クローン（推奨）
```bash
cd /home/ubuntu
git clone https://github.com/your-username/React_AI_Product.git
cd React_AI_Product/react-todo-app
```

#### 方法2: SCPでファイル転送
```bash
# ローカルマシンから実行
scp -r react-todo-app ubuntu@your-ec2-ip:/home/ubuntu/
```

### 3. デプロイスクリプトを実行

```bash
chmod +x deploy.sh
./deploy.sh
```

### 4. セキュリティグループの設定
- EC2のセキュリティグループでHTTP(80)とHTTPS(443)ポートを開放

### 5. アクセス確認
- ブラウザでhttp://your-ec2-ip/にアクセス

## トラブルシューティング

### Nginxの設定確認
```bash
sudo nginx -t
sudo systemctl status nginx
```

### ログの確認
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### ファイル権限の確認
```bash
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
```

## カスタマイズ

### ドメイン名の設定
nginx.confの`server_name`を実際のドメイン名またはEC2のIPアドレスに変更してください。

### HTTPS対応
Let's Encryptを使用してSSL証明書を取得:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```
