<template>
  <div v-if="details != null" class="note">
    <div class="note-header clearfix">
      <div  class="pull-left" @click="handleClose">
        <span slot="icon" class="svg-container">
          <svg-icon icon-class="back" />
        </span>
      </div>
      <el-popover placement="bottom-start" width="100" trigger="hover">
        <div slot="reference" class="pull-left">
          <span class="svg-container">
            <svg-icon icon-class="more" />
          </span>
        </div>
        <ul>
          <li><a href="javascript:;">不感兴趣</a></li>
          <li><a href="javascript:;" @click="onblacklist(details)">不看该作者</a></li>
          <li @click="onQrcode">
            <a href="javascript:;">问题反馈</a>
          </li>
        </ul>
      </el-popover>
      <router-link :to="`mySelf?id=${details.user_id}`" class="user clearfix">
        <el-avatar :size="42" :src="details.head_portrait" class="avatar pull-right"></el-avatar>
        <div class="user-body">
          <div class="name">{{details.nick_name}}</div>
          <div class="date">{{details.publish_time | formatDiff }}</div>
        </div>
      </router-link>
    </div>
    <div v-if="Object.keys(details.video).length > 0">
        <PayVideo :play_url="details.video.video_play_url" />
    </div>
    <div v-else class="carousel">
      <img :src="details.main_img.url" width="100%" height="auto" class="carousel-image"/>
      <el-carousel>
        <el-carousel-item v-for="(item,index) in details.images" :key="index">
          <img :src="item.url" width="100%" height="auto"/>
          <div v-for="(label,idx) in item.image_labels" :key="idx" :style="{
            top: `${Math.floor(label.y * 100)}%`,
            left: `${Math.floor(label.x * 100)}%`
          }" :class="label.x <= 0.5 ? 'lt':'rt'"
          class="sticker-container">
            <div :class="label.isLeft == true ? 'is-right': 'is-left'" class="sticker-item">
              <div class="anchor-container">
                <div class="anchor"></div>
                <div class="anchor-center"></div>
              </div>
              <div class="line"></div>
              <div class="content-wrapper">
                <div class="content-container" :title="label.name" @click="onQrcode">
                  <div class="description">
                    <span v-if="label.notesTagType == 2" class="svg-container">
                      <svg-icon icon-class="goodsfill" />
                    </span>
                    <span v-else-if="label.notesTagType == 4" class="svg-container">
                      <svg-icon icon-class="locationfill" />
                    </span>
                    <span v-else-if="label.notesTagType == 5" class="svg-container">
                      <svg-icon icon-class="shopfill" />
                    </span>
                    <span v-else-if="label.notesTagType == 6" class="svg-container">
                      <svg-icon icon-class="likefill" />
                    </span>
                    <span v-else class="svg-container">
                      <svg-icon icon-class="tagfill" />
                    </span>
                    {{label.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="note-body">
      <h3 v-if="details.title">{{details.title}}</h3>
      <p v-if="details.content" v-html="details.content.replace(/(\r\n|\n|\r)/gm, '<br/>')"></p>
      <p v-if="details.topic.lenght != 0">
        <el-link type="primary" v-for="(label,index) in details.topic" :key="index" @click="onQrcode">{{`#${label.name}`}}</el-link>
      </p>
      <el-carousel arrow="never" :height="details.goods.length != 0 ? `80px`:`0px`" class="goods">
        <el-carousel-item v-for="(item,index) in details.goods" :key="index">
          <div class="goods-item clearfix" @click="onQrcode">
            <div class="goods-img">
              <img :src="item.goods_main_img" width="100%" height="auto"/>
            </div>
            <div class="goods-body">
              <div class="goods-title">{{item.goods_title}}</div>
              <div class="goods-price">{{$t('goods.money')}} {{item.goods_price}}</div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel> 
      <div class="anticon">
        <div 
        :class="{'active': details.is_like == true }" 
        @click="onLike(details)">
          <span class="svg-container">
            <svg-icon :icon-class="details.is_like != true ? 'appreciate':'appreciatefill'" />
          </span>
          <span class="text">{{ details.like_num }}</span>
        </div>
        <div 
        :class="{'active': details.is_collect == true }" 
        @click="onCollect(details)">
          <span class="svg-container">
            <svg-icon :icon-class="details.is_collect != true ? 'favor':'favorfill'" />
          </span>
          <span class="text">{{ details.collect_num }}</span>
        </div>
        <div @click="onComment()">
          <span class="svg-container">
            <svg-icon icon-class="comment" />
          </span>
          <span class="text">{{ details.comments_num }}</span>
        </div>
      </div>
    </div>
    <div class="comment-title">{{$t('common.replies')}}</div>
    <div v-for="(item, index) in comments" :key="index" class="comment clearfix">
      <el-image class="pull-left avatar" :src="item.head_portrait" />
      <div class="bd">
        <div class="">
          <el-link :href="`mySelf?id=${item.user_id}`" target="_blank">{{item.nick_name}}</el-link>：
          <span class="content">{{item.comment_content}}</span>
        </div>
        <div class="ft">
          <span class="date">{{item.create_time | formatDiss}}</span>
          <span class="svg-container">
            <svg-icon icon-class="appreciate" />
          </span>
          <span class="svg-container" @click="onSubComment(item,index)">
            <svg-icon icon-class="comment" />
          </span>
        </div>
        <div v-for="(reply, inx) in item.reply" :key="inx" class="comment clearfix">
          <el-image class="pull-left avatar" :src="reply.head_portrait" />
          <div class="bd">
            <div v-if="Object.keys(reply.reply_user).length == 0">
              <el-link :href="`mySelf?id=${reply.user_id}`" target="_blank">{{reply.nick_name}}</el-link>
              ：
              <span class="content">{{reply.comment_content}}</span>
            </div>
            <div v-else>
              <el-link :href="`mySelf?id=${reply.user_id}`" target="_blank">{{reply.nick_name}}</el-link> 
              <span class="name">回复</span>
              <el-link :href="`mySelf?id=${reply.reply_user.reply_user_id}`" target="_blank">{{reply.reply_user.reply_nick_name}}</el-link>
              ：
              <span class="content">{{reply.comment_content}}</span>
            </div>
            <div class="ft">
              <span class="date">{{reply.create_time | formatDiss}}</span>
              <span class="svg-container">
                <svg-icon icon-class="appreciate" />
              </span>
              <span class="svg-container" @click="onCommentReply(item,reply,index)">
                <svg-icon icon-class="comment" />
              </span>
            </div>
          </div>
        </div>
        <el-link type="primary" @click="onReplyMore(item,item.reply)">展开更多</el-link>
      </div>
    </div>
    <el-form :model="ruleForm" ref="ruleForm">
      <el-input rows="3" type="textarea" :placeholder="ruleForm.placeholder" v-model="ruleForm.content"></el-input>
      <el-button type="primary" size="small" @click="submitForm('ruleForm')">发送</el-button>
    </el-form>
  </div>
</template>

<script>
  import { commonMixin } from '../mixin'
  import PayVideo from './pay-video'

  import {
    getCommentList, 
    getCommentReply,
    getLike, 
    getLikeCancel,
    getAddCollection,
    getAddCollectionCancel,
    getUserOperate,
    getUserComment
  } from '@/api';
  export default {
    components: {
      PayVideo
    },
    props: {
      details: {
        type: Object,
        default: null  
      },
      close: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
        comments: [],
        finished: false,
        page: 1,
        ruleForm: {
          content: '',
          placeholder: '我想说...',
          comment_id: '',
          reply_id: '',
          level: 0,
        }
      }
    },
    mixins: [commonMixin],
    created(){
      this.init()
    },
    watch: {
      'details': function() {
        this.comments = []
        this.page = 1
        this.init()
      }
    },
    methods: {
      init() {
        getCommentList({
          user_id: this.$store.getters.user_id,
          comment_content_id: this.details.id,
          page: this.page,
          type: 1,
          time: Date.parse(new Date()) / 1000 
        }).then(res=> {
          if(Number(res.code) == 0) {
            const data = res.data
            this.page++
            for(let i in data) {
              this.comments.push(data[i]);
            }
            // 数据全部加载完成
            if (data.length < 10) {
              this.finished = true
            }
          }
        })
      },
      onReplyMore(data,reply){
        console.log(data.reply)
        const limit_id = data.reply.pop().id
        // getCommentReply({
        //   user_id: this.$store.getters.user_id,
        //   comment_id: data.id,
        //   limit_id: limit_id,
        //   time: Date.parse(new Date()) / 1000 
        // }).then(res => {
        //   console.log(res)
        //   if(Number(res.code) == 0) { 
            
        //     const array = [...data.reply,...res.data]
        //     console.log(array)
        //   }
        // })
      },
      onComment(){
        this.ruleForm.level = 0
        this.ruleForm.placeholder = `我想说...`
      },
      onSubComment(data,index){
        this.ruleForm.level = 1
        this.ruleForm.comment_id = data.id
        this.ruleForm.placeholder = `回复：${data.nick_name}`
      },
      onCommentReply(data,reply,index){
        this.ruleForm.level = 2
        this.ruleForm.comment_id = data.id
        this.ruleForm.reply_id = reply.id
        this.ruleForm.placeholder = `回复：${reply.nick_name}`
      },
      submitForm(){
        let data = null
        if(this.ruleForm.level == 1) {
          data = {
            user_id: this.$store.getters.user_id,
            comment_type: 1,
            comment_content: this.ruleForm.content,
            comment_id: this.ruleForm.comment_id,
            time: Date.parse(new Date()) / 1000 
          }
        }else if(this.ruleForm.level == 2) {
          data = {
            user_id: this.$store.getters.user_id,
            comment_type: 1,
            comment_content: this.ruleForm.content,
            comment_id: this.ruleForm.comment_id,
            reply_id: this.ruleForm.reply_id,
            time: Date.parse(new Date()) / 1000 
          }
        }else {
          data = {
            user_id: this.$store.getters.user_id,
            comment_type: 1,
            comment_content: this.ruleForm.content,
            comment_content_id: this.details.id,
            time: Date.parse(new Date()) / 1000 
          }
        }
        getUserComment(data).then(res => {
          if(Number(res.code) === 0) {
            console.log(res)
          }
        })
//         getUserComment(){

//         }
//         user_id	是	string	用户名
// comment_content_id	是	string	评论对象ID（指笔记获取其他）
// comment_content	是	string	评论内容
// comment_type	是	int	评论类型（1：笔记）
// comment_id	否	int	第一层评论ID）默认0
// reply_id	否	int	第二层评论ID（其他评论的ID）默认0
// comment_rank	否	int	评论等级
// image	否	array	图片
      },


      handleClose() {
        this.$emit('close')
      },
      onMore() {
        this.commentList(this.details)
      },
      onReply(item) {
        const math_ceil = (item.reply.length - 1) / 5
        setTimeout(() => {
          getCommentReply({
            comment_id: item.id,
            page: Math.ceil(math_ceil),
            time: Date.parse(new Date()) / 1000 
          }).then(res => {
            if(Number(res.code) === 0) {
              const data = res.data
              if(Math.ceil(math_ceil) === 0) {
                item.reply = data
              } else {
                for(let i in data) {
                  item.reply.push(data[i]);
                }
              }
            }
          })
        }, 500)
      },
      onCollect(data){
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        if(!data.is_collect) {
          getAddCollection({
            user_id: this.$store.getters.user_id,
            type: 1,
            content_id: data.id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              data.is_collect = true
              data.collect_num = Number(data.collect_num) + 1
            }
          })
        }else {
          getAddCollectionCancel({
            user_id: this.$store.getters.user_id,
            type: 1,
            content_id: data.id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              data.is_collect = false
              data.collect_num = Number(data.collect_num) - 1
            }
          })
        }
      },
      onLike(data) {
        if(!this.$store.getters.isAuthenticate) {
          this.$store.commit('loginDialogVisible', true)
          return
        }
        if(!data.is_like) {
          getLike({
            user_id: this.$store.getters.user_id,
            type: 1,
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
            type: 1,
            object_id: data.id,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            if (Number(res.code) === 0) {
              data.is_like = false
              data.like_num = Number(data.like_num) - 1
            }
          })
        }
      },
      
      onblacklist(data) {
        getUserOperate({
          user_id: this.$store.getters.user_id,
          type: 1,
          be_pulled_black: data.user_id,
          time: Date.parse(new Date()) / 1000
        }).then(res=> {
          if (Number(res.code) === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.$emit('close')
          }
        })
      }
    }
  };
