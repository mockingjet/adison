<template>
  <div class="app">
    <!-- 電腦版選單 -->
    <md-toolbar class="headbar animated fadeIn slow" :md-elevation="scrolling">  
      <img @click="$router.push('/')" alt="" src="@/assets/logo.png">
      <div class="middle-spacer"></div>
      <div class="rightbar row">
        <div class="topbar col-12">
          <div class="button" @click="openSearch()">
            {{$t("_search")}}
            <md-icon style="zoom:0.5">search</md-icon>
          </div>
          <div class="button" @click="switchLang()">{{$t("_language")}}</div>
        </div>
        <div class="downbar col-12">
          <ul class='barmenu'>
            <li @click="routerPush('/about')">
              <md-icon style="color:white;zoom:0.9">info</md-icon>
              {{$t('_about')}}
            </li>
            <li @click="routerPush('/product')">
              <md-icon style="color:white;zoom:0.9">shopping_cart</md-icon>
              {{$t('_product')}}
            </li>            
            <li @click="routerPush('/news')">
              <md-icon style="color:white;zoom:0.9">new_releases</md-icon>
              {{$t('_news')}}
            </li>
            <li @click="routerPush('/donation')">
              <md-icon style="color:white;zoom:0.9">favorite</md-icon>
              {{$t('_donation')}}
            </li>
            <li @click="routerPush('/question')">
              <md-icon style="color:white;zoom:0.9">help</md-icon>
              {{$t('_question')}}
            </li>
            <li @click="routerPush('/contact')">
              <md-icon style="color:white;zoom:0.9">message</md-icon>
              {{$t('_contact')}}
            </li>
          </ul>
        </div>
      </div>
    </md-toolbar>
    <!-- 手機版選單 -->
    <md-toolbar class="mb-header">
      <img 
        style="max-height:56px;width:180px"
        @click="showNavigation = false,$router.push('/')"
        src="@/assets/logo.png"
      >
      <div class="md-toolbar-section-end" style="margin-right:10px;">
        <md-button class="md-icon-button" @click="showMobileNav">
          <md-icon>{{showNavigation ? "close" : "menu"}}</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <md-drawer class="md-right mb-menu" :md-active.sync="showNavigation">
      <div class="barmenu">
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/about')">
          <md-icon style="color:white;zoom:0.9">info</md-icon>
          {{$t('_about')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/product')">
          <md-icon style="color:white;zoom:0.9">shopping_cart</md-icon>
          {{$t('_product')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/news')">
          <md-icon style="color:white;zoom:0.9">new_releases</md-icon>
          {{$t('_news')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/donation')">
          <md-icon style="color:white;zoom:0.9">favorite</md-icon>
          {{$t('_donation')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/question')">
          <md-icon style="color:white;zoom:0.9">help</md-icon>
          {{$t('_question')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,routerPush('/contact')">
          <md-icon style="color:white;zoom:0.9">message</md-icon>
          {{$t('_contact')}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,openSearch()">
          <md-icon style="color:white;zoom:0.9">search</md-icon>
          {{$t("_search")}}
        </p>
        <p class="animated" @click="showNavigation = !showNavigation,switchLang()">
          <md-icon style="color:white;zoom:0.9">language</md-icon>
          {{$t("_language")}}
        </p>
      </div>
    </md-drawer>
    <router-view :key="$route.fullPath"></router-view>
    <footer-bar/>
  </div>
</template>

<script>
import $ from 'jquery'
import footerBar from '@/components/footerBar.vue'
export default{
  components:{
    footerBar
  },
  data: ()=> ({
    scrolling:0,
    showNavigation:false
  }),
  async beforeCreate() {
    this.$i18n.locale = await this.$store.state.lang
  },
  async mounted() {
    const meta_keywords = document.querySelector('head meta[name="keywords"]');
    const keywords = (await this.api.get('getKeywords')).data
    meta_keywords.setAttribute("content", keywords);
  },
  methods:{
    switchLang() {
      let lang = this.$store.state.lang == 'tw' ? 'en' : 'tw'
      this.$store.dispatch('setLang', lang)
      this.$i18n.locale = lang
    },
    openSearch(){
      this.swal({
        title:this.$t('_enter'),
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        confirmButtonText:this.$t('_search')
      }).then( (e) => {
        if(e.value!='' && !e.dismiss)
          this.$router.push('/product/keyword/'+e.value)
      })
    },
    routerPush(url) {
      if(this.$route.fullPath==url) {
        this.$router.go(0)
      } else {
        this.$router.push(url)
      }
    },
    showMobileNav() {
      if(!this.showNavigation){
        this.showNavigation = !this.showNavigation
        $(".mb-menu .barmenu p").each(function() {
          $(this).removeClass("fadeOutRight")
          $(this).addClass("fadeInUp")
        })
      } else {
        $(".mb-menu .barmenu p").each(function() {
          $(this).addClass("fadeOutRight")
          $(this).removeClass("fadeInUp")
        })
        let that = this
        setTimeout(function(){
          that.showNavigation = !that.showNavigation
        },1000)
      }
    }
  },
  watch: {
    showNavigation(v) {
      if(v)
        document.documentElement.style.overflowY = 'hidden'
      else
        document.documentElement.style.overflowY = 'scroll'
    }
  }
}
</script>

<style lang="scss">
$maincolor : #004D97;
html,body{
  overflow-x:hidden;
}
.app{
  font-family:microsoft jhenghei;
  padding:0px;
  background:#F9F9F9;
  min-height:100vh;
  .mb-header{
    display:none;
    z-index:999;
  }
  .md-drawer.mb-menu{
    background-color:rgba(white,0.9) !important;
    width:100vw;
    max-width:100vw;
    padding-top:76px;
    div.barmenu{
      list-style: none;
      text-align:center;
      padding:0px calc(50% - 100px);
      p{
        font-size:16px;
        font-family:'Arial Narrow Bold', sans-serif;
        padding:calc((50vh - 38px) / 16) 0px;
        margin:0px;
        cursor: pointer;
        .md-icon{
          color:$maincolor !important;
          float:left;
        }
      }
      @for $i from 1 through 8 {
        p:nth-child(#{$i}){
          animation-delay: $i*0.1s;
        }
      }
      p:hover{
        transition:all .2s;
        padding-left:10px;
        color:rgba(black,0.6);
        opacity: 0;
        .md-icon{
          color:rgba($maincolor,0.6) !important;
          float:left;
        }
      }
    }
  }
  .headbar{
    transition:all .2s;
    position:absolute;
    top:0px;
    background-color:rgba(white,0.7) !important;
    padding-top:10px;
    padding-bottom:0px;
    padding-left:calc(10vw - 50px);
    img{
      width:350px;
      cursor: pointer;
    }
    .middle-spacer{
      flex:1;
    }
    .rightbar{
      width:50vw;
      min-width:750px;
      .topbar{
        text-align: right;
        .button{
          display:inline-block;
          cursor:pointer;
          background-color:#fff;
          border-radius:5px;
          width:90px;
          margin: 0px 5px 10px 5px;
          text-align: center;
          color:black;
          font-size:12px;
        }
        .button:hover{
          transition:all .2s;
          background-color: #666;
          color:white;
        }
      }
      .downbar{
        background-color:$maincolor;
        color:white;
        text-align: left;
        .barmenu{
          list-style: none;
          padding:0px 15px;
          li{
            display:inline-block;
            position:relative;
            margin:0px 10px;
            cursor:pointer;
            font-weight:500;
            letter-spacing:1px;
          }
          li::after{
            content:'';
            border-radius:100%;
            border-bottom:2px solid #aaa;
            position:absolute;
            left:-5px;
            right:calc(100% + 5px);  
            bottom:-5px;
          }
          li:hover::after{
            transition: all .5s;
            right:-5px;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1400px){
  .app{
    .headbar{
      padding-left:20px;
    }
  }
}
@media screen and (max-width: 1100px){
  .app{
    .headbar{
      display:none;
    }
    .mb-header{
      display:flex;
    }
  }
}
</style>
