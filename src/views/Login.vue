<template>
  <div class="loginPage">
    <div class="loginMain">
      <ul class="loginContainer">
        <li>
          <input type="radio" id="loginTab1" name="tab" checked><label for="loginTab1">密码登录</label>
          <form id="loginCon1" @submit="checkForm1" action="https://www.baidu.com"
                method="post">
            <input type="text" name="username" placeholder="邮箱/手机号码"
                   maxlength="35" v-model="formValue.username">
            <input type="password" placeholder="密码" name="password"
                   maxlength="35" v-model="formValue.password">
            <input type="submit" value="登 录">
            <a href="http://www.baidu.com" target="_blank">忘记密码?</a>
            <div class="alterTab1" :data-words="checkBox.usernameCheck">{{checkBox.passwordCheck}}</div>
          </form>
        </li>
        <li>
          <input type="radio" name="tab" id="loginTab2"><label for="loginTab2">手机登录</label>
          <form id="loginCon2" @submit="checkForm2" action="https://www.baidu.com"
                method="post">
            <input type="text" placeholder="手机号码" name="phone"
                   maxlength="11" v-model="formValue.phone">
            <input type="text" placeholder="验证码" name="verify"
                   maxlength="6" v-model="formValue.code">
            <input type="button" :value="leftTime === 60 ? '发 送': leftTime + '秒'" :disabled="sendClickDisable" @click="clickSend">
            <input type="submit" value="登 录">
            <div class="alterTab2" :data-words="checkBox.phoneCheck">{{checkBox.verifyCheck}}</div>
          </form>
        </li>
      </ul>
      <router-link class="toRegister" to="/home">
        <img src="../assets/images/register.png"/>
      </router-link>
    </div>
  </div>

</template>

<script>
// let debounce = require("lodash.debounce");
const phoneReg = process.env.VUE_APP_PHONE_REG;
const emailReg = process.env.VUE_APP_EMAIL_REG;
const passwordReg = process.env.VUE_APP_PASSWORD_REG;

