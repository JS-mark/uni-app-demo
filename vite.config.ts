import UnoCSS from "unocss/vite"
import { resolve } from "node:path"
import uni from "@dcloudio/vite-plugin-uni"
import { defineConfig, loadEnv } from "vite"
import AutoImport from "unplugin-auto-import/vite"
import { NutResolver } from 'nutui-uniapp'
import Components from '@uni-helper/vite-plugin-uni-components'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const envData = loadEnv(mode, "./")
  const env = Object.entries(envData).reduce((obj, cur) => {
    const key = cur[0]
    const value = cur[1]
    obj[key] = JSON.stringify(value)
    return obj
  }, {} as Record<string, string>)
  return {
    base: "./",
    root,
    resolve: {
      alias: {
        "@/*": `${resolve(__dirname, "src")}/`,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "nutui-uniapp/styles/variables.scss";@import "@/style/var.scss";',
        },
      },
    },
    build: {
      assetsInlineLimit: 4096,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: false,
        },
      },
    },
    define: env,
    plugins: [
      Components({
        resolvers: [NutResolver()],
      }),
      uni(),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: ["vue", "pinia", "uni-app"],
        dts: "src/auto-imports.d.ts",
        dirs: ["src/components", "src/store"],
        vueTemplate: true,
      }),

      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      UnoCSS(),
    ],
  }
})
