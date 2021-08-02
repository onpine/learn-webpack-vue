<template>
  <div id="container">
    <h1>{{ initData }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initData: "Vue开发环境运行",
    };
  },
};
</script>

<style scoped>
#container {
  color: skyblue;
  display: flex;
}
</style>
