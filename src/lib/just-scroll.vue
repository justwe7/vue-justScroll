<template>
  <section class="just_scroller_wrapper" ref="scroller">
    <slot ref="main"></slot>
    <!--<ul ref="main" id="xxx">
      <li v-for="(i,inex) in len">
        {{inex+1}}
      </li>
    </ul>-->
    <div v-show="isLoading" class="loading"><i class="spinner"></i>加载中...</div>
  </section>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'just-scroll',
      props: {
        offset: {
          default: 100,
          type: Number
        }
      },
      data() {
          return {
            isLoading: false,//加载的开关
            wrapperH: 0,//容器高度
            listH: 0,//内容高度
            len: 40
          }
      },
      computed: {
//        listH() {
//          len
//        }
      },
      watch: {
        isLoading() {//监听开关 修改内容高度
          this.listH = document.getElementById('xxx').getBoundingClientRect().height;
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.init();
        })
      },
      methods: {
        scroll(ev) {//滚动事件
          console.log(367);
          if (this.isLoading) return false;
          const Top = ev.target.scrollTop;
          if (Top+this.wrapperH+50 > this.listH){
//            console.log(document.getElementById('xxx').clientHeight);
            this.loadMore();//关闭提拉加载
            this.$emit('onBottom')
          }
        },
        startLoading() {//禁止执行事件
          this.isLoading = true
        },
        endLoading(isFinshed) {//重新打开
          if (isFinshed){
            this.destory();
          }
          this.isLoading = false;
        },
        loadMore() {
          this.startLoading();
          /*this.len+=10;
          setTimeout(() => {
            this.endLoading();
          }, 2000)*/
//alert(9);
        },
        init() {//初始化绑定事件
          this.listH = document.getElementById('xxx').getBoundingClientRect().height;
          this.wrapperH = this.$refs.scroller.getBoundingClientRect().height;
//        console.log(this.$refs.scroller.getBoundingClientRect());
//        console.log(this.$refs.main.clientHeight);
          this.$refs.scroller.addEventListener("scroll", this.scroll)
        },
        destory() {
          this.$refs.scroller.removeEventListener("scroll", this.scroll)
        }
      },
      components: {}
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.just_scroller_wrapper{
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;


  .loading{
    padding: 10px 0;
    text-align: center;
    font-size: 15px;
    color: #666;
    .spinner{
      display: inline-block;
      margin-right: 10px;
      vertical-align: sub;
      box-sizing: border-box;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: 2px solid #ccc;
      border-top-color: #333;
      animation: spinner .6s linear infinite;
    }
  }
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
}
</style>
