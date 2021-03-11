<template>
  <main>
    <aside data-word="CMDB全文检索">
      <ul>
        <li>
          <input
            type="radio"
            name="selectSearchType"
            id="fuzzySearch"
            v-model="term"
            value="fuzzy"
          />
          <label for="fuzzySearch">模糊检索</label>
        </li>
        <li>
          <input
            type="radio"
            name="selectSearchType"
            id="preciseSearch"
            v-model="term"
            value="precise"
          />
          <label for="preciseSearch">精确检索</label>
        </li>
      </ul>
      <ol>
        <li>
          <input
            class="es-text-class"
            list="esDataList"
            autocomplete="off"
            v-model="keyword"
          />
          <datalist id="esDataList">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </datalist>
        </li>
        <li>
          <input
            type="button"
            class="es-btn-class"
            value="搜  索"
            @click="search"
          />
        </li>
      </ol>
    </aside>
    <section>
      <div>
        <p>虚拟机</p>
        <p style="line-height: 25px"><span style="color: red">使用中</span>					10.242.23.145;10.242.23.146;	10.242.23.145;	VMware-42 3f 5a 96 01 0a ea 02-aa e8 90 68 45 61 00 2c		cmdbes3d2	<span style="color: red">虚</span>拟<span style="color: red">机</span>			Red Hat Enterprise Linux Server release 7.5 (Maipo)	IT资源标准化管理系统-机房盘点APP	<span style="color: red">caiqian</span>	运营分析室				4		Intel(R) Xeon(R) CPU E7-4820 v3 @ 1.90GHz		16		；20201123李殊瑶清单业务更新
          0	1								229.92	249	7	705		是		4		郑翔				app	vlan			50	0	0</p>
      </div>
      <div>
        <p>虚拟机</p>
        <p style="line-height: 25px"><span style="color: red">使用中</span>						10.239.86.198;		VMware-42 3f 7f b7 49 c5 ab de-b2 1c 1b 24 f4 d4 d9 a9		cmdbapp1	<span style="color: red">虚</span>拟<span style="color: red">机</span>			Red Hat Enterprise Linux Server release 7.5 (Maipo)	IT资源标准化管理系统	<span style="color: red">caiqian</span>	运营分析室				4		Intel(R) Xeon(R) CPU E7-4820 v3 @ 1.90GHz		24					2019-01-16 00:00:00			1				1		50		10.239.86.222			298.04	251	14	623		是 	4	27	郑翔				HGT-Cluster-10F-A0203-B0203	vlan1048	200	10.239.27.171			0	</p>
      </div>
      <div>
        <p>虚拟机</p>
        <p style="line-height: 25px"><span style="color: red">使用中</span>							10.239.86.211;		VMware-42 3f 8d fe cc fe 17 8b-f2 5d f4 74 6b b3 1b b4		cmdbauto5	<span style="color: red">虚</span>拟<span style="color: red">机</span>		Red Hat Enterprise Linux Server release 7.5 (Maipo)	IT资源标准化管理系统	<span style="color: red">caiqian</span>	运营分析室				8		Intel(R) Xeon(R) CPU E7-4820 v3 @ 1.90GHz		16					2019-11-13 00:00:00			1		20191112145930703	1	1		50		10.239.86.222			78.4551	256	852	336		是	0010001a77184e1c9bfede0753db73fd	224b6a2c7f144c90bb86ffb561076af2	8	27	郑翔				HGT-Cluster-9F-A0203-B0203	vlan1048		10.239.27.35	50	0	0	</p>
      </div>
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
      this.axios.get(api).then(response => {
        console.log(response.data);
      });
    }, 500)
  }
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  aside {
    width: calc(100% - 50px);
    margin: auto 25px;
    position: relative;
    padding-top: 60px;
  }
}

@media screen and (min-width: 600px) {
  aside {
    width: 600px;
    margin: auto calc(50% - 300px);
    position: relative;
    padding-top: 60px;
  }
}

aside::before {
  content: "";
  position: absolute;
  display: inline-block;
  width: 48px;
  height: 48px;
  left: calc(40% - 48px);
  top: 0;
  background: url("../../../assets/images/common/cmdb.svg") no-repeat;
}

aside::after {
  content: attr(data-word);
  position: absolute;
  display: inline-block;
  width: 55%;
  height: 48px;
  line-height: 48px;
  left: 45%;
  top: 0;
  color: rgba(252, 249, 240, 0.9);
  font-size: 1.4em;
  text-shadow: 0 1px rgba(122, 174, 195, 0.15), 0 1px rgba(122, 174, 195, 0.3),
    0 1px rgba(122, 174, 195, 0.45), 0 1px rgba(122, 174, 195, 0.65),
    0 1px rgba(122, 174, 195, 0.75), 2px 4px 5px rgba(122, 174, 195, 1);
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
  margin: 0;
  padding: 0;
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
