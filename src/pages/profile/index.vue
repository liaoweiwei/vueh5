<template>
  <div>
    <Header />
    <div class="page">
      <div class="container">
        <Sidebar />
        <div class="main-container">
          <div class="splitter-container clearfix">
            <div class="splitter-pane Left fl">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <Dynamic />
                <Goods />
              </el-scrollbar>
            </div>
            <div class="splitter-pane">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <el-tabs v-model="active" :stretch="false" class="tabs" @tab-click="handleClick">
                  <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.name"></el-tab-pane>
                </el-tabs>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件引用
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  data () {
    return {
      tabs: [],
      active: 0
    }
  },
  components: {
    Header,
    Sidebar
  }
}
</script>
