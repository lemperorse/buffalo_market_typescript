import Vue from 'vue'
import './plugins/axios'

import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
 
import './plugins/varible';
Vue.config.productionTip = false 
import VueFormGenerator from 'vue-form-generator'
import 'vue-form-generator/dist/vfg.css'
Vue.use(VueFormGenerator)

const language = localStorage.getItem("language");

import th from './languages/th.json'
import en from './languages/en.json'
import ch from './languages/ch.json'
Vue.prototype.$language = language
Vue.prototype.$server = process.env.VUE_APP_SERVER
import VueFileAgent from 'vue-file-agent';  
Vue.use(VueFileAgent);

if(language == 'th'){ 
  Vue.prototype.$txt = th
}else if(language == 'en'){
  Vue.prototype.$txt = en
}else if(language == 'ch'){
  Vue.prototype.$txt = ch
}else{
  Vue.prototype.$language = 'th'
  Vue.prototype.$txt = th
}

let lang = function(th:any,en:any,ch:any){
  if(language == 'th'){ 
   return th
  }else if(language == 'en'){
    return en
  }else if(language == 'ch'){
    return ch
  }else{
    return th
  }
}
Vue.prototype._lang = lang
Vue.prototype.$lang = lang

const vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)

}).$mount('#app')

export { vm  }