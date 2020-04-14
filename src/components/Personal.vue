<template>
  <el-card v-if="user != null" class="personal">
    <el-avatar class="avatar" :size="70" :src="user.head_portrait" />
    <div class="name">
      <el-link :href="url">{{user.name}}</el-link>
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
      {{ user.profile || '喜欢的东西在变，买的东西在变，卖的东西在变，我的店铺随我改变。百铺，每个人的店铺' }}
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
          console.log(res.data)
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
    }
  }
}
</script>

<style lang="scss" scoped>
.personal {
  text-align: center;
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
      border-radius: .25rem;
      height: 1.25rem;
      line-height: 1.25rem;
      border: .0625rem solid #c5d0d9;
      color: #889199;
      padding: 0 .25rem;
      margin-right: .3125rem;
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>