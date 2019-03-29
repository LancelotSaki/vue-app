<template>
  <div class="home">
    <section class="container">
      <div class="aside">
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
      </div>
      <div class="header">hhhhh1161</div>
      <div class="main">
        <router-view></router-view>
      </div>
      <div class="footer">hh</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style>
@media screen and (min-width: 600px) {
  .container {
    width: 100%;
    height: 100%;
  }

  .header {
    position: fixed;
    left: 200px;
    right: 0;
    top: 0;
    height: 60px;
    background: aquamarine;
    z-index: 99;
  }

  .aside {
    position: fixed;
    width: 200px;
    top: 0;
    left: 0;
    height: 100vh;
    background: white;
    z-index: 99;
  }

  .main {
    position: relative;
    margin-top: 60px;
    margin-left: 200px;
    width: calc(100% - 200px);
    height: 1200px;
    background: blueviolet;
  }

  .footer {
    position: relative;
    width: calc(100% - 200px);
    margin-left: 200px;
    height: 100px;
    background: #42b983;
  }
}

@media screen and (max-width: 600px) {
  .container {
    width: 100%;
    height: 100%;
    min-width: 600px;
  }

  .aside {
    position: fixed;
    float: left;
    width: 200px;
    height: 100vh;
    background: white;
    display: none;
  }

  .header {
    position: relative;
    width: 100%;
    height: 100px;
    background: aquamarine;
  }

  .main {
    position: relative;
    width: 100%;
    height: 1200px;
    background: blueviolet;
  }

  .footer {
    position: relative;
    width: 100%;
    height: 100px;
    background: #42b983;
  }
}

p {
  margin-left: 10px;
}
</style>
