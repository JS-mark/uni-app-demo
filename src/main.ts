import App from "./App.vue"
import { createSSRApp } from "vue"
// 引入样式
import 'virtual:uno.css'
import '@/style/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
