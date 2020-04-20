<template>
  <div>
    <Header />
    <div class="page pt-10">
      <div class="container">
        <Sidebar>
          <Personal :type="1"/>
        </Sidebar>
        <div class="main-container">
          <div class="splitter-container clearfix">
            <div v-if="spread" class="splitter-pane Left fl">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <Dynamic v-if="role_type == 1" :dynamic="dynamic" />
                <Goods v-if="role_type == 2" :goods="goods" />
              </el-scrollbar>
            </div>
            <div class="splitter-pane">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <el-tabs v-model="active" :stretch="false" @tab-click="handleTab" class="tabs-1">
                  <el-tab-pane v-for="(tab, index) in tabs" :key="index" :name="tab.type" :label="tab.name"></el-tab-pane>
                </el-tabs>
                <div v-if="active == 'dynamic'" :class="{'watfill-4': spread == false }" class="watfill" style="margin-top: 50px">
                  <el-card v-for="(item, index) in imgList" :key="index" :body-style="{ padding: '0px' }" class="watfill-box" @click="handleDynamic(item)">
                    <Watnote :note="item" @open="handleDynamic" />
                  </el-card>
                </div>
                <div v-if="active == 'shop'" :class="{'watfill-4': spread == false }" class="watfill" style="margin-top: 50px">
                  <el-card v-for="(item, index) in imgList" :key="index" :body-style="{ padding: '0px' }" class="watfill-box" @click="handleDynamic(item)">
                    <Watgoods :goods="item" @open="handleDynamic" />
                  </el-card>
                </div>
                <div v-if="active == 'collection'" :class="{'watfill-4': spread == false }" class="watfill" style="margin-top: 50px">
                  <el-card v-for="(item, index) in imgList" :key="index"  :body-style="{ padding: '0px' }" class="watfill-box" @click="handleDynamic(item)">
                    <Watnote v-if="item.type == 1" :note="item.note" @open="handleDynamic" />
                    <Watgoods v-if="item.type == 2" :goods="item.goods" @open="handleDynamic" />
                  </el-card>
                </div>
                <div v-if="finished && imgList.length == 0" class="image_None">
                  <img src="/static/images/image_None.png" width="200px" height="auto">
                  <div class="text-light">暂无相关动态</div>
                </div>
                <div v-if="loading" class="loading">
                  <i class="el-icon-loading"></i>
                  加载中...
                </div>
                <div v-if="!finished && !loading" class="more">
                  <el-link @click="handleMore">
                    查看更多
                  </el-link>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Poplogin :visible="$store.getters.login_visible" />
  </div>
</template>

<script>
// 组件引用
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Goods from '@/components/Goods'
import Dynamic from '@/components/Dynamic'
import Login from '@/components/Login.vue'
import Personal from '@/components/Personal.vue'
import Watnote from '@/components/Watnote.vue'
import Watgoods from '@/components/Watgoods.vue'
import Poplogin from '@/components/Poplogin.vue'
import { getDynamicDetail, getGoodsDetail, getCollectList, getUserDynamic, getUserGoods } from '@/api'

export default {
  data () {
    return {
      tabs: [
        {id: 1, name: '动态', type: 'dynamic'},
        {id: 2, name: '商品', type: 'shop'},
        {id: 3, name: '收藏', type: 'collection'}
      ],
      active: 'shop',
      imgList: [],
      page: 1,
      loading: false,
      prevent: true,
      finished: false,
      spread: false,
      role_type: 1,
      dynamic: null,
      goods: null,
    }
  },
  components: {
    Header,
    Sidebar,
    Goods,
    Dynamic,
    Login,
    Personal,
    Watnote,
    Watgoods,
    Poplogin
  },
  created() {
    this.init()
  },
  methods: {
    init(){
      switch(this.active) {
        case 'collection':
          if(!this.prevent) {
            return
          }
          this.prevent = false
          this.loading = true
          setTimeout(() => {
            getCollectList({
              user_id: this.$route.query.id,
              page: this.page,
              prepage: 12,
              time: Date.parse(new Date()) / 1000
            }).then(res => {
              if (Number(res.code) === 0) {
                const data = res.data
                for(let i = 0; i < data.length; i++) {
                  this.imgList.push(data[i])
                }
                this.page++
                this.loading = false
                this.prevent = true
                // // 数据全部加载完成
                if (data.length < 16) {
                  this.finished = true
                }
              }
            })
          }, 500)
          break;
        case 'dynamic':
          if(!this.prevent) {
            return
          }
          this.prevent = false
          this.loading = true
          setTimeout(() => {
            getUserDynamic({
              request_id: this.$route.query.id,
              page: this.page,
              prepage: 12,
              type: 1,
              time: Date.parse(new Date()) / 1000
            }).then(res => {
              if (Number(res.code) === 0) {
                const data = res.data
                for(let i = 0; i < data.length; i++) {
                  this.imgList.push(data[i])
                }
                this.page++
                this.loading = false
                this.prevent = true
                // // 数据全部加载完成
                if (data.length < 16) {
                  this.finished = true
                }
              }
            })
          }, 500)
          break;
        default:
          if(!this.prevent) {
            return
          }
          this.prevent = false
          this.loading = true
          setTimeout(() => {
            getUserGoods({
              request_id: this.$route.query.id,
              type: 1,
              page: this.page,
              prepage: 12,
              time: Date.parse(new Date()) / 1000
            }).then(res => {
              if (Number(res.code) === 0) {
                const data = res.data
                for(let i = 0; i < data.length; i++) {
                  this.imgList.push(data[i])
                }
                this.page++
                this.loading = false
                this.prevent = true
                // // 数据全部加载完成
                if (data.length < 16) {
                  this.finished = true
                }
              }
            })
          }, 500)
      }
    },
    handleDynamic(data){
      this.role_type = data.role_type;
      if(this.role_type == 1) {
        getDynamicDetail({
          user_id: this.$store.getters.user_id,
          dynamic_id: data.id,
          time: Date.parse(new Date()) / 1000
        }).then(res=> {
          if(Number(res.code) === 0) {
            this.dynamic = res.data;
            this.spread = true
          }
        })
      }else if(this.role_type == 2){
        getGoodsDetail({
          goods_id: data.id,
          user_id: this.$store.getters.user_id,
          agent_goods_user: data.agent_goods_user,
          time: Date.parse(new Date()) / 1000
        }).then(res => {
          if(Number(res.code) == 0) {
            if(!Array.isArray(res.data)) {
              this.goods = res.data;
              this.spread = true
            }
          }
        })
      }
    },
    handleTab(tab) {
      this.imgList = []
      this.page = 1
      this.loading = false
      this.prevent = true
      this.finished = false
      this.active = String(this.tabs[tab.index].type)
      this.init()
    },
    handleMore() {
      this.init()
    }
  }
}
</script>
