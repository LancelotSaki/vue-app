<template>
  <div class="registerPage">
    <main class="registerMain">
      <div class="registerWay">
        <input type="radio" name="tab" id="registerTab1" checked><label for="registerTab1">邮箱注册</label>
        <input type="radio" name="tab" id="registerTab2"><label for="registerTab2">手机注册</label>
      </div>
      <form @submit="checkForm1" action="https://www.baidu.com"
            method="post" class="registerForm">
        <input type="text" name="email" placeholder="邮箱"
               maxlength="35" v-model="formValue.email">
        <input type="password" placeholder="密码" name="password"
               maxlength="35" v-model="formValue.emailPassword">
        <input type="text" placeholder="验证码" name="emailCode"
               maxlength="6" v-model="formValue.emailCode">
        <input type="button" :value="leftTime === 60 ? '发 送': leftTime + '秒'" :disabled="sendClickDisable"
               @click="clickSend">
        <input type="submit" value="注 册">
        <div class="alterTab1" :data-words="checkBox.emailCheck" :data-alter="checkBox.emailCodeCheck">
          {{checkBox.passwordCheck}}
        </div>
      </form>
      <router-link class="toLogin" to="/login">
        <img src="../../assets/images/login.png"/>
      </router-link>
    </main>
  </div>
</template>

<script>
// let debounce = require("lodash.debounce");
const phoneReg = process.env.VUE_APP_PHONE_REG;
const emailReg = process.env.VUE_APP_EMAIL_REG;
const passwordReg = process.env.VUE_APP_PASSWORD_REG;

