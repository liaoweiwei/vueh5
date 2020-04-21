<template>
  <el-dialog :visible.sync="visible" 
  :close-on-click-modal="false" 
  :show-close="false"
  width="400px" 
  center 
  class="pop-login">
    <el-tabs v-model="active" class="tabs-form">
      <el-tab-pane label="密码登录" name="a">
        <el-form ref="form" :rules="rules" :model="form" class="login-form">
          <el-form-item prop="mobile">
            <el-input v-model="form.mobile" autocomplete="off" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="password" class="password">
            <el-input v-model="form.password" autocomplete="off" :type="type" placeholder="请输入密码" />
            <!-- <i class="el-icon-view" @click="onEye"></i> -->
          </el-form-item>
          <el-form-item>
            <el-button 
            type="primary" 
            :loading="loading" 
            class="button-block" 
            @click="onSubmit">登录</el-button>
            <div class="clearfix">
              <div class="fl">
                忘记密码？
              </div>
              <div class="fr">
                没有账号？去 <el-link type="danger" 
                style="line-height: 17px;" 
                @click="active = 'b'">注册</el-link>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="验证码登录" name="b">
        <el-form ref="formCode" :rules="code_rules" :model="formCode" class="login-form">
          <el-form-item prop="mobile" class="mobile">
            <el-input placeholder="请输入手机号码" v-model="formCode.mobile" class="input-with-select">
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item prop="code" class="code">
            <el-input v-model="formCode.code" placeholder="请输入手机验证码">
              <template slot="append">
                <Code :mobile="formCode.mobile" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" 
            :loading="loading" 
            class="button-block" @click="onSubmitcode">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import Code from './Code.vue'
import { getLogin, getSendCheckcode } from '@/api/login'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Code
  },
  data(){
    return {
      active: 'a',
      options: [
        { value: 86, label: '中国(+86)' },
        { value: 1, label: '美国(+1)' }
      ],
      select: 86,
      type: 'password',
      loading: false,
      form: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '用户名不能为空' }
        ],
        password: [
          { required: true, message: '密码不能为空' }
        ]
      },
      formCode: {
        mobile: '',
        code: ''
      },
      code_rules: {
        mobile: [
          { required: true, message: '手机号不能为空' }
        ],
        code: [
          { required: true, message: '验证码不能为空' }
        ]
      }
    }
  },
  methods: {
    onSubmit(){
      this.$refs['form'].validate((valid) => {
        if (!valid) {
          return 
        }
        this.loading = true
        getLogin({
          login_name: this.form.mobile,
          password: this.form.password,
          time: Date.parse(new Date()) / 1000
        }).then(res => {
          this.loading = false
          if (Number(res.code) === 0) {
            const { data } = res
            this.$store.dispatch('GET_USERID', data.user_id)
            this.$store.dispatch('GET_ISAUTHENTICATE')
            this.$store.commit('login_visible')
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      })
    },
    onSubmitcode(){
      this.$refs['formCode'].validate((valid) => {
        if(!valid) {
          return 
        }
        this.loading = true
        getSendCheckcode({
          mobile: this.formCode.mobile,
          code: this.formCode.code,
          time: Date.parse(new Date()) / 1000
        }).then(res => {
          this.loading = false
          if (Number(res.code) === 0) {
            const { data } = res
            this.$store.dispatch('GET_USERID', data.user_id)
            this.$store.dispatch('GET_ISAUTHENTICATE')
            this.$store.commit('login_visible')
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      })
    },
    onEye() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.pop-login {
  .tabs-form {
    background: #ffffff;
    padding: 10px 15px;
  }
}
</style>