<template>
  <div v-if="goods != null" class="goods">
    <el-card :body-style="{ padding: '0px 15px 15px' }">
      <div slot="header" class="goods-header clearfix">
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
        <mark v-if="goods.is_agent == false && Object.keys(goods.agent_user_info).length == 0">预估收益￥{{goods.commission}}</mark>
      </p>
      <el-row>
        <el-button  v-if="Object.keys(goods.agent_user_info).length == 0 || goods.agent_user_info.id == $store.getters.user_id" type="primary">{{goods.is_agent == false ? '一键代理':'取消代理'}}</el-button>
        <el-button type="danger" @click="onHref(goods)">领劵购买</el-button>
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
    onHref(goods){
      if(goods.coupon_id == 0){
        window.open(goods.tbk_url);
      }else {
        window.open(goods.tbk_coupon_url);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.goods {
  .goods-header {
    margin: -15px 0;
    .el-icon-arrow-left {
      font-size: 25px;
    }
    .title {
      font-size: 18px;
      text-align: center;
    }
  }
  .title {
    font-size: 16px;
    margin: 10px 0 15px;
  }
  mark {
    background:#FDE2EA;
    border-radius: 8px 2px 8px 2px;
    font-size: 10px;
    padding: 3px 8px;
    color: #EC1455;
  }
  .carousel {
    position: relative;
    .el-carousel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    } 
  }
}
</style>