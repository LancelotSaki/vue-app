<template>
  <main>
    <section>
      <ul>
        <li>
          <input type="radio" name="selectSearchType" id="fuzzySearch" v-model="term" value="fuzzy"/>
          <label for="fuzzySearch">模糊检索</label>
        </li>
        <li>
          <input type="radio" name="selectSearchType" id="preciseSearch" v-model="term" value="precise"/>
          <label for="preciseSearch">精确检索</label>
        </li>
      </ul>
      <ol>
        <li>
          <input class="es-text-class" list="esDataList" autocomplete="off" v-model="keyword"/>
          <datalist id="esDataList">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </datalist>
        </li>
        <li>
          <input type="button" class="es-btn-class" value="搜  索" @click="search"/>
        </li>
      </ol>
    </section>
  </main>
</template>
<script>
const debounce = require("lodash.debounce");
export default {
  name: "EsMain",
  data() {
    return {
      term: "fuzzy",
      keyword: ""
    };
  },
  methods: {
    search: debounce(function() {
      console.log(this.term + ":" + this.keyword);
      let api = "http://localhost:8080/es-service/result";
      this.axios.get(api).then((response) => {
        console.log(response.data)
      })
    }, 500)
  }
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  section {
    width: calc(100% - 50px);
    margin: auto 25px;
    position: relative;
    padding-top: 60px;
  }
}

@media screen and (min-width: 600px) {
  section {
    width: 600px;
    margin: auto calc(50% - 300px);
    position: relative;
    padding-top: 60px;
  }
}

section::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 48px;
  height: 48px;
  left: calc(40% - 48px);
  top: 0;
  background: url("../../../assets/images/common/cmdb.svg") no-repeat;
}

section::after {
  content: "CMDB全文检索";
  position: absolute;
  display: inline-block;
  width: 55%;
  height: 48px;
  line-height: 48px;
  font-size: 20px;
  left: 45%;
  top: 0;
  color: rgba(165, 153, 153, 1);
}

select {
  width: 100px;
  border: 1px solid rgba(128, 128, 128, 0.618);
  color: rgba(165, 153, 153, 1);
}

select:focus {
  border: 1px solid rgba(112, 142, 245, 0.618);
}

ul,
ol {
  display: flex;
  width: 100%;
}

ul > li {
}

ol > li:first-child {
  width: calc(100% - 100px);
}

input[type="radio"] {
  display: none;
}

input[type="radio"] + label::before {
  border-left: 1px rgba(128, 128, 128, 0.618) solid;
  left: 0;
  height: 9px;
}

input[type="radio"] + label {
  margin-right: 1px;
  position: relative;
  display: inline-block;
  height: 35px;
  line-height: 35px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  padding: 5px 17px;
  color: #464646;
}

input[type="radio"] + label::after {
  content: "";
  position: absolute;
  top: 4px;
  right: 0;
  bottom: -1px;
  left: 0;
  z-index: -1;
  transform: scale(1.1, 1.3) perspective(0.5em) rotateX(2.2deg);
  transform-origin: bottom left;
  background: rgba(255, 255, 255, 0.8);
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
}

input[type="radio"]:checked + label::before {
  background: #fff;
}

input[type="radio"]:checked + label {
  color: #010101;
  cursor: auto;
  z-index: 1;
}

input[type="radio"]:checked + label::after {
  background: #fff;
  border: 1px rgba(128, 128, 128, 0.618) solid;
  border-bottom: none;
}

input[type="radio"] + label:hover {
  cursor: pointer;
}

.es-text-class {
  width: 100%;
  height: 40px;
  border: 1px solid rgba(128, 128, 128, 0.618);
  padding: 12px 16px;
  background: #fff;
  color: #222;
}

.es-text-class:focus {
  /*去掉input点击后边框颜色*/
  outline: none;
}

.es-btn-class {
  background: rgba(78, 110, 242, 1);
  cursor: pointer;
  width: 100px;
  font-size: 17px;
  color: white;
  height: 40px;
  border: 0;
}

input::-webkit-calendar-picker-indicator {
  display: none;
}
</style>
