<template>
  <div class="registerPage">
    <header class="registerHeader"></header>
    <main class="registerMain">
      <div class="registerWay">
        <input type="radio" v-model="form.registerTab" id="registerTab1" value="1"><label for="registerTab1">邮箱注册</label>
        <input type="radio" v-model="form.registerTab" id="registerTab2" value="2"><label for="registerTab2">手机注册</label>
      </div>
      <form @submit="submitRegisterForm"
            method="post" class="registerForm">
        <input type="text" name="username" :placeholder="form.registerTab === '1' ? '邮箱' : '手机'"
               maxlength="35" v-model="form.username" :data-phone="phoneTemp" :data-email="emailTemp">
        <input type="password" placeholder="密码" name="password"
               maxlength="35" v-model="form.password">
        <input type="text" :placeholder="form.registerTab === '1' ? '邮箱验证码' : '手机验证码'" name="emailCode"
               maxlength="6" v-model="form.code">
        <input type="button" :value="leftTime === 60 ? '发 送': leftTime + '秒'" :disabled="sendClickDisable"
               @click="clickSend">
        <div class="rememberMe"><input type="checkbox"/><label>记住我</label></div>
        <div class="agreement"><input type="checkbox"/><label>我已阅读<router-link to="/register/agreement1">《xxx协议1》</router-link>
          和<router-link to="/register/agreement2">《xxx协议2》</router-link></label></div>
        <input type="submit" value="注 册">
        <span class="alterTab1" :data-words="formCheck.usernameCheck" :data-alter="formCheck.codeCheck">
          {{formCheck.passwordCheck}}
        </span>
      </form>
      <router-link class="toLogin" to="/login">
        <img src="../../../assets/images/login.png"/>
      </router-link>
    </main>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>

<script>
// let debounce = require("lodash.debounce");
import Footer from "../../../components/footer/Footer";
const phoneReg = process.env.VUE_APP_PHONE_REG;
const emailReg = process.env.VUE_APP_EMAIL_REG;
const passwordReg = process.env.VUE_APP_PASSWORD_REG;

