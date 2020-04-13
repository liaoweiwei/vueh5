<template>
  <div>
    <Header />
    <div class="page dropdown">
      <el-scrollbar class="scrollbar" :horizontal="false">
        <div class="dropdown-page">
          <div class="dropdown-body">
            <div class="center clearfix">
              <div class="fl">
                <img :src="`/static/images/zh-CN/IMG_prototype.png`" width="280px" height="auto">
              </div>
              <div class="box">
                <img class="title" :src="`/static/images/zh-CN/text.png`">
                <div class="clearfix">
                  <div class="fl">
                    <el-button round>
                      iPhone 下载
                    </el-button>
                    <el-button round class="button">
                      Android 下载
                    </el-button>
                  </div>
                  <img :src="`/static/images/qrcode.png`" width="120px" height="120px">
                </div>
              </div>
            </div>
          </div>
          <div class="dropdown-foot">
            <div class="center clearfix">
              <div class="fl img">
                <img src="/static/images/logo-zh-CN.png"  width="90px" height="90px">
                <div><small>每个人的店铺</small></div>
              </div>
              <div class="divider fl"></div>
              <div class="fl img">
                <img src="/static/images/logo-en-US.png" width="90px" height="90px">
                <div><small>everyone shops everyone</small></div>
              </div>
              <div class="box">
                <p>021-36360093</p>
                <p>上海办公室 | 上海市长宁区宣化路300号华宁国际广场南塔2601 &nbsp;&nbsp;&nbsp;&nbsp; 邮箱：larry@baipu.com</p>
                <p>Europe Office | Ludwinowska 7/9, 30-331, Kraków, Poland &nbsp;&nbsp;&nbsp;&nbsp; Email: ludwinowska.office@gmail.com</p>
                <p>出通科技（上海）有限公司 Chutong Tech (Shanghai) Limited</p>
                <p>Copyright ©2019 BAIPU, All Rights Reserved &nbsp;|&nbsp; <a target="_blank" href="http://www.beian.miit.gov.cn/">沪ICP备19007182号-1</a><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502005025"><img src="/static/images/beian.png" width="15" height="15" />沪公网安备 31010502005025号</a></p>
              </div>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
// 组件引用
import Header from '@/components/Header'

export default {
  data () {
    return {
      tabs: [],
      active: 0
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.dropdown {
  .scrollbar {
    height: 100%;
  }
  .dropdown-page {
    position: relative;
    background-color: #fff;
    background: url('/static/images/IMG-BG.png') no-repeat 0 0 RGBA(239, 42, 85, 1);
  }
  .dropdown-body {
    background: url('/static/images/IMG-BG.png') no-repeat 0 0 RGBA(239, 42, 85, 1);
    background-size: 100% 100%;
    padding-bottom: 60px;
    .center {
      width: 800px;
      margin: 0 auto;
    }
    .box {
      overflow: hidden;
      margin-left: 300px;
      padding-top: 90px;
      text-align: left;
      .title {
        margin-bottom: 40px;
        display: block;
      }
      button {
        display: block;
        margin: 0 30px 15px 0 !important;
        width: 233px;
        background: transparent;
        color: #fff;
        border-color: #FFF;
        height: 50px;
        font-size: 20px;
        border-radius: 50px;
        font-weight: lighter;
      }
    }
  } 
  .dropdown-foot {
    padding: 25px 0;
    background-color: #fff;
    .center {
      width: 980px;
      margin: 0 auto;
    }
    .img {
      width: 90px;
      text-align: center;
      font-size: 12px;
      padding: 26px 0;
    }
    .divider {
      display: block;
      width: 1px;
      height: 90px;
      margin: 30px 36px;
      background-color: #eee;
    }
    .box {
      overflow: hidden;
      font-size: 12px;
      text-align: left;
      margin-left: 320px;
      p {
        margin: 15px 0;
      }
    }
  }
}
</style>