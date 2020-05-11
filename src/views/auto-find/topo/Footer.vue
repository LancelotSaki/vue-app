<template>
  <footer>
  </footer>
</template>

<script>
export default {
  name: "TopoFooter"
};
</script>
<style>
/*
  footer::before {
    content: "";
    position: absolute;
    display: inline-block;
    width: 100%;
    left: 0;
    top: 0;
    height: 3px;
    background: -webkit-linear-gradient(
            left,
            rgba(0, 0, 0, 0) 0%,
            rgba(65, 117, 214, 1) 50%,
            rgba(0, 0, 0, 0) 100%
    );
  }
*/

  footer {
    position: fixed;
    width: calc(100% - 550px);
    height: 100px;
    left: 450px;
    bottom: 0;
  }
</style>
