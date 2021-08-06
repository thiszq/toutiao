<template>
  <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  props: {
    // 设置一个props用来接收属于自己的频道信息数据
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      timestamp: null,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad()
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        })
        console.log('新闻', res)
        const results = res.data.data.results
        this.list.push(...results)
        this.loading = false
        if (results.length === 0) {
          this.finished = true
        } else {
          this.timestamp = res.data.data.pre_timestamp
        }
      } catch (err) {
        this.loading = false
        this.error = true
      }
    },
  },
}
</script>

<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;

  // 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow-y: auto;
}
</style>
