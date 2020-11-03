<template>
  <aside>
    <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
    </el-input>

    <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="treeTrigger"
            ref="tree">
    </el-tree>
  </aside>
</template>

<script>
import menu from "../../../../public/json/cmdb-menu.json";
export default {
  name: "HomeAside",
  data() {
    return {
      filterText: "",
      data: menu,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    treeTrigger(value) {
      if (value.id === "firstIndex") {
        this.$router.push("/");
      } else if(value.id === "20")  {
        this.$router.push("/cmdb/model/create");
      } else if (value.id === "31") {
        this.$router.push("/auto-disco/topo");
      } else if (value.id === "34") {
        this.$router.push("/device/topo");
      } else if (value.id === "42") {
        this.$router.push("/es");
      } else if (value.id === "50") {
        this.$router.push("/cmdb/guide");
      } else if (value.id === "51") {
        this.$router.push("/cmdb/deploy");
      } else if (value.id === "52") {
        this.$router.push("/auto-disco");
      }
    }
  }
};
</script>
<style>
</style>
