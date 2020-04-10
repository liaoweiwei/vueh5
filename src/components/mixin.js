// 点击弹出下载app
export const commonMixin = {
  methods: {
    onQrcode() {
      const _this = this;
      _this.$alert(`<img src="/static/images/${this.$i18n.locale}/qrcode.png" width="200px" height="200px"><div>${_this.$t('messageBox.title')}</div><small>${_this.$t('messageBox.desc')}</small>`, {
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: _this.$t('messageBox.cancelButtonText'),
        dangerouslyUseHTMLString: true,
        showClose: false,
        customClass: 'message-code'
      })
    }
  }
}
