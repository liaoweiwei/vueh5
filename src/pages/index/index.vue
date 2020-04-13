<template>
  <div>
    <Header />
    <div class="page">
      <div class="container">
        <Sidebar />
        <div class="main-container">
          <el-tabs v-model="active" :stretch="false" @tab-click="handleTab">
            <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.name"></el-tab-pane>
          </el-tabs>
          <div class="splitter-container clearfix">
            <div v-if="spread" class="splitter-pane Left fl">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <Dynamic :dynamic="dynamic" />
                <Goods :goods="goods" />
              </el-scrollbar>
            </div>
            <div class="splitter-pane">
              <el-scrollbar class="scrollbar" :horizontal="false">
                <div style="padding-bottom: 40px">
                  <div :class="{'watfill-4': spread == false }" class="watfill">
                    <el-card v-for="(item, index) in imgList" :key="index" :body-style="{ padding: '0px' }" class="watfill-box">
                      <div v-if="Object.keys(item.video).length === 0" @click="handleDynamic(item)">
                        <img :src="item.main_img.url" width="100%" height="auto" class="image">
                      </div>
                      <div v-else @click="handleDynamic(item)">
                        <img :src="item.video.video_frontcover" width="100%" height="auto" class="image">
                        <i class="el-icon-video-play"></i>
                      </div>
                      <div class="body">
                        <div v-if="item.title" class="title">
                          <el-link @click="handleDynamic(item)">{{ item.title }}</el-link>
                        </div>
                        <div class="user clearfix">
                          <el-popover placement="top-start" width="200" offset="10" trigger="hover">
                            <el-avatar slot="reference" class="fl" :size="32" :src="item.user_head_portrait" />
                            <div class="popover">
                              <el-avatar class="avatar" :size="60" :src="item.user_head_portrait" />
                              <div class="name">
                                <el-link :to="`profile?id=${item.user_id}`">{{item.user_nick_name}}</el-link>
                              </div>
                              <el-row>
                                <el-col :span="8">
                                  <div class="text">店铺商品</div>
                                  {{ item.agent_goods_num }}
                                </el-col>
                                <el-col :span="8">
                                  <div class="text">粉丝</div>
                                  {{ item.fans_num }}
                                </el-col>
                                <el-col :span="8">
                                  <div class="text">动态</div>
                                  {{ item.dynamic_num }}
                                </el-col>
                              </el-row>
                              <el-row>
                                <el-button :type="item.is_follow ? '':'danger'" size="medium" :icon="item.is_follow ? 'el-icon-check':'el-icon-plus'">{{item.is_follow ? '已关注':'关注'}}</el-button>
                                <el-button size="medium">私信</el-button>
                              </el-row>
                            </div>
                          </el-popover>
                          <small class="fr">{{item.create_time }}</small>
                          <div class="user-body">
                            <el-link :to="`profile?id=${item.user_id}`" class="name">{{item.user_nick_name}}</el-link>
                          </div>
                        </div>
                      </div>
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
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 组件引用
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Goods from '@/components/Goods'
import Dynamic from '@/components/Dynamic'
import { getInterestLabel, getFind, getDynamicDetail, getGoodsDetail } from '@/api'

export default {
  data () {
    return {
      tabs: [],
      active: 0,
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
    Dynamic
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
      this.active = this.tabs[tab.index].id
      this.init()
    },
    handleMore() {
      this.init()
    }
  }
}
</script>
