<template>
  <!-- aside -->
  <aside class="aside pull-left">
    <el-scrollbar :horizontal="false">
      <el-card v-if="Number($store.getters.isAuthenticate) === 1 || $route.name === 'MySelf'" class="user">
        <a v-if="$route.name != 'MySelf'" 
        :title="$t('common.out')"
        href="javascript:;"
        class="out" 
        @click="onOut">
          <span slot="icon" class="svg-container">
            <svg-icon icon-class="out" />
          </span>
        </a>
        <router-link target="_blank" :to="`mySelf?id=${user.user_id}`">
          <el-avatar :size="80" :src="user.head_portrait" class="avatar"></el-avatar>
        </router-link>
        <div class="name">
          <router-link target="_blank" :to="`mySelf?id=${user.user_id}`">
            {{user.name}}
          </router-link>
          <span slot="icon" class="svg-container">
            <svg-icon icon-class="male" />
          </span>
        </div>
        <div class="grid">
          <div class="grid-item">
            <div class="grid-name">{{$t('common.follow')}}</div>
            {{ user.follow_num }}
          </div>
          <div class="grid-item">
            <div class="grid-name">{{$t('common.fans')}}</div>
            {{ user.fans_num }}
          </div>
          <div class="grid-item">
            <div class="grid-name">{{$t('common.dynamic')}}</div>
            {{ user.dynamic_num }}
          </div>
          <div class="grid-item">
            <div class="grid-name">{{$t('common.collection')}}</div>
            {{ user.collect_num }}
          </div>
        </div>
        <p>
          {{ user.profile ||  $t('common.bioText') | fontNumber }}
          <el-link v-if="user.profile.length >= 150" 
            type="primary" 
            @click="onQrcode">
            <small>[{{$t('common.more')}}]</small>
          </el-link>
        </p>
        <div>
          <span v-for="(item, index) in tagList" :key="index" class="tag">{{ item.name }}</span>
          <span class="add" @click="onQrcode">+{{$t('common.add')}}</span>
        </div>
      </el-card>
      <el-card v-else class="login card">
        <p>{{$t('login.desc')}}</p>
        <el-button type="primary" class="button-block" @click="onVisible">{{$t('login.login')}} | {{$t('login.signUp')}}</el-button>
        <el-row class="third-party">
          <el-col :span="12" >
            <a href="javascript:;" 
            class="qq">
              <span class="svg-container">
                <svg-icon icon-class="QQ" />
              </span>
              QQ
            </a>
          </el-col>
          <el-col :span="12">
            <a href="javascript:;" 
            class="weixin">
              <span class="svg-container">
                <svg-icon icon-class="weixin" />
              </span>
              微信
            </a>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          <span>{{$t('common.hot')}}</span>
        </div>
        <ul class="hot-list">
          <li v-for="(item, index) in hotTopic" :key="index">
            <el-link type="primary" @click="onQrcode">{{ item.name }}</el-link>
          </li>
        </ul>
        <div class="lr-foot">
          <el-link type="info" :underline="false" @click="onQrcode">
            {{$t('common.more')}}
            <span slot="icon" class="svg-container">
              <svg-icon icon-class="right" />
            </span>
          </el-link>
        </div>
      </el-card>
      <el-card>
        <p>Copyright ©2019 BAIPU, All Rights Reserved &nbsp;|&nbsp; <a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备19007182号-1</a><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502005025"><img src="/static/images/beian.png" width="15" height="15" />沪公网安备 31010502005025号</a></p>
      </el-card>
    </el-scrollbar>
  </aside>
</template>
<script>
import { getUser, getUserLabel, getHotTopic } from '@/api'
import { commonMixin } from '../mixin'

export default {
  name: 'Sidebar',
  filters: {
    fontNumber(date) {
      const length = date.length
      if (length > 150) {
        var str = ''
        str = date.substring(0, 150) + '...'
        return str
      } else {
        return date
      }
    }
  },
  mixins: [commonMixin],
  data() {
    return {
      user: {
        agent_goods_num: 0,
        area: '',
        collect_num: 0,
        dynamic_num: 0,
        fans_num: 0,
        follow_brand_num: 0,
        follow_num: 0,
        follow_topic_num: 0,
        head_portrait: '',
        is_follow: false,
        level: '',
        like_num: 0,
        name: '',
        profile: '',
        role_type: 0,
        setup_time: '',
        sex: '1',
        user_id: ''
      },
      tagList: [],
      hotTopic: []
    }
  },
  watch: {
    '$route': function() {
      // 执行数据更新查询
      this.init()
      this.initHot()
    },
    '$store.getters.user_id': function() {
      this.init()
      this.initHot()
    }
  },
  created() {
    this.init()
    this.initHot()
  },
  methods: {
    getRandomColor() {
      const peoples = ['#8B7CDC', '#67BEF8', '#71CC51', '#FFB84E', '#F88686']
      let rand = Math.floor( Math.random() * peoples.length );
      return rand
    },
    init() {
      getUser({
        request_id: this.$route.query.id || this.$store.getters.user_id,
        user_id: this.$store.getters.user_id,
        type: 1,
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.user = res.data
          this.initLabel(res.data.user_id)
        }
      })
    },
    initHot() {
      getHotTopic({
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.hotTopic = res.data
        }
      })
    },
    initLabel(id) {
      getUserLabel({
        user_id: id,
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          const data = res.data
          for (const i in data) {
            data[i].color = this.getRandomColor()
            this.tagList.push(data[i])
          }
        }
      })
    },
    onVisible() {
      this.$store.commit('loginDialogVisible', true)
    },
    // 退出登录
    onOut() {
      this.$store.dispatch('removeLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 270px;
  height: 100%;
  margin-right: 15px;
  .el-scrollbar {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
  .el-card {
    margin-bottom: 15px;
  }
  .user {
    font-size: 12px;
    position: relative;
    line-height: 20px;
    .out {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 18px;
      color: #889199;
    }
    .avatar {
      border: 2px solid #f13500;
      display: block;
      margin: 0 auto;
      cursor: pointer;
      background: #fff;
    }
    .name {
      color: #000000;
      text-align: center;
      font-size: 14px;
      margin: 10px 0;
      cursor: pointer;
      .svg-container {
        color: #EC1455;
      }
    }
    .grid {
      text-align: center;
      margin: 15px 0;
      .grid-item {
        margin-right: 15px;
        display: inline-block;
      }
      .grid-name {
        color: #889199;
      }
    }
    .label {
      color: #889199;
    }
    .tag,
    .add {
      border-radius:4px;
      height:20px;
      line-height: 20px;
      border:1px solid rgba(197,208,217,1);
      color: #889199;
      padding: 0 4px;
      margin-right: 5px;
      display: inline-block;
      cursor: pointer;
    }
  }
  .login {
    text-align: center;
    p {
      color: #889199;
      font-size: 12px;
    }
  }
  .hot-list {
    margin: 0;
    padding: 0;
    li {
      margin-bottom: 6px;
      line-height: 17px;
    }
  }
  .lr-foot {
    text-align: right;
    margin: 10px -20px -20px;
    padding: 12px;
    border-top: 1px solid #EBEEF5;
    font-size: 12px;
  }
}
</style>
