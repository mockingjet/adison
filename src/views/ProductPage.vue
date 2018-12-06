<template>
  <div class="products-container">
    <div class="row flex-column-reverse flex-md-row no-gutters">
      <div class="col-md-8">
        <div class="title ">
        {{
          $store.state.lang=='en'
          ? product.en_name
          : product.name
        }}</div>
        <div class="content"
        v-html="
          $store.state.lang=='en'
          ? product.en_ckeditor
          : product.ckeditor
        "></div>
      </div>
      <div class="col-md-4">
        <div class="img">
          <img :src="'wmadmin/imgfiles/Product/'+product.imgfile" alt="">
        </div>
        <div class="recent">
          <p>{{$t('_product')}}</p>
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
export default {
  data: ()=>({
    product:{},
    maingrps:{},
    active: false,
    isOnView:0
  }),
  mounted() {
    this.productID = this.$route.params.productID
    this.init()
  },
  methods: {
    async init() {
      const product = (await this.api.get('getProductPage',{
        params:{
          productID: this.productID
        }
      })).data
      this.product = product
      const maingrps = (await this.api.get('getMaingrp')).data
      this.maingrps = maingrps
    },
    getProductByGroup(id) {
      this.$store.dispatch('setGroup', id)
      this.$router.push('/product/group/'+id)
    }
  }
}
</script>


<style lang="scss">
$subcolor:#E80013;
.products-container{
  min-height: calc(100vh - 200px);
  padding:160px calc(50vw - 600px) 0px calc(50vw - 600px);
  .title{
    font-weight: 700;
    font-size:28px;
    color:$subcolor;
    margin:10px 0px;
  }
  .img{
    margin-top:10px;
    padding:0px 10%;
    background-color:#EEE;
    overflow:hidden;
    height:180px;
    display: flex;
    justify-content: center;
    img{
      height:100%;
      max-width:unset;
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
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .products-container{
    padding:10px 10px;
    .title{
      font-weight: 700;
      font-size:18px;
      color:$subcolor;
      margin:20px 0px;
      padding:0px 10px;
    }
    .content{
      padding:0px 10px;
    }
  }
}
</style>