/* author : admin */
export default {
  name: "Register",
  components: { Footer },
  data() {
    return {
      phoneTemp: "",
      emailTemp: "",
      // 初始默认是邮箱注册
      form: {
        registerTab: "1",
        username: "",
        password: "",
        code: ""
      },
      // 表单校验
      formCheck: {
        usernameCheck: "",
        passwordCheck: "",
        codeCheck: ""
      },
      height: 0,
      leftTime: 60,
      rightTime: 60,
      sendClickDisable: true
    };
  },
  mounted() {
    let jsSHA = this.$store.state.jsSHA;
    // SHA-1、SHA-256、SHA-384、SHA-512
    let shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey("abc", "TEXT");
    shaObj.update("This is a ");
    const hash = shaObj.getHMAC("HEX");
    /* eslint-disable no-console */
    console.log(hash);
    // SHA-1、SHA-256、SHA-384、SHA-512
    shaObj = new jsSHA("SHA-1", "TEXT");
    shaObj.update("This is a abc");
    const ha = shaObj.getHash("HEX");
    console.log(ha);
    const base64 = this.$store.state.base64;
    let ba = base64.encode("dankogai"); // ZGFua29nYWk=
    console.log(ba);
    ba = base64.encode("小飼弾"); // 5bCP6aO85by+
    console.log(ba);
    ba = base64.encodeURI("小飼弾"); // 5bCP6aO85by-
    console.log(ba);
    const saveTime = localStorage.getItem("time");
    console.log(saveTime);
    const currentTime = Date.parse(new Date().toString()) / 1000;
    console.log(currentTime);
    if (saveTime && parseInt(saveTime, 10) > currentTime) {
      this.leftTime = parseInt(saveTime, 10) - currentTime;
      const interval = setInterval(() => {
        if (this.leftTime <= 0) {
          this.leftTime = 60;
          clearInterval(interval);
        } else {
          this.leftTime--;
        }
      }, 1000);
    }
    console.log("height:" + this.$store.state.height);
    console.log("maxHeight:" + this.$store.state.maxHeight);
  },
  methods: {
    clickSend() {
      this.sendClickDisable = true;
      const way = this.form.registerTab;
      const u = this.form.username;
      if (way === 1) {
        if (!u) {
          this.formCheck.usernameCheck = "请先输入邮箱账号";
          return;
        } else if (!u.match(emailReg)) {
          this.formCheck.usernameCheck = "邮箱格式错误!";
        }
      } else {
        if (!u || u.length !== 11) {
          this.formCheck.usernameCheck = "请先输入11位的手机号码!";
          return;
        } else if (!u.match(phoneReg)) {
          this.formCheck.usernameCheck = "手机号码格式不正确!";
          return;
        }
      }
      const current = Date.parse(new Date().toString()) / 1000;
      localStorage.setItem("time", (current + 60).toString());
      const interval = setInterval(() => {
        if (this.leftTime <= 0) {
          this.leftTime = 60;
          this.sendClickDisable = false;
          clearInterval(interval);
        } else {
          this.sendClickDisable = true;
          this.leftTime--;
        }
      }, 1000);
    },
    submitRegisterForm(e) {
      // 邮箱提交验证
      const w = this.form.registerTab;
      const u = this.form.username;
      const p = this.form.password;
      const c = this.form.code;
      if (w === "1") {
        if (!u) {
          this.formCheck.usernameCheck = "请先输入邮箱账号!";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        } else if (!u.match(emailReg)) {
          this.formCheck.usernameCheck = "请先输入正确的邮箱账号!";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        }
        if (!p || p.length < 6) {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "请先输入至少六位的密码!";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        } else if (!p.match(passwordReg)) {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "只能是数字、字母或者组合!";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        }
        if (!c && c !== "1234") {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "验证码错误!";
          e.preventDefault();
          return false;
        }
        const jsSHA = this.$store.state.jsSHA;
        let shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(p);
        const hash_pwd = shaObj.getHash("HEX");
        this.formValue.password = hash_pwd;
        console.log("password:" + hash_pwd);
        localStorage.setItem("username", u);
        localStorage.setItem("password", hash_pwd);
        const current = Date.parse(new Date().toString()) / 1000;
        localStorage.setItem(
          "expireregisterByUsername",
          (current + 7200).toString()
        );
        return true;
      } else {
        if (!u || u.length !== 11) {
          this.formCheck.usernameCheck = "请先输入11位的手机号码!";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        } else if (!u.match(phoneReg)) {
          this.formCheck.usernameCheck = "手机号码格式不正确!";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        }
        if (!p || p.length < 6) {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "请先输入至少六位的密码!";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        } else if (!p.match(passwordReg)) {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "只能是数字、字母或者组合!";
          this.formCheck.codeCheck = "";
          e.preventDefault();
          return false;
        }
        if (!c && c !== "1234") {
          this.formCheck.usernameCheck = "";
          this.formCheck.passwordCheck = "";
          this.formCheck.codeCheck = "验证码错误!";
          this.checkBox.emailCheck = "";
          e.preventDefault();
          return false;
        }
        localStorage.setItem("username", p);
        localStorage.setItem("code", c);
        const current = Date.parse(new Date().toString()) / 1000;
        localStorage.setItem(
          "expireregisterByPhone",
          (current + 7200).toString()
        );
        return true;
      }
    }
  },
  watch: {
    // 监听
    "form.registerTab": function(val) {
      let u = this.emailTemp;
      if (val === "1") {
        if (u && u.match(emailReg)) {
          this.form.username = u;
          return;
        }
      } else {
        u = this.phoneTemp;
        if (u && u.match(phoneReg)) {
          this.form.username = u;
          return;
        }
      }
      this.formCheck.usernameCheck = "";
      this.formCheck.passwordCheck = "";
      this.formCheck.codeCheck = "";
      this.form.username = "";
      this.form.password = "";
      this.form.code = "";
    },
    "form.username": function(val) {
      const t = this.form.registerTab;
      if (t === "1") {
        if (!val) {
          this.formCheck.usernameCheck = "请先输入邮箱!";
          return null;
        }
        if (!val.match(emailReg)) {
          this.formCheck.usernameCheck = "邮箱格式不正确!";
          return null;
        } else {
          this.emailTemp = val;
          this.sendClickDisable = false;
          this.formCheck.usernameCheck = "";
          return null;
        }
      } else {
        if (!val || val.length !== 11) {
          this.formCheck.usernameCheck = "请先输入11位的手机号码!";
          return null;
        } else if (!val.match(phoneReg)) {
          this.formCheck.usernameCheck = "手机号码格式不正确!";
          return null;
        } else {
          this.phoneTemp = val;
          this.sendClickDisable = false;
          this.formCheck.usernameCheck = "";
          return null;
        }
      }
    },
    "form.password": function(val) {
      if (val == null || val.length < 6) {
        this.formCheck.passwordCheck = "请先输入至少六位的密码!";
        return null;
      } else if (!val.match(passwordReg)) {
        this.formCheck.passwordCheck = "只能是数字、字母或者组合!";
        return null;
      } else {
        this.formCheck.passwordCheck = "";
        return null;
      }
    },
    "form.code": function(val) {
      const t = this.form.registerTab;
      if (t === "1") {
        if (val == null || val.length === 0) {
          this.formCheck.codeCheck = "验证码为空!";
          return null;
        } else if (val.length !== 6) {
          this.formCheck.codeCheck = "请输入6位数的验证码!";
          return null;
        } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
          this.formCheck.codeCheck = "只能是数字、字母或者组合!";
          return null;
        } else {
          this.formCheck.codeCheck = "";
          return null;
        }
      } else {
        if (val == null || val.length === 0) {
          this.formCheck.codeCheck = "验证码为空!";
          return null;
        } else if (val.length !== 6) {
          this.formCheck.codeCheck = "请输入6位数的验证码!";
          return null;
        } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
          this.formCheck.codeCheck = "只能是数字、字母或者组合!";
          return null;
        } else {
          this.formCheck.codeCheck = "";
          return null;
        }
      }
    }
  }
};
</script>

