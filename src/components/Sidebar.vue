<template>
  <aside class="fl">
    <el-scrollbar class="scrollbar" :horizontal="false">
      <slot />
      <el-card :body-style="{ padding: '8px 15px' }" class="pad-10">
        <div slot="header" style="margin: -7px 0">
          <span>热门话题</span>
        </div>
        <div>
          <ul style="padding: 0; margin: 0">
            <li v-for="(item, index) in hotTopic" :key="index">
              <el-link type="primary">{{ item.name }}</el-link>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card :body-style="{ padding: '8px 15px' }" class="pad-10 copy">
        <p>Copyright ©2019 BAIPU, All Rights Reserved</p>
        <p>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010502005025">
            <img src="/static/images/gongan.png" width="15px" height="auto">
          </a>
          沪公网安备 31010502005025号
          <el-link target="_blank" href="http://www.beian.miit.gov.cn">沪ICP备19007182号-1</el-link>
        </p>
      </el-card>
    </el-scrollbar>
  </aside>
</template>

<script>
import { getHotTopic } from '@/api'
export default {
  data() {
    return {
      hotTopic: []
    }
  },
  created(){
    this.initHotTopic()
  },
  methods: {
    initHotTopic() {
      getHotTopic({
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.hotTopic = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
aside {
  width: 250px;
  height: 100%;
  padding: 0;
  margin-right: 15px;
  .scrollbar {
    width: 100%;
    height: 100%;
  }
  .copy {
    font-size: 14px;
    color: #606266;
    p {
      margin-bottom: 8px;
    }
  }
}



// .header {
  

//   .hamburger-container {
//     line-height: 46px;
//     height: 100%;
//     float: left;
//     cursor: pointer;
//     transition: background .3s;
//     -webkit-tap-highlight-color:transparent;

//     &:hover {
//       background: rgba(0, 0, 0, .025)
//     }
//   }

//   .breadcrumb-container {
//     float: left;
//   }

//   .errLog-container {
//     display: inline-block;
//     vertical-align: top;
//   }

//   .right-menu {
//     float: right;
//     height: 100%;
//     line-height: 50px;

//     &:focus {
//       outline: none;
//     }

//     .right-menu-item {
//       display: inline-block;
//       padding: 0 8px;
//       height: 100%;
//       font-size: 18px;
//       color: #5a5e66;
//       vertical-align: text-bottom;

//       &.hover-effect {
//         cursor: pointer;
//         transition: background .3s;

//         &:hover {
//           background: rgba(0, 0, 0, .025)
//         }
//       }
//     }

//     .avatar-container {
//       margin-right: 30px;

//       .avatar-wrapper {
//         margin-top: 5px;
//         position: relative;

//         .user-avatar {
//           cursor: pointer;
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//         }

//         .el-icon-caret-bottom {
//           cursor: pointer;
//           position: absolute;
//           right: -20px;
//           top: 25px;
//           font-size: 12px;
//         }
//       }
//     }
//   }
// }
</style>