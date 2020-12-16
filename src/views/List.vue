<template>
  <div class="container">
    list
    <img :src="image" alt="">
  </div>
</template>

<script>
const banner = new Image();
banner.src = '../assets/images/banner01.png';
console.log(banner)
export default {
  name: 'List',
  data () {
    return {
      image: banner
    }
  }
};
</script>

<style lang="scss">
.container{

}
</style>
