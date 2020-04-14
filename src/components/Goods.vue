<template>
  <div v-if="goods != null" class="goods">
    <el-card :body-style="{ padding: '0px 15px 15px' }">
      <div slot="header" class="clearfix">
        <i class="el-icon-arrow-left fl"></i>
        <div class="title">商品详情</div>
      </div>
      <div class="carousel">
        <img :src="goods.goods_main_img" width="100%" height="auto" class="image"/>
        <el-carousel> 
          <el-carousel-item v-for="(thumb, index) in goods.goods_detail_img" :key="index">
            <img :src="thumb" width="100%" height="auto"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <h3 class="title">{{ goods.goods_title }}</h3>
      <p>
        <span class="price">￥{{goods.goods_price}}</span>
        <mark v-if="goods.is_agent == false">预估收益￥{{goods.commission}}</mark>
      </p>
      <el-row>
        <el-button type="primary">一键代理</el-button>
        <el-button type="danger">领劵购买</el-button>
      </el-row>
    </el-card>
    <el-card class="pad-10">
      <h3 class="title">商品描述</h3>
      <p>{{goods.brand}}</p>
      <p>{{goods.description}}</p>
      <p>{{goods.description_short}}</p>
    </el-card>
  </div>
</template>

<script>

export default {
  props: {
    goods: {
      type: Object,
      default: null  
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.goods {

}
</style>