/* author : admin */
export default {
  name: "Login",
  data() {
    return {
      height: 0,
      leftTime: 60,
      sendClickDisable: true,
      formValue: {
        username: "",
        password: "",
        phone: "",
        code: ""
      },
      checkBox: {
        usernameCheck: "",
        passwordCheck: "",
        phoneCheck: "",
        verifyCheck: ""
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
      if (phone == null || phone.length !== 11) {
        this.checkBox.phoneCheck = "请先输入11位的手机号码!";
        return;
      } else if (!phone.match(phoneReg)) {
        this.checkBox.phoneCheck = "手机号码格式不正确!";
        return;
      }
      this.checkBox.phoneCheck = "";
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
      const u = this.formValue.username;
      const p = this.formValue.password;
      if (u == null || u.length < 7) {
        this.checkBox.usernameCheck = "请先输入至少七位的用户名!";
        e.preventDefault();
        return false;
      } else if (!(u.match(emailReg) || u.match(phoneReg))) {
        this.checkBox.usernameCheck = "只能是邮箱或者手机号";
        e.preventDefault();
        return false;
      } else if (p == null || p.length < 6) {
        this.checkBox.passwordCheck = "请先输入至少六位的密码!";
        e.preventDefault();
        return false;
      } else if (!p.match(passwordReg)) {
        this.checkBox.passwordCheck = "只能是数字、字母或者组合!";
        e.preventDefault();
        return false;
      }
      this.checkBox.usernameCheck = "";
      this.checkBox.passwordCheck = "";
      localStorage.setItem("username", u);
      localStorage.setItem("password", p);
      const current = Date.parse(new Date().toString()) / 1000;
      localStorage.setItem(
        "expireLoginByUsername",
        (current + 7200).toString()
      );
      return true;
    },
    checkForm2(e) {
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
      localStorage.setItem("expireLoginByPhone", (current + 7200).toString());
      return true;
    }
  },
  watch: {
    "formValue.username": function(val) {
      if (val == null || val.length < 7) {
        this.checkBox.usernameCheck = "请先输入至少七位的用户名!";
        return null;
      } else if (!(val.match(emailReg) || val.match(phoneReg))) {
        this.checkBox.usernameCheck = "只能是邮箱或者手机号";
        return null;
      } else {
        this.checkBox.usernameCheck = "";
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
.loginPage {
  position: relative;
  background: #aed5ed;
  width: 100vw;
  min-height: 400px;
  overflow-y: auto;
  height: 100vh;
}

.loginMain {
  position: absolute;
  width: 400px;
  height: 300px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}

.loginContainer {
  position: absolute;
  width: 400px;
  height: 300px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  background: rgba(178, 175, 168, 0.27);
}

/*@media screen and (max-width: 800px){

}
@media screen and (min-width: 800px){
  .loginContainer {
    position: absolute;
    width: 400px;
    height: 300px;
    top: 0;
    bottom: 0;
    right: 200px;
    margin: auto;
    border-radius: 5px;
    background: rgba(178,175,168,0.27);
  }
}*/
/*float: left;tab并排必须加*/
.loginContainer > li {
  float: left;
  width: 150px;
}

.toRegister {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 140px;
  height: 140px;
  border: 0;
  margin: auto;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%);
}

.toRegister img {
  width: 140px;
  height: 140px;
}

/*隐藏radio*/
.loginContainer input[id^="loginTab"] {
  display: none;
}

/* 将radio相邻的label标签美化一下，可以在这里设置按钮的背景图标*/
.loginContainer input[id^="loginTab"] + label {
  height: 35px;
  width: 150px;
  text-align: center;
  float: right;
  line-height: 35px;
  color: white;
  font-size: 1.3rem;
  margin-top: 10px;
}

/* 聚焦时将radio相邻的label标签添加鼠标手势*/
.loginContainer input[id^="loginTab"] + label:hover {
  cursor: pointer;
}

/*绝对定位内容显示必须*/
[id^="loginCon"] {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  margin-left: 8%;
  margin-top: auto;
  margin-bottom: auto;
  display: none;
  width: 75%;
}
/*切换tab时显示对应的tab内容*/
input[id^="loginTab"]:checked ~ [id^="loginCon"] {
  display: block;
}
/*切换tab时显示对应的tab内容*/
input[id^="loginTab"]:checked ~ label {
  color: rosybrown;
}
/*切换tab时触发label标签里的before元素，一定要将input标签放在label之前*/
input[id^="loginTab"]:checked ~ label::before {
  position: absolute;
  display: inline-block;
  content: "";
  top: 44px;
  left: auto;
  width: 85px;
  height: 2px;
  background: white;
}

[id^="loginCon"] > input {
  margin-bottom: 30px;
  border: 0;
  padding-left: 7px;
}

[id^="loginCon"] > input:first-child,
[id^="loginCon"] > input:nth-child(2) {
  width: 100%;
  height: 35px;
  border-radius: 5px;
}

[id^="loginCon"] > a {
  width: 75px;
  height: 35px;
  text-align: right;
  float: right;
  color: #db3a27;
}

[id="loginCon2"] > input:nth-child(2) {
  height: 35px;
  border-radius: 5px;
  width: 65%;
}

/*这是一个发送短信按键*/
[id="loginCon2"] > input:nth-child(3) {
  height: 35px;
  border-radius: 5px;
  background: #f0ad24;
  color: white;
  width: 30%;
  margin-left: 5%;
}

[id="loginCon2"] > input:nth-child(3):disabled {
  background: #a9a9a9;
}

[id="loginCon2"] > input:nth-child(3):hover {
  background: #99ce5f;
}

[id^="loginCon"] input[type="submit"] {
  height: 35px;
  border-radius: 5px;
  background: #f0ad24;
  color: white;
  font-size: 1.1rem;
  width: 100%;
}

[id^="loginCon"] input[type="submit"]:hover {
  height: 35px;
  border-radius: 5px;
  background: #99ce5f;
  color: white;
  font-size: 1.1rem;
  width: 100%;
}

.alterTab1::before {
  content: attr(data-words);
  display: inline-block;
  position: absolute;
  top: -65px;
  width: 100%;
  color: #db3a27;
}

.alterTab1 {
  position: absolute;
  top: 105px;
  width: 100%;
  color: #db3a27;
}

.alterTab2::before {
  content: attr(data-words);
  display: inline-block;
  position: absolute;
  top: -65px;
  width: 100%;
  color: #db3a27;
}

.alterTab2 {
  position: absolute;
  top: 105px;
  width: 100%;
  color: #db3a27;
}
</style>
