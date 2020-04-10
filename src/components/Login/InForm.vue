<template>
  <el-form ref="form" :rules="rules" :model="form" class="login-form">
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile" autocomplete="off" :placeholder="$t('placeholder.user')" />
    </el-form-item>
    <el-form-item prop="password" class="password">
      <el-input v-model="form.password" autocomplete="off" :type="type" :placeholder="$t('placeholder.password')" />
      <span class="svg-container" @click="onEye">
        <svg-icon :icon-class="type === 'password' ? 'eyes':'eyesClose'" />
      </span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :disabled="!loginFlag" :loading="loading" class="button-block" @click="onSubmit">{{ loading === true ? $t('login.lodingText') : $t('login.login') }}</el-button>
      <div class="clearfix">
        <div class="pull-left">
          {{$t('login.forgetPassword')}}
        </div>
        <div class="pull-right">
          {{$t('login.noAccount')}}
          <el-link type="danger" @click="onToggle" style="line-height: 18px;">{{$t('login.signUp')}}</el-link>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import { getLogin } from '@/api/login'

export default {
  props: {
    close: {
      type: Function,
      default: null
    },
    toggle: {
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
      type: 'password',
      loading: false,
      form: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: this.$t('required.mobile') }
        ],
        password: [
          { required: true, message: this.$t('required.password') }
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
      return this.form.mobile && this.form.password;
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        this.loading = true
        if (valid) {
          getLogin({
            login_name: this.form.mobile,
            password: this.form.password,
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
              this.$message.error(res.msg)
            }
          })
        } else {
          this.loading = false
        }
      })
    },
    onEye() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    },
    onToggle() {
      this.$emit('toggle')
    },
    handleCommand(command) {
      this.command_id = command
    }
  }
}
</script>
