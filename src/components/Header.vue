<template>
  <header>
    <div class="container clearfix">
      <div class="logo fl">
        <router-link to="/">
          <img :src="`/static/images/logo-zh-CN.png`" width="100%" height="auto">
        </router-link>
      </div>
      <ul class="navbar fl">
        <li v-for="(item, index) in nav" :key="index" :class="{'active' : $route.name === item.id }">
          <router-link :to="item.url">{{ item.name }}</router-link>
        </li>
      </ul>
      <el-dropdown class="dropdown fr">
        <span class="el-dropdown-link">
          简体中文
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">简体中文</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        {name: '首页', id: 'index', url: '/'},
        {name: 'App下载', id: 'dropdown', url: '/dropdown'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #e6ebf5;
  padding: 8px 0;
  .container {
    width: 100%;
    max-width: 1200px;
    padding: 0 10px;
  }
  .logo {
    width: 50px;
  }
  .navbar {
    list-style: none;
    padding: 7px 0;
    margin: 0 0 0 16%;
    li {
      animation: font-size 0.28s;
      -moz-animation: font-size 0.28s;	/* Firefox */
      -webkit-animation: font-size 0.28s;	/* Safari 和 Chrome */
      -o-animation: font-size 0.28s;	/* Opera */
      display: inline-block;
      padding: 0 15px;
      font-size: 16px;
      &.active,
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  .dropdown {
    padding: 10px 0;
    font-size: 12px;
  }
}
</style>