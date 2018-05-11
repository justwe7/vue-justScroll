<template>
  <div id="app">
    <button style="position: fixed;top:0;right:0;" @click="te">伏击</button>
    <just-scroll ref="wa" @onBottom="load" :offset="200">
      <ul id="xxx">
        <li v-for="(i,inex) in len">
          {{inex}}
        </li>
      </ul>
    </just-scroll>

  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      len: 40
    }
  },
  methods: {
    load() {
      this.len+=10;
      setTimeout(() => {
        this.$refs.wa.endLoading();
      }, 2000)
    },
    te() {
      this.$refs.wa.destory()
    }
  },
  computed: {
  }
}
</script>

<style  lang="scss" rel="stylesheet/scss">
  *{
    box-sizing: border-box;
  }
#app{
  height: 100vh;
  ul{
    li{
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
