<template>
  <div class="container-fluid footer row no-gutters">
    <div class="col-12 footerlink">
      <span @click="routerPush('/about')">關於我們</span>
      <span @click="routerPush('/question')">常見問題</span>
      <span @click="routerPush('/contact')">聯絡我們</span>
    </div>
    <div class="col-12 companyinfo" 
      v-if="$store.state.lang=='tw'">
      <div class="info">
        <p><md-icon>mail</md-icon> 信箱：adison@adison-bio.com.tw</p>
        <p><md-icon>place</md-icon> 地址：台中市西屯區青海路一段99號7樓之1</p>
        <p><md-icon>phone</md-icon> 電話：04-23151500~01 <md-icon>local_printshop</md-icon> 傳真：04-23151502</p>
      </div>
    </div>
    <div class="col-12 copyright"
      v-if="$store.state.lang=='tw'">
      © 2018 亞帝昇生物科技有限公司 版權所有
    </div>

    <div class="col-12 companyinfo" 
      v-if="$store.state.lang=='en'">
      <div class="info">
        <p><md-icon>mail</md-icon> Email：adison@adison-bio.com.tw</p>
        <p><md-icon>place</md-icon> Address：1st Floor, No. 99, Section 1, <br>&nbsp;&nbsp;&nbsp;Qinghai Road, Xitun District, Taichung City</p>
        <p><md-icon>phone</md-icon> Phone：04-23151500~01 <md-icon>local_printshop</md-icon> Tax：04-23151502</p>
      </div>
    </div>
    <div class="col-12 copyright"
      v-if="$store.state.lang=='en'">
      © 2018 Adison Biotechnology Ltd. All Rights Reserved.  
    </div>

  </div>
</template>
<script>
import $ from 'jquery'
export default {
  methods:{
    routerPush(url) {
      $("html, body").animate({ scrollTop: 0 }, "slow");
      this.$router.push(url)
    },
  }
}
</script>
<style lang="scss">
.footer{
  font-size:12px;
  color:white;
  margin-top:40px;
  padding:20px 0px 5px 0px;
  background-color:#212121;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.3);
  .footerlink{
    text-align: center;
    margin-bottom:10px;
    font-size:13px;
    span{
      padding:0px 5px;
      cursor: pointer;
    }
    span:hover{
      color:#90C221;
    }
    span:nth-child(1){
      border-right:1px solid #eee;
    }
    span:nth-child(2){
      border-right:1px solid #eee;
    }
  }
  .md-icon{
    font-size:18px !important;
  }
  .companyinfo{
    display:flex;
    justify-content: space-around;
    .info{
      text-align: center;
    }
    p{
      margin:0px;
      font-size:12px;
    }
  }
  .copyright{
    color:#ddd;
    margin-top:5px;
    font-size:12px;
    width:100%;
    text-align: center;
  }
}
</style>
