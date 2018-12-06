<template>
  <div class="container error-container">
    <md-card class="error-message">
      <h1>找不到頁面</h1>
      <h4>404 錯誤 - 您請求的頁面並不存在</h4>
      <hr>
      <p>您可能輸入錯誤的網址(URL)，此網址文件並不存在，或是網址已經變更。</p>
      <p>請再次檢查網址，同時注意大小寫和各式標點符號，並重新整理。</p>
      <p>如果仍然不能開啟，請點擊下方連結前往官網聯絡我們，謝謝。</p>
      <md-button @click="$router.push('/')">亞帝昇首頁</md-button>
    </md-card>
  </div> 
</template>
<script>
export default {
  mounted() {
    this.api.get('test',{
      params:{
        'key':'123'
      }
    })
    
  }
}
</script>

<style lang="scss" scoped>
.error-container{
  padding-top:100px;
  min-height:calc(100vh - 187px);
  display:flex;
}
.error-message{
  padding:20px;
  margin:20px 0px;
  width:100%;
}
</style>
