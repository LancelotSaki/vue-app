<template>
  <main>
    <section id="mynetwork"></section>
  </main>
</template>
<script>
export default {
  name: "TopoMain",
  mounted() {},
  methods: {}
};
</script>
<style scoped>
main svg {
  position: absolute;
  left: 0;
  top: 0;
}

main {
  display: flex;
  justify-content: space-evenly;
  min-width: 650px;
}

main > aside:first-child::after {
  content: "";
  position: absolute;
  display: inline-block;
  width: calc(100% - 20px);
  height: 3px;
  left: 20px;
  bottom: 0;
  background-image: linear-gradient(
    to right,
    rgba(24, 88, 130, 1) 0%,
    rgba(24, 88, 130, 0.1) 100%,
    transparent 50%
  );
  background-size: 100% 3px;
  background-repeat: repeat-x;
}

main > aside:first-child {
  width: 300px;
  height: calc(100vh - 70px);
  position: relative;
  background: rgba(31, 37, 46, 0.61);
  clip-path: polygon(
    0% 0%,
    calc(100% - 20px) 0%,
    100% 20px,
    100% 100%,
    20px 100%,
    0% calc(100% - 20px),
    0 70%,
    10px calc(70% - 10px),
    10px calc(100px + 10px),
    0 100px
  );
  filter: drop-shadow(2px 4px 4px rgba(8, 13, 17, 0.64));
  color: white;
}

#mynetwork {
  width: calc(100%);
  height: calc(100vh - 80px);
  /*border: 1px solid lightgray;*/
}

table.legend_table {
  border-collapse: collapse;
}

table.legend_table td,
table.legend_table th {
  border: 1px solid #d3d3d3;
  padding: 10px;
}

table.legend_table td {
  text-align: center;
  width: 110px;
}
</style>
