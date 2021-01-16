<template>
  <div> 
    <v-app  >
      <WebNav /><br><br><br><br>
         <router-view />  
    </v-app>
     
  </div>
</template>

<script lang="ts"> 

import {
  Component,
  Vue,
} from 'vue-property-decorator'; 
import WebNav from '../../components/core/WebNav.vue'
@Component({
  components: {  
    WebNav
    },
    computed: {}
})

export default class Test extends Vue { 

}
</script>
