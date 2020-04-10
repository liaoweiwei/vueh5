<template>
  <video
    controls="controls" 
    width="420"
    height="340" 
    style="background: #000"
    ref="videoPlay">
    <source :src="play_url" type="video/mp4" />
    Your browser does not support the video tag.
    </video>
</template>

<script>
export default {
  name: 'PayVideo',
  props: {
    play_url: {
      type: String,
      default: ''
    }
  },
  watch: {
    play_url(val) {
      this.$nextTick(() => {
        this.$refs.videoPlay.load()
      })
    }
  }
}
</script>

