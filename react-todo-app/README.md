# React Todo App

このプロジェクトは、シンプルなTodoアプリをReactで作ったやつだよ！  
ユーザーはTodoの追加・編集・削除・完了フラグの切り替えができるし、バリデーションやローディング・エラー表示もバッチリ！

---

## 機能

- Todo一覧の取得・表示
- Todoの新規作成（空文字禁止のバリデーション付き）
- Todoの編集（タイトル・完了フラグ）
- Todoの削除
- ローディング・エラー表示（共通コンポーネント化済み！）

---

## API通信仕様

- **GET /todos**  
  Todo一覧を取得してリスト表示

- **POST /todos**  
  新しいTodoを追加  
  送信例：  

  ```json
  { "title": "ギャル最高", "completed": false }
  ```

  ※`id`は送らなくてOK！

- **PUT /todos/{id}**  
  Todoの編集  
  送信例：  

  ```json
  { "id": 1, "title": "ギャル最高", "completed": true }
  ```

- **DELETE /todos/{id}**  
  Todoの削除

すべての通信はJSON形式でやりとりするよ！

---

## 技術スタック

- React（Hooksで状態管理）
- axiosでAPI通信
- 状態管理はuseStateとuseEffectのみ
- JavaScript
- スタイリングはCSS
- React 18対応（`createRoot`使ってるよ）
- エラー表示は`ErrorMessage`コンポーネントで共通化！

---

## セットアップ

1. リポジトリをクローン！

   ```sh
   git clone <repository-url>
   cd react-todo-app
   ```

2. 依存関係をインストール！

   ```sh
   npm install
   ```

3. 開発サーバーを起動！

   ```sh
   npm start
   ```

4. ブラウザで `http://localhost:3000` を開いてね！

---

## 注意事項・よくあるエラー

- **onDelete is not a function / onToggle is not a function**  
  → props名の渡し間違いが多いから、`App.jsx`→`TodoList.jsx`→`TodoItem.jsx`で名前が揃ってるかチェック！

- **Todoの追加に失敗しました。**  
  → APIに送るデータのキーは`title`と`completed`で！`text`じゃなくて`title`だよ！

- **React 18警告**  
  → `index.js`で`createRoot`を使ってるか確認！

- **同じTodoが2個登録される**  
  → 追加APIはApp.jsxだけでやって、TodoForm.jsxでは`addTodo(title)`だけ呼ぶようにしてね！

---

## プロジェクト構成

react-todo-app
├── public
│   ├── index.html
│   └── ...
└── src
    ├── api
    │   ├── todos.js
    │   └── ...
    ├── components
    │   ├── ErrorMessage.jsx
    │   ├── Loader.jsx
    │   ├── TodoForm.jsx
    │   ├── TodoItem.jsx
    │   └── TodoList.jsx
    ├── hooks
    │   ├── useTodos.js
    │   └── ...
    ├── App.css
    ├── App.jsx
    ├── index.css
    └── index.js

- **public/**: 公開用の静的ファイル
- **src/**: ソースコード
  - **api/**: API通信関連
  - **components/**: Reactコンポーネント
  - **hooks/**: カスタムフック
