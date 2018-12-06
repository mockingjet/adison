<template>
  <div class="news-container">
    <div class="main-content">
      <div class="title ">{{$t('_news')}}</div>
      <md-card 
        md-with-hover  
        :style="'cursor:default;animation-delay:'+i/5+'s;'"
        class="news row no-gutters animated fadeInUp"
        v-for="(news,i) in newses" :key="i">
        <div class="col-md-3 news-cover">
          <img :src="'wmadmin/imgfiles/News/'+news.imgfile" alt="">
        </div>
        <div class="col-md-9 news-brief">
          <small>{{news.createAt.split(" ")[0]}}</small>
          <div class="header">{{
            $store.state.lang=='en'
            ? news.en_title
            : news.title
          }}</div>
          <div class="content"
          v-html="
            $store.state.lang=='en'
            ? news.en_ckeditor
            : news.ckeditor
          "></div>
          <md-button 
            class="md-primary md-raised" 
            style="float:right;margin-top:10px" 
            @click="$router.push('/news/'+news.id)">
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
    newses: null, 
    active: false,
    isOnView:0
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const newses = (await this.api.get("getNews")).data;
      this.newses = newses;
    }
  }
};
</script>


<style lang="scss">
$subcolor: #e80013;
.news-container {
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  .main-content {
    .title {
      font-weight: 600;
      font-size: 28px;
      color: $subcolor;
      padding-left:10px;
    }
    .news {
      margin:30px 0px !important;
      padding:0px !important;
      height: 100%;
      .news-brief {
        padding: 10px;
      }
      .news-cover{
        height: 160px;
        overflow:hidden;
        img {
          max-width:unset;
          min-width:100%;
          height:100%;
        }
      }
      small {
        color: #333;
      }
      .header {
        font-size:22px;
        font-weight: 600;
        margin: 10px 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
  .news-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .news-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .news-container{
    padding:20px 10px;
    .main-content{
      .news {
        margin:10px 0px 0px 10px;
      }
      .title{
        padding:10px;
        font-weight: 600;
        font-size:22px;
        color:$subcolor;
        background-color:#eee;
      }
      .news {
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
  .news-container{
  .main-content{
  .news{
    max-width:400px;
    margin:20px calc(50vw - 180px) !important;
  .news-cover{
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
