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
  export default {
    name: "HomeAside",
    data() {
      return {
        filterText: '',
        data: [{
          id: "firstIndex",
          label: '首页'
        },
          {
            id: 1,
            label: '资源管理',
            children: [{
              id: 11,
              label: '配置项',
              children: [{
                id: 111,
                label: '物理机'
              }, {
                id: 112,
                label: '虚拟机'
              }]
            }]
          }, {
            id: 2,
            label: '模型管理',
            children: [{
              id: 21,
              label: '模型配置'
            }, {
              id: 22,
              label: '模型修改'
            }]
          }, {
            id: 3,
            label: '资源拓扑图',
            children: [{
              id: 31,
              label: '自动发现拓扑图'
            }, {
              id: 32,
              label: '资源关系拓扑'
            }, {
              id: 33,
              label: '全网拓扑'
            }]
          }, {
            id: 4,
            label: '资源搜索',
            children: [{
              id: 41,
              label: '综合查询'
            }, {
              id: 42,
              label: '全文检索'
            }]
          }],
        defaultProps: {
          children: 'children',
          label: 'label'
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
        if (value.id == 'firstIndex') {
          this.$router.push('/');
        } else if (value.id == '31') {
          this.$router.push('/auto/topo');
        } else if (value.id == '42') {
          this.$router.push('/cmdb/es');
        }
      }
    },
  };
</script>
<style>
</style>
