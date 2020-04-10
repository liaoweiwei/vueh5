<template>
  <div @click="onClick(data)">
    <div class="madius">
      <div class="madius-head">
        <div class="madius-image">
          <el-image :src="data.goods_main_img"></el-image>
        </div>
      </div>
      <div class="madius-body">
        <div class="madius-title">{{ data.goods_title }}</div>
        <div>
          <small class="madius-price">{{$t('goods.money')}} {{data.goods_price}}</small>
          <!-- <small class="madius-value"> {{data.seller_num}} {{$t('goods.sold')}}</small> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ShopItem',
    props: {
      data: {
        type: Object,
        default: null
      },
      open: {
        type: Function,
        default: null
      }
    },
    methods: {
      onClick(data){
        this.$emit('open', data)
      }
    }
  }
</script>
