<template>
  <main>
    <section>
      <select value="">
        <option>精确检索</option>
        <option>模糊检索</option>
      </select>
      <input id="es-text-id" list="esDataList" autocomplete="off"/>
      <datalist id="esDataList">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </datalist>
      <input type="button" id="es-btn-id" value="搜  索"/>
    </section>
  </main>
</template>
<script>
  export default {
    name: "EsMain"
  };
</script>
<style scoped>

  @media screen and (max-width: 600px) {
    section {
      width: calc(100% - 50px);
      margin: auto 25px;
      position: relative;
      display: flex;
      padding-top: 60px;
    }
  }

  @media screen and (min-width: 600px) {
    section {
      width: 600px;
      margin: auto calc(50% - 300px);
      position: relative;
      display: flex;
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

  #es-text-id {
    width: calc(100% - 200px);
    height: 40px;
    border: 1px solid rgba(128, 128, 128, 0.618);
    padding: 12px 16px;
    background: #fff;
    color: #222;
  }

  #es-text-id:focus {
    border: 1px solid rgba(112, 142, 245, 0.618);
  }

  #es-btn-id {
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
