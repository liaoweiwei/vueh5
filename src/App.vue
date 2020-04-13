<template>
  <div id="app">
    <router-view class="app-wrapper"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
    // created () {
    //   // 调用API从本地缓存中获取数据
    //   // 调用API从本地缓存中获取数据
    //   const logs = this.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   this.setStorageSync('logs', logs)
    // }
}
</script>
<style lang="less">
.container {
  margin: 0 auto;
}
#app,
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
