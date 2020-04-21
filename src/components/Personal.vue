<template>
  <el-card v-if="user != null" class="personal">
    <i v-if="type == 1" class="iconfont icon-close" @click="handleLogout"></i>
    <el-avatar class="avatar" :size="70" :src="user.head_portrait" />
    <div class="name">
      <el-link @click="handleGo(user)" :title="user.name">{{user.name}}</el-link>
      <i class="el-icon-male"></i>
    </div>
    <el-row>
      <el-col :span="6">
        <div class="text">店铺商品</div>
        {{ user.agent_goods_num }}
      </el-col>
      <el-col :span="6">
        <div class="text">粉丝</div>
        {{ user.fans_num }}
      </el-col>
      <el-col :span="6">
        <div class="text">动态</div>
        {{ user.dynamic_num }}
      </el-col>
      <el-col :span="6">
        <div class="text">收藏</div>
        {{ user.collect_num }}
      </el-col>
    </el-row>
    <p>
      <span> {{ user.profile | profileHtml}}</span>
      <el-link type="info" v-if="user.profile.length > 200">[查看全部]</el-link>
    </p>
    <el-row class="tags">
      <span v-for="(item, index) in label" :key="index">{{ item.name }}</span>
      <span v-if="type == 1">+添加</span>
    </el-row>
  </el-card>
</template>

<script>
import { getUser, getUserLabel } from '@/api'
export default {
  props: {
    type: {
      type: Number,
      default: null
    },
    url: {
      type: String,
      default: ''
    }
  },
  filters: {
    profileHtml(date) {
      if (date.length > 200) {
        return date.substring(0, 200) + '...'
      } else {
        return date || '喜欢的东西在变，买的东西在变，卖的东西在变，我的店铺随我改变。百铺，每个人的店铺'
      }
    }
  },
  data() {
    return {
      user: null,
      label: []
    }
  },
  created() {
    this.init()
    this.initLabel()
  },
  methods: {
    init() {
      getUser({
        request_id: this.$route.query.id || this.$store.getters.user_id,
        user_id: this.$store.getters.user_id,
        type: 1,
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.user = res.data
        }
      })
    },
    initLabel() {
      getUserLabel({
        user_id: this.$route.query.id || this.$store.getters.user_id,
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.label = res.data
        }
      })
    },
    handleGo(user) {
      if(this.type == 1) {
        this.$router.push(`/mySelf`)
      }else {
        this.$router.push(`/profile?id=${user.user_id}`)
      }
    },
    // 退出登录
    handleLogout() {
      this.$confirm('此操作退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout').then(res => {
          this.$router.push(`/`)
          this.$message({
            type: 'success',
            message: '退登成功!'
          });
        })
      }).catch(() => {         
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.personal {
  text-align: center;
  position: relative;
  .icon-close {
    position: absolute;
    top: 15px;
    right: 15px;
    color: $light;
    cursor: pointer;
  }
  .el-row {
    margin-top: 10px;
  }
  .name {
    font-size: 20px;
    i {
      color: #EF375A;
      position: relative;
      top: 4px;
    }
  }
  .text {
    font-size: 12px;
    color: #889199;
  }
  p {
    text-align: left;
  }
  .tags {
    text-align: left;
    span {
      height: 24px;
      line-height: 24px;
      border-radius: 3px;
      border: 1px solid #c5d0d9;
      color: #889199;
      padding: 0 5px;
      margin-bottom: 5px;
      margin-right: 5px;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>