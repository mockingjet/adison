<template>
  <div class="question-container">
    <div class="row no-gutters">
      <md-card class="col-sm-10 offset-sm-1 col-12 offset-0 md-layout-item main-content">
        <div class="title ">{{$t('_question')}}</div>
        <div class="question" v-for="(question,i) in questions" :key="i">
          <div class="qtitle" data-show="off">
            <div class="plus"></div>
            {{
              $store.state.lang=='en'
              ? question.en_title
              : question.title
            }}
          </div>
          <div class="qanswer" v-html="
            $store.state.lang=='en'
            ? question.en_ckeditor
            : question.ckeditor
          "></div>
        </div>
      </md-card>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
$(document).on("vclick, click",".qtitle",function(){
  var show = $(this).attr("data-show")
  if(show != 'on') {
    $(this).attr("data-show","on")
    $(this).children(".plus").addClass("active")
    $(this).next().slideDown()
  } else {
    $(this).attr("data-show","off")
    $(this).children(".plus").removeClass("active")
    $(this).next().slideUp()
  }
})
export default {
  data: ()=>({
    questions:{}
  }),
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const questions = (await this.api.get('getQuestion')).data
      this.questions = questions
    }
  }
}
</script>
<style lang="scss" scoped>
$subcolor: #e80013;
.question-container{
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 640px) 0px calc(50vw - 640px);
  .main-content {
    min-height: calc(100vh - 400px);
    margin-bottom:40px;
    padding:20px;
    .title {
      font-weight: 600;
      font-size: 28px;
      color: $subcolor;
      text-align: left;
      margin:10px 0px;
    }
    .qtitle{
      cursor:pointer;
      margin:25px 0px;
      color:#333;
      font-size:20px;
      font-weight: 600;
      padding:10px;
      border-bottom:1px solid rgba(blue,0.2);
    }
    .qanswer{
      display:none;
      padding:10px;
    }
    .plus{
      width: 16px;
      height: 16px;
      float:left;
      margin:0px 10px;
      position:relative;
    }
    .plus::before, .plus::after {
      content: "";
      position: absolute;
      background-color: #333;
      border-radius: 1px;
      transition: transform 0.25s ease-out;
    }
    .plus::before{
      top: 0;
      left: 50%;
      width: 4px;
      height: 100%;
      margin-left: -2px;
    }
    .plus::after{
      top: 50%;
      left: 0;
      width: 100%;
      height: 4px;
      margin-top: -2px;
    }
    .plus.active::before{
      transform: rotate(90deg);
    }    
    .plus.active::after{
      transform: rotate(180deg);
    }
  }
}
@media screen and (max-width: 1244px){
  .question-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .question-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .question-container{
    padding:20px 10px;
    .main-content{
      padding:10px;
      margin:0px;
      width:100%;
      .title{
        font-size:20px;
        margin:10px;
      }
      .qtitle{
        margin-top:10px;
        color:#333;
        font-size:16px;
        font-weight: 600;
        padding:10px 0px;
        border-bottom:1px solid rgba(blue,0.2);
      }
    }
  }
}
</style>
