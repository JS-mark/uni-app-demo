<template>
  <canvas
    canvas-id="poster"
    width="750"
    height="1334"
    class="poster"></canvas>
  <qrcode ref="qrcodeRef" />
</template>
<script lang="ts">
export default {
  name: "PosterComp"
}
</script>

<script lang="ts" setup>
import qrcode from './qrcode.vue'
import { GenerateSharePic } from '@/utils/generate-share-pic'
const context = getCurrentInstance()
const qrcodeRef = ref<typeof qrcode | null>(null)

defineExpose({
  genPoster(data: { title: string; score: number; desc: string; qrcode: { text: string; size: number } }) {
    return new Promise((resolve, reject) => {
      qrcodeRef.value?.getQrcode(data.qrcode).then((res: any) => {
        GenerateSharePic("poster", context, {
          desc: data.desc,
          score: data.score,
          title: data.title,
          qrcode: res
        }).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    })
  }
})
</script>

<style lang="scss" scoped>
.poster {
  position: fixed;
  left: -999rpx;
  width: 750rpx;
  height: 1334rpx
}
</style>