<template>
  <aside class="fl">
    <el-scrollbar class="scrollbar" :horizontal="false">
      <slot />
      <el-card :body-style="{ padding: '8px 15px' }" class="pad-10">
        <div slot="header" style="margin: -7px 0">
          <span class="title">热门话题</span>
        </div>
        <div>
          <ul style="padding: 0; margin: 0">
            <li v-for="(item, index) in hotTopic" :key="index">
              <a href="javascript:;" class="link-type" @click="handleQrcode">{{ item.name }}</a>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '8px 20px' }" class="pad-10 copy">
        <p>Copyright ©2019 BAIPU, All Rights Reserved</p>
        <p>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502005025">
            <img src="/static/images/gongan.png" width="15px" height="auto">
          </a>
          沪公网安备 31010502005025号
          <el-link target="_blank" href="http://www.beian.miit.gov.cn">沪ICP备19007182号-1</el-link>
        </p>
      </el-card>
    </el-scrollbar>
  </aside>
</template>

<script>
import { getHotTopic } from '@/api'
import { mixins } from './mixin'

export default {
  mixins: [mixins],
  data() {
    return {
      hotTopic: []
    }
  },
  created(){
    this.initHotTopic()
  },
  methods: {
    initHotTopic() {
      getHotTopic({
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.hotTopic = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

aside {
  width: 250px;
  height: 100%;
  padding: 0;
  margin-right: 15px;
  .scrollbar {
    width: 100%;
    height: 100%;
  }
  .copy {
    font-size: 14px;
    color: $light;
    p {
      margin-bottom: 8px;
    }
  }
}
</style>
