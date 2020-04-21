<template>
  <div>
    <Header>
      <Search />
    </Header>
    <div class="page pt-10">
      <div class="container">
        <Sidebar>
          <Login v-if="$store.getters.isAuthenticate != 1"/>
          <Personal v-else :type="1"/>
        </Sidebar>
        <div class="main-container">
          <el-tabs v-model="active" :stretch="false" @tab-click="handleTab">
            <el-tab-pane v-for="(tab, index) in tabs" :key="index" :name="`${tab.id}`" :label="tab.name"></el-tab-pane>
          </el-tabs>
          <div class="splitter-container clearfix pt-50">
            <div v-if="spread" class="splitter-pane Left fl">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <Dynamic v-if="role_type == 1" :dynamic="dynamic" @close="spread = false"/>
                <Goods v-if="role_type == 2" :goods="goods" @close="spread = false"/>
              </el-scrollbar>
            </div>
            <div class="splitter-pane">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <div :class="{'watfill-4': spread == false }" class="watfill">
                  <el-card v-for="(item, index) in imgList" :key="index" :body-style="{ padding: '0px' }" class="watfill-box">
                    <Watnote :note="item" @open="handleDynamic" />
                  </el-card>
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
import Poplogin from '@/components/Poplogin.vue'
import Search from '@/components/Search.vue'
import { getInterestLabel, getFind, getDynamicDetail, getGoodsDetail } from '@/api'

export default {
  data () {
    return {
      tabs: [],
      active: '0',
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
    Poplogin,
    Search
  },
  created() {
    this.init()
    this.initTab()
  },
  methods: {
    init(){
      if(!this.prevent) {
        return
      }
      this.prevent = false
      this.loading = true
      setTimeout(() => {
        getFind({
          user_id: this.$store.getters.user_id,
          page: this.page,
          prepage: 16,
          interest_label: this.active,
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
    },
    initTab() {
      getInterestLabel({
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          const list = [{ id: 0, name: '全部' }]
          this.tabs = [...list,...res.data]
        }
      })
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
      this.active = String(this.tabs[tab.index].id)
      this.init()
    },
    handleMore() {
      this.init()
    }
  }
}
</script>
