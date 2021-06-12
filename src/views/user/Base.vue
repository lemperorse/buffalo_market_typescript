<template>
<div>
    <v-app>
        <WebNav />
        <router-view class="pt-32" />
        <CityDialog />
        <Footer></Footer>
    </v-app>

</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CityDialog from '@/components/core/City.vue';
import WebNav from '../../components/core/WebNav.vue'
import Footer from '../../components/core/Footer.vue'
@Component({
    components: {
        WebNav,
        CityDialog,
        Footer
    },
    computed: {}
})

export default class Admin extends Vue {

}
</script>
