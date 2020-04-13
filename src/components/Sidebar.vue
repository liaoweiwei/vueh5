<template>
  <aside class="fl">
    <el-scrollbar class="scrollbar" :horizontal="false">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>热门话题</span>
        </div>
        <div>
          <ul>
            <li v-for="(item, index) in hotTopic" :key="index">
              <el-link type="primary">{{ item.name }}</el-link>
            </li>
          </ul>
        </div>
      </el-card>
      <el-card class="box-card copy">
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
  width: 264px;
  height: 100%;
  padding: 0;
  .scrollbar {
    width: 100%;
    height: 100%;
  }
  .box-card {
    margin-top: 10px;
    &.copy {
      font-size: 14px;
      color: #606266;
      p {
        margin-bottom: 8px;
      }
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