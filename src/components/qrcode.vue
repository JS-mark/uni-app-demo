<template>
  <canvas canvas-id="qrcode" width="100" height="100" class="qrcode"></canvas>
</template>
<script lang="ts">
import UQRCode from '@uqrcode/js'
import { getCurrentInstance } from 'vue'

export default defineComponent({
  name: "Qrcode",
  setup() {
    const context = getCurrentInstance()

    return {
      getQrcode(data: { text: string; size: number }) {
        return new Promise((resolve, reject) => {
          // 获取uQRCode实例
          const qr = new UQRCode()
          // 设置二维码内容
          qr.data = data.text
          // 设置二维码大小，必须与canvas设置的宽高一致
          qr.size = data.size
          // 调用制作二维码方法
          qr.make()
          // 获取canvas上下文
          const canvasContext = uni.createCanvasContext('qrcode', context) // 如果是组件，this必须传入
          // 设置uQRCode实例的canvas上下文
          qr.canvasContext = canvasContext
          // 调用绘制方法将二维码图案绘制到canvas上
          qr.drawCanvas()
          uni.canvasToTempFilePath({
            canvasId: "qrcode",
            success: res => {
              // 成功回调中，res.tempFilePath为生成的截图文件路径
              resolve(res.tempFilePath)
            },
            fail(err) {
              reject(err)
            }
          }, context)
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.qrcode {
  position: fixed;
  left: -999rpx;
  width: 360rpx;
  height: 360rpx;
}
</style>