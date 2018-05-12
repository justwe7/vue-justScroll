<template>
  <div id="app">
    <button style="position: fixed;top:0;right:0;" @click="te">伏击</button>
    <just-scroll ref="wa" @onBottom="load" :offset="100" :auto="true">
      <ul id="xxx">
        <li v-for="(item,index) in content">
          ~{{index+1}}···{{item.model}}
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
      n: 1,
      content: []
    }
  },
  methods: {
    fetch() {
      this.$axios({
        methods: 'get',
        url: 'https://easy-mock.com/mock/5ad58a4fbeecc618795e58ca/mkaixin/car/list'
      }).then((res) => {
        (this.n===1) && (this.content = [])
        this.content = [...this.content, ...res.data.data.content]
        this.n++
        this.$refs.wa.endLoading();
      }).catch((err)=>{
        this.$refs.wa.endLoading();
      })
    },
    load() {
      this.fetch()

//      setTimeout(() => {
////        this.len+=10;
//        this.$refs.wa.endLoading();
//      }, 2000)
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
      line-height: 80px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
