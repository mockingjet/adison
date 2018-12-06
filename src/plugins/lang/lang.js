//lang.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import tw from './tw.json'
import en from './en.json'

Vue.use(VueI18n)

const locale = 'tw'

const messages = {
  tw,
  en
}

const i18n = new VueI18n({
  locale,
  messages
})

export default i18n;