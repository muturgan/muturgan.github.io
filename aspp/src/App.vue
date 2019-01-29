<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
	export default {
		created() {
      this.$router.push({name: 'resume'});
		}
	}
</script>

<style>
:root {
   --vue-green: rgb(66,185,131);
   --vue-dark: rgb(52,73,94);
}
html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
	box-sizing: border-box;
	font-family: Arial, sans-serif;
   line-height: 1.5;
   background-color: var(--vue-dark);
   padding: 0;
   margin: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
}
.js-hidden {
	display: none;
}
</style>