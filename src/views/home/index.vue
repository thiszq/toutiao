<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <van-tabs class="channel-tabs" v-model="active" swipeable animated border>
      <van-tab :title="obj.name" v-for="obj in channels" :key="obj.id">
        <article-list :channel="obj" />
      </van-tab>

      <!-- 右侧自定义内容 -->
      <!-- 占位元素 -->
      <div class="placeholder"></div>
      <!-- 右侧按钮 -->
      <template #nav-right>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'

export default {
  name: 'HomeIndex',
  components: { ArticleList },
  props: {},
  data() {
    return {
      active: '',
      channels: [],
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getChannel()
  },
  mounted() {},
  methods: {
    async getChannel() {
      try {
        const res = await getUserChannels()
        console.log(res)
        this.channels = res.data.data.channels
        // console.log(channels)
      } catch (err) {}
    },
  },
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
