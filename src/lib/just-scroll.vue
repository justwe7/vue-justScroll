<template>
  <section class="just_scroller_wrapper" ref="scroller">
    <div class="main" :style="transY">
      <slot ref="main"></slot>
    </div>
    <!--<ul ref="main" id="xxx">
      <li v-for="(i,inex) in len">
        {{inex+1}}
      </li>
    </ul>-->
    <div :class="{show: isLoading}" class="loading"><i class="spinner"></i>加载中...</div>
  </section>
</template>

<script type="text/ecmascript-6">
    export default {
      name: 'just-scroll',
      props: {
        offset: {
          default: 100,
          type: Number
        },
        auto: {
          default: false,
          type: Boolean
        }
      },
      data() {
          return {
            isLoading: false,//加载的开关
            moveY: 0,
            wrapperH: 0,//容器高度
            listH: 0,//内容高度
            len: 40
          }
      },
      computed: {
        transY() {
          return {
//            transform: `translate3d(0,${this.moveY}px,0)`
            transform: `translate3d(0,0px,0)`
          }
        },
        os() {
          const u = navigator.userAgent;
          const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //是否为ios设备
          const isPC = typeof window.orientation == 'undefined'; //是否为PC端
          const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;; //是否为android端
          return  isIOS && "ios" || isPC && "pc" || isAndroid && "Android"
        }
//        listH() {
//          len
//        }
      },
      watch: {
        isLoading() {//监听开关 修改内容高度
//          this.autoFetch()
          this.listH = document.getElementById('xxx').getBoundingClientRect().height;
        }
      },
      mounted() {
        this.$nextTick(() => {
          this.init();
        })
      },
      methods: {
        autoFetch() {//内容高度未满屏 自动加载一组数据
          if (this.listH < this.wrapperH && this.auto){
            this._dispathBottom();
          }
        },
        scroll(ev) {//滚动事件
//          console.log(367);
          if (this.isLoading) return false;
          const Top = ev.target.scrollTop;
          if (Top+this.wrapperH+50 > this.listH){
//            console.log(document.getElementById('xxx').clientHeight);
            this._dispathBottom();
          }
        },
        _dispathBottom() {//派发事件
          this.loadMore();//关闭提拉加载
          this.$emit('onBottom');
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
          const Wrap = this.$refs.scroller;//滚动盒子
          this.listH = document.getElementById('xxx').getBoundingClientRect().height;
          this.wrapperH = Wrap.getBoundingClientRect().height;
//        console.log(Wrap.getBoundingClientRect());
//        console.log(this.$refs.main.clientHeight);

          this.autoFetch();
          Wrap.addEventListener("scroll", this.scroll)

          if (this.os === 'ios' || this.os === 'Android'){
            Wrap.addEventListener("touchstart", this._sD)
          }else {
            Wrap.addEventListener("mousedown", this._sD)
          }
          console.log(this.os);
        },
        _sD(ev) {
          const stPointY = ev.changedTouches['0'].clientY;
//          console.log(ev.changedTouches['0'].clientY);
          this.$refs.scroller.addEventListener("touchmove", ev=>{
            const mPointY = ev.changedTouches['0'].clientY;
            this.moveY = mPointY - stPointY;
            console.log(mPointY);
          })
        },
        destory() {//卸载事件
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

  /*.main{
    transform:translate3d(0,10px,0);
  }*/

  .loading{
    visibility: hidden;
    padding: 10px 0;
    text-align: center;
    font-size: 15px;
    color: #666;
    &.show{
      visibility: visible;
    }
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
