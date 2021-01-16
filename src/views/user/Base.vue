<template>
<div>
     <v-app  >
      <WebNav />  
         <router-view class="pt-32" />     <CityDialog />
    </v-app>

</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
 import CityDialog from '@/components/core/City.vue';

import WebNav from '../../components/core/WebNav.vue'
@Component({
    components: {
         WebNav, CityDialog
    },
    computed: {}
})

export default class Admin extends Vue {

}
</script>
