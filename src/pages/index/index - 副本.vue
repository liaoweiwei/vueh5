<template>
  <div class="app-wrapper">
    <section class="container clearfix">
      <sidebar />
      <div class="app-mian clearfix">
        <el-tabs v-model="activeName" :stretch="false" class="tabs" @tab-click="handleClick">
          <el-tab-pane v-for="(tab, index) in tabs" :key="index" :label="tab.name"></el-tab-pane>
        </el-tabs>
        <div v-if="drawer" class="block left pull-left">
          <el-scrollbar :horizontal="false">
            <Drawernote v-if="type == 0" :details="details" @close="drawer = false" />
            <Drawershop v-if="type == 2" :goods="goods" @close="drawer = false" />
          </el-scrollbar>
        </div>
        <div class="block right">
          <el-scrollbar :horizontal="false">
            <div :class="{'watfill-2': drawer == true }" class="watfill">
              <wat-item class="watfill-box" v-for="(item, indx) in imgList" :key="indx" :data="item" @open="onHandle" />
            </div>
            <div v-if="loading" class="text-center">{{$t("common.loading")}}</div>
            <div v-if="!finished && !loading" class="text-center" style="padding: 5px 0">
              <el-link @click="onmore">查看更多</el-link>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import WatItem from '@/components/watItem'
import { getInterestLabel, getFind, getDynamicDetail, getGoodsDetail } from '@/api'
import Drawernote from '@/components/drawer/note'
import Drawershop from '@/components/drawer/shop'

export default {
  name: 'Home',
  components: {
    Sidebar,
    WatItem,
    Drawernote,
    Drawershop
  },
  data() {
    return {
      tabs: [],
      imgList: [],
      page: 1,
      activeName: 0,
      activeId: 0,
      loading: false,
      prevent: false,
      finished: false,
      drawer: false,
      type: 0,
      details: null,
      goods: null
    }
  },
  created() {
    this.init()
    this.initFind()
  },
  methods: {
    parentHandle(data){
      this.type = data.type;
      if(data.type == 0) {
        getDynamicDetail({
          user_id: this.$store.getters.user_id,
          dynamic_id: data.id,
          time: Date.parse(new Date()) / 1000
        }).then(res=> {
          if(Number(res.code) === 0) {
            this.details = res.data;
            this.drawer = true
          }
        })
      }else if(data.type == 2){
        getGoodsDetail({
          goods_id: data.id,
          user_id: this.$store.getters.user_id,
          agent_goods_user: data.agent_goods_user,
          time: Date.parse(new Date()) / 1000
        }).then(res => {
          if(Number(res.code) == 0) {
            if(!Array.isArray(res.data)) {
              this.goods = res.data;
              this.drawer = true
            }
          }
        })
      }
    },
    initFind(){
      if(this.prevent) {
        return 
      }
      if(this.finished) {
        return 
      }
      this.prevent = true
      this.loading = true
      setTimeout(() => {
        getFind({
          user_id: this.$store.getters.user_id,
          page: this.page,
          prepage: 16,
          interest_label: this.activeId,
          time: Date.parse(new Date()) / 1000
        }).then(res => {
          if (Number(res.code) === 0) {
            this.page++
            const data = res.data
            for(let i = 0; i < data.length; i++) {
              this.imgList.push(data[i])
            }
            this.loading = false
            this.prevent = false
            // // 数据全部加载完成
            if (data.length < 16) {
              this.finished = true
            }
          }else {
            this.loading = false
            this.prevent = false
            this.finished = true
          }
        })    
      }, 500)
    },
    init() {
      getInterestLabel({
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.tabs = [{ id: 0, name: this.$t("common.all") }]
          const data = res.data
          for (const i in data) {
            this.tabs.push(data[i])
          }
        }
      })
    },
    onmore(){
      this.initFind()
    },
    handleClick(tab) {
      this.imgList = []
      this.page = 1
      this.loading = false
      this.prevent = false
      this.finished = false
      this.activeId = this.tabs[tab.index].id
      this.initFind()
    }, 
    onHandle(data) {
      this.type = 0
      getDynamicDetail({
        user_id: this.$store.getters.user_id,
        dynamic_id: data.id,
        time: Date.parse(new Date()) / 1000
      }).then(res=> {
        if(Number(res.code) === 0) {
          this.details = res.data;
          this.drawer = true
        }
      })
    }
    // handleDownload(imgUrl) {
    //   const fileUrl = location.href + imgUrl
    //   // 浏览器支持fetch则用blob下载，避免浏览器点击a标签，跳转到新页面预览的行为
    //   if (window.fetch) {
    //     fetch(fileUrl)
    //       .then(res => res.blob())
    //       .then(blob => {
    //         let a = document.createElement('a')
    //         let url = window.URL.createObjectURL(blob)
    //         a.href = url
    //         a.download = '二维码'
    //         a.click()
    //       })
    //   } else {
    //     let a = document.createElement('a')
    //     a.href = fileUrl
    //     a.target = '_blank'
    //     a.download = '二维码'
    //     a.click()
    //   }
    // }
  }
}
</script>

