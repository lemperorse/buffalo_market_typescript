<template>
<div>
    <v-app>
        <Loading />
        <WebNav /><br><br><br><br>
        <v-main>
            <router-view   />
        </v-main>
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
import Loading from '../../components/core/loading.vue'
@Component({
    components: {
        WebNav,
        CityDialog,
        Footer,
        Loading
    },
    computed: {}
})

export default class Admin extends Vue {

}
</script>
