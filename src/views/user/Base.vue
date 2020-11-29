<template>
<div>
    <Navbar1 />
    <div class="hidden md:contents "> 
    </div>
     <div class="contents md:hidden"> 
    </div>
    <router-view />
</div>
</template>

<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import Navbar1 from '@/components/core/Navbar1.vue';
@Component({
    components: {
        Navbar1
    },
    computed: {}
})

export default class Admin extends Vue {

}
</script>
