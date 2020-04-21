<template>
  <el-form class="search fr">
    <el-select
      v-model="value"
      filterable
      remote
      size="small"
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
      loading-text="加载中..."
      @change="onChange"
      >
      <template slot="prefix">
        <i class="el-icon-search"></i>
      </template>
      <el-option
        v-for="(item, index) in list"
        :key="index" 
        :value="item">
        <i v-if="item.type == 0" class="el-icon-tickets"></i>
        <i v-if="item.type == 2" class="el-icon-shopping-bag-2"></i>
        <i v-if="item.type == 3" class="el-icon-user"></i>
        {{ item.label | labelHtml }}
      </el-option>
    </el-select>
  </el-form>
</template>

<script>
import { getSearch } from '@/api'

export default {
  filters: {
    labelHtml(date) {
      if (date.length > 24) {
        return date.substring(0, 24) + '...'
      } else {
        return date
      }
    }
  },
  data() {
    return {
      list: [],
      value: '',
      loading: false
    }
  },
  methods: {
     remoteMethod(query) {
      this.list =[]
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          getSearch({
            keywords: query,
            type: 1,
            user_id: this.$store.getters.user_id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            this.loading = false;
             if (Number(res.code) === 0) {
              const {data} = res;
              for(let i in data.dynamic) {
                const obj = {
                  value: `dynamic${data.dynamic[i].id}`,
                  id: data.dynamic[i].id,
                  label: data.dynamic[i].title,
                  type: 0,
                }
                this.list.push(obj)
              }
              for(let i in data.goods) {
                const obj = {
                  value: `goods${data.goods[i].id}`,
                  id: data.goods[i].id,
                  label: data.goods[i].goods_title,
                  type: 2,
                }
                this.list.push(obj)
              }

              for(let i in data.user) {
                const obj = {
                  value: `user${data.user[i].user_id}`,
                  id: data.user[i].user_id,
                  label: data.user[i].nick_name,
                  type: 3,
                }
                this.list.push(obj)
              }
            }
          })
        }, 200);
      }
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search {
  padding:2px 0;
  .el-icon-search {
    position: relative;
    left: 5px;
    top: 50%;
    transform: translateY(-50%); 
  }
}
</style>