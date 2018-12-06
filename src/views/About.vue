<template>
  <div class="about-container">
    <div class="row flex-column-reverse flex-lg-row no-gutters">
      <div class="col-lg-8 main-content">
        <div class="about" v-for="(about,i) in abouts" :key="i" v-show="isOnView==i">
          <p class="title ">
          {{
            $store.state.lang=='en'
            ? about.en_title
            : about.title
          }}</p>
          <p v-html="
            $store.state.lang=='en'
            ? about.en_ckeditor
            : about.ckeditor
          "></p>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="col-12 menu-heirarchy">
          <h2>{{$t('_about')}}</h2>
          <ul>
            <li v-for="(about,i) in abouts" :key="i" @click="isOnView=i">
              {{
                $store.state.lang=='en'
                ? about.en_title
                : about.title
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: ()=>({
    abouts:{},
    isOnView:0,
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const abouts = (await this.api.get('getAbout')).data
      this.abouts = abouts
    }
  }
}
</script>
<style lang="scss">
$subcolor:#E80013;
.about-container{
  min-height:calc(100vh - 40px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  display:flex;
  .main-content{
    padding-right:2%;
    .about{
      .title{
        font-weight: 600;
        font-size:28px;
        color:$subcolor;
        margin:0px;
      }
    }
  }
  .menu-heirarchy{
    background-color:#eee;
    padding-bottom:40px;
    h2{
      margin:0px;
      padding:20px;
    }
    ul{
      list-style-type: none;
      padding:0px;
      margin:0px;
      li{
        width:80%;
        margin-left:10%;
        padding:10px 20px;
        border-bottom:1px solid #AAA;
        color:#333;
        cursor:pointer;
      }
      li:hover{
        transition:all .2s;
        color:$subcolor;
      }
    }
  }
}
@media screen and (max-width: 1244px){
  .about-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .about-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .about-container{
    padding:10px 10px;
    .main-content{
      padding:0px;
      .about{
        .title{
          font-weight: 600;
          font-size:20px;
          color:$subcolor;
        }
      }
    }
  }
}
</style>
