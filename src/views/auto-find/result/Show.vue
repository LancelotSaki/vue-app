<template>
  <div name="auto-find-result-show">
    <main>
      <ul>
        <li>
          <el-table
                  :data="tableData"
                  style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="所属用户">
                    <span>{{ props.row.uid }}</span>
                  </el-form-item>
                  <el-form-item label="进程号">
                    <span>{{ props.row.pid }}</span>
                  </el-form-item>
                  <el-form-item label="安装位置">
                    <span>{{ props.row.deploy }}</span>
                  </el-form-item>
                  <el-form-item label="数据存放位置">
                    <span>{{ props.row.dataDir }}</span>
                  </el-form-item>
                  <el-form-item label="最大连接数">
                    <span>{{ props.row.link }}</span>
                  </el-form-item>
                  <template v-if="props.row.node_ip_1">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_1">
                        <el-tag :type="props.row.node_status_1 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_1 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                  <template v-if="props.row.node_ip_2">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_2">
                        <el-tag :type="props.row.node_status_2 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_2 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="分布式MySQL采集结果" align="center">
              <el-table-column
                      label="主机IP"
                      prop="ip">
              </el-table-column>
              <el-table-column
                      label="端口号"
                      prop="port">
              </el-table-column>
              <el-table-column
                      label="状态"
                      prop="status">
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-input
                          v-model="search1"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                          disabled
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">版本对比
                  </el-button>
                  <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">入库
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <div class="pageDivLayout">
            <el-pagination
                    background
                    :current-page.sync="currentPage1"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="prev, pager, next, sizes, total"
                    :total="1000">
            </el-pagination>
          </div>
        </li>
        <li>
          <el-table
                  :data="redisData"
                  style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="所属用户">
                    <span>{{ props.row.uid }}</span>
                  </el-form-item>
                  <el-form-item label="进程号">
                    <span>{{ props.row.pid }}</span>
                  </el-form-item>
                  <el-form-item label="安装位置">
                    <span>{{ props.row.deploy }}</span>
                  </el-form-item>
                  <template v-if="props.row.node_ip_1">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_1">
                        <el-tag :type="props.row.node_status_1 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_1 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                  <template v-if="props.row.node_ip_2">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_2">
                        <el-tag :type="props.row.node_status_2 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_2 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="redis集群采集结果" align="center">
              <el-table-column
                      label="主机IP"
                      prop="ip">
              </el-table-column>
              <el-table-column
                      label="端口号"
                      prop="port">
              </el-table-column>
              <el-table-column
                      label="状态"
                      prop="status">
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-input
                          v-model="search2"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                          disabled
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">版本对比
                  </el-button>
                  <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">入库
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <div class="pageDivLayout">
            <el-pagination
                    background
                    :current-page.sync="currentPage2"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="prev, pager, next, sizes, total"
                    :total="1000">
            </el-pagination>
          </div>
        </li>

        <li>
          <el-table
                  :data="dmDBData"
                  style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="所属用户">
                    <span>{{ props.row.uid }}</span>
                  </el-form-item>
                  <el-form-item label="进程号">
                    <span>{{ props.row.pid }}</span>
                  </el-form-item>
                  <el-form-item label="安装位置">
                    <span>{{ props.row.deploy }}</span>
                  </el-form-item>
                  <template v-if="props.row.node_ip_1">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_1 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_1">
                        <el-tag :type="props.row.node_status_1 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_1 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                  <template v-if="props.row.node_ip_2">
                    <el-form-item label="其他集群节点IP" style="width: 33.3%;">
                      <span>{{ props.row.node_ip_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点端口号" style="width: 33.3%;">
                      <span>{{ props.row.node_port_2 }}</span>
                    </el-form-item>
                    <el-form-item label="其他集群节点状态" style="width: 33.3%;">
                      <template v-if="props.row.node_status_2">
                        <el-tag :type="props.row.node_status_2 == '运行中' ? 'success' : 'danger'">
                          {{ props.row.node_status_2 }}</el-tag>
                      </template>
                    </el-form-item>
                  </template>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="分布式dmDB采集结果" align="center">
              <el-table-column
                      label="主机IP"
                      prop="ip">
              </el-table-column>
              <el-table-column
                      label="端口号"
                      prop="port">
              </el-table-column>
              <el-table-column
                      label="状态"
                      prop="status">
              </el-table-column>
              <el-table-column>
                <template slot="header" slot-scope="scope">
                  <el-input
                          v-model="search3"
                          size="mini"
                          placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                  <el-button
                          disabled
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">版本对比
                  </el-button>
                  <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">入库
                  </el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          <div class="pageDivLayout">
            <el-pagination
                    background
                    :current-page.sync="currentPage3"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="prev, pager, next, sizes, total"
                    :total="1000">
            </el-pagination>
          </div>
        </li>
      </ul>

    </main>
    <footer></footer>
  </div>
</template>

<script>
  /* author : admin */
  export default {
    name: "auto-find-result-show",
    data() {
      return {
        search1: '',
        search2: '',
        search3: '',
        currentPage1: 1,
        currentPage2: 2,
        currentPage3: 1,
        tableData: [{
          id: '12987122',
          ip: '172.18.234.123',
          port: '3316',
          version: "MariaDB-10.0.1 ver",
          status: '运行中',
          uid: "maria",
          pid: "16652",
          dataDir: '/cmdb/maria/maria/data',
          deploy: '/cmdb/maria',
          link: '500',
          node_ip_1: "172.18.234.124",
          node_port_1: "3316",
          node_status_1: "已关闭",
          node_ip_2: "172.18.234.125",
          node_port_2: "3316",
          node_status_2: "运行中"
        }, {
          id: '12987122',
          ip: '172.18.234.124',
          port: '3316',
          version: "MariaDB-10.0.1 ver",
          status: '已关闭',
          uid: "maria",
          pid: "16653",
          dataDir: '/cmdb/maria/maria/data',
          deploy: '/cmdb/maria',
          link: '300',
          node_ip_1: "172.18.234.123",
          node_port_1: "3316",
          node_status_1: "运行中",
          node_ip_2: "172.18.234.125",
          node_port_2: "3316",
          node_status_2: "运行中"
        }, {
          id: '12987122',
          ip: '172.18.234.125',
          port: '3316',
          version: "MariaDB-10.0.1 ver",
          status: '运行中',
          uid: "maria",
          pid: "16652",
          dataDir: '/cmdb/maria/maria/data',
          deploy: '/cmdb/maria',
          link: '500',
          node_ip_1: "172.18.234.123",
          node_port_1: "3316",
          node_status_1: "运行中",
          node_ip_2: "172.18.234.124",
          node_port_2: "3316",
          node_status_2: "已关闭"
        }, {
          id: '12987122',
          ip: '192.168.72.128',
          port: '3306',
          version: "MariaDB-10.0.1 ver",
          status: '运行中',
          uid: "maria",
          pid: "16652",
          dataDir: '/cmdb/maria/maria/data',
          deploy: '/cmdb/maria',
          link: '500'
        }],
        redisData: [{
          id: '12987126',
          ip: '192.168.72.128',
          port: '9000',
          version: "1.17.8",
          status: '运行中',
          uid: "cmdb",
          pid: "10036",
          config: '/csd/cmdb/ep/nginx/conf/nginx.conf',
          deploy: '/csd/cmdb/ep/nginx',
          node_ip_1: "192.168.72.129",
          node_port_1: "9001",
          node_status_1: "运行中"
        }, {
          id: '12987126',
          ip: '192.168.72.129',
          port: '9001',
          version: "1.17.8",
          status: '运行中',
          uid: "cmdb",
          pid: "10036",
          config: '/csd/cmdb/ep/nginx/conf/nginx.conf.app',
          deploy: '/csd/cmdb/ep/nginx',
          node_ip_1: "192.168.72.128",
          node_port_1: "9000",
          node_status_1: "运行中"
        }, {
          id: '12987122',
          ip: '192.168.72.129',
          port: '8079',
          version: "1.17.8",
          status: '运行中',
          uid: "cmdb",
          pid: "16652",
          config: '/csd/cmdb/ep/nginx/conf/nginx.conf',
          deploy: '/csd/cmdb/ep/nginx',
          node_ip_1: "192.168.72.128",
          node_port_1: "9000",
          node_status_1: "运行中"
        }, {
          id: '12987126',
          ip: '172.18.231.154',
          port: '8079',
          version: "1.14.2",
          status: '运行中',
          uid: "cmdb",
          pid: "10036",
          config: '/csd/cmdb/ep/nginx/conf/nginx.conf',
          deploy: '/csd/cmdb/ep/nginx'
        }],
        dmDBData: [{
          id: '12987126',
          ip: '172.21.4.113',
          port: '5561',
          version: "5.8",
          status: '运行中',
          uid: "dmdbtest",
          pid: "10036",
          deploy: '/dmdbdev/dmdbtest',
          node_ip_1: "192.168.72.129",
          node_port_1: "9001",
          node_status_1: "运行中"
        }, {
          id: '12987126',
          ip: '172.21.4.114',
          port: '5562',
          version: "5.8",
          status: '运行中',
          uid: "dmdbtest",
          pid: "10036",
          deploy: '/dmdbdev/dmdbtest',
          node_ip_1: "192.168.72.128",
          node_port_1: "9000",
          node_status_1: "运行中"
        }]
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 4 === 1) {
          return 'warning-row';
        } else if (rowIndex % 4 === 3) {
          return 'success-row';
        }
        return '';
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  };
</script>

<style>

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 100px;
    text-align: right;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }

  .demo-table-expand .el-form-item__label {
    line-height: 25px;
  }

  .demo-table-expand .el-form-item__content {
    line-height: 25px;
  }

  .pageDivLayout {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
  }
</style>
