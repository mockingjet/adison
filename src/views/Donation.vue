<template>
  <div class="donation-container">
    <div class="main-content">
      <div class="title ">{{$t('_donation')}}</div>
      <md-card 
        md-with-hover  
        :style="'cursor:default;animation-delay:'+i/5+'s;'"
        class="donation row no-gutters animated fadeInUp"
        v-for="(donation,i) in donations" :key="i">
        <div class="col-md-3 donation-cover">
          <img :src="'wmadmin/imgfiles/Donation/'+donation.imgfile" alt="">
        </div>
        <div class="col-md-9 donation-brief">
          <small>{{donation.createAt.split(" ")[0]}}</small>
          <h2>{{
            $store.state.lang=='en'
            ? donation.en_title
            : donation.title
          }}</h2>
          <div class="content"
          v-html="
            $store.state.lang=='en'
            ? donation.en_ckeditor
            : donation.ckeditor
          "></div>
          <md-button 
            class="md-primary md-raised" 
            style="float:right;margin-top:10px" 
            @click="$router.push('/donation/'+donation.id)">
            {{$t('_readMore')}}
          </md-button>
        </div>
      </md-card >
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    donations: null, 
    active: false,
    isOnView:0
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const donations = (await this.api.get("getDonation")).data;
      this.donations = donations;
    }
  }
};
</script>


<style lang="scss">
$subcolor: #e80013;
.donation-container {
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  .main-content {
    .title {
      font-weight: 600;
      font-size: 28px;
      color: $subcolor;
      padding-left:10px;
    }
    .donation {
      margin:30px 0px;
      .donation-brief {
        padding: 10px;
      }
      .donation-cover{
        height: 160px;
        overflow:hidden;
      }
      img {
        max-width:unset;
        min-height:100%;
        width:100%;
        margin:0 auto;
        display:block;
      }
      small {
        color: #333;
      }
      h2 {
        margin: 10px 0px;
      }
      .content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        height:22px;
        p{
          margin:0px;
        }
      }
    }
  }
}
@media screen and (max-width: 1244px){
  .donation-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .donation-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .donation-container{
    padding:20px 10px;
    .main-content{
      .donation {
        margin:10px 0px 0px 10px;
      }
      .title{
        padding:10px;
        font-weight: 600;
        font-size:22px;
        color:$subcolor;
        background-color:#eee;
      }
      .donation {
        small {
          color: #333;
        }
        .header {
          font-size:22px;
          font-weight: 600;
          margin: 10px 0px;
        }
        .content {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height:22px;
          p{
            margin:0px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px){
  .donation-container{
  .main-content{
  .donation{
    max-width:400px;
    margin:20px calc(50vw - 180px) !important;
  .donation-cover{
    height: 200px;
    overflow:hidden;
    img {
      display:block;
      margin:auto;
      max-width:unset;
      min-width:unset;
      min-height:100%;
    }
  }
  }
  }
  }
}
</style>
