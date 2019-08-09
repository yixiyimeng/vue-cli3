<template>
  <div id="app">
    <a href="/index.html" class="abc">登录到主页</a>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style scoped="scoped" lang="less">
@import '../../assets/reset.css'; 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.abc{
	background: #f00
}
</style>
