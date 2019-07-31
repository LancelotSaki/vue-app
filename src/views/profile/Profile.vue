<template>
  <div class="profile">
    <main>
      <ul>
        <li><input id="personBase" type="radio" name="profileMenu"><label for="personBase">基础信息</label>
          <div>1</div>
        </li>
      </ul>
      <ul>
        <li><input id="personExtra" type="radio" name="profileMenu"><label for="personExtra">扩展信息</label>
          <div>2</div>
        </li>
      </ul>
      <ul>
        <li><input id="personConfig" type="radio" name="profileMenu"><label for="personConfig">个人配置</label>
          <div>3</div>
        </li>
      </ul>
      <ul>
        <li><input id="personLevel" type="radio" name="profileMenu"><label for="personLevel">个人等级</label>
          <div>4</div>
        </li>
      </ul>
      <ul>
        <li><input id="personHelp" type="radio" name="profileMenu"><label for="personHelp">帮助</label>
          <div>5</div>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
export default {
  name: "profile"
};
</script>

<style>
.profile ul {
  width: 50vw;
  height: 600px;
}
.profile ul > li input[type="radio"] {
  display: none;
}
.profile ul > li input[type="radio"] + label{
  height: 35px;
  width: 110px;
  text-align: left;
  float: left;
  line-height: 35px;
  color: white;
  font-size: 1.3rem;
  margin-top: 40px;
}
.profile ul > li input[type="radio"] + label:hover{
  cursor: pointer;
}
/*切换tab时显示对应的tab内容*/
.profile ul > li input[type="radio"] ~ div {
  display: none;
}
/*切换tab时显示对应的tab内容*/
.profile ul > li input[type="radio"]:checked ~ div {
  display: block;
}

/*切换tab时显示对应的tab内容*/
.profile ul > li input[type="radio"]:checked ~ label {
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


</style>
