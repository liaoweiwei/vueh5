<template>
  <div v-if="goods != null" class="goods">
    <div class="goods-header clearfix">
      <div  class="pull-left" @click="handleClose">
        <span slot="icon" class="svg-container">
          <svg-icon icon-class="back" />
        </span>
      </div>
      <div class="title">商品详情</div>
    </div>
    <div class="carousel">
      <img :src="goods.goods_main_img" width="100%" height="auto" class="carousel-image"/>
      <el-carousel> 
        <el-carousel-item v-for="(thumb, index) in goods.goods_detail_img" :key="index">
          <img :src="thumb" width="100%" height="auto"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="goods-body">
      <h3>{{ goods.goods_title }}</h3>
      <p>
        <span class="price">{{`${$t('goods.money')}`}}{{goods.goods_price}}</span>
        <mark v-if="goods.is_agent == false">{{$t('goods.commission')}} {{$t('goods.money')}} {{goods.commission}}</mark>
      </p>
      <p>
        <el-button type="primary" @click="onAgent(goods)">{{goods.is_agent == false ? `${$t('goods.agent')}`:`${$t('goods.agentcancel')}`}}</el-button>
        <el-button type="danger" plain v-if="goods.is_agent == false" @click="onQrcode">{{$t('goods.puy')}}</el-button>
      </p>
    </div>
    <div v-if="goods.type == 1" class="goods-desc">
      <h3 class="title">商品描述</h3>
      <p>{{goods.brand}}</p>
      <p>{{goods.description}}</p>
      <p>{{goods.description_short}}</p>
    </div>
  </div>
</template>

<script>
 import { commonMixin } from '../mixin'
  import { getAgentGoods, getAgentGoodsCancel } from '@/api';

  export default {
    props: {
      goods: {
        type: Object,
        default: null
      },
      close: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        imgList: [],
        finished: false,
        imgHeight: '300px'
      }
    },
    mixins: [commonMixin],
    methods: {
      handleClose() {
        this.$emit('close')
      },
      onTbkcompon(goods){
        if(goods.coupon_id == 0) {
          window.open(goods.tbk_url, '_blank')
        }else {
          window.open(goods.tbk_coupon_url, '_blank')
        }
      },
      onAgent(goods) {
        // 是否登录
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        if(goods.is_agent == true) {
          getAgentGoodsCancel({
            goods_id: goods.id,
            user_id: this.$store.getters.user_id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              goods.is_agent = false
            }else {
              this.$message.error(res.msg)
            } 
          })
        }else {
          getAgentGoods({
            goods_id: goods.id,
            user_id: this.$store.getters.user_id,
            time: Date.parse(new Date()) / 1000
          }).then(res=> {
            if (Number(res.code) === 0) {
              goods.is_agent = true
            }else {
              this.$message.error(res.msg)
            }
          })
        }
      },
      onGoods(data) {
        this.parentHandleData(data)
      }
    }
  };
</script>

<style lang="less" scoped>
.goods {
  &-header {
    background-color: #fff;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    overflow: hidden;
    .svg-container {
      font-size: 1.25rem;
      cursor: pointer;
      color: #889199;
    }
    .title {
      text-align: center;
    }
  }
  &-body {
    background-color: #fff;
    padding: 5px 15px 10px;
    h3 {
      font-size: 16px;
      font-weight: normal;
    }
    .price {
      font-size: 20px;
      color: rgba(236,20,85,1);
      margin-right: 10px;
    }
    mark {
      background:#FDE2EA;
      border-radius: 8px 2px 8px 2px;
      font-size: 10px;
      padding: 3px 8px;
      color: #EC1455;
    }
  }
  &-desc {
    padding: 5px 15px;
    background-color: #fff;
    margin-top: 10px;
    h3 {
      font-size: 16px;
      font-weight: normal;
    }
  }
}
</style>
