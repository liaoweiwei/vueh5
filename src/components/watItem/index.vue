<template>
  <div>
    <div class="madius">
      <div class="madius-head" @click="onClickData(data)">
        <div v-if="Object.keys(data.video).length === 0" class="madius-image">
          <img :src="data.main_img.url" width="100%" height="auto">
        </div>
        <div v-else class="madius-video">
          <img :src="data.video.video_frontcover" width="100%" height="auto">
          <span class="svg-container">
            <svg-icon icon-class="videofill" />
          </span>
        </div>
        <div 
        v-if="$store.getters.isAuthenticate == 1" 
        :class="{'active': data.is_like == true }"
        class="round like" 
        @click.stop.prevent="onLike(data)">
          <span class="svg-container">
            <svg-icon icon-class="appreciate" />
          </span>
        </div>
        <!-- <div 
        v-if="$store.getters.isAuthenticate == 1" 
        class="round more">
          <span class="svg-container">
            <svg-icon icon-class="more" />
          </span>
        </div> -->
      </div>
      <div class="madius-body">
        <div v-if="data.title" class="madius-title">{{ data.title }}</div>
        <div class="clearfix madius-user">
          <el-popover placement="top-start" width="200" offset="10" trigger="hover">
            <el-avatar slot="reference" class="pull-left" :size="24" :src="data.user_head_portrait"></el-avatar>
            <div class="popover">
              <router-link target="_blank" :to="`mySelf?id=${data.user_id}`">
                <el-avatar :size="60" :src="data.user_head_portrait"></el-avatar>
              </router-link>
              <div class="name">
                <router-link target="_blank" :to="`mySelf?id=${data.user_id}`">{{data.user_nick_name}}</router-link>
              </div>
              <el-row class="grids">
                <el-col :span="8">
                  <div class="text">{{$t('common.goods')}}</div>
                  {{ data.agent_goods_num }}
                </el-col>
                <el-col :span="8">
                  <div class="text">{{$t('common.fans')}}</div>
                  {{ data.fans_num }}
                </el-col>
                <el-col :span="8">
                  <div class="text">{{$t('common.dynamic')}}</div>
                  {{ data.dynamic_num }}
                </el-col>
              </el-row>
              <div>
                <el-button type="primary" size="small" v-if="!data.is_follow" @click.stop.prevent="onAddFollow(data)">{{$t('common.addFollow')}}</el-button>
                <el-button size="small" v-else @click.stop.prevent="onCancelFollow(data)">{{$t('common.followed')}}</el-button>
                <el-button type="danger" size="small" plain  @click.stop.prevent="onQrcode">{{$t('common.pm')}}</el-button>
              </div>
            </div>
          </el-popover>
          <small class="pull-right label">{{data.create_time | formatDiff }}</small>
          <div class="name">
            <router-link target="_blank" :to="`mySelf?id=${data.user_id}`">{{data.user_nick_name}}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { commonMixin } from '../mixin'
  import { 
    getFollowAdd, 
    getFollowCancel, 
    getLike, 
    getLikeCancel 
  } from '@/api'
  

  export default {
    name: 'WatItem',
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
    mixins: [commonMixin],
    methods: {
      onAddFollow(data) {
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        getFollowAdd({
          user_id: this.$store.getters.user_id,
          follow_id: data.user_id,
          type: 3,
          time: Date.parse(new Date()) / 1000
        }).then(res=> {
          if (Number(res.code) === 0) {
            data.is_follow = true
          }
        })
      },
      onCancelFollow(data) {
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        getFollowCancel({
          user_id: this.$store.getters.user_id,
          follow_id: data.user_id,
          type: 3,
          time: Date.parse(new Date()) / 1000
        }).then(res=> {
          if (Number(res.code) === 0) {
            data.is_follow = false
          }
        })
      },
      onClickData(data){
        this.$emit('open', data)
      },
      onLike(data){
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        if(!data.is_like) {
          getLike({
            user_id: this.$store.getters.user_id,
            type: data.dynamic_type,
            object_id: data.id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              data.is_like = true
              data.like_num = Number(data.like_num) + 1
            }
          })
        }else {
          getLikeCancel({
            user_id: this.$store.getters.user_id,
            type: data.dynamic_type,
            object_id: data.id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              data.is_like = false
              data.like_num = Number(data.like_num) - 1
            }
          })
        }
      }
    }
  }
</script>
