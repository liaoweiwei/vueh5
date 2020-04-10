<template>
  <el-dialog :visible.sync="visible" 
  :close-on-click-modal="false" 
  :show-close="false"
  width="400px" 
  center 
  class="login-dialog">
    <div class="close" @click="onClose">
      <span class="svg-container">
        <svg-icon icon-class="close" />
      </span>
    </div>
    <el-tabs v-model="activeName" class="tabs-login">
      <el-tab-pane :label="$t('login.password')" name="0">
        <in-form @close="onClose" @toggle="onToggle" />
      </el-tab-pane>
      <el-tab-pane :label="$t('login.verification')" name="1">
        <code-form @close="onClose" />
      </el-tab-pane>
    </el-tabs>
    <!-- <div class="text-center">{{$t('login.thirdParty')}}</div> -->
    <!-- <el-row class="third-party">
      <el-col :span="8" >
        <a href="javascript:;" 
        class="qq">
          <span class="svg-container">
            <svg-icon icon-class="QQ" />
          </span>
          QQ
        </a>
      </el-col>
      <el-col :span="8">
        <a href="javascript:;" 
        class="weixin">
          <span class="svg-container">
            <svg-icon icon-class="weixin" />
          </span>
          微信
        </a>
      </el-col>
      <el-col :span="8">
        <a href="javascript:;" 
        class="weibo">
          <span class="svg-container">
            <svg-icon icon-class="weibo" />
          </span>
          微博
        </a>
      </el-col>
    </el-row> -->
  </el-dialog>
</template>

<script>
import CodeForm from './CodeForm'
import InForm from './InForm'

export default {
  name: 'Login',
  components: {
    CodeForm,
    InForm
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    onVisible: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      activeName: '0'
    }
  },
  methods: {
    onClose() {
      this.$emit('onVisible')
    },
    onToggle() {
      this.activeName = '1'
    }
  }
}
</script>

<style lang="less" scoped>
.login-dialog {
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 18px;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
