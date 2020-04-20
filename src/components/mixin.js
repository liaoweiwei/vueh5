// 点击弹出下载app
export const mixins = {
  methods: {
    handleQrcode() {
      const _this = this;
      _this.$alert(`<img src="/static/images/qrcode.png" width="200px" height="200px"><div>扫码下载百铺App</div><small>全民一起带货，在家躺着赚钱</small>`, {
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: '关闭',
        dangerouslyUseHTMLString: true,
        showClose: false,
        customClass: 'msg-code'
      })
    }
  }
}
