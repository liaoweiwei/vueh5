<template>
  <el-form ref="form" :rules="rules" :model="form" class="login-form">
    <el-form-item prop="mobile" class="mobile">
      <el-input v-model="form.mobile" :placeholder="$t('placeholder.mobile')" />
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <div class="text">{{command}}</div>
          <span class="svg-container">
            <svg-icon icon-class="unfold" />
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in options" :key="item.value" :command="item.value">{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-form-item>
    <el-form-item prop="code" class="code">
      <el-input v-model="form.code" :placeholder="$t('placeholder.code')">
        <template slot="suffix">
          <a v-show="show" href="javascript:;" @click="onClickCode">{{$t('login.getCode')}}</a>
          <a v-show="!show" href="javascript:;" class="count">{{ count }}s</a>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!loginFlag" :loading="loading"  class="button-block" @click="onSubmit">{{ loading === true ? $t('login.loding') : $t('login.login') }}</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { getSend, getSendCheckcode } from '@/api/login'

export default {
  props: {
    close: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      options: [
        { value: '86', label: this.$t('area.cn') },
        { value: '1', label: this.$t('area.us') }
      ],
      command_id: '86',
      loading: false,
      count: '',
      show: true,
      timer: null,
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: this.$t('required.mobile') }
        ],
        code: [
          { required: true, message: this.$t('required.code') }
        ]
      }
    }
  },
  computed: {
    command() {
      if(this.command_id === '86') {
        return this.$t('area.cn')
      }else if(this.command_id === '1') {
        return this.$t('area.us')
      }else {
        return ''
      } 
    },
    loginFlag: function() {
      return this.form.mobile && this.form.code;
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        this.loading = true
        if (valid) {
          const { mobile, code } = this.form
          getSendCheckcode({
            mobile: mobile,
            code: code,
            time: Date.parse(new Date()) / 1000
          }).then(res => {
            this.loading = false
            if (Number(res.code) === 0) {
              const response = res.data
              this.$store.dispatch('GET_USERID', response.user_id)
              this.$store.dispatch('GET_NICKNAME', response.nick_name)
              this.$store.dispatch('GET_HEADPORTRAIT', response.head_portrait)
              this.$store.dispatch('GET_USERPHONE', response.user_phone)
              this.$store.dispatch('GET_ISAUTHENTICATE')
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$emit('close')
            } else {
              this.show = true
              clearInterval(this.timer)
              this.timer = null
              this.$message.error(res.msg)
            }
          })
        } else {
          this.loading = false
        }
      })
    },
    onClickCode() {
      if(!this.form.mobile){
        return 
      }
      getSend({
        mobile: this.form.mobile,
        time: Date.parse(new Date()) / 1000
      }).then(res => {
        if (Number(res.code) === 0) {
          this.getCode()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getCode() { // 获取验证码
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 500)
      }
    },
    handleCommand(command) {
      this.command_id = command
    }
  }
}
</script>
