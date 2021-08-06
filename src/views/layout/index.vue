<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar class="layout-container" route>
      <van-tabbar-item to="/">
        <template #icon>
          <i class="toutiao toutiao-shouye"></i>
        </template>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="toutiao toutiao-wenda"></i>
        </template>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <i class="toutiao toutiao-shipin"></i>
        </template>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <i class="toutiao toutiao-wode"></i>
        </template>
        <span class="text">{{
          this.$store.state.user ? '我的' : '未登录'
        }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
