<template>
  <aside class="aside">
    <p>欢迎</p>
    <p>登录和安全</p>
    <ul>
      <li><router-link to="/home/login">登录Google</router-link></li>
      <li>设备活动</li>
      <li>账号访问权限</li>
    </ul>
    <p>个人信息</p>
    <ul>
      <li>个人信息</li>
      <li>通信录</li>
      <li>google活动</li>
      <li>控制你的内容</li>
    </ul>
    <p>游戏中心</p>
    <ul>
      <li>我的游戏</li>
      <li>邀请朋友</li>
      <li>最新内容</li>
      <li>本月新作</li>
      <li>我的粉丝</li>
    </ul>
    <p>个人活动</p>
    <ul>
      <li>投稿中心</li>
      <li>投稿进度</li>
      <li>募捐活动</li>
    </ul>
    <p>关于google</p>
    <p>隐私政策</p>
    <p>帮助和反馈</p>
  </aside>
</template>

<script>
export default {
  name: "HomeAside",
  data() {
    return {
      title: "自动发现拓扑图"
    };
  }
};
</script>
<style>
.
</style>
