<template>
  <div class="contact-container">
    <md-card class="md-layout-item" md-with-hover style="cursor:default">
      <md-card-header>
        <div class="title ">{{$t('_contact')}}</div>
      </md-card-header>
      <div class="quote"
        v-if="$store.state.lang=='tw'">
        <p><a href="tel:0423151500">電話：04-23151500~01</a></p>
        <div>非常感謝您對亞帝昇的支持與愛護，歡迎您提出建議讓我們為您提供更好的服務。</div>
      </div>
      <div class="quote"
        v-if="$store.state.lang=='en'">
        <p>Phone：04-23151500~01</p>
        <div>We are grateful to receive your suggestions, and we endeavor to provide better services for you.</div>
      </div>
      <md-card-content>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('gender')">
              <md-icon class="md-primary">person</md-icon>
              <label for="gender">{{$t('_salution')}}</label>
              <md-select name="gender" id="gender" v-model="form.gender" :disabled="sending">
                <md-option style="display:none"></md-option>
                <md-option value="1">{{$t('_mr')}}</md-option>
                <md-option value="0">{{$t('_ms')}}</md-option>
              </md-select>
              <span class="md-error">{{$t('_4gender')}}</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('lastName')">
              <label for="last-name">{{$t('_lastName')}}</label>
              <md-input name="last-name" id="last-name" autocomplete="family-name" v-model="form.lastName" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.lastName.required">{{$t('_4lastName')}}</span>
            </md-field>
          </div>
          <div class="md-layout-item ">
            <md-field :class="getValidationClass('firstName')">
              <label for="first-name">{{$t('_firstName')}}</label>
              <md-input 
                name="first-name" 
                id="first-name" 
                v-model="form.firstName" 
                :disabled="sending" />
              <span class="md-error" v-if="!$v.form.firstName.required">{{$t('_4firstName')}}</span>
            </md-field>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('email')">
              <md-icon class="md-primary">mail</md-icon>
              <label for="email">{{$t('_email')}}</label>
              <md-input type="email" id="email" v-model="form.email" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.email.required">{{$t('_4email1')}}</span>
              <span class="md-error" v-else-if="!$v.form.email.email">{{$t('_4email2')}}</span>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100">
            <md-field :class="getValidationClass('phone')">
              <md-icon class="md-primary">phone</md-icon>
              <label for="phone">{{$t('_phone')}}</label>
              <md-input id="phone" name="phone" autocomplete="phone" v-model="form.phone" :disabled="sending" />
              <span class="md-error" v-if="!$v.form.phone.required">{{$t('_4phone1')}}</span>
              <span class="md-error" v-else-if="!$v.form.phone.maxlength">{{$t('_4phone2')}}</span>
            </md-field>
          </div>
        </div>

        <md-field :class="getValidationClass('message')">
          <md-icon class="md-primary">message</md-icon>
          <label for="message">{{$t('_message')}}</label>
          <md-textarea v-model="form.message" id="message"></md-textarea>
          <span class="md-error" v-if="!$v.form.message.required">{{$t('_4message')}}</span>
        </md-field>
      </md-card-content>

      <md-progress-bar md-mode="indeterminate" v-if="sending"/>
      <md-button 
        class="md-raised md-primary" 
        @click.native="validateUser"
        :disabled="sending">
        {{$t('_submit')}}
      </md-button>
      <iframe 
        v-if="$store.state.lang=='tw'"
        src="https://www.google.com/maps/embed/v1/place?q=台中市西屯區青海路一段99號&key=AIzaSyDwBHq5qkJxVlRFOQVotY4vlOibV3HTKPo&language=zh-tw" 
        style="width:100%;height:55vh;border:0;margin-top:40px;padding:10px" >
      </iframe>   
      <iframe 
        v-if="$store.state.lang=='en'"
        src="https://www.google.com/maps/embed/v1/place?q=台中市西屯區青海路一段99號&key=AIzaSyDwBHq5qkJxVlRFOQVotY4vlOibV3HTKPo&language=en"
        style="width:100%;height:55vh;border:0;margin-top:40px;padding:10px" >
      </iframe>    
    </md-card>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength,
  numeric
} from 'vuelidate/lib/validators'
export default {
  name: 'Contact',
  mixins: [validationMixin],
  data: () => ({
    form: {
      firstName: null,
      lastName: null,
      gender: null,
      phone: null,
      email: null,
      message: null
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      phone: {
        required,
        numeric,
        minLength: minLength(8),
        maxLength: maxLength(12)
      },
      gender: {
        required
      },
      email: {
        required,
        email
      },
      message: {
        required
      }
    }
  },

  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]
      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.message = null
    },
    async sendContact () {
      this.sending = true
      await this.api.post('postContact',this.qs.stringify({
        contact: this.form
      })).then((res) => {
        this.sending = false
        if(res.data) {
          this.swal({
            title:'送出成功',
            type:'success'
          })
          this.clearForm()
        }else {
          this.swal({
            title:'送出失敗',
            type:'error'
          })
        }
      })
    },
    validateUser () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.sendContact()
      }
    }
  }
}
</script>

<style lang="scss">
$subcolor:#E80013;
.contact-container{
  min-height: calc(100vh - 40px);
  padding:160px calc(50vw - 540px) 40px calc(50vw - 540px);
  display:flex;
  .md-card{
    align-self: center;
    padding:10px 10px 20px 10px;
    text-align: center;
    .title {
      font-weight: 600;
      font-size: 28px;
      color: $subcolor;
      text-align: left;
      margin:10px 0px;
    }
    .quote{
      background-color:#eee;
      padding:20px 0px;
      p{
        font-size: 18px !important;
        font-weight: 600;
        margin:0px;
        margin-bottom:10px;
      }
      div{
        font-size:14px;
      }
    }
    input{
      text-align: center;
    }
    .md-select-menu{
      width:100%;
    }
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
}
.md-icon.md-icon-font.md-primary.md-theme-default:after{
  display:none;
}
@media screen and (max-width: 1244px){
  .contact-container{
    padding:160px 20px 0 20px;
  }
}
@media screen and (max-width: 1100px){
  .contact-container{
    padding:40px 20px;
    min-height:unset;
  }
}
@media screen and (max-width: 991px){
  .contact-container{
    padding:20px 10px;
    .md-card{
      .title{
        font-size:24px;
      }
      .quote{
        padding:20px 20px;
        div{
          font-size:13px;
          text-align:left;
        }
      }
    }
  }
}
</style>