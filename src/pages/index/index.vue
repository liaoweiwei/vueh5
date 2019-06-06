<template>
  <div class="container">
      内容
  </div>
</template>

<script>
// 组件引用
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World'
    }
  },
  components: {
    card
  }
}
</script>

<style lang="less" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128/7.5vw;
  height: 128/7.5vw;
  margin: 20/7.5vw;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  height:25px;
    text-overflow:clip;
    overflow:hidden;
    white-space:nowrap;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  -webkit-user-select: none;
  -moz-user-focus: none;
  -moz-user-select: none;
  -webkit-appearance:none;
  outline: none;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.container .girl{
    width: 275px;
    height: 400px;
}
.container .logo{
    width: 200px;
    height: 200px;
}

</style>
