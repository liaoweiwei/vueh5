<template>
  <a v-if="note != null" href="javascript:;" @click="handleDynamic(note)">
    <div v-if="Object.keys(note.video).length === 0" >
      <img :src="note.main_img.url" width="100%" height="auto" class="image">
    </div>
    <div v-else>
      <img :src="note.video.video_frontcover" width="100%" height="auto" class="image">
      <i class="el-icon-video-play"></i>
    </div>
    <div class="body">
      <el-link v-if="note.title" class="title" :title="note.title">{{ note.title }}</el-link>
      <div class="user clearfix">
        <el-popover placement="top-start" width="200" offset="10" trigger="hover">
          <el-avatar slot="reference" class="fl" :size="32" :src="note.user_head_portrait" />
          <div class="popover">
            <el-avatar class="avatar" :size="60" :src="note.user_head_portrait" />
            <div class="name">
              <el-link :href="`/profile?id=${note.user_id}`">{{note.user_nick_name}}</el-link>
            </div>
            <el-row>
              <el-col :span="8">
                <div class="text">店铺商品</div>
                {{ note.agent_goods_num }}
              </el-col>
              <el-col :span="8">
                <div class="text">粉丝</div>
                {{ note.fans_num }}
              </el-col>
              <el-col :span="8">
                <div class="text">动态</div>
                {{ note.dynamic_num }}
              </el-col>
            </el-row>
            <el-row>
              <el-button :type="note.is_follow ? '':'primary'" size="small" :icon="note.is_follow ? 'el-icon-check':'el-icon-plus'">{{note.is_follow ? '已关注':'关注'}}</el-button>
              <el-button size="small">私信</el-button>
            </el-row>
          </div>
        </el-popover>
        <small class="fr">{{note.create_time }}</small>
        <div class="user-body">
          <el-link :href="`/profile?id=${note.user_id}`" class="name">{{note.user_nick_name}}</el-link>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      default: null
    },
    open: {
     type: Function,
     default: null
    }
  },
  methods: {
    handleDynamic(note){
      this.$emit('open', {
        id: note.id,
        agent_goods_user: 0,
        role_type: 1
      })
    }
  }
}
</script>
