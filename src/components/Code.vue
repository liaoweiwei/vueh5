<template>
  <span>
    <a v-show="show" href="javascript:;" @click="onCode">获取验证码</a>
    <a v-show="!show" href="javascript:;" class="count">{{ count }}s</a>
  </span>
</template>

<script>
import { getSend } from '@/api/login'

export default {
  props: {
    mobile: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      count: '',
      show: true,
      timer: null
    }
  },
  methods: {
    onCode() {
      if(!this.mobile){
        this.$message.error('手机号不能为空')
        return 
      }
      getSend({
        mobile: this.mobile,
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
    }
  }
}
</script>
