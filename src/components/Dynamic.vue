<template>
  <div v-if="dynamic != null" class="dynamic">
    <el-card :body-style="{ padding: '0px 15px 15px' }">
      <div slot="header" class="dynamic-header clearfix">
        <i class="el-icon-arrow-left fl" @click="handleClose"></i>
        <el-popover placement="bottom-start" width="100" trigger="hover">
          <i slot="reference" class="el-icon-more fl"></i>
          <!-- <ul>
            <li><a href="javascript:;">不感兴趣</a></li>
            <li><a href="javascript:;" @click="onblacklist(details)">不看该作者</a></li>
            <li @click="onQrcode">
              <a href="javascript:;">问题反馈</a>
            </li>
          </ul> -->
        </el-popover>
        <router-link :to="`profile?id=${dynamic.user_id}`" class="user clearfix">
          <el-avatar class="fr" :size="42" :src="dynamic.head_portrait" />
          <div class="user-body">
            <div class="title">{{dynamic.nick_name}}</div>
            <div class="date">{{dynamic.publish_time}}</div>
          </div>
        </router-link>
      </div>
      <carousel :list="dynamic.images" :url="dynamic.main_img.url" />
      <h3 v-if="dynamic.title" class="title">{{dynamic.title}}</h3>
      <p v-if="dynamic.content" v-html="dynamic.content.replace(/(\r\n|\n|\r)/gm, '<br/>')" class="content"></p>
      <el-row v-if="dynamic.topic.length > 0">
        <el-link type="primary" v-for="(label,index) in dynamic.topic" :key="index">{{`#${label.name}`}}</el-link>
      </el-row>
      <el-row v-if="dynamic.goods.length > 0">
        <el-carousel arrow="never" indicator-position="none" height="80px" class="goods">
          <el-carousel-item v-for="(item,index) in dynamic.goods" :key="index">
            <div class="item clearfix">
              <div class="images">
                <img :src="item.goods_main_img" width="100%" height="auto"/>
              </div>
              <div class="body">
                <div class="title">{{item.goods_title}}</div>
                <div class="price">￥{{item.goods_price}}</div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-row>
      <el-row class="anticon">
        <span :class="{'active': dynamic.is_like == true }" class="item">
          <i class="el-icon-star-off"></i>
          <span class="text">{{ dynamic.like_num }}</span>
        </span>
        <span :class="{'active': dynamic.is_collect == true }" class="item">
          <i :class="dynamic.is_collect == false ? 'el-icon-star-off':'el-icon-star-on'"></i>
          <span class="text">{{ dynamic.collect_num }}</span>
        </span>
        <span class="item">
          <i class="el-icon-chat-dot-square"></i>
          <span class="text">{{ dynamic.comments_num }}</span>
        </span>
      </el-row>
    </el-card>
    <el-card class="pad-10">
      <div slot="header" style="margin: -7px 0">全部评论</div>
    </el-card>
    <el-card class="pad-10">
      <el-form ref="ruleForm">
        <el-input rows="3" type="textarea"></el-input>
        <el-button type="primary" size="small">发送</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'

export default {
  components: {
    Carousel
  },
  props: {
    dynamic: {
      type: Object,
      default: null  
    },
    close: {
      type: Function,
      default: null
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.dynamic {
  .dynamic-header {
    .el-icon-arrow-left,
    .el-icon-more {
      font-size: 25px;
      margin-top: 9px;
      cursor: pointer;
    }
  }
  .user {
    margin: -8px 0;
    text-align: right;
    display: block;
    .el-avatar {
      margin-left: 10px;
    }
    .user-body {
      overflow: hidden;
      padding: 2px 0;
    }
    .title {
      font-size: 15px;
      margin: 0 0 5px;
    }
    .date {
      font-size: 12px;
      color: #889199
    }
  }
  .title {
    font-size: 18px;
    margin: 10px 0;
  }
  .goods {
    overflow-y: hidden;
    .item {
      background: #F4F6FA;
      padding: 8px;
      cursor: pointer;
    }
    .images {
      width: 48px;
      margin-right: 10px;
      float: left;
    }
    .body {
      overflow: hidden;
    }
    .title {
      margin-bottom: 5px;
    }
    .price {
      color: #EC1455
    }
  }
  .anticon {
    margin-top: 15px;
    .item {
      font-size: 24px;
      display: inline-block;
      margin-right: 20px;
      cursor: pointer;
      color: #889199;
      &.active {
        color: #EC1455;
      }
    }
    .text {
      font-weight: lighter;
      font-size: 18px;
    }
  }
}
</style>