</script>

<style lang="less" scoped>
.note {
  overflow: hidden;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  &-header {
    background: #fff;
    padding: 10px 15px;
    .svg-container {
      font-size: 20px;
      display: inline-block;
      margin: 9px 0;
      cursor: pointer;
      color: #889199;
    }
    .user {
      text-align: right;
      .avatar {
        margin-left: 8px;
      }
      .name {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .date {
        font-size: 12px;
        color: #889199
      }
    }
  }
  .sticker-container {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    transition: display 2s;
    -moz-transition: display 2s; /* Firefox 4 */
    -webkit-transition: display 2s; /* Safari 和 Chrome */
    -o-transition: display 2s; /* Opera */
    &.rt {
      transform: translatex(-50%);
    }
    .sticker-item  {
      display: -webkit-box;
      display: -moz-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: flex-start;
      -moz-justify-content: flex-start;
      -ms-justify-content: flex-start;
      -o-justify-content: flex-start;
      justify-content: flex-start;
      -moz-box-align: center;
      -webkit-box-align: center;
      box-align: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      -ms-align-items: center;
      -o-align-items: center;
      align-items: center;
      line-height: normal;
      .anchor-container {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        .anchor {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 300px;
          background-color: rgba(0,0,0,.2);
        }
        .anchor-center {
          position: absolute;
          top: 5px;
          left: 5px;
          width: 6px;
          height: 6px;
          border-radius: 300px;
          background-color: #fff;
          box-shadow: 0 0 2px 0 rgba(0,0,0,.1);
        }
      }
      .line {
        display: inline-block;
        width: 14px;
        height: 1px;
        margin-left: -8px;
        margin-right: 0;
        background-color: #fff;
      }
      .content-wrapper {
        .content-container {
          display:-webkit-box;  /* iOS 6-, Safari 3.1-6 */
          display:-webkit-flex; /* Chrome */
          display:-moz-box;     /* Firefox 19 */
          display:-ms-flexbox;   
          display:flex;  /*flex容器*/
          -moz-box-align: center;
          -webkit-box-align: center;
          box-align: center;
          -webkit-align-items: center;
          -moz-align-items: center;
          -ms-align-items: center;
          -o-align-items: center;
          align-items: center;
          position: relative;
          padding: 5px;
          border: 1px solid #fff;
          border-radius: 15px;
          overflow: hidden;
          background-color: hsla(0,0%,40%,.3);
          box-shadow: 0 0 2px 0 rgba(0,0,0,.1);
          max-width: 180px;
          cursor: pointer;
          .description {
            font-size: 10px;
            color: #fff;
            margin-left: 5px;
            margin-right: 5px;
            max-width: 180px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .svg-container {
            font-size: 14px;
          }
          &:hover {
            background-color: hsla(0,0%,40%,.6);
          }
        }
      }

      &.is-left {
        -webkit-flex-direction: row-reverse;
        -moz-flex-direction: row-reverse;
        -ms-flex-direction: row-reverse;
        -o-flex-direction: row-reverse; 
        flex-direction: row-reverse;
        justify-content: flex-end;
        -webkit-justify-content: flex-end;
        -moz-justify-content: flex-end;
        -ms-justify-content: flex-end;
        -o-justify-content: flex-end;
        justify-content: flex-end;
        .line {
          margin-right: -8px;
          margin-left: 0;
        }
      }
      &.is-right {
        -webkit-flex-direction: row;
        -moz-flex-direction: row;
        -ms-flex-direction: row;
        -o-flex-direction: row; 
        flex-direction: row;
        .line {
          margin-right: -8px;
          margin-left: 0;
        }
      }
    }
  }
  &-body {
    padding: 5px 15px 10px;
    background: #fff;
    .goods {
      overflow-y: hidden;
      &-item {
        background: #F4F6FA;
        padding: 8px;
        cursor: pointer;
      }
      &-img {
        width: 48px;
        margin-right: 10px;
        float: left;
      }
      &-body {
        overflow: hidden;
      }
      &-title {
        margin-bottom: 5px;
      }
      &-price {
        color: #EC1455
      }
    }
    .anticon {
      margin-top: 15px;
      div {
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        color: #889199;
        .svg-container {
          font-size: 24px;
          margin-right: 5px;
        }
        .text {
          display: inline-block;
          /* height: 27px; */
          position: relative;
          top: -2px;
        }
        &.active {
          color: #EC1455;
        }
      }
    }
  }
  .comment {
    background-color: #fff;
    padding: 8px 15px;
    .comment {
      padding-left: 0;
      padding-right: 0;
    }
    &-title {
      font-size: 14px;
      margin-top: 10px;
      background-color: #fff;
      padding: 8px 15px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 100%;
      overflow: hidden;
      margin-right: 10px;
      background-color: #fff;
    }
    .bd {
      overflow: hidden;
      .name {
        font-size: 13px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .content {
        margin: 5px 0;
        font-size: 15px;
        color: #889199;
      }
    }
    .ft {
      color: #889199;
      font-size: 13px;
      span {
        margin-right: 10px;
        &.svg-container {
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
  }
  .el-form {
    margin-top: 10px;
    padding: 8px 15px;
    background-color: #fff;
    .el-textarea {
      margin-bottom: 10px;
    }
  }
}
</style>