<style>
.registerHeader {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 2px;
  margin: 0;
}

.registerHeader::before {
  content: "";
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  box-shadow: 0 0 10px 1px #FD4275, 0 0 1px #FD4275, 0 0 1px #FD4275, 0 0 1px #FD4275, 0 0 1px #FD4275, 0 0 1px #FD4275, 0 0 1px #FD4275;
  background-color: #fff;
  animation: 4s startToEndLine linear infinite normal;
}

@keyframes startToEndLine {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  25% {
    transform: translate3d(-50%, 0, 0);
  }
  50% {
    transform: translate3d(0%, 0, 0);
  }
  75% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

.registerPage {
  position: relative;
  width: 100vw;
  min-height: 340px;
  overflow-y: auto;
  height: 100vh;
}

.registerPage,
.registerMain::before {
  background: url("../../../assets/images/luori_wanxia-010.jpg") 0 / cover fixed;
}

@media screen and (max-width: 400px) {
  .registerMain {
    position: absolute;
    width: 340px;
    min-width: 340px;
    height: 430px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 8px;
    padding: 0;
    background: hsla(0, 0%, 100%, 0.25) border-box;
    overflow: hidden;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
  }
}

@media screen and (min-width: 400px) and (max-width: 800px) {
  .registerMain {
    position: absolute;
    width: 400px;
    height: 430px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 8px;
    padding: 0;
    background: hsla(0, 0%, 100%, 0.25) border-box;
    overflow: hidden;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
  }
}

@media screen and (min-width: 800px) {
  .registerMain {
    position: absolute;
    width: 500px;
    height: 430px;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    border-radius: 8px;
    padding: 0;
    background: hsla(0, 0%, 100%, 0.25) border-box;
    overflow: hidden;
    box-shadow: 0 0 0 1px hsla(0, 0%, 100%, 0.3) inset,
      0 0.5em 1em rgba(0, 0, 0, 0.6);
    text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.3);
  }
}

.registerMain::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: -30px;
  z-index: -1;
  -webkit-filter: blur(20px);
  filter: blur(20px);
}

