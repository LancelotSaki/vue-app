<template>
  <main>
    <p class="title">CMDB资源管理系统</p>
    <form @submit="checkForm1" action="https://www.baidu.com"
          method="post">
      <input type="text" name="username" placeholder="邮箱/手机号码"
             maxlength="35" v-model="form.username">
      <input type="password" placeholder="密码" name="password"
             maxlength="35" v-model="form.password">
      <input type="text" placeholder="验证码" name="verifyCode"
             maxlength="6" v-model="form.code">
      <input type="button" :value="leftTime === 60 ? '发 送': leftTime + '秒'" :disabled="sendClickDisable"
             @click="clickSend">
      <input type="submit" value="登 录">
      <a href="http://www.baidu.com" target="_blank">忘记密码?</a>
      <div class="alterTab1" :data-words="checkBox.usernameCheck">{{checkBox.passwordCheck}}</div>
    </form>
    <router-link class="toRegister" to="/register">
      <img src="../../../assets/images/register.png"/>
    </router-link>
  </main>
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
        form: {
          registerTab: "1",
          username: "",
          password: "",
          code: ""
        },
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
      "formValue.username": function (val) {
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
      "formValue.password": function (val) {
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
      "formValue.phone": function (val) {
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
      "formValue.code": function (val) {
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

<style lang="scss" scoped>

  .title {
    color: rgba(253, 255, 255, 1);
    font-size: 1.6rem;
    margin-top: 30px;
    margin-bottom: 10px;
    text-shadow: 0 1px rgba(122, 174, 195, 0.15),
    0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45),
    0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75),
    2px 4px 5px rgba(122, 174, 195, 1);
    text-align: center;
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

  form {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 35px 10px 35px;
  }

  form > input {
    margin-bottom: 30px;
    border: 0;
  }

  form > input:first-child,
  form > input:nth-child(2) {
    width: 100%;
    height: 35px;
    border-radius: 5px;
  }

  form a {
    width: 75px;
    height: 35px;
    text-align: right;
    float: right;
    color: #db3a27;
  }

  form > input:nth-child(3) {
    width: 65%;
    height: 35px;
    border-radius: 5px;
  }
  /*这是一个发送短信按键*/
  form > input:nth-child(4) {
    height: 35px;
    border-radius: 5px;
    background: #ecf5ff;
    color: #409eff;
    width: 30%;
    margin-left: 5%;
  }

  form > input:nth-child(4):disabled {
    background: #f4f4f5;
    color: #909399;
  }

  form > input:nth-child(4):hover {
    background: #fdf6ec;
    color: #e6a23c;
  }

  form input[type="submit"] {
    height: 35px;
    border-radius: 5px;
    background: var(--submit);
    color: #409eff;
    font-size: 1.1rem;
    width: 100%;
  }

  form input[type="submit"]:hover {
    height: 35px;
    border-radius: 5px;
    background: var(--submitHover);
    color: #e6a23c;
    font-size: 1.1rem;
    width: 100%;
  }

  .alterTab1::before {
    content: attr(data-words);
    display: inline-block;
    position: absolute;
    top: -65px;
    width: 100%;
    color: #fd4275;
  }

  .alterTab1 {
    position: absolute;
    top: 185px;
    width: 100%;
    color: #fd4275;
  }

  .alterTab2::before {
    content: attr(data-words);
    display: inline-block;
    position: absolute;
    top: -65px;
    width: 100%;
    color: #fd4275;
  }

  .alterTab2 {
    position: absolute;
    top: 185px;
    width: 100%;
    color: #fd4275;
  }
</style>

