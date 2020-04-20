<template>
  <a v-if="goods != null" href="javascript:;" @click="handleGoods(goods)">
    <div>
      <img :src="goods.goods_main_img" width="100%" height="auto" >
    </div>
    <div class="body">
      <el-link class="title">{{ goods.goods_title }}</el-link>
      <div class="text-danger">{{goods.goods_price}}</div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: null
    },
    open: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleGoods(goods){
      this.$emit('open', {
        id: goods.id,
        agent_goods_user: goods.agent_goods_user,
        role_type: 2
      })
    }
  }
}
</script>