<template>
  <div class="products-container no-gutters">
    <div class="row flex-column-reverse flex-md-row no-gutters">
      <div class="col-md-9 products row no-gutters">
        <div class="col-12 title  ">{{$t('_product')}}</div>
        <div class="col-lg-4 col-md-4 col-sm-6 offset-sm-0 col-10 offset-1" v-for="(product,i) in products" :key="i">
          <md-card 
            md-with-hover 
            :style="'cursor:default;animation-delay:'+i/10+'s; position:relative'"
            class="product-card">
            <md-ripple>
              <div class="imgblock">
                <img :src="'wmadmin/imgfiles/Product/'+product.imgfile">
              </div>
            </md-ripple>
            <md-card-header>
              <h3>{{
                $store.state.lang=='en'
                ? product.en_name
                : product.name
              }}</h3>
            </md-card-header>
            <div class="product-cover">
              <md-button 
                class="md-raised md-primary"
                @click="$router.push('/product/'+product.id)"
                style="font-size:13px;">
                {{$t('_readMore')}}
              </md-button>
            </div>
          </md-card>
        </div>
      </div>
      <div class="col-md-3" style="">
        <div class="col-12 menu-heirarchy animated fadeInRight">
          <h2>{{$t('_product')}}</h2>
          <ul>
            <li v-for="(maingrp,i) in maingrps" :key="i"
              @click="getProductByGroup(maingrp.id)">
              {{
                $store.state.lang=='en'
                ? maingrp.en_name
                : maingrp.name
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  data: ()=>({
    products:null,
    maingrps:{},
    active: false,
    isOnView:0
  }),
  async mounted() {

    if(this.$route.params.keyword){
      this.getProductByKeyword(this.$route.params.keyword)
    }
    else if(this.$route.params.groupID){
      this.getProductByGroup(this.$route.params.groupID)
    }
    else {
      this.init()
    }


    const maingrps = (await this.api.get('getMaingrp')).data
    this.maingrps = maingrps
    $(document).on("mouseenter",".product-card",function(){
      $(this).children('.product-cover').css('visibility','visible')
      $(this).children('.product-cover').children('button').css('transform','scale(1)')
    })
    $(document).on("mouseleave",".product-card",function(){
      $(this).children('.product-cover').css('visibility','hidden')
      $(this).children('.product-cover').children('button').css('transform','scale(0)')
    })
  },
  methods: {
    async init() {
      const products = (await this.api.get('getProduct')).data
      this.products = products
    },
    async getProductByGroup(id) {
      const products = (await this.api.get('getProductByGroup',{
        params:{
          id:id
        }
      })).data
      this.swal({
        timer:1000,
        customClass:'loadingModal',
        onOpen:() => {
          this.swal.showLoading();
        }
      }).then(()=>{
        this.products = products
      })
    },
    async getProductByKeyword(keyword) {
      const products = (await this.api.get('getProductByKeyword', {
        params:{
          keyword: keyword
        }
      })).data
      if(products.length>0){
        this.products = products
      }
      else {
        const response = this.$store.state.lang=='tw' ? "很抱歉，查無結果" : "Sorry, No Results" 
        this.swal({
          title:response,
          type:'error'
        })
        this.init()
      }
    }
  }
}
</script>


<style lang="scss">
$subcolor:#E80013;
.products-container{
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  .products{
    .title {
      font-weight: 600;
      font-size: 28px;
      color: $subcolor;
    }
    .product-card{
      width:95%;
      margin:5% 0px;
    }
    .imgblock{
      height:200px;
      overflow:hidden;
      display: flex;
      justify-content: center;
      img{
        margin: auto;
        height: 100%;
        max-width: unset;
      }
    }
    h3{
      text-align: center;
      margin:2px 0px;
    }
    .product-cover{
      position:absolute;
      z-index:999;
      top:0;
      width:100%;
      height:100%;
      text-align: center;
      display:flex;
      align-items:center;
      justify-content: space-around;
      background-color:rgba(black,0.4);
      visibility: hidden;
      button{
        transform: scale(0);
        transition:all .5s;
      }
    }
  }
  .menu-heirarchy{
    padding-bottom:40px;
    background-color:#EEE;
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
        padding:10px;
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
.loadingModal{
  background:transparent;
}
@media screen and (max-width: 1244px){
  .products-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .products-container{
    min-height:unset;
    padding-top:20px;
  }
}
@media screen and (max-width: 576px){
  .products-container{
    .products{
      .title{
        display:none;
      }
      .product-card{
        width:100%;
      }
    }
  }
}
</style>
