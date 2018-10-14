<template>
  <div id="footer">
    <div class="rem" v-show="left" @click="leftClick"></div>
    <div class="ram" v-show="right" @click="rightClick"></div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      left: true,
      right: true
    };
  },
  created() {
    // 赋初值
    this.listenMouse();
  },
  methods: {
    leftClick() {
      let x = 0;
      let height = document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight;
      const ch = document.documentElement.clientHeight;
      const mh = sh - ch; // 当前浏览器滚动条的最大高度
      let timer = setInterval(() => {
        height = height + 2 * x++;
        document.documentElement.scrollTop = height;
        if (mh - height <= 0) {
          clearInterval(timer);
        }
      }, 25);
    },
    rightClick() {
      let height = document.documentElement.scrollTop;
      let x = 0;
      let timer = setInterval(() => {
        height = height - 2 * x++;
        document.documentElement.scrollTop = height;
        if (height <= 0) {
          document.documentElement.scrollTop = 0;
          clearInterval(timer);
        }
      }, 25);
    },
    listenMouse() {
      // 兼容浏览器必须要两者都要用起来
      // 当前浏览器高度
      const scroll = document.documentElement.scrollTop;
      const sh = document.documentElement.scrollHeight;
      const ch = document.documentElement.clientHeight;
      scroll === 0 ? (this.right = false) : (this.right = true);
      // 当前浏览器滚动条的最大高度
      const mh = sh - ch;
      mh - scroll <= 1 ? (this.left = false) : (this.left = true);
    }
  },
  mounted() {
    window.addEventListener("scroll", this.listenMouse);
  }
};
</script>

<style>
.rem {
  position: fixed;
  left: 0;
  bottom: 0;
}

.rem::before {
  content: "";
  display: inline-block;
  background: url("../../assets/images/footer/rem01.png") no-repeat;
  width: 75px;
  height: 55px;
  background-size: 100% 100%;
}

.rem:hover {
  cursor: pointer;
}

.rem:hover::before {
  content: "";
  display: inline-block;
  background: url("../../assets/images/footer/rem02.png") no-repeat;
  width: 80px;
  height: 60px;
  background-size: 100% 100%;
  transition: width 0.8s, height 0.8s, -webkit-transform 0.8s; /* Safari 和 Chrome */
}

.ram {
  position: fixed;
  right: 0;
  bottom: 0;
}

.ram::before {
  content: "";
  display: inline-block;
  background: url("../../assets/images/footer/lam01.png") no-repeat;
  width: 75px;
  height: 75px;
  background-size: 100% 100%;
}

.ram:hover {
  cursor: pointer;
}

.ram:hover::before {
  content: "";
  display: inline-block;
  background: url("../../assets/images/footer/lam02.png") no-repeat;
  width: 80px;
  height: 80px;
  background-size: 100% 100%;
  transition: width 0.8s, height 0.8s, -webkit-transform 0.8s; /* Safari 和 Chrome */
}
</style>
