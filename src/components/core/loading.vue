<template>
  <div>
    <v-overlay z-index="99" :value="loadX">
      <v-btn style="height:108px; width:108px;" color="white" fab class=" animate__animated animate__pulse animate__infinite infinite" >
        <!-- <img class="w-auto  h-24 " src="/017-cow.png" alt=""> -->
        <i class="em em-shopping_bags text-3xl" aria-role="presentation" aria-label=""></i>
      </v-btn> 
    </v-overlay>
  </div>

</template>

<script lang="ts">

import { Core } from "@/store/core";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {

  },
  computed: {}
})

export default class loading extends Vue {

  overlay:any =  true


  async created() {

  }

  get loadX(){
    return Core.loading
  } 

}
</script>
