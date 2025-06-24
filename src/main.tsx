/**
 * アプリケーションのエントリーポイント
 * React 18の新しいcreateRoot APIでアプリケーションをマウント
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.css'

// HTMLのroot要素にアプリケーションをマウント
ReactDOM.createRoot(document.getElementById('root')!).render(
  // StrictMode: 開発時のデバッグやパフォーマンスの問題を発見しやすくする
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)