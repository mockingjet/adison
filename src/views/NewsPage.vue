<template>
  <div class="newspage-container row flex-column-reverse flex-md-row  no-gutters">
    <div class="col-md-8">
      <div class="title ">
      {{
        $store.state.lang=='en'
        ? news.en_title
        : news.title
      }}</div>
      <small class="date">{{news.createAt}}</small>
      <div class="content"
      v-html="
        $store.state.lang=='en'
        ? news.en_ckeditor
        : news.ckeditor
      "></div>
    </div>
    <div class="col-md-4" style="padding:0px 15px 20px 15px;">
      <div class="img">
        <img :src="'wmadmin/imgfiles/News/'+news.imgfile" alt="">
      </div>
      <div class="recent">
        <p>Recent News</p>
        <ul>
          <li v-for="(newsPreview,i) in newsPreviews" :key="i"
            @click="$router.push('/news/'+newsPreview.id)">
            {{
              $store.state.lang=='en'
              ? newsPreview.en_title
              : newsPreview.title
            }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data:()=>({
    newsID:null,
    news:{},
    newsPreviews:{},
  }),
  mounted() {
    this.newsID = this.$route.params.newsID
    this.init()
  },
  methods:{
    async init(){
      const news = (await this.api.get('getNewsPage',{
        params:{
          newsID: this.newsID
        }
      })).data
      this.news = news
      const newsPreviews = (await this.api.get('getNewsPreview')).data
      this.newsPreviews = newsPreviews
    }
  }
}
</script>
<style lang="scss">
$subcolor: #e80013;
.newspage-container {
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  .title{
    font-weight: 700;
    font-size:28px;
    color:$subcolor;
    margin:10px 0px;
  }
  .date{
    color: #9fa6b4;
    // font-style: italic;
    font-size:14px;
    font-weight: 700;
  }
  .img{
    margin-top:10px;
    padding:0px 10%;
    background-color:#EEE;
    overflow:hidden;
    position:relative;
    height:170px;
    display: flex;
    justify-content: center;
    img{
      height:100%;
      width:auto;
    }
  }
  .content{
    margin:20px 0px;
  }
  .recent{
    margin-top:20px;
    padding:20px 10%;
    background-color:#EEE;
    p{
      font-size:20px;
      font-weight: 700;
    }
  }
  ul{
    justify-content: stretch; 

    list-style-type: none;
    padding:0px;
    margin:0px;
    li{
      width:100%;
      padding:10px;
      border-bottom:1px solid #AAA;
      color:#333;
      letter-spacing:1px;
      cursor:pointer;
    }
    li:hover{
      transition:all .2s;
      color:$subcolor;
    }
  }
}
@media screen and (max-width: 1244px){
  .newspage-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .newspage-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .newspage-container{
    padding:10px 10px;
    .title{
      font-size:18px;
      padding:0px 10px;
    }
    .date{
      font-size:12px;
      padding:0px 10px;
    }
    .content{
      padding:0px 10px;
    }
  }
}
</style>