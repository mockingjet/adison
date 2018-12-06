<template>
  <div class="home">
    <home-slider/>
    <div class="hotnews-container container">
      <div class="row">
        <div class="hotnews-title col-12">
          <md-icon style="color:#8d9e3f">new_releases</md-icon>
          {{$t('_adisonHotnews')}}
        </div>
        <div class="col-lg-3 col-6" 
          v-for="(news,i) in newsPreviews" :key="i"
          @click="$router.push('/news/'+news.id)">
          <div class="hotnews-preview">
            <div class="hotnews-imgblock">
              <img :src="'wmadmin/imgfiles/News/'+news.imgfile" alt="">
            </div>
            <p>{{
              $store.state.lang=='en'
              ? news.en_title
              : news.title
            }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="hotnews-container container">
      <div class="row">
        <div class="hotnews-title col-12">
          <md-icon style="color:#8d9e3f">favorite</md-icon>
          {{$t('_donationMessages')}}
        </div>
        <div class="col-lg-3 col-6" 
          v-for="(donation,i) in donationPreviews" :key="i"
          @click="$router.push('/donation/'+donation.id)">
          <div class="hotnews-preview">
            <div class="hotnews-imgblock">
              <img :src="'wmadmin/imgfiles/Donation/'+donation.imgfile" alt="">
            </div>
            <p>{{
              $store.state.lang=='en'
              ? donation.en_title
              : donation.title
            }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeSlider from '@/components/homeSlider.vue'
export default {
  components: {
    homeSlider,
  },
  data: ()=>({
    newsPreviews:{},
    donationPreviews:{}
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const newsPreviews = (await this.api.get('getNewsPreview')).data
      this.newsPreviews = newsPreviews
      const donationPreviews = (await this.api.get('getDonatePreview')).data
      this.donationPreviews = donationPreviews
    }
  }
}
</script>

<style lang="scss">
$maincolor : #004D97;
.hotnews-container{
  margin-top:40px;
  margin-bottom:20px;
  div.col-6{
    padding:0px 7px;
  }
  .hotnews-title{
    font-size: 25px;
    line-height: 1.333em;
    color: #8d9e3f;
    font-weight: 600;
    text-transform: uppercase;
    margin:0px 0px 10px 0px;
  }
  .hotnews-preview{
    cursor: pointer;
    background-color: white;
    box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    p{
      padding:0 15px;
      height:30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color:$maincolor;
      font{
        size:14px;
      }
    }
    .hotnews-imgblock{
      display:flex;
      justify-content: center;
      height:150px;
      overflow:hidden;
      img{
        max-width:unset;
        height:100%;
        min-width:100%;
      }
    }
  }
}
@media screen and (max-width: 576px){
  .hotnews-container{
    margin-top:20px;
    margin-bottom:10px;
    .hotnews-title{
      font-size: 20px;
      line-height: 20px;
      margin:10px 0px;
    }
    .hotnews-preview{
      .hotnews-imgblock{
        height:130px;
        img{
          min-width:unset;
        }
      }
    }

  }
}
</style>
