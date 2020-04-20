<template>
  <el-card>
    <p class="text-light"><small>登录后可发布动态并与APP同步数据</small></p>
    <el-button type="primary" class="button-block" @click="logout">登录 | 注册</el-button>
  </el-card>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$store.commit('login_visible')
    }
  }
}
</script>
