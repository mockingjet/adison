<template>
  <!-- <carousel :per-page="1" autoplay :autoplayTimeout="4000" autoplayHoverPause>
    <slide 
      style="position:relative"
      v-for="(slide, i) in slides" :key="i">
      <div class="slide-image" :style="{ backgroundImage:'url(wmadmin/imgfiles/Carousel/'+slide.imgfile+')'}"></div>
      <div class="slide-title" v-if="$store.state.lang=='en'">{{slide.en_title}}</div>
      <div class="slide-title" v-if="$store.state.lang=='tw'">{{slide.title}}</div>
      <div class="slide-link">{{$t('_readMore')}}</div>
    </slide>
  </carousel> -->
  <slick
    ref="slick"
    :options="slickOptions">
    <div class="slide-image"
      v-for="(slide, i) in slides" :key="i"
      v-if="slide.title || slide.en_title"
      :style="{ backgroundImage:'url(wmadmin/imgfiles/Carousel/'+slide.imgfile+')'}">
      <div class="slide-title">{{
        $store.state.lang=='en'
        ? slide.en_title
        : slide.title
      }}</div>
      <a class="slide-link" 
        v-if="slide.link"
        :href="slide.link" 
        target="_blank"> 
        {{$t('_readMore')}}
      </a>
    </div>
  </slick>
</template>
<script>
import slick from 'vue-slick'
import 'slick-carousel/slick/slick.css';
export default {
  components:{
    slick
  }, 
  data: () => ({
    slickOptions: {
      slidesToShow: 1,
      prevArrow:"<span id='sliderPrev'><i aria-hidden='true' class='v-icon material-icons theme--dark' style='font-size: 40px;'>arrow_left</i></span>",
      nextArrow:"<span id='sliderNext'><i aria-hidden='true' class='v-icon material-icons theme--dark' style='font-size: 40px;'>arrow_right</i></span>",
      autoplay: true,
      autoplaySpeed: 4000,
    },
    slides:[]
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const slides = (await this.api.get('getCarousel')).data
      this.slides = slides
    },
  },
  watch: {
    slides(){
      let currIndex = this.$refs.slick.currentSlide()
      this.$refs.slick.destroy()
      this.$nextTick(() => {
        this.$refs.slick.create()
        this.$refs.slick.goTo(currIndex, true)
      })
    }
  }
}
</script>
<style lang="scss">
$maincolor : #004D97;
.slide-image{
  background-position:center;
  background-size:cover;
  width:100vw;
  height:80vh;
  position:relative;
}
.slide-title{
  display:block;
  position:absolute;
  height:auto;
  bottom:30vh;
  left:10vw;
  max-width:520px;
  line-height:32px;
  font-size: 32px;
  font-weight: 900;
  color: $maincolor;
  background-color:rgba(255,255,255,0.6);
  padding:10px;
}
.slide-link{
  position:absolute;
  bottom:calc(30vh - 55px);
  left:10vw;
  text-decoration: none !important;
  color: #fff !important;
  font-size: 14px;
  letter-spacing: 2px;
  padding: 12px 20px;
  border-radius: 3px;
  cursor: pointer;
  background: radial-gradient($maincolor 0, #1D4594 100%);
  background-position: 50% 50%;
}
.slick-arrow{
  position:absolute;
  z-index:99;
  cursor:pointer;
  color:white;
  background-color:rgba(31, 31, 31,0.1);
  border-radius:50%;
  width:40px;
  height:40px;
  text-align:center;
  line-height:40px;
  font-size:20px;
}
.slick-arrow:hover{
  background-color:rgba(31, 31, 31,0.5);
}
#sliderPrev{
  left:10px;
  top:calc(50% - 25px);
}
#sliderNext{
  right:10px;
  top:calc(50% - 25px);
}
.slick-dots{
  text-align:center;
}
.slick-dots li {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 0 5px;
  padding: 0;
  cursor: pointer;
}
.slick-dots li button{
  display:none;
}
.slick-dots li:before {
  font-family: 'slick';
  font-size: 6px;
  line-height: 10px;
  position: absolute;
  top: 0;
  left: 0;
  width: 12px;
  height: 12px;
  content: '•';
  text-align: center;
  opacity: .3;
  background-color: black;
  border-radius:50%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slick-active:before{
  opacity: .6 !important;
}
@media screen and (max-width: 576px){
  .slide-image{
    height:45vh;
    .slide-title{
      bottom:80px;
      max-width:520px;
      line-height:20px;
      font-size: 20px;
      font-weight: 700;
      padding:10px 15px;
    }
    .slide-link{
      bottom:40px;
      font-size: 10px;
      padding: 5px 15px;
    }
  }
  .slick-arrow{
    display:none !important;
  }
}
</style>