/* author : admin */
export default {
  name: "Register",
  data() {
    return {
      form: {
        way: 1,
        username: "",
        password: "",
        code: ""
      },
      formCheck: {
        usernameCheck: "",
        passwordCheck: "",
        codeCheck: ""
      },
      height: 0,
      leftTime: 60,
      rightTime: 60,
      sendClickDisable: true,
      formValue: {
        email: "",
        emailPassword: "",
        emailCode: "",
        phonePassword: "",
        phone: "",
        phoneCode: ""
      },
      checkBox: {
        emailCheck: "",
        passwordCheck: "",
        emailCodeCheck: "",
        phoneCheck: "",
        phoneCodeCheck: ""
      }
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
    if (
      saveTime != null &&
      saveTime !== undefined &&
      saveTime !== "" &&
      parseInt(saveTime, 10) > currentTime
    ) {
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
      const phone = this.formValue.phone;
      const way = this.form.way;
      const u = this.form.username;
      if (way === 1) {
        if (!u) {
          this.formCheck.usernameCheck = "请先输入邮箱账号";
          return;
        } else if (!u.match(emailReg)) {
          this.formCheck.usernameCheck = "邮箱格式错误!";
        }
      } else {
        if (!phone || phone.length !== 11) {
          this.formCheck.usernameCheck = "请先输入11位的手机号码!";
          return;
        } else if (!phone.match(phoneReg)) {
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
    checkForm1(e) {
      // 邮箱提交验证
      const u = this.formValue.email;
      const p = this.formValue.password;
      const v = this.formValue.emailCode;
      if (!u.match(emailReg)) {
        this.checkBox.emailCheck = "请先输入邮箱账号";
        this.checkBox.passwordCheck = "";
        this.checkBox.emailCodeCheck = "";
        e.preventDefault();
        return false;
      }
      if (!p || p.length < 6) {
        this.checkBox.emailCheck = "";
        this.checkBox.passwordCheck = "请先输入至少六位的密码!";
        this.checkBox.emailCodeCheck = "";
        e.preventDefault();
        return false;
      } else if (!p.match(passwordReg)) {
        this.checkBox.emailCheck = "";
        this.checkBox.passwordCheck = "只能是数字、字母或者组合!";
        this.checkBox.emailCodeCheck = "";
        e.preventDefault();
        return false;
      }
      if (!v && v !== "1234") {
        this.checkBox.emailCheck = "";
        this.checkBox.passwordCheck = "";
        this.checkBox.emailCodeCheck = "验证码错误!";
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
    },
    checkForm2(e) {
      // 手机提交验证
      const p = this.formValue.phone;
      const c = this.formValue.code;
      if (p == null || p.length !== 11) {
        this.checkBox.phoneCheck = "请先输入11位的手机号码!";
        e.preventDefault();
        return false;
      } else if (!p.match(phoneReg)) {
        this.checkBox.phoneCheck = "手机号码格式不正确!";
        e.preventDefault();
        return false;
      } else if (c == null || c.length === 0) {
        this.checkBox.verifyCheck = "验证码为空!";
        e.preventDefault();
        return false;
      } else if (c.length !== 6) {
        this.checkBox.verifyCheck = "请输入6位数的验证码!";
        e.preventDefault();
        return false;
      } else if (!c.match(/^[a-zA-Z0-9]+$/)) {
        this.checkBox.verifyCheck = "只能是数字、字母!";
        e.preventDefault();
        return false;
      }
      this.checkBox.phoneCheck = "";
      this.checkBox.verifyCheck = "";
      localStorage.setItem("phone", p);
      localStorage.setItem("code", c);
      const current = Date.parse(new Date().toString()) / 1000;
      localStorage.setItem(
        "expireregisterByPhone",
        (current + 7200).toString()
      );
      return true;
    }
  },
  watch: {
    "formValue.email": function(val) {
      if (!val.match(emailReg)) {
        this.checkBox.emailCheck = "邮箱格式不正确!";
        return null;
      } else {
        this.checkBox.emailCheck = "";
        return null;
      }
    },
    "formValue.password": function(val) {
      if (val == null || val.length < 6) {
        this.checkBox.passwordCheck = "请先输入至少六位的密码!";
        return null;
      } else if (!val.match(passwordReg)) {
        this.checkBox.passwordCheck = "只能是数字、字母或者组合!";
        return null;
      } else {
        this.checkBox.passwordCheck = "";
        return null;
      }
    },
    "formValue.phone": function(val) {
      if (val == null || val.length !== 11) {
        this.checkBox.phoneCheck = "请先输入11位的手机号码!";
        return null;
      } else if (!val.match(phoneReg)) {
        this.checkBox.phoneCheck = "手机号码格式不正确!";
        return null;
      } else {
        this.sendClickDisable = false;
        this.checkBox.phoneCheck = "";
        return null;
      }
    },
    "formValue.code": function(val) {
      if (val == null || val.length === 0) {
        this.checkBox.verifyCheck = "验证码为空!";
        return null;
      } else if (val.length !== 6) {
        this.checkBox.verifyCheck = "请输入6位数的验证码!";
        return null;
      } else if (!val.match(/^[a-zA-Z0-9]+$/)) {
        this.checkBox.verifyCheck = "只能是数字、字母或者组合!";
        return null;
      } else {
        this.checkBox.verifyCheck = "";
        return null;
      }
    }
  }
};
</script>

<style>
.registerPage {
  position: relative;
  width: 100vw;
  min-height: 340px;
  overflow-y: auto;
  height: 100vh;
}

.registerPage,
.registerMain::before {
  background: url("../../assets/images/luori_wanxia-010.jpg") 0 / cover fixed;
}

@media screen and (max-width: 400px) {
  .registerMain {
    position: absolute;
    width: 340px;
    min-width: 340px;
    height: 400px;
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
    height: 400px;
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
    width: 400px;
    height: 400px;
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

/*隐藏radio*/
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
  margin-top: 40px;
}

/* 聚焦时将radio相邻的label标签添加鼠标手势*/
input[id^="registerTab"] + label:hover {
  cursor: pointer;
}

/*绝对定位内容显示必须*/
[id^="registerCon"] {
  position: absolute;
  left: 0;
  right: 0;
  top: 90px;
  margin: 0 auto;
  display: none;
  width: 75%;
}

/*切换tab时显示对应的tab内容*/
input[id^="registerTab"]:checked ~ [id^="registerCon"] {
  display: block;
}

/*切换tab时显示对应的tab内容*/
input[id^="registerTab"]:checked ~ label {
  color: red;
  text-shadow: 0 1px 1px hsla(0, 0%, 100%, 0.8);
}

/*切换tab时触发label标签里的before元素，一定要将input标签放在label之前*/
input[id^="registerTab"]:checked ~ label::before {
  position: absolute;
  display: inline-block;
  content: "";
  top: 75px;
  left: auto;
  width: 85px;
  height: 2px;
  background: white;
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
  background: #a9a9a9;
}

.registerForm > input:nth-child(4):hover {
  background: #99ce5f;
}

.registerForm input[type="submit"] {
  height: 35px;
  border-radius: 5px;
  background: #f0ad24;
  color: white;
  font-size: 1.1rem;
  width: 100%;
}

.registerForm input[type="submit"]:hover {
  height: 35px;
  border-radius: 5px;
  background: #99ce5f;
  color: white;
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
  top: 105px;
  width: 100%;
  color: #db3a27;
}
</style>