.registerWay {
  display: flex;
  justify-content: space-evenly;
}

.toLogin {
  position: absolute;
  top: -15px;
  right: -15px;
  width: 140px;
  height: 140px;
  border: 0;
  margin: auto;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%);
}

.toLogin img {
  width: 140px;
  height: 140px;
}

/*隐藏radio, ^=选择器代表匹配*/
input[id^="registerTab"] {
  display: none;
}

/* 将radio相邻的label标签美化一下，可以在这里设置按钮的背景图标*/
input[id^="registerTab"] + label {
  height: 35px;
  width: 110px;
  text-align: left;
  float: right;
  line-height: 35px;
  color: white;
  font-size: 1.3rem;
  margin-top: 30px;
  margin-bottom: 10px;
  text-shadow: black 0.1em 0.1em 0.2em;
}

/* 聚焦时将radio相邻的label标签添加鼠标手势*/
input[id^="registerTab"] + label:hover {
  cursor: pointer;
}

/*切换tab时显示对应的tab内容*/
input[id^="registerTab"]:checked + label {
  color: red;
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.8);
}

/*切换tab时触发label标签里的before元素，一定要将input标签放在label之前,
请注意+跟~选择器的区别，+代表后面紧邻的xxx标签， ~代表之后所有的xxx标签*/
input[id^="registerTab"]:checked + label::before {
  position: absolute;
  display: inline-block;
  content: "";
  top: 65px;
  left: auto;
  width: 85px;
  height: 2px;
  background: white;
  box-shadow: 0px 0px 10px 1px #fd4275, 0 0 1px #fd4275, 0 0 1px #fd4275,
    0 0 1px #fd4275, 0 0 1px #fd4275, 0 0 1px #fd4275, 0 0 1px #fd4275;
}

.registerForm {
  padding: 0 35px;
}

.registerForm > input {
  margin-bottom: 30px;
  border: 0;
  padding-left: 7px;
}

.registerForm > input:first-child,
.registerForm > input:nth-child(2) {
  width: 100%;
  height: 35px;
  border-radius: 5px;
}

.registerForm > input:nth-child(3) {
  height: 35px;
  border-radius: 5px;
  width: 65%;
}

/*这是一个发送短信按键*/
.registerForm > input:nth-child(4) {
  height: 35px;
  border-radius: 5px;
  background: #f0ad24;
  color: white;
  width: 30%;
  margin-left: 5%;
}

.registerForm > input:nth-child(4):disabled {
  background: #ecf5ff;
  color: #409eff;
}

.registerForm > input:nth-child(4):hover {
  background: #fdf6ec;
  color: #e6a23c;
}

.rememberMe {
  margin-bottom: 5px;
}

.rememberMe > input[type="checkbox"] {
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4,
    0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4;
  background-color: #fff;
  width: 15px;
  height: 15px;
}

.rememberMe > label {
  margin-left: 5px;
}

.agreement {
  margin-bottom: 5px;
}

.agreement > input[type="checkbox"] {
  border-radius: 5px;
  box-shadow: 0px 0px 10px 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4,
    0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4, 0 0 1px #ac85b4;
  background-color: #fff;
  width: 15px;
  height: 15px;
}

.agreement > label {
  margin-left: 5px;
}

.registerForm input[type="submit"] {
  height: 35px;
  border-radius: 5px;
  background: #ecf5ff;
  color: #409eff;
  font-size: 1.1rem;
  width: 100%;
}

.registerForm input[type="submit"]:hover {
  height: 35px;
  border-radius: 5px;
  background: #fdf6ec;
  color: #e6a23c;
  font-size: 1.1rem;
  width: 100%;
}

[class^="alterTab"]::before {
  content: attr(data-words);
  display: inline-block;
  position: absolute;
  top: -65px;
  width: 100%;
  color: #db3a27;
}

[class^="alterTab"]::after {
  content: attr(data-alter);
  display: inline-block;
  position: absolute;
  top: 5px;
  width: 100%;
  color: #db3a27;
}

.alterTab1 {
  position: absolute;
  top: 180px;
  left: 40px;
  width: 100%;
  color: #db3a27;
}
</style>
