<template>
  <div name="Exe">
    <main>
      <form class="test-demo">
           <ul>
             <li>自动发现1</li>
             <li>自动发现2</li>
             <li>自动发现3</li>
             <li>自动发现4</li>
             <li>自动发现1</li>
             <li>自动发现2</li>
             <li>自动发现3</li>
             <li>自动发现4</li>
             <li>自动发现1</li>
             <li>自动发现2</li>
             <li>自动发现3</li>
             <li>自动发现4</li>
           </ul>
      </form>
    </main>
  </div>
</template>

<script>
/* author : admin */
export default {
  name: "Exe",
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style>

  .test-demo {
    width: 800px;
  }

  .test-demo ul {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .test-demo ul li {
    min-width: 100px;
  }
</style>
