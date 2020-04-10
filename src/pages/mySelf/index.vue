<template>
  <div class="app-wrapper">
    <section class="container clearfix">
      <sidebar />
      <div class="app-mian inside clearfix">
        <div v-if="drawer" class="block left pull-left">
          <el-scrollbar :horizontal="false">
            <Drawernote v-if="type == 0" :details="details" @close="drawer = false" />
            <Drawershop v-if="type == 2" :goods="goods" @close="drawer = false" />
          </el-scrollbar>
        </div>
        <div class="block right">
          <el-tabs v-model="activeName" class="tabs tabs-center" @tab-click="ontabs">
            <el-tab-pane :label="$t('common.dynamic')" name="dynamic" />
            <el-tab-pane :label="$t('common.shop')" name="shop" />
            <el-tab-pane :label="$t('common.collection')" name="collection" />
          </el-tabs>
          <el-scrollbar :horizontal="false">
            <div v-if="activeName == 'dynamic'" :class="{'watfill-2': drawer == true }" class="watfill">
              <wat-item class="watfill-box" v-for="(item, indx) in imgList" :key="indx" :data="item" @open="onDynamicHandle" />
            </div>
            <div v-if="activeName == 'shop'" :class="{'watfill-2': drawer == true }" class="watfill">
              <shop-item class="watfill-box" v-for="(item, indx) in imgList" :key="indx" :data="item" @open="onShopHandle"/>
            </div>
            <div v-if="activeName == 'collection'" :class="{'watfill-2': drawer == true }" class="watfill">
              <div class="watfill-box" v-for="(item, indx) in imgList" :key="indx">
                <wat-item v-if="item.type == 1" :data="item.note" @open="onDynamicHandle" />
                <shop-item v-if="item.type == 2" :data="item.goods" @open="onShopHandle"/>
              </div>
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
import ShopItem from '@/components/shopItem'
import WatItem from '@/components/watItem'
import Drawernote from '@/components/drawer/note'
import Drawershop from '@/components/drawer/shop'
import { getDynamicDetail, getGoodsDetail, getCollectList, getUserDynamic, getUserGoods } from '@/api'


export default {
  name: 'MySelf',
  components: {
    Sidebar,
    ShopItem,
    WatItem,
    Drawernote,
    Drawershop
  },
  data() {
    return {
      details: null,
      goods: null,
      drawer: false,
      type: 0,
      loading: false,
      prevent: false,
      finished: false,
      activeName: 'shop',
      imgList: [],
      page: 1
    }
  },
  created() {
    this.init()
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
    init() {
      if(this.activeName == 'collection'){
        if(this.prevent) {
          return
        }
        if(this.finished) {
          return
        }
        this.prevent = true
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
      }else if(this.activeName == 'dynamic') {
        if(this.prevent) {
          return
        }
        if(this.finished) {
          return
        }
        this.prevent = true
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
      }else {
        if(this.prevent) {
          return
        }
        if(this.finished) {
          return
        }
        this.prevent = true
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
      }
    },
    ontabs() {
      this.imgList = []
      this.page = 1
      this.loading = false
      this.prevent = false
      this.finished = false
      this.init()
    },
    onmore() {
    },
    onDynamicHandle(data) {
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
    },
    onShopHandle(data){
      this.type = 2
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
  }
}
</script>
