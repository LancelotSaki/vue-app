<template>
  <header>
    <ul>
      <li style="flex: 1;"></li>
      <li>
        <el-popover
          placement="bottom-start"
          title="标题"
          width="200"
          trigger="hover"
        >
          <ol>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
          </ol>
          <el-button style="border: 0;" slot="reference"
            ><i class="el-icon-set-up"></i>常用链接</el-button
          >
        </el-popover>
      </li>

      <li>
        <el-popover
          placement="bottom-start"
          title="标题"
          width="200"
          trigger="hover"
        >
          <ol>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
          </ol>
          <el-button style="border: 0;" slot="reference"
            ><i class="el-icon-notebook-2"></i>历史记录</el-button
          >
        </el-popover>
      </li>

      <li>
        <el-popover
          placement="bottom-start"
          title="标题"
          width="200"
          trigger="hover"
        >
          <ol>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
          </ol>
          <el-button style="border: 0;" slot="reference"
            ><i class="el-icon-setting"></i>设置</el-button
          >
        </el-popover>
      </li>
      <li>
        <el-popover
          placement="bottom-start"
          title="登录用户"
          width="200"
          trigger="hover"
        >
          <ol>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
            <li>退出</li>
          </ol>
          <el-button style="border: 0;" slot="reference"
            ><i class="el-icon-user"></i>CMDB管理员</el-button
          >
        </el-popover>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      title: ""
    };
  }
};
</script>
<style scoped>
header::before {
  content: "CMDB";
  position: absolute;
  display: inline-block;
  width: 200px;
  height: 100%;
  line-height: 60px;
  text-align: center;
  font-size: 24px;
  top: 0;
}
ul {
  width: 100%;
  display: flex;
  /*水平等比*/
  justify-content: space-between;
  /*垂直等高*/
  align-items: center;
}
ul > li {
  flex-grow: 0;
}
ol {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}
ol > li {
  flex: 1;
}
</style>
