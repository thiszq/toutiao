<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginform">
      <van-field
        name="mobile"
        placeholder="请填写手机号"
        v-model="user.mobile"
        :rules="former.mobile"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请填写验证码"
        v-model="user.code"
        :rules="former.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="6 * 1000"
            format="ss s"
            v-if="isCount"
            @finish="isCount = false"
          />
          <van-button
            v-else
            round
            native-type="button"
            size="small"
            type="default"
            class="send-sms-btn"
            @click="onSend"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          class="login-btn"
          >立即登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, yanzheng } from '@/api/user'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: '',
        code: '',
      },
      former: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-8]\d{9}$/, message: '格式不正确' },
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '格式不正确' },
        ],
      },
      isCount: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      const user = this.user
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      })
      try {
        console.log(1)
        const res = await login(user)
        console.log(2)
        this.$store.commit('getToken', res.data.data)
        this.$toast.success('登录成功')
        this.$router.back()
        console.log('登录成功', res)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('账号或者验证码错误')
          console.log('账号或者验证码错误', err)
        } else {
          this.$toast.fail('登录失败')
          console.log('登录失败', err)
        }
      }
    },
    async onSend() {
      try {
        await this.$refs.loginform.validate('mobile')
        // console.log('ok')
        this.isCount = true
        try {
          await yanzheng(this.user.mobile)
          this.$toast.success('发送成功')
          console.log('发送成功')
        } catch (err) {
          if (err.response.status === 429) {
            console.log('发送过于频繁', err)
            this.$toast.fail('发送过于频繁')
          } else {
            console.log('失败', err)
            this.$toast.fail('发送失败')
          }
        }
      } catch (err) {
        console.log('验证失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
