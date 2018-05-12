<template>
  <div id="app">
    <button style="position: fixed;top:0;right:0;z-index: 11" @click="te">重置</button>
    <just-scroll ref="wa" @onBottom="load" :offset="-20" :auto="true">
      <ul id="xxx">
        <li v-for="(item,index) in content">
          ~{{index+1}}···{{item.model}}
        </li>
      </ul>
    </just-scroll>

  </div>
</template>

<script type="text/ecmascript-6">
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
        params: {page: this.n},
        url: 'https://easy-mock.com/mock/5ad58a4fbeecc618795e58ca/mkaixin/car/list'
      }).then((res) => {
          setTimeout(() => {
            (this.n===1) && (this.content = [])
            this.content = [...this.content, ...res.data.data.content]
            this.n++;
            if (this.n > 3){
              this.$refs.wa.endLoading(true);
            }else {
              this.$refs.wa.endLoading();
            }
          }, 0)
      }).catch((err)=>{
        this.$refs.wa.endLoading();
      })
    },
    load() {
      this.fetch()
    },
    te() {
      this.n = 1;
      this.fetch()
      this.$refs.wa.init();
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
