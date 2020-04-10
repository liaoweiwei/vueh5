<template>
  <div id="app">
    <router-view class="wrapper"></router-view>
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
body {
  height: 100%;
  width: auto;
  margin: 0;
  overflow-x: hidden;
  -webkit-text-size-adjust: 100%!important;
  text-size-adjust: 100%!important;
}
.container {
  margin: 0 auto;
}

#app,
.wrapper {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
