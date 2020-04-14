<template>
  <div class="carousel">
    <img :src="url" width="100%" height="auto" class="images"/>
    <el-carousel> 
      <el-carousel-item v-for="(thumb, index) in list" :key="index">
        <img :src="thumb.url" width="100%" height="auto"/>
        <div v-for="(label,idx) in thumb.image_labels" :key="idx" :style="{
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
                <div class="content-container" :title="label.name">
                  <div class="description">
                    {{label.name}}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>

export default {
  props: {
    type: {
      type: Boolean,
      default: null  
    },
    url: {
      type: String,
      default: null  
    },
    list: {
      type: Array,
      default: null  
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  overflow: hidden;
  margin: 0 -15px;
  .images {
    visibility: hidden;
  }
  .el-carousel {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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
}
</style>